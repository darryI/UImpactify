# references:
# https://flask.palletsprojects.com/en/1.1.x/tutorial/database/
# https://flask.palletsprojects.com/en/1.0.x/cli/#custom-commands


import click
from flask import current_app, g
from flask.cli import with_appcontext

from uimpactify.models.users import Users


import mongoengine
from mongoengine import NotUniqueError, ValidationError

def get_db():
    if 'db' not in g:
        g.db = mongoengine.connect(**current_app['MONGODB_SETTINGS'])
    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def create_admin():
  try:
    user = Users(name="admin", email="admin@uimpactify.com", password="password", access={"admin": True})
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