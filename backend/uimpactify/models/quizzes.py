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
from uimpactify.models.courses import Courses

class Options(EmbeddedDocument):
    """
    Custom EmbeddedDocument which represents a answers to a quiz question

    :param option: the actual content of the potential answer
    :param index: the index of the option
    """
    option = StringField(required=True, min_length=1)
    index = StringField(required=True, min_length=1)

class Questions(EmbeddedDocument):
    """
    Custom EmbeddedDocument which represents a quiz question.

    :param question: the actual content of the question
    :param index: the index of the question
    :param options: list of Options (possible answers) for the question
    """
    question = StringField(required=True, min_length=1)
    index = StringField(required=True, min_length=1)
    options = ListField(EmbeddedDocumentField(Options), required=True)

class Quizzes(Document):
    """
    a mongoengine document, which represents a quiz.

    :param name: required name of the quiz
    :param quizQuestions: list of Questions in the quiz
    :param published: boolean stating whether the quiz is public
    :param course: course that the quiz is for
    """
    name = StringField(required=True, min_length=1)
    quizQuestions = ListField(EmbeddedDocumentField(Questions), required=True)
    published = BooleanField(default=False)
    course = ReferenceField('Courses', reverse_delete_rule=CASCADE, required=True)