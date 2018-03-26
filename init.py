from rx_sharh.states.config import Config
from rx_sharh.dependency.aliyun_sms import AliyunSms
import rx_sharh.states.database as db
from werkzeug.contrib.fixers import ProxyFix
from flask_login import current_user, login_required
from flask_login.login_manager import LoginManager
from flask import Flask, g, request, session, make_response, render_template, redirect, url_for, Response
import logging
from rx_sharh.ip_ban.dangerous import Dangerous


def init(**kwargs):
    for k, v in kwargs.items():
        setattr(Config, k, v)

    app = Flask(__name__)
    db.init_db()
    sms = AliyunSms(app)
    Config.sms = sms
    Config.app = app

    app.add_template_global(str, 'str')
    app.secret_key = Config.secret_key
    app.wsgi_app = ProxyFix(app.wsgi_app)

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'authentication.login'

    if app.debug:
        stream_handle = logging.StreamHandler()
        stream_handle.setFormatter(logging.Formatter(Config.logging_fmt))
        stream_handle.setLevel(logging.INFO)
        app.logger.addHandler(stream_handle)

    file_handle = logging.FileHandler(Config.logging_path)
    file_handle.setFormatter(logging.Formatter(Config.logging_fmt))
    file_handle.setLevel(logging.WARNING)

    app.logger.addHandler(file_handle)

    @login_manager.user_loader
    def load_user(user_id):
        return db.User.query.filter_by(id=int(user_id)).first()

    @app.errorhandler(404)
    def not_found(error):
        Dangerous.add()
        return render_template("404.html"), 404

    @app.errorhandler(400)
    def not_found(error):
        Dangerous.add()
        return "贪玩", 400

    @app.before_request
    def load_current_user():
        g.user = current_user

    @app.teardown_request
    def remove_db_session(exception):
        db.db_session.remove()

    @app.route('/image/<imagep>')
    def get_image(imagep):
        try:
            path = str(Config.path / "sharh-static" / "static" / "images" / imagep)
            with open(path, 'rb') as image:
                return Response(image.read(), content_type="image/{}".format("png" if ".png" in imagep else
                                                                             "jpeg" if ".jpg" in imagep else
                                                                             "gif" if ".gif" in imagep else
                                                                             ""))
        except Exception as e:
            logging.log(logging.WARNING, e)
            return Response(render_template('404.html'))

    from rx_sharh.service.view import attendance
    from rx_sharh.service.view import group
    from rx_sharh.service.view import authentication
    from rx_sharh.service.view import schedule
    from rx_sharh.service.view import profile
    from rx_sharh.service.view import index

    app.register_blueprint(attendance.mod)
    app.register_blueprint(group.mod)
    app.register_blueprint(authentication.mod)
    app.register_blueprint(schedule.mod)
    app.register_blueprint(profile.mod)
