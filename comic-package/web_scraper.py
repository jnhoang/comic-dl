import cfscrape
import requests



class Scraper():
  def __init__(self):
    self._scraper =  cfscrape.create_scraper()


  def scrape_comic(self, url, antibot):
    # Get page raw content
    response = self._scraper.get(url) if antibot else requests.get(url)
    return self.handle_response(response)


  def handle_response(self, response):
    # Evaluate response status code
    try:
      response.raise_for_status()
      return response
    except requests.exceptions.HTTPError as e:
      raise e


  scrape_images
