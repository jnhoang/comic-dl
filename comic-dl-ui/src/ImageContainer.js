import React, { Component } from 'react'
import Radium   from 'radium'

import Col      from 'react-bootstrap/Col'
import Row      from 'react-bootstrap/Row'
import Button   from 'react-bootstrap/Button'

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ImageElement     from './components/ImageElements'
import { downloadFile } from './services'

const print = console.log;

const ICON_STYLE = {
  'color'    :  'gray',
  'position' :  'absolute',
  'padding'  :  '10px 0 0 10px',
  'height'   :  '1.75em',
  'width'    :  '1.75em',
};
const ADD_NEW_BOX_STYLE =  {
  'backgroundColor' :  'white',
  'borderRadius'    :  '4px',
  'outline'         :  '1px solid #dee2e6',
  'height'          :  '123px',
  'width'           :  '213px'
};


class ImageContainer extends Component {
  state = { 'imageLinks' :  [] };

  componentDidMount = () => {
    const { imageLinks }     =  this.props;
    const imagesToMapToState =  imageLinks.map( (link) => (
      {
        'url'       :  link,
        'iconStyle' :  ICON_STYLE,
        'selected'  :  false,
      }
    ));

    this.setState({ imageLinks: imagesToMapToState });
  }


  handleClick = (i) => {
    const { imageLinks }  =  this.state;
    const oldStyle        =  imageLinks[i].iconStyle;
    const color           =  imageLinks[i].iconStyle.color ===  'limegreen' ? 'white' : 'limegreen';

    imageLinks[i].iconStyle =  { ...oldStyle, color };
    imageLinks[i].selected  =  !imageLinks[i].selected;
    this.setState({ imageLinks })
  }


  handleMousePassage = (i, newColor, ignoreColor) => {
    const { imageLinks } =  this.state;
    const elementStyle   =  imageLinks[i].iconStyle;
    const color          =  newColor;

    if (elementStyle.color !== ignoreColor) { return }

    imageLinks[i].iconStyle = { ...elementStyle, color }
    this.setState({ imageLinks })
  }

  handleRemove = () => {
    const imagesToRemove = this.state.imageLinks
      .filter( (link) => !link.selected )
      .map(    (link) => link );

    this.setState({imageLinks: imagesToRemove})
  }

  handleSubmit = async() => {
    const { comicName, filename, filetype, issueNumber } = this.props;
    const { imageLinks } = this.state;

    const payload = {
      "comic_name"   :  comicName,
      'filename'     :  filename,
      'filetype'     :  filetype,
      "issue_number" :  issueNumber,
      "image_links"  :  imageLinks.map( links => links.url),
    }

    try {
      const response = await fetch('http://localhost:56029/api/download', {
        method  :  'POST',
        body    :  JSON.stringify(payload),
        headers :  { 'Content-Type': 'application/json' }
      })
      const data = await response.blob()
      downloadFile(data, filename);
    }
    catch(e) {
      print('error: ', e)
    }

  }

  render = () => {
    const { imageLinks } = this.state;
    return (
      <div>
        <Row>

          <Col
            xs={12}  sm={4}  md={3}
            style     =  {ADD_NEW_BOX_STYLE}
            className =  "d-flex align-items-center justify-content-center flex-column flex-wrap" >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{'paddingTop': '5px'}}>add cover page</span>
          </Col>

          {
            imageLinks.map( (image, i) => (
              <ImageElement
                i                  =  {i}
                key                =  {i}
                image              =  {image}
                iconStyle          =  {imageLinks[i].iconStyle}
                handleClick        =  {this.handleClick}
                handleMousePassage =  {this.handleMousePassage}
              />
            ))
          }
        </Row>

        <Row>
          <Col xs={6} sm={3}>
            <Button className='btn-success' onClick={this.handleSubmit}>Download</Button>
          </Col>
          <Col xs={6} sm={3}>
            <Button className='btn-danger'  onClick={this.handleRemove}>Remove Panels</Button>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Radium(ImageContainer);
