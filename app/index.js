'use strict';

var util   = require('util')
  , path   = require('path')
  , fs     = require('fs')
  , yeoman = require('yeoman-generator')
  , exec   = require('child_process').exec

module.exports = Generator

function Generator() {
  yeoman.generators.Base.apply(this, arguments)

  this.sourceRoot(path.join(__dirname, 'templates'))
}

util.inherits(Generator, yeoman.generators.NamedBase)

Generator.prototype.askFor = function askFor() {
  var cb   = this.async()
    , self = this

  var prompts = [
    {
      name: 'appName',
      message: 'Name of the app',
      // default: path.basename(process.cwd())
      default: 'app'
    },
    {
      type: 'confirm',
      name: 'sociallikes',
      message: 'Would you like to include social_likes script?',
      warning: '',
      default: false
    },
    {
      type: 'confirm',
      name: 'addtohomescreen',
      message: 'Would you like to include add-to-home-screen script?',
      warning: '',
      default: false
    },
    {
      type: 'confirm',
      name: 'frozenFlask',
      message: 'Do you want to use Frozen-Flask to build a static version of the app?',
      warning: 'Yes: You will be able to build a static version of your app with `$ python freeze.py`.',
      default: false
    }
  ]

  self.prompt(prompts, function(props) {
    // set the properties
    self.appName = props.appName
    self.addtohomescreen = props.addtohomescreen
    self.sociallikes = props.sociallikes
    self.frozenFlask = props.frozenFlask

    cb()
  })
}

// The Bootstrap functions are copies from the basic Yeoman app generator, edited to fit with the flask app structure
// Bootstrap plugins
// Generator.prototype.fetchBootstrap = function fetchBootstrap() {
//   // prevent the bootstrap fetch is user said NO
//   if(this.bootstrap) {

//     var cb   = this.async()
//       , self = this
//     // copy index.html file with javasctipt links
//     // this.copy('base.html', this.appName + '/templates/base.html')
//     // third optional argument is the branch / sha1. Defaults to master when ommitted.
//     this.remote('twbs', 'bootstrap', 'v2.1.0', function(err, remote, files) {
//       if (err) { return cb(err) }

//       'affix alert button carousel collapse dropdown modal popover scrollspy tab tooltip transition typeahead'.split(' ')
//       .forEach(function( el ) {
//         var filename = 'bootstrap-' + el + '.js'
//         remote.copy('js/' + filename, self.appName + '/static/js/vendors/bootstrap/' + filename)
//       })

//       cb()
//     })
//   }
//   else {
//     // copy base.html file without javasctipt links on jquery plugins
//     // this.copy('base-no-plugins.html', this.appName + '/templates/base.html')
//   }
// }

// // Bootstrap css / scss
// Generator.prototype.compassBootstrapFiles = function compassBootstrapFiles() {
//   if (this.compassBootstrap) {
//     var cb   = this.async()
//       , self = this

//     this.write(this.appName + '/static/css/main.scss', '@import "compass_twitter_bootstrap";')

//     this.cssFiles = '<link rel="stylesheet" href="{{ static(\'css/main.css\') }}">'

//     this.remote('kristianmandrup', 'compass-twitter-bootstrap', 'c3ccce2cca5ec52437925e8feaaa11fead51e132', function(err, remote) {
//       if (err) { return cb(err) }

//       remote.directory('stylesheets', self.appName + '/static/css')

//       cb()
//     })
//   }
//   else {
//     this.log.writeln('Writing compiled Bootstrap')
//     this.copy('bootstrap.css', this.appName + '/static/css/bootstrap.css')
//     this.copy('main.css', this.appName + '/static/css/main.css')
//     this.cssFiles = [
//         '<link rel="stylesheet" href="{{ static(\'css/bootstrap.css\') }}">'
//       , '<link rel="stylesheet" href="{{ static(\'css/main.css\') }}">'
//     ].join("\n    ")
//   }
// }

Generator.prototype.copyFonts = function copyFonts() {
  this.directory('font', this.appName + '/static/font')
  // this.copy('glyphicons-halflings-white.png', this.appName + '/static/img/glyphicons-halflings-white.png')
}

// create the basic files
Generator.prototype.createAppFiles = function createAppFiles() {
  this.copy('Procfile', 'Procfile')
  this.copy('requirements.txt', 'requirements.txt')
  this.template('server.py', 'server.py')
  this.template('init.py', this.appName + '/__init__.py')
  this.template('server_tests.py', this.appName + '_tests.py')
  this.template('views.py', this.appName + '/views.py')
  this.template('_base.html', this.appName + '/templates/base.html')
  this.template('_index.html', this.appName + '/templates/index.html')
  this.copy('preloader.html', this.appName + '/templates/preloader.html')
  this.copy('jquery-2.1.3.min.js', this.appName + '/static/js/jquery-2.1.3.min.js')
  this.copy('init.js', this.appName + '/static/js/init.js')
  this.copy('style.css', this.appName + '/static/css/style.css')

  // make the server file executable
  exec('chmod +x server.py')
}

// create the frozen-flask file to build a static version of the app
Generator.prototype.createFreezeFile = function createFreezeFile() {
  if (this.frozenFlask) {
    this.template('freeze.py', 'freeze.py')
  }
}

// Add To Home Screen Script Inculding
Generator.prototype.addToHomeScreen = function addToHomeScreen() {
  if (this.addtohomescreen) {
    this.copy('addtohomescreen.min.js', this.appName + '/static/js/addtohomescreen.min.js')
    this.copy('addtohomescreen.css', this.appName + '/static/css/addtohomescreen.css')
  }
}

// Social Links Script Including
Generator.prototype.sociallikes = function sociallikes() {
  if (this.sociallikes) {
    this.copy('social-likes.min.js', this.appName + '/static/js/social-likes.min.js')
    this.copy('social-likes_flat.css', this.appName + '/static/css/social-likes_flat.css')
  }
}

// create the yeoman and git files
Generator.prototype.createYeomanFiles = function createYeomanFiles() {
  this.template('Gruntfile.js', 'Gruntfile.js')
  this.copy('gitignore', '.gitignore')
  this.copy('gitattributes', '.gitattributes')
}

Generator.prototype.end = function end() {
  this.log.writeln('\nYour app is ready !\n')
}
