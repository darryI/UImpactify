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

# utility functions
from uimpactify.utils.mongo_utils import convert_query, convert_doc, convert_embedded_doc, convert_embedded_query
from uimpactify.controller.errors import unauthorized, bad_request, conflict, not_found
from uimpactify.controller.dont_crash import dont_crash, user_exists


class PageApi(Resource):
    # @dont_crash
    def put(self, page_name) -> Response:
        print(page_name)
        # get the page with the given name (might not be registered yet)
        try:
            page = Pages.objects.get(name=page_name)
            page.update(**{'views': page.views + 1})
        except DoesNotExist:
            page = {
                'name': page_name,
                'views': 1
            }
            page = Pages(**page).save()
        
        output = {'id': str(page.id)}
        return jsonify(output)
    