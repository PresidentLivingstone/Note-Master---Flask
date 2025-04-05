from flask import Flask
from db import db

app = Flask(__name__)
db.init_app(app)  # ✅ Only used here when db was initialized without app earlier
