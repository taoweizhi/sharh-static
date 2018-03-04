from flask import Flask, render_template, jsonify, request, redirect, url_for
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('test/index.html')

@app.route("/post_test", methods=['POST'])
def post_test():
    return jsonify(status=302, location=url_for('get_test'))

@app.route("/get_test", methods=['GET'])
def get_test():
    return "Hello World"

if __name__ == "__main__":
    app.debug = True
    app.run()
