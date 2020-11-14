# packages
from bson.objectid import ObjectId
from bson.errors import InvalidId

# flask packages
from flask import Response, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from mongoengine.errors import NotUniqueError, ValidationError, DoesNotExist

# project resources
from uimpactify.models.courses import Courses
from uimpactify.models.quizzes import Quizzes
from uimpactify.models.users import Users

from uimpactify.utils.mongo_utils import convert_query, convert_doc, convert_embedded_doc, convert_embedded_query
from uimpactify.controller.errors import unauthorized, bad_request, conflict, not_found, forbidden
from uimpactify.controller.dont_crash import dont_crash, user_exists

class QuizzesApi (Resource):
    """
    Flask-resftul resource for returning db.quiz collection.

    """
    @jwt_required
    @user_exists
    @dont_crash
    def post(self) -> Response:
        """
        POST response method for creating a quiz.
        JSON Web Token is required.
        Authorization is required: role must be instructor
        """
        authorized: bool = Users.objects.get(id=get_jwt_identity()).roles.instructor
        if authorized:
            data = request.get_json()
            # make sure the course instructor can only add to his own courses
            # course_id = data['courseId']
            #  = Courses.objects.get(id=course_id)
            try:
                quiz = Quizzes(**data).save()
            except ValidationError as e:
                return bad_request(e.to_dict())
            output = {'id': str(quiz.id)}
            return jsonify(output)
        else:
            return forbidden()

    @jwt_required
    @user_exists
    @dont_crash
    def get(self) -> Response:
        """
        GET response method for all documents in quiz collection.
        JSON Web Token is required.
        """
        authorized: bool = Users.objects.get(id=get_jwt_identity()).roles.admin
        if authorized:
            query = Quizzes.objects()
            fields = {
                'id',
                'name',
                'published',
            }
            # course id?
            response = convert_query(query, include=fields)
            return jsonify(response)
        else:
            return forbidden()


class QuizApi(Resource):
    """
    Flask-resftul resource for returning db.quiz collection.

    """
    @jwt_required
    @user_exists
    @dont_crash
    def get(self, quiz_id: str) -> Response:
        """
        GET response method for single document in Quizzes collection.

        :return: JSON object
        """
        quiz = Quizzes.objects.get(id=quiz_id)
        fields = {
            'id',
            'name',
            'published',
        }
        return jsonify(convert_doc(quiz, include=fields))

    @jwt_required
    @user_exists
    @dont_crash
    def put(self, quiz_id: str) -> Response:
        """
        PUT response method for updating a quiz.
        JSON Web Token is required.
        """
        data = request.get_json()
        try:
            res = Quizzes.objects.get(id=quiz_id).update(**data)
        except ValidationError as e:
            return bad_request(e.message)
        return jsonify(res)

    @jwt_required
    @user_exists
    @dont_crash
    def delete(self, quiz_id: str) -> Response:
        """
        DELETE response method for deleting single quiz.
        JSON Web Token is required.
        Authorization is required: Access(admin=true)

        """
        authorized: bool = Users.objects.get(id=get_jwt_identity()).roles.admin

        if authorized:
            output = Courses.objects(id=quiz_id).delete()
            return jsonify(output)
        else:
            return forbidden()
