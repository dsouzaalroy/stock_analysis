import os
from flask import Flask
from flask_cors import CORS
from extract_analyse.flaskr.commons.extensions import cache
from . import get_options


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    cache.init_app(app, config={'CACHE_TYPE': 'simple'})
    app.register_blueprint(get_options.bp)

    return app


if __name__ == '__main__':
    create_app().run(host="0.0.0.0", port=5000)
