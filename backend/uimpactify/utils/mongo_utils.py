import json
from mongoengine.errors import DoesNotExist


# converts Document object fields to a jsonifiable dictionary that's
#  safe for client side consumption
def convert_doc(doc, include=None, save_as=None):
    # can throw DoesNotExist if an iddoes not correspond to a document in the database

    # problem: does not convert lists of DBRef
    # rename fields as requested
    if save_as:
        fields = {save_as[field]: getattr(doc, str(field)) for field in doc if ((include is None) or (str(field) in include))}
    else:
        fields = {field: getattr(doc, str(field)) for field in doc if ((include is None) or (str(field) in include))}
        fields['id'] = str(fields['id'])
    # serialized the object id into it's string version
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


# gets data from the specified embedded documents so that embedded documents
# can be safely consumed on the client side
def get_embedded_attr(doc, embedded, save_as):
    result = {}
    for key in embedded:
        fields = convert_doc(getattr(doc, key), embedded[key], save_as[key])
        result.update(fields)
    return result


# converts QuerySet object containing multiple documents with embedded document objects
# to a list of dictionaries safe for client side consumption
# embedded is a dictionary of {embedded doc name: desired embedded doc fields}
# save_as is a dictionary of {embedded doc name: {desired embedded doc fields: new name for field}}
def convert_embedded_query(queryset, non_embedded, embedded, save_as):
    res = []
    for doc in queryset:
        try:
            c = convert_doc(doc, include=non_embedded)
            embedded_objs = get_embedded_attr(doc, embedded, save_as)
            c.update(embedded_objs)
            res.append(c)
        except DoesNotExist as e:
            print("some part of this document does not exist:", doc.to_json(), sep='\n')
        except Exception as e:
            print("document can't be parsed")
    return res
