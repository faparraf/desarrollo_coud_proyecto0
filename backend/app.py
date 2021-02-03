import flask
from flask import request, jsonify
from flask.json import JSONEncoder
import csv
from datetime import time
from flask_cors import CORS
from database import queries, postgresConnection
from psycopg2.errors import UniqueViolation

# Codificador JSON custom para fechas y tiempo
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        try:
            if isinstance(obj, time):
                return obj.isoformat()
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)

# Creación de aplicación y parámetros
app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.json_encoder = CustomJSONEncoder
CORS(app, resources={"*": {"origins": "*"}})

# Ruta base
@app.route('/', methods=['GET'])
def home():
    return '''<h1>Desarrollo de aplicaciones cloud</h1><br></h2>Backend</h2>'''

# Ruta base
@app.route('/login', methods=['POST'])
def login():
    body = request.json
    try:
        result = postgresConnection.select(
            queries.login_comparation.format(
                body['username'], 
                body['password']
            )
        )
        if len(result) == 1:
            resp = jsonify({'success':True, 'message':'Acceso correcto'})
            resp.status_code = 200
        else:
            resp = jsonify({'success':False, 'message':'El usuario o la contraseña son incorrectos'})
            resp.status_code = 404
    except Exception as e:
        print(e)
        resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
        resp.status_code = 400
    return resp

# Ruta base
@app.route('/signin', methods=['POST'])
def signin():
    body = request.json
    try:
        postgresConnection.affect_row(
            queries.insert_user_query.format(
                body['username'], 
                body['password']
            )
        )
        resp = jsonify({'success':True, 'message':'Acceso correcto'})
        resp.status_code = 200
    except UniqueViolation:
        resp = jsonify({'success':False, 'message':'El usuario ya existe'})
        resp.status_code = 400
    except Exception:
        resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
        resp.status_code = 400
    return resp

@app.route('/eventos', methods=['POST'])
def get_multiple_evento():
    body = request.json
    try:
        result = postgresConnection.select(queries.all_eventos_query.format(body['username']))
        resp = jsonify({'success':True, 'result':result})
        resp.status_code = 200
    except Exception as e:
        print(e)
        resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
        resp.status_code = 400
    return resp

@app.route('/evento', methods=['POST'])
def post_evento():
    body = request.json
    username = request.headers.get('Authorization')
    try:
        if body['type_event'] not in ['Conferencia', 'Seminario', 'Congreso', 'Curso']:
            resp = jsonify(message='Tipo de evento incorrecto')
            resp.status_code = 400
            return resp
        rows = postgresConnection.affect_row(queries.insert_event_query.format(username, body['date_event'], body['name_event'], body['type_event']))
        if rows > 0:
            resp = jsonify({'success':True, 'message':'Creado correctamente'})
            resp.status_code = 200
        else:
            resp = jsonify({'success':False, 'message':'No ha habido efecto'})
            resp.status_code = 400
    except Exception as e:
        print(e)
        resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
        resp.status_code = 400
    return resp

@app.route('/evento/<string:evento_id>', methods=['GET'])
def get_evento(evento_id):
    username = request.headers.get('Authorization')
    try:
        result = postgresConnection.select(queries.get_evento_query.format(username, evento_id))
        if len(result) == 1:
            resp = jsonify({'success':True, 'result':result[0]})
            resp.status_code = 200
        elif len(result) == 0:
            resp = jsonify({'success':False, 'message':'No encontrado'})
            resp.status_code = 404
        else:
            resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
            resp.status_code = 400
    except Exception as e:
        print(e)
        resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
        resp.status_code = 400
    return resp

@app.route('/evento/<string:evento_id>', methods=['PUT'])
def put_evento(evento_id):
    username = request.headers.get('Authorization')
    body = request.json
    try:
        if body['type_event'] not in ['Conferencia', 'Seminario', 'Congreso', 'Curso']:
            resp = jsonify(message='Tipo de evento incorrecto')
            resp.status_code = 400
            return resp
        rows = postgresConnection.affect_row(queries.update_event_query.format(body['date_event'], body['name_event'], body['type_event'], username, evento_id))
        if rows > 0:
            resp = jsonify({'success':True, 'message':'Actualizado correctamente'})
            resp.status_code = 200
        else:
            resp = jsonify({'success':False, 'message':'No ha habido efecto'})
            resp.status_code = 400
    except Exception as e:
        print(e)
        resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
        resp.status_code = 400
    return resp

@app.route('/evento/<string:evento_id>', methods=['DELETE'])
def delete_evento(evento_id):
    username = request.headers.get('Authorization')
    try:
        rows = postgresConnection.affect_row(queries.delete_event_query.format(username, evento_id))
        if rows > 0:
            resp = jsonify({'success':True, 'message':'Eliminado correctamente'})
            resp.status_code = 200
        else:
            resp = jsonify({'success':False, 'message':'No ha habido efecto'})
            resp.status_code = 400
    except Exception:
        resp = jsonify({'success':False, 'message':'Un error ha ocurrido'})
        resp.status_code = 400
    return resp

# Inicio de aplicación, cambiar puerto según necesidad
app.run(host='0.0.0.0', port=8050)