#!/usr/bin/env node

/* global require */

var colors = require('colors');
var rest = require('restler');
var inquirer = require("inquirer");
var commands = require('../app/commands');
var config = require('../app/config');
var dictionary = require('../app/dictionary');
var args = process.argv.slice(2);
var objCommand;

if (args.length === 0 || args[0] === 'help' || args[0] === '-h' || args[0] === '--help') {
  console.log('***********************************************'.blue);
  console.log('***                  NOTE.JS                ***'.cyan.bold);
  console.log('* command line tool for note-taking & sharing *');
  console.log('***********************************************'.blue);
  console.log('');
  console.log('npm install -g notejs'.green);
  console.log('');
  console.log('%s %s', 'note.js'.bold.white, 'is a node.js based tool which helps you to take and share notes between your computers and even colleagues! You short text snippets are saved online so you can access them anywhere.'.white);
  console.log('');

  for (var command in commands) {
    if (commands.hasOwnProperty(command)) {
      console.log('> %s - %s', command.white.bold, commands[command].description.white);
      console.log('  %s', commands[command].usage);

      if (commands[command].validation && commands[command].validation.errors) {
        for (var intIndex in commands[command].validation.errors) {
          if (commands[command].validation.errors.hasOwnProperty(intIndex)) {
            console.log('  - ', commands[command].validation.errors[intIndex]);
          }
        }
      }
    }
    console.log('');
  }
}
else if (commands.hasOwnProperty(args[0])) {
  // Get command object:
  objCommand = commands[args[0]];

  if (args.join(' ').match(objCommand.validation.pattern)) {
    if (objCommand.hasOwnProperty('confirm')) {
      inquirer.prompt({ type: 'confirm', message: objCommand.confirm, name: 'confirm' }, function(answers) {
        if (answers.confirm) {
          _sendRequest();
        }
        else {
          console.warn(dictionary.CONFIRM_CANCEL);
        }
      });
    }
    else {
      _sendRequest();
    }

    function _sendRequest () {
      rest[objCommand.method]([config.url.api, objCommand.url].join(''), objCommand.request)
        .on('complete', objCommand.callback);
    }
  }
  else {
    console.error(dictionary.INVALID_COMMAND_PARAMETERS.red, args[0]);
    console.log('Usage:', objCommand.usage);
    if (objCommand.validation && objCommand.validation.errors) {
      for (var intIndex in objCommand.validation.errors) {
        if (objCommand.validation.errors.hasOwnProperty(intIndex)) {
          console.log('\t', objCommand.validation.errors[intIndex]);
        }
      }
    }
  }
}
else {
  console.error(dictionary.UNKNOWN_COMMAND.red, args[0]);
}