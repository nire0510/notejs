/* global module, require, process */

var colors = require('colors');
var fs = require('fs');
var localStorage = require('../app/localstorage');
var dictionary = require('../app/dictionary');
var args = process.argv.slice(2);

module.exports = {
  "register": {
    "description": dictionary.REGISTER_DESCRIPTION,
    "url": "/user/register",
    "request": {
      "data": {
        "username": args[1],
        "password": args[2]
      },
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "method": "post",
    "usage": "note register USERNAME PASSWORD",
    "example": "note register notejs qweASD123",
    "validation": {
      "pattern": "^register (\\w{4,20}) ([.\\S]{4,20})$",
      "errors": {
        1: dictionary.USERNAME_VALIDATION,
        2: dictionary.PASSWORD_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
        data.message && dictionary[data.message] ? console.error(dictionary[data.message].red, args[1].bold) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
        if (response.headers['set-cookie']) {
          localStorage.getStorage().setItem('PHPSESSID', (response.headers['set-cookie'][response.headers['set-cookie'].length - 1]).split(';')[0]);
        }
         console.log(dictionary.REGISTER_SUCCESS.green, args[1].bold);
      }
    }
  },
  "unregister": {
    "description": dictionary.UNREGISTER_DESCRIPTION,
    "url": "/user/unregister",
    "request": {
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "method": "del",
    "usage": "note unregister",
    "example": "note unregister",
    "validation": {
      "pattern": "^unregister$",
      "errors": {
      }
    },
    "confirm": dictionary.CONFIRM_UNREGISTER,
    "callback": function (data) {
      if (data.error !== 0) {
         data.message && dictionary[data.message] ? console.error(dictionary[data.message].red) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
         console.log(dictionary.UNREGISTER_SUCCESS.green, data.data.username.bold);
      }
    }
  },
  "login": {
    "description": dictionary.LOGIN_DESCRIPTION,
    "url": "/user/login",
    "request": {
      "data": {
        "username": args[1],
        "password": args[2]
      },
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "method": "post",
    "usage": "note login USERNAME PASSWORD",
    "example": "note login notejs qweASD123",
    "validation": {
      "pattern": "^login (\\w{4,20}) ([.\\S]{4,20})$",
      "errors": {
        1: dictionary.USERNAME_VALIDATION,
        2: dictionary.PASSWORD_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
         data.message && dictionary[data.message] ? console.error(dictionary[data.message].red, args[1].bold) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
        if (response.headers['set-cookie']) {
          localStorage.getStorage().setItem('PHPSESSID', (response.headers['set-cookie'][response.headers['set-cookie'].length - 1]).split(';')[0]);
        }
        console.log(dictionary.LOGIN_SUCCESS.green, args[1].bold);
      }
    }
  },
  "logout": {
    "description": dictionary.LOGOUT_DESCRIPTION,
    "url": "/user/logout",
    "request": {
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "method": "post",
    "usage": "note logout",
    "example": "note logout",
    "validation": {
      "pattern": "^logout$",
      "errors": {

      }
    },
    "callback": function (data) {
      if (data.error !== 0) {
         data.message && dictionary[data.message] ? console.error(dictionary[data.message].red) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
        fs.unlink('./storage/PHPSESSID', function (err) {
          if (err) throw err;

           console.log(dictionary.LOGOUT_SUCCESS.green);
        });
      }
    }
  },
  "whoami": {
    "description": dictionary.GET_CURRENT_USERNAME,
    "url": "/user/me",
    "request": {
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "method": "get",
    "usage": "note whoami",
    "example": "note whoami",
    "validation": {
      "pattern": "^whoami",
      "errors": { }
    },
    "callback": function (data) {
      if (data.error !== 0) {
         data.message && dictionary[data.message] ? console.error(dictionary[data.message]) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
         console.log(dictionary.CURRENT_USERNAME.green, data.data.username.bold);
      }
    }
  },
  "get": {
    "description": dictionary.GET_DESCRIPTION,
    "url": "/note/" + args[1] + (args.length === 3 ? "/" + args[2] : ""),
    "method": "get",
    "request": {
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "usage": "note get USERNAME [NOTE]",
    "example": "note get notejs -OR- note get notejs website",
    "validation": {
      "pattern": "^get (\\w{4,20}|my)(?:\\s+([.\\S]{2,40}))?$",
      "errors": {
        1: dictionary.USERNAME_VALIDATION,
        2: dictionary.NOTE_VALIDATION
      }
    },
    "callback": function (data) {
      if (data.error !== 0) {
        data.message && dictionary[data.message] ? console.error(dictionary[data.message]) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
        if (Array.isArray(data.data)) {
          console.log(dictionary.USER_HAS_X_NOTES.green, data.data.length, args.slice(1).join(' ').bold);

          // User's notes:
          data.data.forEach(function (item) {
            console.log('* %s%s%s', item.hasOwnProperty('private') && item.private === '\u0001' ? item.note.white.bold.underline : item.note.white.bold, '                              '.substr(item.note.length), item.content);
          });
        }
        else if (data.data && data.data.hasOwnProperty('note')) {
          // A note:
          console.warn(dictionary.NO_NOTES_FOUND.yellow);
        }
      }
    }
  },
  "email": {
    "description": dictionary.EMAIL_DESCRIPTION,
    "url": "/note/email/" + args[1] + "/" + args[2] + "",
    "method": "post",
    "request": {
      "data": {
        "email": args[3]
      },
      "headers": {
        "Content-Type": "application/json"
      }
    },
    "usage": "note email USERNAME NOTE EMAIL",
    "example": "note email notejs website myemail@somedomain.com",
    "validation": {
      "pattern": "^email (\\w{4,20})\\s+([.\\S]{2,40})\\s+(\\S+@\\S+)$",
      "errors": {
        1: dictionary.USERNAME_VALIDATION,
        2: dictionary.NOTE_VALIDATION,
        3: dictionary.EMAIL_VALIDATION
      }
    },
    "callback": function (data) {
      if (data.error !== 0) {
        data.message && dictionary[data.message] ? console.error(dictionary[data.message], args[1], args[2], args[3]) : console.error(dictionary.ERROR_OCCURRED.red, data.message, args[1], args[2], args[3]);
      }
      else {
        console.log(dictionary.EMAIL_SUCCESS.green, args[2].bold, args[3].bold);
      }
    }
  },
  "post": {
    "description": dictionary.POST_DESCRIPTION,
    "url": "/note/public/" + args[1],
    "method": "post",
    "request": {
      "data": {
        "content": args.slice(2).join(' ')
      },
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "usage": "note post NOTE CONTENT",
    "example": "note post sample this is a test",
    "validation": {
      "pattern": "^post ([.\\S]{2,40}) (.{2,200})$",
      "errors": {
        1: dictionary.NOTE2_VALIDATION,
        2: dictionary.CONTENT_VALIDATION
      }
    },
    "callback": function (data) {
      if (data.error !== 0) {
        data.message && dictionary[data.message] ? console.error(dictionary[data.message]) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
         console.log(dictionary[data.message].green, args[1].bold);
      }
    }
  },
  "post-private": {
    "description": dictionary.POST_PRIVATE_DESCRIPTION,
    "url": "/note/private/" + args[1],
    "method": "post",
    "request": {
      "data": {
        "content": args.slice(2).join(' ')
      },
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "usage": "note post-private NOTE CONTENT",
    "example": "note post-private sample this is a test",
    "validation": {
      "pattern": "^post-private ([.\\S]{2,40}) (.{2,200})$",
      "errors": {
        1: dictionary.NOTE2_VALIDATION,
        2: dictionary.CONTENT_VALIDATION
      }
    },
    "callback": function (data) {
      if (data.error !== 0) {
        data.message && dictionary[data.message] ? console.error(dictionary[data.message]) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
         console.log(dictionary[data.message].green, args[1].bold);
      }
    }
  },
  "delete": {
    "description": dictionary.DELETE_DESCRIPTION,
    "url": "/note/" + args[1],
    "method": "del",
    "request": {
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "usage": "note delete NOTE",
    "example": "note delete sample",
    "validation": {
      "pattern": "^delete ([.\\S]{2,40})$",
      "errors": {
        1: dictionary.NOTE2_VALIDATION
      }
    },
    "callback": function (data) {
      if (data.error !== 0) {
        data.message && dictionary[data.message] ? console.error(dictionary[data.message]) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
         console.log(dictionary.NOTE_DELETED.green, args[1].bold);
      }
    }
  },
  "delete-all": {
    "description": dictionary.DELETE_ALL_DESCRIPTION,
    "url": "/note",
    "method": "del",
    "request": {
      "headers": {
        "Content-Type": "application/json",
        "Cookie": localStorage.getStorage().getItem('PHPSESSID')
      }
    },
    "usage": "note delete-all",
    "example": "note delete-all",
    "validation": {
      "pattern": "^delete-all$",
      "errors": { }
    },
    "confirm": dictionary.CONFIRM_DELETE_ALL,
    "callback": function (data) {
      if (data.error !== 0) {
        data.message && dictionary[data.message] ? console.error(dictionary[data.message]) : console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
         console.log(dictionary.NOTES_DELETED.green);
      }
    }
  }
};