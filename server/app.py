from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS to allow requests from React frontend
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

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
    Service = request.args.get('service_id')                # Send json object {"service_id": "..."}
    print(type(Service))
    print(Service)
    cur = db.cursor()
    cur.execute("SELECT services.service_id, services.service_name, forms.form_id, forms.form_name, forms.form_link FROM services INNER JOIN forms ON services.service_id = forms.service_id WHERE forms.service_id = %s;", [Service])
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
    form_id = request.json['form_id']                   # Send json object {"form_id":"..."}
    print(form_id);
    cur = db.cursor()
    cur.execute("SELECT * FROM input_ques WHERE ques_id IN (SELECT form_query_id FROM form_queries WHERE form_id = %s);", [form_id])
    row_headers=[x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    cur.close()
    return jsonify(json_data)

# Return the final doc
@app.route('/api/final-form', methods = ["POST"])
def final_form():
    form_details = request.json                         # Under Progress 
    form_id = form_details["form_id"]
    print(type(form_details))
    cur = db.cursor()
    cur.execute("SELECT form_link FROM forms where form_id = %s;", [form_id])
    row_headers=[x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    cur.close()
    return jsonify(json_data);

if __name__ == '__main__':
    app.run(debug=True)
