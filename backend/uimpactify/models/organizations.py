# mongo-engine packages
from mongoengine import (Document,
                         EmbeddedDocument,
                         EmbeddedDocumentField,
                         ListField,
                         StringField,
                         EmailField,
                         BooleanField,
                         ReferenceField)


class Organizations(Document):
    """
    Template for a mongoengine document, which represents an organization.

    :param userId: the mongodb ObjectId of the related user
    """
    
    userId = StringField(required=True, unique=True)
    endorsedCourses = ListField()
    trainingCourses = ListField()
    volunteerOpportunities = ListField()
    jobOpportunities = ListField()

