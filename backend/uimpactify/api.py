import click
from flask import current_app, g, url_for
from flask.cli import with_appcontext

from uimpactify.db import ADMIN_USER

import requests
import json


from uimpactify.controller import routes

@click.command("signup")
@with_appcontext
def signup():
    user = {"email": "dead2@uimpactify.com", "password": "password"}

    # builds the endpoint urls based off of the servername and registered resources
    # reference: https://flask-restful.readthedocs.io/en/latest/api.html#flask_restful.Api.url_for
    signup_url = url_for("signupapi")

    # make a request to login using the admin account created by running `flask init-db`
    # reference: https://requests.readthedocs.io/en/master/user/quickstart/
    r = requests.post(signup_url, json=user)
    print(r.request.headers)
    res = r.json()
    print(res)


@click.command("login")
@with_appcontext
def login():
    # admin_user = {"email": "admin@uimpactify.com", "password": "password"}

    # builds the endpoint urls based off of the servername and registered resources
    # reference: https://flask-restful.readthedocs.io/en/latest/api.html#flask_restful.Api.url_for
    login_url = url_for("loginapi")
    user_url = url_for("usersapi")

    # make a request to login using the admin account created by running `flask init-db`
    # reference: https://requests.readthedocs.io/en/master/user/quickstart/
    r = requests.post(login_url, json=ADMIN_USER)
    res = r.json()
    access_token = res["access_token"]
    print("Logged in with token:")
    print(f"{access_token}\n")

    # use the token as authorization in the request headers to make a get request
    r = requests.get(
        user_url,
         headers={'Authorization': f'Bearer {access_token}'}
        )
    all_users = r.json()
    print("All users:")
    print(json.dumps(all_users, indent=4, sort_keys=True))


def init_app(app):
    app.cli.add_command(login)
    app.cli.add_command(signup)