from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import bcrypt

app = Flask(__name__)
CORS(app)

# Connect to your database
conn = psycopg2.connect(
    host="localhost",
    database="sih_db",
    user="pallav",
    password="SIHACKATHON"
)


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    role = data.get("type")

    # Map role to table
    table_map = {
        "student": "students",
        "teacher": "teachers",
        "admin": "admins"
    }

    table = table_map.get(role)
    if not table:
        return jsonify({"status": "fail", "message": "Invalid role"}), 400

    try:
        # Use a fresh cursor for each request
        with conn.cursor() as cur:
            cur.execute(
                f"SELECT password, name FROM {table} WHERE email = %s", (email,))
            result = cur.fetchone()
    except Exception as e:
        # Catch DB errors
        return jsonify({"status": "fail", "message": str(e)}), 500

    if not result:
        return jsonify({"status": "fail", "message": "Email not found"}), 404

    hashed_password, name = result

    # Check bcrypt password
    if bcrypt.checkpw(password.encode(), hashed_password.encode()):
        return jsonify({"status": "success", "name": name})
    else:
        return jsonify({"status": "fail", "message": "Wrong password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
