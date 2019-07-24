import React, {Component}     from 'react';
import Container  from 'react-bootstrap/Container'

import Button from 'react-bootstrap/Button'
import ImageContainer from './ImageContainer'
import AccetableSites from './components/AcceptableSites'
import {baseUrl} from './services'

const print = console.log

class App extends Component {
  state = {
    filename    :  '',
    imageLinks  :  [],
    comicName   :  '',
    filetype    :  'cbz',
    issueNumber :  '',
  };


  handleSearch = async() => {
    const comicLink = '';
    const payload = {
      comic_link :  'https://readcomiconline.to/Comic/The-Walking-Dead/Issue-179',   // TODO - read from input as comicLink
      filetype   :  'cbz',                  // TODO - dynamic this
    };

    const response = await fetch(`${baseUrl}/get_info`, {
      method  :  'POST',
      body    :  JSON.stringify(payload),
      headers :  { 'Content-Type': 'application/json' },
    });

    const data = await response.json()

    this.setState({
      url         :  comicLink,
      comicName   :  data.comic_name,
      filename    :  data.filename,
      filetype    :  'cbz',
      imageLinks  :  data.image_links,
      issueNumber :  data.issue_number,
    })
  }


  render = () => {
    const {comicName, filename, filetype, imageLinks, issueNumber} = this.state;

    return (
      <Container>
        { imageLinks.length === 0 && ( <AccetableSites /> ) }
        <Button onClick={this.handleSearch}>Search</Button>


        { imageLinks.length > 0 && (
          <ImageContainer
            comicName   =  {comicName}
            imageLinks  =  {imageLinks}
            filename    =  {filename}
            filetype    =  {filetype}
            issueNumber =  {issueNumber} />
        )}
      </Container>
    )
  }
}


export default App;
