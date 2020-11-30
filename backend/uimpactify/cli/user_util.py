import requests
import json

from flask import current_app, g, url_for

from uimpactify.cli.db import ADMIN_USER
from uimpactify.cli import auth_util

from uimpactify.controller import routes
from uimpactify.models.users import Users

def get_all_users(access_token):
    api_url = url_for("users")

    print("*** GET ALL USERS ***\n")
    r = requests.get(
        api_url,
        headers={'Authorization': f'Bearer {access_token}'}
        )
    print(json.dumps(r.json(), indent=4, sort_keys=True), "\n")


def delete_self(access_token):
    api_url = url_for("selfdeleteapi")

    print("*** SELF-DELETING USER ***\n")
    # use the token as authorization in the request headers to create a course with post call
    res = requests.delete(
        api_url,
        headers={'Authorization': f'Bearer {access_token}'}
        ).json()

def get_self(access_token):
    api_url = url_for("signedinuserapi")

    print("*** GETTING SIGNED IN USER ***\n")
    # use the token as authorization in the request headers to create a course with post call
    res = requests.get(
        api_url,
        headers={'Authorization': f'Bearer {access_token}'}
        )
    print(json.dumps(res.json(), indent=4, sort_keys=True), "\n")

def get_all_endorsed_courses(access_token):
    api_url = url_for("coursesnpohasendorsedapi")

    print("*** GETTING ALL ENDORSED COURSES ***\n")
    # use the token as authorization in the request headers to create a course with get call
    res = requests.get(
        api_url,
        headers={'Authorization': f'Bearer {access_token}'}
        )
    print(json.dumps(res.json(), indent=4, sort_keys=True), "\n")