import psycopg2
import psycopg2.extras
import json

with open('database/credentials.json') as f:
    credentials = json.load(f)

connection = psycopg2.connect(
    host='{}'.format(credentials['host']),
    database= credentials['database'],
    user=credentials['username'],
    password=credentials['password'])

def select(query):
    cursor = connection.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    cursor.execute(query)
    return cursor.fetchall()

def affect_row(query):
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    return cursor.rowcount