# flask packages
from flask import Response, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

# project resources
from uimpactify.models.courses import Courses
from uimpactify.controller.errors import forbidden

from uimpactify.models.users import Users


class CoursesApi(Resource):
    """
    Flask-resftul resource for returning db.course collection.

    """
    @jwt_required
    def get(self) -> Response:
        """
        GET response method for all documents in course collection.
        JSON Web Token is required.

        """
        authorized: bool = Users.objects.get(id=get_jwt_identity()).access.admin

        if authorized:
            data = request.get_json()
            post_user = Courses(**data).save()
            output = {'id': str(post_user.id)}
            return jsonify(output)
        else:
            return forbidden()

    @jwt_required
    def post(self) -> Response:
        """
        POST response method for creating a course.
        JSON Web Token is required.
        Authorization is required: Access(admin=true)

        """
        authorized: bool = Users.objects.get(id=get_jwt_identity()).access.admin

        if authorized:
            data = request.get_json()
            post_user = Courses(**data).save()
            output = {'id': str(post_user.id)}
            return jsonify(output)
        else:
            return forbidden()


class CourseApi(Resource):
    """
    Flask-resftul resource for returning db.course collection.

    """
    @jwt_required
    def get(self, course_id: str) -> Response:
        """
        GET response method for single documents in meal collection.

        :return: JSON object
        """
        output = Courses.objects.get(courseId=course_id)
        return jsonify(output)

    @jwt_required
    def put(self, course_id: str) -> Response:
        """
        PUT response method for updating a course.
        JSON Web Token is required.
        Authorization is required: Access(admin=true)

        """
        data = request.get_json()
        put_user = Courses.objects(courseId=course_id).update(**data)
        return jsonify(put_user)

    @jwt_required
    def delete(self, course_id: str) -> Response:
        """
        DELETE response method for deleting single course.
        JSON Web Token is required.
        Authorization is required: Access(admin=true)

        """
        authorized: bool = Users.objects.get(id=get_jwt_identity()).access.admin

        if authorized:
            output = Courses.objects(courseId=course_id).delete()
            return jsonify(output)
        else:
            return forbidden()