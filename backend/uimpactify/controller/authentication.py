# flask packages
from flask import Response, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, create_refresh_token

# project resources
from uimpactify.models.users import Users
from uimpactify.controller.errors import unauthorized

# external packages
import datetime


class SignUpApi(Resource):
    """
    Flask-resftul resource for creating new user.

    :Example:

    >>> from flask import Flask
    >>> from flask_restful import Api
    >>> from app import default_config

    # Create flask app, config, and resftul api, then add SignUpApi route
    >>> app = Flask(__name__)
    >>> app.config.update(default_config)
    >>> api = Api(app=app)
    >>> api.add_resource(SignUpApi, '/authentication/signup')

    """
    @staticmethod
    def post() -> Response:
        """
        POST response method for creating user.

        :return: JSON object
        """
        data = request.form
        post_user = Users(**data)
        post_user.save()
        output = {'id': str(post_user.id)}
        return jsonify({'result': output})


class LoginApi(Resource):
    """
    Flask-resftul resource for retrieving user web token.

    :Example:

    >>> from flask import Flask
    >>> from flask_restful import Api
    >>> from app import default_config

    # Create flask app, config, and resftul api, then add LoginApi route
    >>> app = Flask(__name__)
    >>> app.config.update(default_config)
    >>> api = Api(app=app)
    >>> api.add_resource(LoginApi, '/authentication/login')

    """
    @staticmethod
    def post() -> Response:
        """
        POST response method for retrieving user web token.

        :return: JSON object
        """

        # apparently using request.get_json() is pretty error prone,
        # a better way to parse parameters is to use request.form for
        # post requests, and request.args for get requests

        # https://stackoverflow.com/questions/51807114/flask-bad-request-400
        # https://flask.palletsprojects.com/en/1.1.x/api/#flask.Request.args
        # https://flask.palletsprojects.com/en/1.1.x/api/#flask.Request.form

        data = request.form
        user = Users.objects.get(email=data.get('email'))
        auth_success = user.check_pw_hash(data.get('password'))
        if not auth_success:
            return unauthorized()
        else:
            expiry = datetime.timedelta(days=5)
            access_token = create_access_token(identity=str(user.id), expires_delta=expiry)
            refresh_token = create_refresh_token(identity=str(user.id))
            return jsonify({'result': {'access_token': access_token,
                                       'refresh_token': refresh_token,
                                       'logged_in_as': f"{user.email}"}})
