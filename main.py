from flask import Flask, request, jsonify,render_template
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Hello from Hackathon-sih!"})


@app.route('/home', methods=['GET'])
def home1():
    # 2. Define the data you want to send to the HTML page
    context_title = "Home Page"
    username = "Alex"
    
    # 3. Render the file and pass variables (HTML_var=Python_var)
    return render_template('index.html', title=context_title, user_name=username)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0' , port=5000)
