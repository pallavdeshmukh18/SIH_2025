from flask import Flask, request, jsonify, session
from flask_cors import CORS
import psycopg2
import bcrypt
import random
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)
app.secret_key = "supersecretkey"  # Needed for OTP session storage

# Connect to your database
conn = psycopg2.connect(
    host="192.168.1.40",
    database="sih_db",
    user="postgres",
    password="SIHACKATHON"
)

# LOGIN ROUTE (unchanged)


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


# ------------------ PASSWORD RESET CHANGES START ------------------

# Map role to the email where OTP should be sent
OTP_EMAILS = {
    "student": "pallav.deshmukh24@gmail.com",
    "teacher": "hrishikesh.dhume24@spit.ac.in",
    "admin": "anmol.katiyar24@spit.ac.in"
}

# Function to send OTP


def send_otp(user_role):
    otp = str(random.randint(100000, 999999))  # 6-digit OTP
    target_email = OTP_EMAILS.get(user_role)

    msg = MIMEText(f"Your password reset OTP is: {otp}")
    msg['Subject'] = 'Password Reset OTP'
    msg['From'] = 'yourapp@example.com'  # Replace with your app email
    msg['To'] = target_email

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        # Use App Password
        server.login('yourapp@example.com', 'your_app_password')
        server.sendmail(msg['From'], [msg['To']], msg.as_string())

    return otp

# Route to request password reset


@app.route("/request-reset", methods=["POST"])
def request_reset():
    data = request.json
    email = data.get("email")
    role = data.get("type")

    table_map = {
        "student": "students",
        "teacher": "teachers",
        "admin": "admins"
    }
    table = table_map.get(role)
    if not table:
        return jsonify({"status": "fail", "message": "Invalid role"}), 400

    try:
        with conn.cursor() as cur:
            cur.execute(f"SELECT name FROM {table} WHERE email = %s", (email,))
            result = cur.fetchone()
    except Exception as e:
        return jsonify({"status": "fail", "message": str(e)}), 500

    if not result:
        return jsonify({"status": "fail", "message": "Email not found"}), 404

    # Send OTP to mapped email
    otp = send_otp(role)

    # Store OTP in session
    session['reset_otp'] = otp
    session['reset_email'] = email
    session['reset_role'] = role

    return jsonify({"status": "success", "message": f"OTP sent to {OTP_EMAILS[role]}"}), 200

# Route to verify OTP and change password


@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    entered_otp = data.get("otp")
    new_password = data.get("new_password")

    if entered_otp != session.get('reset_otp'):
        return jsonify({"status": "fail", "message": "Invalid OTP"}), 400

    hashed_pw = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    email = session.get('reset_email')
    role = session.get('reset_role')

    table_map = {
        "student": "students",
        "teacher": "teachers",
        "admin": "admins"
    }
    table = table_map.get(role)

    try:
        with conn.cursor() as cur:
            cur.execute(
                f"UPDATE {table} SET password=%s WHERE email=%s", (hashed_pw, email))
            conn.commit()
    except Exception as e:
        return jsonify({"status": "fail", "message": str(e)}), 500

    # Clear session
    session.pop('reset_otp', None)
    session.pop('reset_email', None)
    session.pop('reset_role', None)

    return jsonify({"status": "success", "message": "Password updated successfully"}), 200

# ------------------ PASSWORD RESET CHANGES END ------------------


# ------------------ NEW ROUTE: ADMIN STUDENT REGISTRATION ------------------

@app.route("/api/admin/student-registration", methods=["POST"])
def register_student():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Validate required fields
    if not (name and email and password):
        return jsonify({"status": "fail", "message": "Name, email, and password are required"}), 400

    # Hash the password
    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    try:
        with conn.cursor() as cur:
            # Insert only required fields; other columns are nullable
            cur.execute(
                "INSERT INTO students (name, email, password) VALUES (%s, %s, %s)",
                (name, email, hashed_pw)
            )
            conn.commit()
        return jsonify({"status": "success", "message": "Student registered successfully"}), 201

    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        return jsonify({"status": "fail", "message": "Email already exists"}), 409

    except Exception as e:
        conn.rollback()
        return jsonify({"status": "fail", "message": str(e)}), 500


@app.route("/api/admin/teacher-registration", methods=["POST"])
def register_teacher():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Validate required fields
    if not (name and email and password):
        return jsonify({"status": "fail", "message": "Name, email, and password are required"}), 400

    # Hash the password
    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO teachers (name, email, password) VALUES (%s, %s, %s)",
                (name, email, hashed_pw)
            )
            conn.commit()
        return jsonify({"status": "success", "message": "Teacher registered successfully"}), 201

    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        return jsonify({"status": "fail", "message": "Email already exists"}), 409

    except Exception as e:
        conn.rollback()
        return jsonify({"status": "fail", "message": str(e)}), 500

# ------------------------------------------------------------------------------
#  - -  -     -  - ###STUDENT INFO#----------------------------
@app.route("/api/admin/students", methods=["GET"])
def get_students():
    try:
        # (Optional) - check admin authentication here later
        with conn.cursor() as cur:
            cur.execute("SELECT  name, email FROM students ORDER BY id ASC;")
            rows = cur.fetchall()

        students = [
            { "username": row[0], "email": row[1]}
            for row in rows
        ]

        return jsonify({"students": students}), 200

    except Exception as e:
        print("Error fetching students:", e)
        return jsonify({"message": "Failed to fetch students."}), 500

# ------------------------------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)
