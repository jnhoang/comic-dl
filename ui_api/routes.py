from flask import Blueprint, request, make_response
from comic_downloader.run import run, get_comic_info, get_images

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
  return 'hello'


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


@routes.route('/dl-direct', methods=['POST'])
def download_direct():
  payload    =  request.get_json()
  comic_link =  payload['comic_link']
  filetype   =  payload['filetype']

  run('foobar', comic_link, filetype)
