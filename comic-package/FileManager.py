import os, shutil
from zipfile  import ZipFile

class FileManager():
  def __init__(self):
    self.download_dir =  'downloaded'
    self.temp_dir     =  'temp_dir'


  def create_and_change_dir(self, dir_name=None):
    """
      :param string dir_name: is the folder name.
      create a directory if does not exist and change to it
    """
    dir_name = self.download_dir if dir_name == None else dir_name
    if not os.path.exists(dir_name):
        os.mkdir(dir_name)

    os.chdir(dir_name)


  def create_pdf(self, filename, images):
    # create the pdf file from the images
    file_location = os.path.join(self.download_dir, filename)
    with open(file_location, 'wb') as f:
      f.write(img2pdf.convert(images))


  def create_cbz(self, filename, images):
    file_location = os.path.join(self.download_dir, filename)
    with ZipFile(file_location, 'w') as cbz_zip:
      os.chdir(os.path.join(self.download_dir, self.temp_dir))
      for image in images:
        cbz_zip.write(image)
      os.chdir('../..')

  def remove_temp_dir(self):
    shutil.rmtree(os.path.join(self.download_dir, self.temp_dir))
