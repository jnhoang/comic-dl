# pip modules
import os
import requests
import re
import sys
import shutil
import glob

import urllib
from bs4      import BeautifulSoup
from tempfile import TemporaryDirectory
from natsort  import natsorted

# package modules
from utils        import is_url_valid, get_url_domain
from web_scraper  import Scraper
from site_info    import SiteInfo
from downloader   import Downloader

site_info =  SiteInfo()
scraper   =  Scraper()


def run():
  try:
    command, url = sys.argv
  except ValueError as e:
    print(f'error: {e}\nto run: python3 comic_request.py website')
    return

  # figure out which site settings to use
  domain          =  get_url_domain(url)
  domain_settings =  site_info.get_domain_settings(domain)

  # scrape site, antibot = bypass bot-protection
  response = scraper.scrape_comic(url, antibot=domain_settings['antibot'])

  # handoff to corresponding site-parser, returns array of image links
  image_links = site_info.get_image_links(response, domain_settings)

  # download images
  with TemporaryDirectory() as temp_dir:
    for n, link in enumerate(image_links):
      response = session.get(link, stream=True)
      with open(os.path.join(temp_dir, f'{n}.jpg'), 'wb') as f:
        response.raw.decode_content = True
        shutil.copyfileobj(response.raw, f)

    # regroup all the images into a list so we can sort them
    # to avoid a bad pagination
    images     =  [ image for image in glob.glob(f'{temp_dir}/*.jpg') ]
    sorted_img =  natsorted(images)

    # build comic name
    split_url    =  url.split('/')
    comic_name   =  split_url[domain_settings['name_position']]
    issue_number =  site_info.get_issue_number(split_url, domain)
    file_name    =  f'{comic_name}_{issue_number}.pdf'

    print(comic_name)



if __name__ == "__main__":
  run()
