# mongo-engine packages
from mongoengine import (Document,
                         EmbeddedDocument,
                         EmbeddedDocumentField,
                         ListField,
                         StringField,
                         EmailField,
                         BooleanField,
                         ReferenceField,
                         CASCADE,
                         PULL)

# project resources
from uimpactify.models.users import Users
from uimpactify.models.courses import Courses

class Opportunity(Document):
    """
    Template for a mongoengine document, which represents opportunities for a user by an organization.

    :param isPaid: Whether the job is paid
    :param description: The description of the job
    :param organizationName: The name of the organization providing the job
    :param isPublished: Whether the job is published
    """
    isPaid = BooleanField(required=True)
    description = StringField(required=True)
    organizationName = StringField(required=True)
    isPublished = BooleanField(required=True)
    organization = ReferenceField('Users', reverse_delete_rule=CASCADE, required=True)