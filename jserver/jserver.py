import subprocess
import bottle
from bottle import run, post, request, response, get, route, static_file

# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@route('/return/<path>', method=['OPTIONS', 'GET'])
@enable_cors
def get_process(path):
    response.headers['Content-type'] = 'application/json'
    if "favicon.ico" in path:
        return static_file("favicon.ico", root=".", mimetype='image/jpg')
    try:
        process = subprocess.run(['python3', 'return.py', path], check=True, stdout=subprocess.PIPE, universal_newlines=True)
        output = process.stdout
    except subprocess.CalledProcessError as e:
        output = e.output
    return output.rstrip()

@route('/return/<path>', method = 'POST')
@enable_cors
def post_process(path):
    response.headers['Content-type'] = 'application/json'
    if "favicon.ico" in path:
        return static_file("favicon.ico", root=".", mimetype='image/jpg')
    try:
        process = subprocess.run(['python3', 'return.py', path], check=True, stdout=subprocess.PIPE, universal_newlines=True)
        output = process.stdout
    except subprocess.CalledProcessError as e:
        output = e.output
    return output.rstrip()

run(host='localhost', port=8080, debug=True)
