# binary json packages
from bson.objectid import ObjectId
from bson.errors import InvalidId

# flask packages
from flask import Response, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

# error handling stuffs
from mongoengine.errors import NotUniqueError, ValidationError, DoesNotExist
from uimpactify.controller.errors import forbidden

# relevant models
from uimpactify.models.pages import Pages 
from uimpactify.models.courses import Courses
from uimpactify.models.quizzes import Quizzes

# utility functions
from uimpactify.utils.mongo_utils import convert_query, convert_doc, convert_embedded_doc, convert_embedded_query
from uimpactify.controller.errors import unauthorized, bad_request, conflict, not_found
from uimpactify.controller.dont_crash import dont_crash, user_exists


class ViewCountApi(Resource):
    @jwt_required
    @user_exists
    @dont_crash
    def get(self, course_id) -> Response:
        # get the view count for a course page

        # get the instructor for the course
        try:
            inst = Courses.objects.get(id=course_id).instructor
        except DoesNotExist:
            return not_found("could not find the specified course")

        authorized = (str(inst.id) == get_jwt_identity())

        if not authorized:
            return forbidden()
        # get the page with the given name (might not be registered yet)
        try:
            page_name = '~courses~' + course_id
            page = Pages.objects.get(name=page_name)
            output = {'views': page.views}
            return jsonify(output)
        except DoesNotExist:
            return not_found("this page has no views yet")
        
        

class EnrollmentCountApi(Resource):
    @jwt_required
    @user_exists
    @dont_crash
    def get(self, course_id) -> Response:
        # get the number of people enrolled in a course

        # get the instructor for the course
        try:
            course = Courses.objects.get(id=course_id)
            inst = course.instructor
        except DoesNotExist:
            return not_found("could not find the specified course")

        authorized = (str(inst.id) == get_jwt_identity())
        if not authorized:
            return forbidden()
        
        output = {'students': len(course.students)}
        return jsonify(output)
        


class QuizCountApi(Resource):
    @jwt_required
    @user_exists
    @dont_crash
    def get(self, course_id) -> Response:
        # get the number of *published* quizzes in a course

        # get the instructor for the course
        try:
            course = Courses.objects.get(id=course_id)
            inst = course.instructor
        except DoesNotExist:
            return not_found("could not find the specified course")

        authorized = (str(inst.id) == get_jwt_identity())
        if not authorized:
            return forbidden()
        
    
        quizzes = Quizzes.objects(course=course)
        # count the number of published quizzes for this course
        count = 0
        for q in quizzes:
            if q.published:
                count += 1 
        output = {'quizzes': count}
        return jsonify(output)
