from bottle import route, run, get, template, static_file
from pprint import pprint
import json


@get('/<filename:re:.*\.css>')
def stylesheets(filename):
    return static_file(filename, root='.')

@get('/<filename:re:.*\.js>')
def scripts(filename):
    return static_file(filename, root='.')
    
@route('/')
def home():
    #Load our JSON file
    with open('data.json') as data_file:    
        data = json.load(data_file)
        data = json.dumps(data)
    pprint(data)
    return template("index", data=data)

run(host='localhost', port=8080)


def data():
    return 