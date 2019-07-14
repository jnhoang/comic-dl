import re
import requests
from bs4 import BeautifulSoup

from utils import is_url_valid


class SiteInfo():

  def __init__(self):
    self.site_settings = {
      'comicextra' : {
        'domain'      :  'www.comicextra.com',
        'image_regex' :  '<img[^>]+src="([^">]+)"',
        'antibot'     :  False,
      },
      'mangahere' : {
        'domain'      :  'www.mangahere.cc',
        'base_url'    :  'http://www.mangahere.cc/',
        'image_regex' :  r'<img[^>]+src="([^">]+)"',
        'antibot'     :  False,
      },
      'mangareader' : {
        'domain'      :  'www.mangareader.net',
        'base_url'    :  'https://www.mangareader.net',
        'image_regex' :  '<img[^>]+src="([^">]+)"',
        'antibot'     :  False,
      },
      'read_comic_online' : {
        'domain'             :  'readcomiconline.to',
        'issue_number_regex' :  r'[(\d)]+',
        'image_regex'        :  r'stImages.push\(\"(.*?)\"\)\;',
        'antibot'            :  True,
      },
      'read_comics_io' : {
        'domain'      :  'readcomics.io',
        'image_regex' :  '<img[^>]+src="([^">]+)"',
        'antibot'     :  False,
      },
    }


  def get_image_links(self, response, domain_settings):
    domain = domain_settings['domain']

    if domain == self.site_settings['mangahere']['domain']:
      image_links =  mangahere_images_links(response)
    elif domain == self.site_settings['mangareader']['domain']:
      image_links = mangareader_images_links(response)
    else:
      session =  requests.Session()
      html    =  BeautifulSoup(response.content, 'html.parser')

      image_html_links =  re.findall(domain_settings['image_regex'], str(html))
      image_links      =  [ link for link in image_html_links if is_url_valid(link)]

    return image_links


  def get_domain_settings(self, domain):
    return [v for k,v in self.site_settings.items() if v['domain'] == domain][0]


  def mangahere_images_links(self, response):

    session =  requests.Session()
    soup    =  BeautifulSoup(response.content, 'html.parser')

    # retrieve the <options> in page
    options =  soup.findAll('option')
    links   =  [ f'http:{option.get("value")}' for option in options ]

    # grab all img links
    regex        =  self.site_settings['mangahere']['image_regex']
    images_links =  []

    for link in links:
      response  =  session.get(link)
      image_url =  re.findall(regex, response.text)[1]

      if is_url_valid(image_url):
        images_links.append(image_url)

    return images_links


  def mangareader_images_links(self, response):
    setting =  self.site_settings['mangareader']
    session =  requests.Session()
    soup    =  BeautifulSoup(response.content, 'html.parser')

    # retrieve the <options> in page
    options  =  soup.findAll('option')
    links    =  [ f"{setting['base_url']}{option['value']}" for option in options]

    images_links = []
    for link in links:
      response = session.get(link)

      # we'll find only 1 image
      image_url = re.findall(setting['image_regex'], response.text)[0]
      if is_url_valid(image_url):
        images_links.append(image_url)

    return images_links
