from flask import Flask
from flask_cors import CORS
from comic_downloader import run
# import logging
# from pythonjsonlogger        import jsonlogger

# # configure logging
# formatter  = jsonlogger.JsonFormatter('(levelname), (message), (module), (funcName), (asctime), (process)')
# logger     = logging.getLogger(__name__)
# logHandler = logging.StreamHandler()
# logHandler.setFormatter(formatter)
# logger.addHandler(logHandler)
# # change log lvls here  ['INFO', 'DEBUG']
# logger.setLevel(logging.INFO)

# # Disable flask logging
# logging.getLogger('werkzeug').setLevel(logging.ERROR)


def create_app():
  app = Flask(__name__)
  CORS(app)
  # REGISTER BLUEPRINTS
  from ui_api.routes import routes

  app.register_blueprint(routes)
  return app
