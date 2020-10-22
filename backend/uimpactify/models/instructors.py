# mongo-engine packages
from mongoengine import (Document,
                         EmbeddedDocument,
                         EmbeddedDocumentField,
                         ListField,
                         StringField,
                         EmailField,
                         BooleanField,
                         ReferenceField)


class Instructors(Document):
    """
    Template for a mongoengine document, which represents an instructor.

    :param userId: the mongodb ObjectId of the related user
    """
    
    userId = StringField(required=True, unique=True)
    taughtCourses = ListField()
