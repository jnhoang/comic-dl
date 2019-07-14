import requests
import os
from tempfile import TemporaryDirectory
from site_info import SiteInfo

class Downloader():
  def __init__(self):
    self.site_info     =  SiteInfo()
