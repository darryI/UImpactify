import json
from mongoengine.errors import DoesNotExist


# converts Document object fields to a jsonifiable dictionary that's
#  safe for client side consumption
def convert_doc(doc, include=None):
    # can throw DoesNotExist if an iddoes not correspond to a document in the database

    # problem: does not convert lists of DBRef
    fields = {field: getattr(doc, str(field)) for field in doc if ((include is None) or (str(field) in include))}
    # serialized the object id into it's string version
    fields['id'] = str(fields['id'])
    return fields

                

# converts QuerySet object containing multiple documents to a list of
# dictionaries safe for client side consumption
def convert_query(queryset, include=None):
    res = []
    for doc in queryset:
        try:
            c = convert_doc(doc, include=include)
            res.append(c)
        except DoesNotExist as e:
            print("some part of this document does not exist:", doc.to_json(), sep='\n')
        except Exception as e:
            print("document can't be parsed")
    return res

    
