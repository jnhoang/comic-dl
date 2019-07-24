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

  print('payload: ', payload)
  # response = get_comic_info(payload)
  response = {
    "issue_number" :  '01',
    "comic_name"   :  'test-comic',
    "filename"     :  'test-comic-01.cbz',
    "image_links"  :  [
      'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
      'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
      'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
      # 'https://2.bp.blogspot.com/-RxqtUUMHMbI/WqCKWYsAgXI/AAAAAAAAEUQ/QTn0DvwHM0Y70QIRi_Cj4lfEINxwP52EgCHMYCw/s1600/RCO001.jpg',
      # 'https://2.bp.blogspot.com/-uUVBZgQek2w/WqCKWkKzXXI/AAAAAAAAEUU/e7c_gvh_iOYqEK9Mo-VuL_96PYa5spOCgCHMYCw/s1600/RCO002_w.jpg',
      # 'https://2.bp.blogspot.com/-9o-T9zXEWKA/WqCKXIiIw1I/AAAAAAAAEUY/ccEHCHXHhkc19ESJpT7pssGc1gjXY-9JwCHMYCw/s1600/RCO003.jpg',
    ]
  }

  return make_response(response)


@routes.route('/api/download', methods=['POST'])
def download():
  payload =  request.get_json()
  if payload == None:
    print('download error, payload: ', payload)
    return make_response({'error': 'empty payload', 'src': '/download'}, 404)

  download_location =  download_comic(json)
  return send_file(f'../{download_location}')


# @routes.route('/dl-direct', methods=['POST'])
# def download_direct():
#   payload    =  request.get_json()
#   comic_link =  payload['comic_link']
#   filetype   =  payload['filetype']

#   run('foobar', comic_link, filetype)
#   return
