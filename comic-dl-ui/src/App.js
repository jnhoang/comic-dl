import React, {Component} from 'react';
import Container      from 'react-bootstrap/Container'
import InputGroup     from 'react-bootstrap/InputGroup'
import Form           from 'react-bootstrap/Form'
import FormControl    from 'react-bootstrap/FormControl'
import Col            from 'react-bootstrap/Col'

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
    const { comicLink, filetype, imageLinks } =  this.state;
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
      imageLinks  :  [ ...imageLinks, ...data.image_links ],
      issueNumber :  data.issue_number,
      comicLink   : '',
    })
  }

  handleChange         =  (event) => this.setState({comicLink: event.target.value});
  handleFiletypeChange =  (event) => this.setState({filetype: event.target.id});

  render = () => {
    const { comicName, filename, filetype, imageLinks, issueNumber } = this.state;
    const { initialize, handleFiletypeChange, handleChange, handleSearch } = this;
    return (

      <Container>
        { imageLinks.length === 0 && (
          <div>
            <AccetableSites />
            <Form>
              <Form.Row className="align-items-center">
                <div>
                  <Form.Check
                    defaultChecked
                    inline
                    onChange={handleFiletypeChange}
                    type  =  "radio"
                    label =  "cbz"
                    name  =  "formRadios"
                    id    =  "cbz" />
                  <Form.Check
                    inline
                    onChange={handleFiletypeChange}
                    type  =  "radio"
                    label =  "pdf"
                    name  =  "formRadios"
                    id    =  "pdf" />
                </div>

                <Col xs={9} lg={10}>
                  <InputGroup>
                    <FormControl
                      onChange    =  {handleChange}
                      placeholder =  "Paste URL here from acceptable site" />

                    <InputGroup.Append>
                      <Button onClick={handleSearch} variant="outline-secondary">Get Images</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Form.Row>
            </Form>
          </div>
        )}


        {
          imageLinks.length > 0 && <ImageContainer
            comicName    =  {comicName}
            imageLinks   =  {imageLinks}
            filename     =  {filename}
            filetype     =  {filetype}
            initialize   =  {initialize}
            handleSearch =  {handleSearch}
            handleChange =  {handleChange}
            issueNumber  =  {issueNumber} />
        }

      </Container>
    )
  }
}


export default App;
