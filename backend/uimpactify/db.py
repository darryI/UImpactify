# references:
# https://flask.palletsprojects.com/en/1.1.x/tutorial/database/
# https://flask.palletsprojects.com/en/1.0.x/cli/#custom-commands


import click
from flask import current_app, g
from flask.cli import with_appcontext

from uimpactify.models.users import Users

from mongoengine import NotUniqueError, ValidationError

ADMIN_USER = {"email": "admin@uimpactify.com", "password": "password"}

# creation of db is handled in __init__.py
def get_db():
    return g.db


# mongoengine doesn't seem to have any type of clean up code, so we do nothing on close
def close_db(e=None):
    pass


def create_admin():
    try:
        user = Users(name="admin", email=ADMIN_USER['email'], password=ADMIN_USER['password'], access={"admin": True})
        user.save()
        print(f"Added: {user.name} | {user.email} | {user.password} | Admin-{user.access.admin is True} => {user.id}")
    except NotUniqueError:
        print(f'Invalid Entry: {user.email} is already taken.')
    except ValidationError:
        print(f'Validation Error: {user}')


@click.command('init-db')
@with_appcontext
def init_db_command():
    # creates an admin user
    create_admin()


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)