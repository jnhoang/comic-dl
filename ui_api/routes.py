from flask import Blueprint


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
  # get_image_links - ['url', 'url', ...]
    # request - sent with a bunch of urls
    # process urls
    # response = {
    #   'data': [ {'url', 'comic_name', 'issue_number', 'image_links' : [] }, {} ]
    # }
  # download_files - [{comic_name:'', issue_number:'', images:[]}]

@routes.route("/")
@routes.route("/home")
def home():
  return 'hello'


@routes.route("/get_image_links")
def about():
  return 'about page'

