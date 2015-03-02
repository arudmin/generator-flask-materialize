![](http://i.imgur.com/GMBHlAI.jpg)
# Yeoman Flask Generator for Heroku with Materialize CSS Framework

  Generator to use Yeoman on a Flask project then deploying on Heroku platform.

  For more informations about Yeoman, see [yeoman.io](http://yeoman.io/)

  For more informations about Materialize CSS, see [materializecss.com](http://materializecss.com/)
  
  For more informations about Flask, see [flask.pocoo.org](http://flask.pocoo.org/)
  
  For more informations about Heroku, see [heroku.com](http://heroku.com/)


## Installation

  `$ npm install -g generator-flask-materialize`

### Init

  Generates a new Flask app with all the basic files you need.
  
  `$ yo flask-materialize`

### Preparing

1.  Install [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) and activate it.
  
  `$ virtualenv venv && source venv/bin/activate`
  
2.  Install [pip package manager](https://pip.pypa.io/en/latest/installing.html)
  
3.  Then install flask required depensies.

  `$ pip install -r requirements.txt`
  
### Deployment to Heroku

  `$ git init`
  
  `$ git add .`
  
  `$ git commit -am "first commit"`
  
  `$ heroku create [app-name]`
  
  `$ git push heroku master`
  
  `$ heroku open`

### Local

  `$ venv/bin/python ./server.py`

  Your application will be available at `127.0.0.1:5000`.

### Build

  If you decided to use [Frozen Flask](http://packages.python.org/Frozen-Flask/), run `$ python freeze.py` to build a static version of your app.
