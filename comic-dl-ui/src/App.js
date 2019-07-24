import React, {Component}     from 'react';
import Container  from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button'
import ImageContainer from './ImageContainer'

import {baseUrl} from './services'

const print = console.log

class App extends Component {
  state = {
    filename    :  '',
    imageLinks  :  [],
    comicName   :  '',
    filetype    :  'cbz',
    issueNumber :  '',
  }


  handleSearch = async() => {
    const payload = {
      comic_link :  `${baseUrl}/teehee/`,
      filetype   :  'cbz',
    };
    const response = await fetch(`${baseUrl}/get_info`, {
      method  :  'POST',
      body    :  JSON.stringify(payload),
      headers :  { 'Content-Type': 'application/json' },
    });

    const data = await response.json()

    this.setState({
      comicName       :  data.comic_name,
      filename        :  data.filename,
      filetype        :  data.filetype,
      imageLinks      :  data.image_links,
      issueNumber     :  data.issue_number,
      url             :  data.url,
    })
  }


  render = () => {
    const {comicName, filename, filetype, imageLinks, issueNumber, url} = this.state;

    return (
      <Container>
        <div>
          <h1>Acceptable Sites</h1>
          <ul>
            <li>www.comicextra.com</li>
            <li>www.mangahere.cc</li>
            <li>www.mangareader.net</li>
            <li>readcomiconline.to</li>
          </ul>
        </div>


        <Button onClick={this.handleSearch}>Search</Button>

        { imageLinks.length > 0 && (
            <ImageContainer
              imageLinks = {imageLinks}
              filename = {filename}
              />
          )
        }
      </Container>
    )
  }
}


export default App;
