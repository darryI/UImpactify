# flask packages
from flask_restful import Api

# project resources
from uimpactify.controller.authentication import *
from uimpactify.controller.user import *
from uimpactify.controller.course import *
from uimpactify.controller.feedback import *

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
    api.add_resource(UserApi, '/user/<user_id>/')
    api.add_resource(SelfDeleteApi, '/user/delete-self/')
    api.add_resource(SignedInUserApi, '/user/self/')

    api.add_resource(CoursesApi, '/course/')
    api.add_resource(CourseApi, '/course/<course_id>/')

    api.add_resource(CourseByInstructorApi, '/course/instructor/')

    api.add_resource(CourseEnrollmentApi, '/course/enroll/')

    api.add_resource(CourseDisenrollmentApi, '/course/disenroll/<course_id>/')

    api.add_resource(CoursesWithStudentApi, '/course/student/')

    api.add_resource(PublishedCoursesApi, '/course/published/')
    api.add_resource(PublishedCourseApi, '/course/published/<course_id>/')

    api.add_resource(CourseEndorsementApi, '/course/endorse/')
    api.add_resource(CourseEndorsedByApi, '/course/endorsedBy/<course_id>/')

    api.add_resource(FeedbackByCourseApi, '/feedback/<course_id>/')
    api.add_resource(FeedbackForCourseApi, '/feedback/')
