import os
import get_options
from flask import Flask
from flask_cors import CORS
from commons.extensions import cache

app = Flask(__name__, instance_relative_config=True)
CORS(app)
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
)

cache.init_app(app, config={'CACHE_TYPE': 'simple'})
app.register_blueprint(get_options.bp)

