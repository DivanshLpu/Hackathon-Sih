from flask import Flask, request, jsonify,render_template
import os
from data import get_env_variable,get_direcory_path

context_title = get_env_variable('TITLE')

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Hello from Hackathon-sih!"})


@app.route('/home', methods=['GET'])
def home1():
    return render_template('index.html', Title=context_title)

@app.route('/login', methods=['GET'])
def login():
    return render_template('public/login.html')

#  student routes

@app.route('/student',methods=['GET'])
def student():
    return render_template('/student/dashboard.html', Title=context_title)

@app.route('/student/profile',methods=['GET'])
def student_profile():
    return render_template('/student/profile.html', Title=context_title)

@app.route('/student/portfolio',methods=['GET'])
def student_portfolio():
    return render_template('/student/portfolio.html', Title=context_title)

@app.route('/student/skills',methods=['GET'])
def student_skills():   
    return render_template('/student/skills.html', Title=context_title)

@app.route('/student/applications',methods=['GET'])
def student_applications():
    return render_template('/student/applications.html', Title=context_title)

@app.route('/student/resume',methods=['GET'])
def student_resume():   
    return render_template('/student/resume.html', Title=context_title)


# Company routes

@app.route('/company',methods=['GET'])
def company():
    return render_template('/company/dashboard.html', Title=context_title)

@app.route('/company/profile',methods=['GET'])
def company_profile():
    return render_template('/company/profile.html', Title=context_title)

@app.route('/company/applicant-profile',methods=['GET'])
def company_applicant_profile():
    return render_template('/company/applicant-profile.html', Title=context_title)

@app.route('/company/interships',methods=['GET'])
def company_internships():
    return render_template('/company/internships.html', Title=context_title)

@app.route('/company/applicats',methods=['GET'])
def company_applicants():
    return render_template('/company/applicants.html', Title=context_title)

@app.route('/company/post-internship',methods=['GET'])
def company_post_internship():
    return render_template('/company/create-internship.html', Title=context_title)




if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0' , port=5000)
