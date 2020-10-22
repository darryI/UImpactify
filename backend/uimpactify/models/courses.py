# mongo-engine packages
from mongoengine import (Document,
                         EmbeddedDocument,
                         EmbeddedDocumentField,
                         ListField,
                         StringField,
                         EmailField,
                         BooleanField,
                         ReferenceField)

# project resources
from uimpactify.models.users import Users
from uimpactify.models.coursecontent import CourseContent

class Courses(Document):
    """
    a mongoengine document, which represents a course.

    :param name: required name of the course
    :param objective: course objectives
    :param learningOutcomes: course learning outcomes
    :param instructor: list of instructors teaching the course
    :param students: list of students in the course
    :param endorsedBy: list of organizations endorsing the course
    :param trainingFor: list of organizations using the course as training
    :param published: required string ID of course instructor
    :param courseContent: required string ID of course instructor
    """

    name = StringField(required=True)
    objective = StringField()
    learningOutcomes = StringField()
    instructors = ListField(ReferenceField('Users'), required=True)
    students = ListField(ReferenceField('Users'))
    endorsedBy = ListField(ReferenceField('Users'))
    trainingFor = ListField(ReferenceField('Users'))
    published = BooleanField(default=False)
    courseContent = ListField(ReferenceField('CourseContent'))