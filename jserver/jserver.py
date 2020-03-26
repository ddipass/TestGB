import os
import json
import base64
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
        # set options
        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@route('/return/<path>', method=['OPTIONS', 'GET', 'POST'])
@enable_cors
def return_process(path):
    response.headers['Content-type'] = 'application/json'
    if "favicon.ico" in path:
        return static_file("favicon.ico", root=".", mimetype='image/jpg')
    if ".jpg" in path:
        scripts = static_file("img/" + path, root=".", mimetype='image/jpg')
        return scripts
    try:
        process = subprocess.run(['python3', 'return.py', path], check=True, stdout=subprocess.PIPE, universal_newlines=True)
        output = process.stdout
    except subprocess.CalledProcessError as e:
        output = e.output
    return output.rstrip()

@route('/stream/<path>', method=['POST'])
@enable_cors
def stream_process(path):
    # Read Innput to JSON 
    injson = request.body.readlines()
    print(injson)
    para = json.loads(injson[0])
    output = []
    # Render Results
    if path == "json": 
        if para['type'] == "single": 
            if os.path.isdir(para['directory']):
                return static_file(para['directory'] + "/" + para['render'], root=".", mimetype='image/jpg')
            else:
                return 'Nothing Here, Sorry!'
        else:
            if os.path.isdir(para['directory']):
                paths = os.listdir(para['directory'])
                for i, item in enumerate(paths):
                    # 跳过一些不用的文件
                    if 'DS_Store' in item:
                        continue
                    # 跳过一些不用的文件夹
                    if os.path.isdir(para['directory'] + "/" + item):
                        continue
                    # 输出文件基本信息
                    # with open(para['directory'] + "/" + item, "rb") as imageFile:
                    #    strFile = base64.b64encode(imageFile.read())
                    output.append({ "file": para['directory'].replace("/", "-*-") + "-*-" + item })
                return json.dumps(output)
            else:
                return 'Nothing Here, Sorry!'
    else:
        return 'Nothing Here, Sorry!'

@route('/stream/<path>', method=['GET'])
@enable_cors
def stream_process(path):
    # Render Results
    re_data = path.replace("-*-", "/")
    return static_file(re_data, root=".", mimetype='image/jpg')

run(host='localhost', port=8080, debug=True)
