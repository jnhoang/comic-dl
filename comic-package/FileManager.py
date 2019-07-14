import os
from zipfile import ZipFile

class FileManager():
  def __init__(self):
    self.download_path = 'downloaded_comics'

  def create_and_change_dir(dir_name):
  """
    :param string dir_name: is the folder name.

    create a directory if does not exist and change to it
  """
    if not os.path.exists(dir_name):
      os.mkdir(dir_name)

    os.chdir(dir_name)

  def create_pdf(self, filename, images):
    os.chdir(self.download_path)

    # create the pdf file from the images
    with open(filename, 'wb') as f:
      f.write(img2pdf.convert(images))


  def create_cbz(self, filename):
    images_arr = os.listdir(os.path.join(self.download_path, 'image_files'))
    print(images_arr)
    os.chdir(self.download_path)

    with ZipFile(filename, 'w') as cbz_zip:
      os.chdir('image_files')
      for image in images_arr:
        cbz_zip.write(image)

