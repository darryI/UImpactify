# flask packages
from flask_restful import Api

# project resources
from uimpactify.controller.authentication import SignUpApi, LoginApi
from uimpactify.controller.user import UsersApi, UserApi
from uimpactify.controller.meal import MealsApi, MealApi
from uimpactify.controller.course import CoursesApi, CourseApi


def create_routes(api: Api):
    """Adds resources to the api.

    :param api: Flask-RESTful Api Object

    :Example:

        api.add_resource(HelloWorld, '/', '/hello')
        api.add_resource(Foo, '/foo', endpoint="foo")
        api.add_resource(FooSpecial, '/special/foo', endpoint="foo")

    """
    api.add_resource(SignUpApi, '/authentication/signup/')
    api.add_resource(LoginApi, '/authentication/login/')

    api.add_resource(UsersApi, '/user/')
    api.add_resource(UserApi, '/user/<user_id>')

    api.add_resource(MealsApi, '/meal/')
    api.add_resource(MealApi, '/meal/<meal_id>')

    api.add_resource(CoursesApi, '/course/')
    api.add_resource(CourseApi, '/course/<course_id>')
