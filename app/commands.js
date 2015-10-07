/* global module, require, process */

var colors = require('colors');
var fs = require('fs');
var localStorage = require('../app/localstorage');
var dictionary = require('../app/dictionary');
var args = process.argv.slice(2);

module.exports = {
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
      //"pattern": "^login (\\w{4,20}) ([\\w\\.\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-@#%&_;'\"]{4,20})$",
      "pattern": "^login (\\w{4,20}) ([.\\S]{4,20})$",
      "errors": {
        1: dictionary.USERNAME_VALIDATION,
        2: dictionary.PASSWORD_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
        console.error(dictionary[data.message].red, args[1].bold);
      }
      else {
        if (response.headers['set-cookie']) {
          console.log(dictionary[data.message].green, args[1].bold);
          localStorage.getStorage().setItem('PHPSESSID', (response.headers['set-cookie'][response.headers['set-cookie'].length - 1]).split(';')[0]);
        }
        else {
          console.log(dictionary.LOGIN_SUCCESS.green, args[1].bold);
        }
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
    "callback": function (data, response) {
      if (data.error !== 0) {
        console.error(dictionary[data.message].red);
      }
      else {
        fs.unlink('./storage/PHPSESSID', function (err) {
          if (err) throw err;

          console.log(dictionary[data.message].green);
        });
      }
    }
  },
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
      "pattern": "^register (\\w{4,20}) (\\w{4,20})$",
      "errors": {
        1: dictionary.USERNAME_VALIDATION,
        2: dictionary.PASSWORD_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
        console.error(dictionary[data.message].red);
      }
      else {
        if (response.headers['set-cookie']) {
          console.log(dictionary[data.message].green, args[1]);
          localStorage.getStorage().setItem('PHPSESSID', (response.headers['set-cookie'][response.headers['set-cookie'].length - 1]).split(';')[0]);
        }
        else {
          console.log(dictionary.USER_ALREADY_LOGGED_IN.green, args[1].bold);
        }
      }
    }
  },
  "get": {
    "description": dictionary.GET_DESCRIPTION,
    "url": "/note/" + args[1] + (args.length === 3 ? "/" + args[2] : ""),
    "method": "get",
    "usage": "note get USERNAME [NOTE]",
    "example": "note get notejs -OR- note get notejs website",
    "validation": {
      "pattern": "^get (\\w{4,20})(?:\\s+(\\w{2,20}))?$",
      "errors": {
        1: dictionary.USERNAME_VALIDATION,
        2: dictionary.NOTE_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
        console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
        if (Array.isArray(data.data)) {
          console.log('User %s has %d notes', args[1], data.data.length);

          // User's notes:
          data.data.forEach(function (item) {
            console.log('* %s%s%s', item.note.white.bold, '                         '.substr(item.note.length), item.content);
          });
        }
        else if (data.data && data.data.hasOwnProperty('note')) {
          // A note:
          console.log('* %s\t%s', data.data.note.white.bold, data.data.content);
        }
      }
    }
  },
  "add": {
    "description": dictionary.ADD_DESCRIPTION,
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
    "usage": "note add NOTE CONTENT",
    "example": "note add sample this is a test",
    "validation": {
      "pattern": "^add (\\w{2,20}) (.{2,200})$",
      "errors": {
        1: dictionary.NOTE2_VALIDATION,
        2: dictionary.CONTENT_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
        console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
        console.log(dictionary[data.message].green, args[1].bold);
      }
    }
  },
  "add-private": {
    "description": dictionary.ADD_PRIVATE_DESCRIPTION,
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
    "usage": "note add-private NOTE CONTENT",
    "example": "note add-private sample this is a test",
    "validation": {
      "pattern": "^add-private (\\w{2,20}) (.{2,200})$",
      "errors": {
        1: dictionary.NOTE2_VALIDATION,
        2: dictionary.CONTENT_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
        console.error(dictionary.ERROR_OCCURRED.red, data.message);
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
      "pattern": "^delete (\\w{2,20})$",
      "errors": {
        1: dictionary.NOTE2_VALIDATION
      }
    },
    "callback": function (data, response) {
      if (data.error !== 0) {
        console.error(dictionary.ERROR_OCCURRED.red, data.message);
      }
      else {
        console.log(dictionary[data.message].green, args[1].bold);
      }
    }
  }
};