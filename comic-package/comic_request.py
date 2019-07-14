# pip modules
import os, sys, shutil, glob, requests

from tempfile import TemporaryDirectory
from natsort  import natsorted

# package modules
from utils        import is_url_valid, get_url_domain, create_and_change_dir
from web_scraper  import Scraper
from site_info    import SiteInfo
from downloader   import Downloader

site_info =  SiteInfo()
scraper   =  Scraper()
download_path = 'downloaded_comics'


def run():
  try:
    command, url = sys.argv
  except ValueError as e:
    print(f'error: {e}\nto run: python3 comic_request.py website')
    return

  # figure out which site settings to use
  domain          =  get_url_domain(url)
  domain_settings =  site_info.get_domain_settings(domain)

  # build comic name
  split_url    =  url.split('/')
  comic_name   =  split_url[domain_settings['name_position']]
  issue_number =  site_info.get_issue_number(split_url, domain)
  filename     =  f'{comic_name}_{issue_number}.pdf'

  # bypass bot-protection
  response = scraper.scrape_comic(url, antibot=domain_settings['antibot'])

  # handoff to corresponding site-parser, returns array of image links
  session     =  requests.Session()
  image_links =  site_info.get_image_links(response, domain_settings, session)

  # regroup all the images into a list so we can sort them
  # to avoid a bad pagination
  unsorted_images =  [ image for image in glob.glob('image_files/*.jpg') ]
  images          =  natsorted(unsorted_images)


  # download images
  with TemporaryDirectory() as temp_dir:

    for i, link in enumerate(image_links):
      response = session.get(link, stream=True)

      with open(os.path.join(temp_dir, f'{i}.jpg'), 'wb') as f:
        response.raw.decode_content = True
        shutil.copyfileobj(response.raw, f)

    # regroup all the images into a list so we can sort them
    # to avoid a bad pagination
    unsorted_images =  [ image for image in glob.glob(f'{temp_dir}/*.jpg') ]
    images          =  natsorted(unsorted_images)

    # create pdf/cbz here

    print('Comic successfully downloaded')



if __name__ == "__main__":
  run()
