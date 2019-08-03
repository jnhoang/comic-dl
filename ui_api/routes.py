import os
from flask import Blueprint, request, make_response, send_file
from comic_downloader.run import run
import requests

from ui_api.controller            import get_comic_info, download_comic
from comic_downloader.FileManager import FileManager

routes       =  Blueprint('routes', __name__)
file_manager =  FileManager()


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

  response = get_comic_info(payload)
  return make_response(response)


@routes.route('/api/download', methods=['POST'])
def download():
  payload =  request.get_json()
  if payload == None:
    print('download error, payload: ', payload)
    return make_response({'error': 'empty payload', 'src': '/download'}, 404)

  download_location =  download_comic(payload)

  return send_file(f'../{download_location}')


# TODO - ADD DELETE ROUTE
@routes.route('/api/remove_temp', methods=['GET'])
def remove_temp():
  file_manager.remove_temp_dir()
  print('removed')
  return make_response('works', 200)


# @routes.route('/dl-direct', methods=['POST'])
# def download_direct():
#   payload    =  request.get_json()
#   comic_link =  payload['comic_link']
#   filetype   =  payload['filetype']

#   run('foobar', comic_link, filetype)
#   return
