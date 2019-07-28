import os, shutil, requests
import cfscrape

from comic_downloader.FileManager import FileManager
file_manager =  FileManager()

class WebScraper():
  def __init__(self):
    self.scraper =  cfscrape.create_scraper()

  def scrape_comic(self, url, antibot):
    # Get page raw content
    try:
      response = self.scraper.get(url) if antibot else requests.get(url)
    except:
      print('\n\n========first attempt failed, attempting retry')
      response = self.scraper.get(url) if antibot else requests.get(url)
    return self.handle_response(response)


  def handle_response(self, response):
    # Evaluate response status code
    try:
      response.raise_for_status()
      return response
    except requests.exceptions.HTTPError as e:
      raise e

  def download_images(self, comic_name, issue_number, image_links):
    session =  requests.Session()
    file_manager.create_temp_dir()

    for i, link in enumerate(image_links):
      response   =  session.get(link, stream=True)
      image_name =  f'{comic_name}_{issue_number}_{i}.jpg'

      with open(os.path.join(file_manager.full_temp_path, image_name), 'wb') as file:
        response.raw.decode_content = True
        shutil.copyfileobj(response.raw, file)
