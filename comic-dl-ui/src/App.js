import React, {Component} from 'react';
import Container      from 'react-bootstrap/Container'
import InputGroup     from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown       from 'react-bootstrap/Dropdown'
import FormControl    from 'react-bootstrap/FormControl'

import ImageContainer from './ImageContainer'
import AccetableSites from './components/AcceptableSites'
import {baseUrl}      from './services'

const print = console.log

class App extends Component {
  state = {
    comicLink   :  '',
    filename    :  '',
    imageLinks  :  [],
    comicName   :  '',
    filetype    :  'cbz',
    issueNumber :  '',
  };


  handleSearch = async(eventKey) => {
    const comicLink = '';

    const payload = {
      // comic_link :  'https://readcomiconline.to/Comic/The-Walking-Dead/Issue-179',   // TODO - read from input as comicLink
      comic_link :  this.state.comicLink,   // TODO - read from input as comicLink
      filetype   :  eventKey,
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

  handleChange = (event) => {
    this.setState({comicLink: event.target.value})
  }

  handleSubmit = (eventKey) => {
    print('eventKey: ', eventKey)
  }

  render = () => {
    const {comicName, filename, filetype, imageLinks, issueNumber} = this.state;

    return (

      <Container>
        { imageLinks.length === 0 && (
          <div>
            <AccetableSites />

            <InputGroup className="mb-3">
              <FormControl
                onChange    =  {this.handleChange}
                placeholder =  "Paste URL here from acceptable site" />

                <DropdownButton
                  as      =  {InputGroup.Prepend}
                  variant =  "outline-secondary"
                  title   =  "filetype"
                  id      =  "input-group-1" >
                  <Dropdown.Item eventKey="CBZ" onSelect={this.handleSubmit} >CBZ</Dropdown.Item>
                  <Dropdown.Item eventKey="PDF"  onSelect={this.handleSubmit} >PDF</Dropdown.Item>
                </DropdownButton>

            </InputGroup>

          </div>
        )}


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
