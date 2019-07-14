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

  # figure out which site settings to use
  domain   =  get_url_domain(url) # TBD - may need to move this elsewhere
  print('domain: ', domain)
  domain_settings = site_info.get_domain_settings(domain)
  print('domain_settings: ', domain_settings)

  # scrape site, antibot = bypass bot-protection
  response = scraper.scrape_comic(url, antibot=domain_settings['antibot'])
  print(response)

  # handoff to corresponding site-parser, returns array of image links
  image_links = site_info.get_image_links(response, domain_settings)


  # # retrieve all the images links to download
  # # session = requests.Session()
  # soup = BeautifulSoup(response.content, 'html.parser') # are you human page
  # # find images matching regex string
  # image_regex        =  r'lstImages.push\(\"(.*?)\"\)\;'
  # match              =  re.findall(image_regex, str(soup))

  # img_links = [ link for link in match if is_url_valid(link) ]
  # print(img_links)


if __name__ == "__main__":
  run()
