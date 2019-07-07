# Sources
Combined from 
- [comics-downloader](https://github.com/Girbons/comics-downloader)
- [cbz-merger](https://github.com/razumau/cbz-merger)


# Setup
- clone this repo
- download version of the [comics-downloader](https://github.com/Girbons/comics-downloader#installing)
- move file into this repo
- run `chmod` to give executable permissions
- run following commands
  ```
  virtualenv venv
  source venv/bin/activate
  ```
- Download chapters [see instructions here](https://github.com/Girbons/comics-downloader)

- Merge into single book via: `python3 merge.py [-r result_filename] folder_n/ame`


# Todo
- [ ] - cleanup downloaded files once conversion is complete
- [ ] - upload to dropbox
  - `python3 merge.py -r ~/Dropbox/<FILE_NAME> <FILES_FOLDER_LOCATION>
