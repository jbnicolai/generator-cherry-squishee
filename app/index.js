'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var CherrySquisheeGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the peachy CherrySquishee generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/templates');
      this.dest.mkdir('app/templates/src');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
      this.src.copy('_gulpfile.js', 'gulpfile.js');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = CherrySquisheeGenerator;
