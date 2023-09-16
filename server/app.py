from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb

app = Flask(__name__)
db = MySQLdb.Connect(host="containers-us-west-78.railway.app", port=5480, user="root", passwd="F09DY9R7wJEsodY9LB1B", db="railway")

# Get all the services
@app.route('/api/services', methods = ["GET"])
def services():
    cur = db.cursor()
    cur.execute('SELECT * FROM services')
    row_headers=[x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    cur.close()
    return jsonify(json_data)

# Get forms of a particular service
@app.route('/api/forms', methods = ["GET"])
def get_forms():
    Service = request.json['service_name']
    print(Service)
    cur = db.cursor()
    cur.execute("SELECT * FROM forms WHERE service_id IN (SELECT service_id FROM services WHERE service_name = %s);", [Service])
    row_headers=[x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    cur.close()
    return jsonify(json_data)

# Get all queries for a form    
@app.route('/api/form-details', methods = ["GET"])
def get_form_details():
    form_name = request.json['form_name']
    cur = db.cursor()
    cur.execute("SELECT * FROM input_ques WHERE q_id IN (SELECT q_id FROM form_queries WHERE form_id = (select form_id from forms where form_name = %s));", [form_name])
    row_headers=[x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    cur.close()
    return jsonify(json_data)



if __name__ == '__main__':
    app.run(debug=True)
