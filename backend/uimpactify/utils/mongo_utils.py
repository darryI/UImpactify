import json


# converts Document object fields to a jsonifiable dictionary that's
#  safe for client side consumption
def convert_doc(doc, include=None):
    fields = {field: getattr(doc, str(field)) for field in doc if (include is None or str(field) in include)}
    # serialized the object id into it's string version
    fields['id'] = str(fields['id'])
    return fields

# converts QuerySet object containing multiple documents to a list of
# dictionaries safe for client side consumption
def convert_query(queryset, include):
    return [convert_doc(doc, include) for doc in queryset]
