import os, shutil
import img2pdf
from zipfile  import ZipFile


class FileManager():
  def __init__(self):
    self.download_dir   =  'downloaded'
    self.temp_dir       =  'temp_dir'
    self.full_temp_path =  f'{self.download_dir}/{self.temp_dir}'

  def create_and_change_dir(self, dir_name):
    if not os.path.exists(dir_name):
      os.mkdir(dir_name)

    os.chdir(dir_name)


  def create_temp_dir(self):
    if not os.path.exists(self.full_temp_path):
      os.mkdir(self.full_temp_path)


  def create_and_get_series_dir(self, comic_name):
    series_dir = os.path.join(self.download_dir, comic_name)
    if not os.path.exists(series_dir):
      os.mkdir(series_dir)
    return series_dir

  def get_download_location(self, series_dir, filename):
    return os.path.join(series_dir, filename)


  def create_pdf(self, download_location, images):
    with open(download_location, 'wb') as f:
      f.write(img2pdf.convert(images))


  def create_cbz(self, download_location, images):
    with ZipFile(download_location, 'w') as f:
      for image in images:
        f.write(image)


  def remove_temp_dir(self):
    shutil.rmtree(self.full_temp_path)

