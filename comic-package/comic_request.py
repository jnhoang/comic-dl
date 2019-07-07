import os
import requests
import re
from bs4 import BeautifulSoup

from web_scraper  import Scraper
from utils        import Utils

site_settings = {
  # http://readcomiconline.to/
  'read_comics_online': {
    'image_regex'        :  r'stImages.push\(\"(.*?)\"\)\;',
    'antibot'            :  True,
  },
  # http://www.comicextra.com/
  'comic_extra': {
    'image_regex' :  '<img[^>]+src="([^">]+)"',
    'antibot'     :  False
  },
  # http://www.mangahere.cc/
  'mangahere': {

  },
  'read_comics_online': {

  },
}


scraper =  Scraper()

def run():

  # bypass bot-protection
  url      =  'https://readcomiconline.to/Comic/The-Walking-Dead/Issue-177'
  response =  scraper.scrape_comic(url, antibot=True)


  # retrieve all the images links to download
  # session = requests.Session()
  soup = BeautifulSoup(response.content, 'html.parser') # are you human page
  # find images matching regex string
  issue_number_regex =  r'[(\d)]+'
  image_regex        =  r'lstImages.push\(\"(.*?)\"\)\;'
  match              =  re.findall(image_regex, str(soup))

  img_links = [ link for link in match if is_url_valid(link) ]
  print(img_links)


if __name__ == "__main__":
  run()
