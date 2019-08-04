import React, {Component} from 'react';
import Container      from 'react-bootstrap/Container'
import InputGroup     from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown       from 'react-bootstrap/Dropdown'
import Form           from 'react-bootstrap/Form'
import FormGroup      from 'react-bootstrap/FormGroup'
import FormControl    from 'react-bootstrap/FormControl'
import Col    from 'react-bootstrap/Col'

import ImageContainer from './ImageContainer'
import AccetableSites from './components/AcceptableSites'
import {baseUrl}      from './services'
import Button         from 'react-bootstrap/Button';

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

  initialize = () => {
    this.setState({
      comicLink   :  '',
      filename    :  '',
      imageLinks  :  [],
      comicName   :  '',
      filetype    :  'cbz',
      issueNumber :  '',
    })
  }

  handleSearch = async() => {
    const { comicLink, filetype }  =  this.state;
    const payload = {
      filetype,
      comic_link : comicLink
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
      filetype    :  filetype,
      imageLinks  :  data.image_links,
      issueNumber :  data.issue_number,
    })
  }

  handleChange = (event) => {
    this.setState({comicLink: event.target.value})
  }

  handleFiletypeChange = (event) => {
    this.setState({filetype: event.target.id})
  }

  render = () => {
    const {comicName, filename, filetype, imageLinks, issueNumber} = this.state;
    const initialize = this.initialize;
    return (

      <Container>
        { imageLinks.length === 0 && (
          <div>
            <AccetableSites />
            <Form>
              <Form.Row className="align-items-center">
                <Col xs={3} lg={2}>
                  <Form.Check
                    defaultChecked
                    inline
                    onChange={this.handleFiletypeChange}
                    type  =  "radio"
                    label =  "cbz"
                    name  =  "formRadios"
                    id    =  "cbz" />
                  <Form.Check
                    inline
                    onChange={this.handleFiletypeChange}
                    type  =  "radio"
                    label =  "pdf"
                    name  =  "formRadios"
                    id    =  "pdf" />
                </Col>

                <Col xs={9} lg={10}>
                  <InputGroup>
                    <FormControl
                      onChange    =  {this.handleChange}
                      placeholder =  "Paste URL here from acceptable site" />

                    <InputGroup.Append>
                      <Button onClick={this.handleSearch} variant="outline-secondary">Get Images</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Form.Row>
            </Form>
          </div>
        )}


        {
          imageLinks.length > 0 && <ImageContainer
            comicName   =  {comicName}
            imageLinks  =  {imageLinks}
            filename    =  {filename}
            filetype    =  {filetype}
            initialize  =  {initialize}
            issueNumber =  {issueNumber} />
        }

      </Container>
    )
  }
}


export default App;
