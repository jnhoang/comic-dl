import os, shutil, requests
import cfscrape

from FileManager import FileManager

class Scraper():
  def __init__(self):
    self.scraper      =  cfscrape.create_scraper()
    self.file_manager =  FileManager()

  def scrape_comic(self, url, antibot):
    # Get page raw content
    response = self.scraper.get(url) if antibot else requests.get(url)
    return self.handle_response(response)


  def handle_response(self, response):
    # Evaluate response status code
    try:
      response.raise_for_status()
      return response
    except requests.exceptions.HTTPError as e:
      raise e

  def download_images(self, comic_name, issue_number, image_links, session):
    self.file_manager.create_and_change_dir(self.file_manager.download_dir)
    self.file_manager.create_and_change_dir(self.file_manager.temp_dir)

    for i, link in enumerate(image_links):
      response   =  session.get(link, stream=True)
      image_name =  f'{comic_name}_{issue_number}_{i}.jpg'

      with open(image_name, 'wb') as file:
        response.raw.decode_content = True
        shutil.copyfileobj(response.raw, file)

    os.chdir('../..')
