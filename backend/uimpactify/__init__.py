# flask packages
from flask import Flask, app
from flask_restful import Api
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

# local packages
from uimpactify.controller.routes import create_routes

# external packages
import os

# default mongodb configuration
default_config = {'MONGODB_SETTINGS': {
                    'db': 'test_db',
                    'host': 'localhost',
                    'port': 27017,
                    'username': 'admin',
                    'password': 'password',
                    'authentication_source': 'admin'},
                  'JWT_SECRET_KEY': 'changeThisKeyFirst'}


def create_app(config: dict = None) -> app.Flask:
    """
    Initializes Flask app with given configuration.
    Main entry point for wsgi (gunicorn) server.
    :param config: Configuration dictionary
    :return: app
    """
    # init flask
    flask_app = Flask(__name__)

    # configure app
    config = default_config if config is None else config
    flask_app.config.update(config)

    flask_app.config['PROPAGATE_EXCEPTIONS'] = True

    # load config variables
    if 'MONGODB_URI' in os.environ:
        flask_app.config['MONGODB_SETTINGS'] = {'host': os.environ['MONGODB_URI'],
                                                'retryWrites': False}
    if 'JWT_SECRET_KEY' in os.environ:
        flask_app.config['JWT_SECRET_KEY'] = 'ssss'

    # init api and routes
    api = Api(app=flask_app)
    create_routes(api=api)

    # init mongoengine
    db = MongoEngine(app=flask_app)

    # init jwt manager
    jwt = JWTManager(app=flask_app)

    # init database commands
    from . import db
    db.init_app(flask_app)

    return flask_app
