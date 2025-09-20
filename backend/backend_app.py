from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import bcrypt

app = Flask(__name__)
CORS(app)

# Function to create a fresh DB connection per request


def get_connection():
    return psycopg2.connect(
        host="192.168.1.40",  # replace with your friend's server IP or hostname
        database="sih_db",
        user="postgres",
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
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute(
                f"SELECT password, name FROM {table} WHERE email = %s", (email,))
            result = cur.fetchone()
        conn.close()
    except Exception as e:
        # If query fails, return error
        return jsonify({"status": "fail", "message": str(e)}), 500

    if not result:
        return jsonify({"status": "fail", "message": "Email not found"}), 404

    hashed_password, name = result

    # Ensure hashed_password is bytes
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode()

    # Check password with bcrypt
    if bcrypt.checkpw(password.encode(), hashed_password):
        return jsonify({"status": "success", "name": name})
    else:
        return jsonify({"status": "fail", "message": "Wrong password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
