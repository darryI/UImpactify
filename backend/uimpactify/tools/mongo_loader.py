# mongo-engine packages
import mongoengine

# project resources
from flask import current_app

# external packages
from types import FunctionType

# create mongo decorator --> DESIGN PATTERN
def mongo(function: FunctionType) -> FunctionType:
    """
    Decorator method for running mongoengine before function execution.

    :param function: Function to run after execution.
    :return: wrapper function
    """
    def load():
        mongoengine.connect(**current_app['MONGODB_SETTINGS'])
        function()
        mongoengine.close()
    return load
