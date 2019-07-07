import re
import requests
from bs4 import BeautifulSoup

from utils import is_url_valid


class SiteInfo():

  def __init__(self):
    self.comicextra = {
      'image_regex' :  '<img[^>]+src="([^">]+)"',
      'antibot'     :  False,
    }

    self.mangahere = {
      'base_url'    :  'http://www.mangahere.cc/',
      'image_regex' :  r'<img[^>]+src="([^">]+)"',
      'antibot'     :  False,
    }

    self.mangareader = {
      'base_url'    :  'https://www.mangareader.net',
      'image_regex' :  '<img[^>]+src="([^">]+)"',
      'antibot'     :  False,
    }

    self.read_comic_online = {
      'issue_number_regex' :  r'[(\d)]+',
      'image_regex'        :  r'stImages.push\(\"(.*?)\"\)\;',
      'antibot'            :  True,
    }

    self.read_comics = {
      'image_regex' :  '<img[^>]+src="([^">]+)"',
      'antibot'     :  False,
    }

  def get_image_links(self, url):
    print('get_image_links')
    return url

  def mangahere_images_links(self, response):
    session =  requests.Session()
    soup    =  BeautifulSoup(response.content, 'html.parser')

    # retrieve the <options> in page
    options =  soup.findAll('option')
    links   =  [ f'http:{option.get("value")}' for option in options ]

    # grab all img links
    images_links = []
    for link in links:
      response  =  session.get(link)
      image_url =  re.findall(self._image_regex, response.text)[1]

      if is_url_valid(image_url):
        images_links.append(image_url)

    return images_links


  def mangareader_images_links(self, response):
    session =  requests.Session()
    soup    =  BeautifulSoup(response.content, 'html.parser')

    # retrieve the <options> in page
    options =  soup.findAll('option')
    links   =  [ f"{self.mangareader.base_url}{option['value']}" for option in options]

    images_links = []
    for link in links:
      response = session.get(link)

      # we'll find only 1 image
      image_url = re.findall(self._image_regex, response.text)[0]
      if is_url_valid(image_url):
        images_links.append(image_url)

    return images_links
