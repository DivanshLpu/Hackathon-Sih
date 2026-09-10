from flask import Flask, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

# Helper function to prompt for credentials
def authenticate_prompt():
    return Response(
        'Could not verify your access level for that URL.\n'
        'You have to login with proper credentials', 401,
        {'WWW-Authenticate': 'Basic realm="Login Required"'}
    )

# Registration API (Open to anyone)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() or request.form
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Protected Dashboard Route using Basic Auth
@app.route('/dashboard', methods=['GET'])
def dashboard():
    auth = request.authorization

    # Check if credentials exist and are correct
    if not auth or not auth.username or not auth.password:
        return authenticate_prompt()

    user = User.query.filter_by(username=auth.username).first()
    if not user or not check_password_hash(user.password_hash, auth.password):
        return authenticate_prompt()

    return jsonify({"message": f"Welcome to the secret dashboard, {user.username}!"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
