import os
from flask import Blueprint, request, make_response, send_file
from comic_downloader.run import run, get_comic_info, get_images, download_comic
import requests

routes = Blueprint('routes', __name__)
# get list of website urls
# loop through each and run comic-package up to grabbing the image links
# image links are stored in array and sent to ui
  # render links at the ui level
  # allow user to move/add/remove images in the array
  # send modifed array back to server + filetype of desired output comic file
# download the images
# create pdf/cbz
# ask if user wants to save file elsewhere


# endpoints
  # home - render ui
  # download_files - [{comic_name:'', issue_number:'', images:[]}]

@routes.route("/")
@routes.route("/home")
def home():
  return make_response({'hello': 'hi'})


@routes.route('/get_comic_info', methods=['POST'])
def get_comic_info():
  payload    =  request.get_json()
  comic_link =  payload['comic_link']
  filetype   =  payload['filetype']

  comic_info  =  get_comic_info(comic_link, filetype)
  image_links =  get_images(comic_link, comic_info['domain_settings'])

  response = {
    "url"          :  comic_link,
    "issue_number" :  comic_info['issue_number'],
    "comic_name"   :  comic_info['comic_name'],
    "image_links"  :  image_links,
  }

  return make_response(response)

@routes.route('/download', methods=['POST'])
def download():
  payload      =  request.get_json()
  comic_name   =  payload['comic_name']
  issue_number =  payload['issue_number']
  image_links  =  payload['image_links']

  session  =  requests.Session()
  download_location =  download_comic(comic_name, issue_number, image_links, session, filetype='cbz', filename='foo.cbz')
  # download_location = os.path.join('..', download_location)
  print('download_location:', download_location)
  # return make_response(download_location)
  return send_file(f'../{download_location}')




@routes.route('/dl-direct', methods=['POST'])
def download_direct():
  payload    =  request.get_json()
  comic_link =  payload['comic_link']
  filetype   =  payload['filetype']

  run('foobar', comic_link, filetype)
  return
