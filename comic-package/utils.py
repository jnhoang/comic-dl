import validators


class Utils():
  def __init__(self):
    pass


  def is_url_valid(url):
    """
    :param string url: is a url

    check if the given url is valid and is not a gif
    """
    is_valid = not url.endswith('.gif') and validators.url(url)
    return is_valid
