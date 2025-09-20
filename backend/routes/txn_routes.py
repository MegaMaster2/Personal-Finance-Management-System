from flask import Blueprint, request, jsonify
from db_instance import db
from models import Transaction
from datetime import datetime

txn_bp = Blueprint("transactions", __name__)

@txn_bp.route("/", methods=["POST"])
def add_transaction():
    data = request.get_json()
    txn = Transaction(
        user_id=data["user_id"],
        category=data["category"],
        amount=data["amount"],
        txn_date=datetime.strptime(data["txn_date"], "%Y-%m-%d"),
        note=data.get("note", "")
    )
    db.session.add(txn)
    db.session.commit()
    return jsonify({"message": "Transaction added"}), 201

@txn_bp.route("/<int:user_id>", methods=["GET"])
def get_transactions(user_id):
    txns = Transaction.query.filter_by(user_id=user_id).all()
    return jsonify([
        {"id": t.id, "category": t.category, "amount": t.amount, "date": str(t.txn_date), "note": t.note}
        for t in txns
    ])
