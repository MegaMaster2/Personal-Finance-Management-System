from flask import Flask
from flask_cors import CORS # <-- Make sure this import is here
from db_instance import db, bcrypt

app = Flask(__name__)
CORS(app) # <-- Make sure this line is here, right after creating the app
app.config.from_object("config.Config")

db.init_app(app)
bcrypt.init_app(app)

# --- The rest of your app.py file...
from routes.auth_routes import auth_bp
from routes.txn_routes import txn_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(txn_bp, url_prefix="/transactions")

@app.cli.command("init-db")
def init_db_command():
    """Creates the database tables."""
    with app.app_context():
        db.create_all()
    print("Initialized the database.")

if __name__ == "__main__":
    app.run(debug=True)