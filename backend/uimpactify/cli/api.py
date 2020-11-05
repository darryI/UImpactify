import click

import requests
import json

from flask import current_app, g, url_for
from flask.cli import with_appcontext

from uimpactify.cli.db import ADMIN_USER
from uimpactify.cli import course_util
from uimpactify.cli import auth_util

from uimpactify.controller import routes


@click.command("signup")
@with_appcontext
def signup_cmd():
    user = {"email": "dead2@uimpactify.com", "password": "password"}
    user_id = auth_util.signup(user)


@click.command("login")
@with_appcontext
def login_cmd():
    access_token = auth_util.login()

    # get all the users in the db, using the returned access token for authorization
    user_url = url_for("usersapi")
    r = requests.get(
        user_url,
         headers={'Authorization': f'Bearer {access_token}'}
        )
    all_users = r.json()
    print("All users:")
    print(json.dumps(all_users, indent=4, sort_keys=True))


def init_app(app):
    app.cli.add_command(login_cmd)
    app.cli.add_command(signup_cmd)
    course_util.init_app(app)