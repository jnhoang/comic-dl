import requests
import os
from tempfile import TemporaryDirectory
from site_info import SiteInfo

class Downloader():
  def __init__(self):
    self.download_path =  'downloaded_comics'
    self.site_info     =  SiteInfo()

  def create_default_folder(self):
    if not os.path.exists(self.download_path):
      os.mkdir(self.download_path)


downloader = Downloader()
downloader.create_default_folder()
