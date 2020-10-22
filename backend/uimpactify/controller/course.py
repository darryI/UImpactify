# flask packages
from flask import Response, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity


# project resources
from uimpactify.models.courses import Courses
from uimpactify.controller.errors import forbidden

from uimpactify.models.users import Users

from uimpactify.utils.mongo_utils import convert_query, convert_doc


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
        authorized: bool = True #Users.objects.get(id=get_jwt_identity()).access.admin

        if authorized:
            query = Courses.objects()
            return jsonify(convert_query(query))
        else:
            return forbidden()

    @jwt_required
    def post(self) -> Response:
        """
        POST response method for creating a course.
        JSON Web Token is required.
        Authorization is required: Access(admin=true)

        """
        authorized: bool = True #Users.objects.get(id=get_jwt_identity()).access.admin

        if authorized:
            data = request.get_json()
            # get the instructor id based off of jwt token identity
            data['instructor'] = get_jwt_identity()
            course = Courses(**data).save()
            output = {'id': str(course.id)}
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
        GET response method for single documents in course collection.

        :return: JSON object
        """

        course = Courses.objects.get(id=course_id)
        
        return jsonify(convert_doc(course))


    @jwt_required
    def put(self, course_id: str) -> Response:
        """
        PUT response method for updating a course.
        JSON Web Token is required.
        Authorization is required: Access(admin=true)

        """
        data = request.get_json()

        res = Courses.objects.get(id=course_id).update(**data)
        return jsonify(res)


    @jwt_required
    def delete(self, course_id: str) -> Response:
        """
        DELETE response method for deleting single course.
        JSON Web Token is required.
        Authorization is required: Access(admin=true)

        """
        authorized: bool = True #Users.objects.get(id=get_jwt_identity()).access.admin

        if authorized:
            output = Courses.objects(id=course_id).delete()
            return jsonify(output)
        else:
            return forbidden()


class CourseByInstructorApi(Resource):
    """
    Flask-resftul resource for returning courses with the same instructor id.

    """
    @jwt_required
    def get(self) -> Response:
        """
        GET response method for single documents in course collection.

        :return: JSON object
        """
        query = Courses.objects(instructor=get_jwt_identity())
        return jsonify(convert_query(query))