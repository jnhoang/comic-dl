import os, sys
import validators
from zipfile import ZipFile
from urllib.parse import urlsplit

import img2pdf



def is_url_valid(url):
  """
    :param string url: is a url

    check if the given url is valid and is not a gif
  """
  is_valid = not url.endswith('.gif') and validators.url(url)
  return is_valid

def get_url_domain(url):
  """
    parses url for the domain name
  """

  scheme, domain, path, query, fragment = urlsplit(url)


  return domain

def create_and_change_dir(dir_name):
  """
    :param string dir_name: is the folder name.

    create a directory if does not exist and change to it
  """
  if not os.path.exists(dir_name):
    os.mkdir(dir_name)

  os.chdir(dir_name)


def create_pdf(download_path, filename, images):
  os.chdir(download_path)

  # create the pdf file from the images
  with open(filename, 'wb') as f:
    f.write(img2pdf.convert(images))


def create_cbz(download_path, filename):
  images_arr = os.listdir(os.join(download_path, 'image_files'))
  os.chdir(download_path)

  with ZipFile(filename, 'w') as cbz_zip:
    os.chdir('image_files')
    for image in images_arr:
      cbz_zip.write(image)

