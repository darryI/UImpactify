# mongo-engine packages
from mongoengine import Document, StringField, FloatField, IntField, ListField, BooleanField


class Courses(Document):
    """
    a mongoengine document, which represents a course.

    """

    name = StringField(required=True)
    objective = StringField()
    learningOutcomes = StringField()
    instructor = IntField(required=True)
    students = ListField()
    published = BooleanField()
    courseContent = ListField()
    courseId = StringField(required=True, unique=True)