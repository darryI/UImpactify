# mongo-engine packages
from mongoengine import Document, StringField, FloatField, IntField, ListField, BooleanField


class Courses(Document):
    """
    a mongoengine document, which represents a course.

    :param name: required name of the course
    :param objective: course objectives
    :param learningOutcomes: course learning outcomes
    :param instructor: required string ID of course instructor
    :param students: required string ID of course instructor
    :param published: required string ID of course instructor
    :param courseContent: required string ID of course instructor

    """

    name = StringField(required=True)
    objective = StringField()
    learningOutcomes = StringField()
    instructor = StringField(required=True)
    students = ListField()
    published = BooleanField()
    courseContent = ListField()