# mongo-engine packages
from mongoengine import (Document,
                         EmbeddedDocument,
                         EmbeddedDocumentField,
                         ListField,
                         StringField,
                         EmailField,
                         BooleanField,
                         ReferenceField)

class CourseContent(Document):
    """
    Template for a mongoengine document, which represents a user.
    Password is automatically hashed before saving.

    :param name: required course content name

    .. seealso:: :class:`Roles`, :class:`Phone`
    """

    name = StringField(required=True)