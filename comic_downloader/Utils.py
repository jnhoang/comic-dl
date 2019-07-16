import os, sys
import validators
from urllib.parse import urlsplit


class Utils():
  def __init__(self):
    pass

  def is_url_valid(self, url):
    """
      :param string url: is a url

      check if the given url is valid and is not a gif
    """
    is_valid = not url.endswith('.gif') and validators.url(url)
    return is_valid

  def get_url_domain(self, url):
    """
      parses url for the domain name
    """
    scheme, domain, path, query, fragment = urlsplit(url)

    return domain

