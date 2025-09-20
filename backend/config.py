class Config:
    SECRET_KEY = "supersecretkey"  # change in production
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:ansh1234@localhost/pfms" #add password here for SQL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
