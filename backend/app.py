from flask import Flask
from flask_cors import CORS
from db_instance import db

app = Flask(__name__)
CORS(app)
app.config.from_object("config.Config")

db.init_app(app)

# import routes after db is defined
from routes.auth_routes import auth_bp
from routes.txn_routes import txn_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(txn_bp, url_prefix="/transactions")

@app.route("/")
def home():
    return {"message": "PFMS Backend Running"}

if __name__ == "__main__":
    app.run(debug=True)
