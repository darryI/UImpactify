import json


# converts Document object fields to a jsonifiable dictionary that's
#  safe for client side consumption
def convert_doc(doc):
    fields = {field: getattr(doc, str(field)) for field in doc}
    # serialized the object id into it's string version
    fields['id'] = str(fields['id'])
    return fields

# converts QuerySet object containing multiple documents to a list of
# dictionaries safe for client side consumption
def convert_query(queryset):
    return [convert_doc(doc) for doc in queryset]
