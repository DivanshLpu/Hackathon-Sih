from flask import Flask, request, jsonify,render_template
import os
from data import get_env_variable,get_direcory_path


app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Hello from Hackathon-sih!"})


@app.route('/home', methods=['GET'])
def home1():
    context_title = get_env_variable('TITLE')
    return render_template('index.html', Title=context_title)

@app.route('/student',methods=['GET'])
def student():
    return render_template('/student/dashboard.html')

@app.route('/student/profile',methods=['GET'])
def student_profile():
    return render_template('/student/profile.html')


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0' , port=5000)
