'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var dirc = 'app/templates';

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
      this.dest.mkdir(dirc);
      this.dest.mkdir(dirc+'/src');
      this.dest.mkdir(dirc+'/src/scss/');
      this.dest.mkdir(dirc+'/src/includes/');
      this.dest.mkdir(dirc+'/src/img/');
      this.dest.mkdir(dirc+'/src/js/');

      this.src.copy(dirc+'/src/scss/_main.scss', dirc+'/src/scss/main.scss');
      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');
      this.src.copy('_gulpfile.js', 'Gulpfile.js');
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
