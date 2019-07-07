import os
import requests
import re
import sys
from bs4 import BeautifulSoup
import urllib
from web_scraper  import Scraper
from utils        import is_url_valid, get_url_domain

from site_info import SiteInfo

site_info = SiteInfo()

scraper =  Scraper()

def run():
  try:
    command, url = sys.argv
  except ValueError as e:
    print(f'error: {e}\nto run: python3 comic_request.py website')
    return

  domain = get_url_domain(url)

  # handoff to corresponding site-parser, returns array of image links
  image_links = site_info.get_image_links(url)

  # # bypass bot-protection
  # url      =  'https://readcomiconline.to/Comic/The-Walking-Dead/Issue-177'
  # response =  scraper.scrape_comic(url, antibot=True)





  # # retrieve all the images links to download
  # # session = requests.Session()
  # soup = BeautifulSoup(response.content, 'html.parser') # are you human page
  # # find images matching regex string
  # issue_number_regex =  r'[(\d)]+'
  # image_regex        =  r'lstImages.push\(\"(.*?)\"\)\;'
  # match              =  re.findall(image_regex, str(soup))

  # img_links = [ link for link in match if is_url_valid(link) ]
  # print(img_links)


if __name__ == "__main__":
  run()
