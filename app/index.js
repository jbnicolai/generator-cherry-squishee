'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var dirc = 'src';
var sassd = dirc + '/scss';
var jsd = dirc + '/js';
var incd = dirc + '/includes';

var CherrySquisheeGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome, have a Cherry Squishee.'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Ready?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir(dirc);
      this.dest.mkdir(dirc+'/scss/');
      this.dest.mkdir(dirc+'/includes/');
      this.dest.mkdir(dirc+'/img/');
      this.dest.mkdir(dirc+'/js/');

      // SASS
      this.src.copy(sassd+'/main.scss', sassd+'/main.scss');

      // JS
      this.src.copy(jsd+'/global.js', jsd+'/global.js');

      // HTML
      this.src.copy(dirc+'/_index.html', dirc+'/index.html');
      this.src.copy(incd+'/header.html', incd+'/header.html');

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
