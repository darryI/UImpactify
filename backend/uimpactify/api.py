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


@click.command("course-test")
@with_appcontext
def course_test():
    # admin_user = {"email": "admin@uimpactify.com", "password": "password"}

    # builds the endpoint urls based off of the servername and registered resources
    # reference: https://flask-restful.readthedocs.io/en/latest/api.html#flask_restful.Api.url_for
    login_url = url_for("loginapi")
    courses_url = url_for("coursesapi")

    # make a request to login using the admin account created by running `flask init-db`
    # reference: https://requests.readthedocs.io/en/master/user/quickstart/
    r = requests.post(login_url, json=ADMIN_USER)
    res = r.json()
    access_token = res["access_token"]
    print("\n\n***LOGIN***\n")
    print("Logged in with token:")
    print(f"{access_token}\n")

    # Create a course with basic inputs
    courseOne = {
        "name": "testCourseOne",
    }

    courseTwo = {
        "name": "testCourseTwo",
    }

    # use the token as authorization in the request headers to create a course with post call
    requestPostOne = requests.post(
        courses_url,
        json=courseOne,
        headers={'Authorization': f'Bearer {access_token}'}
        )

    requestPostTwo = requests.post(
        courses_url,
        json=courseTwo,
        headers={'Authorization': f'Bearer {access_token}'}
        )

    print("\n\n\n***CREATE COURSE***\n")
    res = requestPostOne.json()
    c1 = res['id']
    res = requestPostTwo.json()
    c2 = res['id']
    print(c1)
    print(c2)

    test_courseByInstructor_url = url_for("coursebyinstructorapi")

    requestGetInstructors = requests.get(
            test_courseByInstructor_url,
            headers={'Authorization': f'Bearer {access_token}'}
        )

    courses = requestGetInstructors.json()
    print("\n\n\n***GET COURSES BY INSTRUCTOR***\n")
    print("Courses:")
    print(json.dumps(courses, indent=4))


    c1_url = url_for('courseapi', course_id=c1)
    c2_url = url_for('courseapi', course_id=c2)

    r = requests.get(
            c1_url,
            headers={'Authorization': f'Bearer {access_token}'}
        )

    print("\n\n\n***GET COURSE BY ID***\n")
    print(r.json())


def init_app(app):
    app.cli.add_command(login)
    app.cli.add_command(signup)
    app.cli.add_command(course_test)