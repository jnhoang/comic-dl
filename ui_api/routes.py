import os
from flask import Blueprint, request, make_response, send_file
from comic_downloader.run import run
import requests

from ui_api.controller import get_comic_info


routes = Blueprint('routes', __name__)


@routes.route("/api/")
@routes.route("/api/home", methods=['GET', 'POST'])
def home():
  return make_response({'hello': 'hi'})


@routes.route('/api/get_info', methods=['POST'])
def get_info():
  payload = request.get_json()
  if payload == None:
    print('get_info error, payload: ', payload)
    return make_response({'error': 'empty payload', 'src': '/gen_info'}, 404)

  print('/get_info payload: ', payload)
  response = get_comic_info(payload)
  print('/get_info response: ', response)

  return make_response(response)


@routes.route('/api/download', methods=['POST'])
def download():
  payload =  request.get_json()
  if payload == None:
    print('download error, payload: ', payload)
    return make_response({'error': 'empty payload', 'src': '/download'}, 404)

  print('/download payload: ', payload)
  download_location =  download_comic(json)
  print('/download download_location: ', download_location)
  return send_file(f'../{download_location}')


# @routes.route('/dl-direct', methods=['POST'])
# def download_direct():
#   payload    =  request.get_json()
#   comic_link =  payload['comic_link']
#   filetype   =  payload['filetype']

#   run('foobar', comic_link, filetype)
#   return
