from uimpactify.controller.errors import bad_request

def dont_crash(function):
    def d_c(*args, **kwargs):
        try:
            res = function(*args, **kwargs)
            return res
        except Exception as e:
            return bad_request()

    return d_c    

