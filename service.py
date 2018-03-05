from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('test.html',
                           links=[{'href': 'link', 'title': 'A'}],
                           side_info={'avatar': '',
                                      'name': '',
                                      'number': ''},
                           side_option=[{'href': '',
                                         'icon': '',
                                         'title': ''}])


@app.route("/post_test", methods=['POST'])
def post_test():
    return jsonify(status=302, location=url_for('get_test'))


@app.route("/get_test", methods=['GET'])
def get_test():
    return "Hello World"


if __name__ == "__main__":
    app.debug = True
    app.run()
