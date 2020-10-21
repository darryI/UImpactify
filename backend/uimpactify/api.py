import click
from flask import current_app, g, url_for
from flask.cli import with_appcontext

from uimpactify.db import ADMIN_USER

import requests
import json


from uimpactify.controller import routes

from uimpactify.models.courses import Courses


@click.command("signup")
@with_appcontext
def signup():
    user = {"email": "dead2@uimpactify.com", "password": "password"}

    # builds the endpoint urls based off of the servername and registered resources
    # reference: https://flask-restful.readthedocs.io/en/latest/api.html#flask_restful.Api.url_for
    signup_url = url_for("signupapi")

    # make a request to login using the admin account created by running `flask init-db`
    # reference: https://requests.readthedocs.io/en/master/user/quickstart/
    r = requests.post(signup_url, user)
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
    r = requests.post(login_url, ADMIN_USER)
    res = r.json()
    access_token = res["result"]["access_token"]
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


@click.command("course-test")
@with_appcontext
def course_test():
    # admin_user = {"email": "admin@uimpactify.com", "password": "password"}

    # builds the endpoint urls based off of the servername and registered resources
    # reference: https://flask-restful.readthedocs.io/en/latest/api.html#flask_restful.Api.url_for
    login_url = url_for("loginapi")
    course_url = url_for("coursesapi")
    test_course_url = url_for("courseapi", course_id="1")

    # make a request to login using the admin account created by running `flask init-db`
    # reference: https://requests.readthedocs.io/en/master/user/quickstart/
    r = requests.post(login_url, ADMIN_USER)
    res = r.json()
    access_token = res["result"]["access_token"]
    print("\n\n***LOGIN***\n")
    print("Logged in with token:")
    print(f"{access_token}\n")

    # Create a course with basic inputs
    course = {"name": "testCourse", "instructor": 1, "courseId": "1"}

    # use the token as authorization in the request headers to create a course with post call
    requestPost = requests.post(
        course_url,
        data=course,
        headers={'Authorization': f'Bearer {access_token}'}
        )

    print("\n\n\n***CREATE COURSE***\n")
    print("Course created with headers and mongoid:")
    print(requestPost.request.headers)
    res = requestPost.json()
    print(res)

    # use the token as authorization in the request headers to return a course with get call
    requestGet = requests.get(
        test_course_url,
        headers={'Authorization': f'Bearer {access_token}'}
        )

    returnedCourse = requestGet.json()
    print("\n\n\n***RETURN COURSE***\n")
    print("Course:")
    print(json.dumps(returnedCourse, indent=4))

    # use the token as authorization in the request headers to delete a course with delete call
    requestDelete = requests.delete(
        test_course_url,
        headers={'Authorization': f'Bearer {access_token}'}
    )

    print("\n\n\n***DELETE COURSE***\n")
    print("Course deleted with response and headers:")
    print(requestDelete.request.headers)
    res = requestDelete.json()
    print(res)

def init_app(app):
    app.cli.add_command(login)
    app.cli.add_command(signup)
    app.cli.add_command(course_test)