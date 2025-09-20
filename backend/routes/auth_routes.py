from flask import Blueprint, request, jsonify
from db_instance import db    # <- import db from separate module
from models import User
from flask_bcrypt import Bcrypt

auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data["email"]
    name = data["name"]
    password = data["password"]

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, name=name, password_hash=hashed)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201
