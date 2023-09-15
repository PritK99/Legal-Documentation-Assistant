from flask import Flask, request
# import mysql.connector

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'

# db_config = {
#     'host': 'your_mysql_host',
#     'user': 'your_mysql_username',
#     'password': 'your_mysql_password',
#     'database': 'your_database_name',
# }

# conn = mysql.connector.connect(**db_config)

# cursor = conn.cursor()

# routes
@app.route("/api/getServices", methods=["GET"])
def getServices():
    if request.method == 'GET':
        return "Hello world"

if __name__ == '__main__':
    app.run(debug=True)
