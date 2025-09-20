from flask import Blueprint, request, jsonify
from db_instance import db
from models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    # ... your existing register code ...
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    new_user = User(email=email, name=name)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user_id": new_user.id}), 201

# --- MAKE SURE THIS ENTIRE FUNCTION EXISTS ---
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({
            "message": "Login successful",
            "user_id": user.id
        }), 200

    return jsonify({"error": "Invalid email or password"}), 401