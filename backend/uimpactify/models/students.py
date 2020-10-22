# mongo-engine packages
from mongoengine import (Document,
                         EmbeddedDocument,
                         EmbeddedDocumentField,
                         ListField,
                         StringField,
                         EmailField,
                         BooleanField,
                         ReferenceField)


class Students(Document):
    """
    Template for a mongoengine document, which represents a student.

    :param userId: the mongodb ObjectId of the related user
    """
    
    userId = StringField(required=True, unique=True)
    courses = ListField()
