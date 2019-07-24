# pip modules
import os, sys, glob, requests
from natsort import natsorted

from comic_downloader.WebScraper   import WebScraper
from comic_downloader.SiteInfo     import SiteInfo
from comic_downloader.FileManager  import FileManager
from comic_downloader.Utils        import Utils

site_info    =  SiteInfo()
scraper      =  WebScraper()
file_manager =  FileManager()
utils        =  Utils()


def get_comic_info(json):
  comic_link =  json['comic_link']
  filetype   =  json['filetype']

  # figure out which site settings to use
  domain          =  utils.get_url_domain(url)
  domain_settings =  site_info.get_domain_settings(domain)    # TBD - try/catch site

  # comic details
  comic_name, issue_number, filename = site_info.get_comic_details(url, filetype, domain_settings)
  image_links = get_panels(comic_link, domain_settings)
  return {
    'comic_name'   :  comic_name,
    'issue_number' :  issue_number,
    'filename'     :  filename,
    'image_links'  :  image_links,
  }


def get_panels(url, domain_settings):
  # bypass bot-protection
  response = scraper.scrape_comic(url, antibot=domain_settings['antibot'])

  # handoff to corresponding site-parser, returns array of image links
  session     =  requests.Session()
  image_links =  site_info.get_image_links(response, domain_settings, session)
  return image_links


def download_comic(json):
  comic_name   =  json.comic_name
  filename     =  json.filename
  image_links  =  json.image_links
  issue_number =  json.issue_number

  # download images
  session =  requests.Session()
  scraper.download_images(comic_name, issue_number, image_links, session)

  # regroup images & sort to avoid a bad pagination
  unsorted_images =  [ image for image in glob.glob(f'{file_manager.full_temp_path}/*.jpg') ]
  images          =  natsorted(unsorted_images)

  # separate downloads into individual dirs
  series_dir        =  file_manager.create_and_get_series_dir(comic_name)
  download_location =  file_manager.get_download_location(series_dir, filename)

  # create pdf/cbz
  if filetype == 'pdf':
    file_manager.create_pdf(download_location, images)
  elif filetype == 'cbz':
    file_manager.create_cbz(download_location, images)

  return download_location

