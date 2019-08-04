import React, { Component } from 'react'
import Radium   from 'radium'

import Col      from 'react-bootstrap/Col'
import Row      from 'react-bootstrap/Row'

import { faPlusCircle }     from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";

import ComicNavbar      from './components/ComicNavbar'
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
  'height'          :  '230px',
  'width'           :  '150px',

  ':hover'          :  { cursor :  'pointer' }
};


class ImageContainer extends Component {
  state = {
    'imageLinks'          :  [],
    'customImageCover'    :  '',
    'isShowAddCoverInput' :  false,
    'isShowAddCoverBtn'   :  true,
  };

  componentDidMount = () => {
    this.mapImageLinksToArray();
  }

  componentDidUpdate = (prevProps) => {
    const prevImages  =  prevProps.imageLinks;
    const newImages   =  this.props.imageLinks;

    if (newImages.length > prevImages.length) {
      this.mapImageLinksToArray();
    }
  }

  mapImageLinksToArray = () => {
    const { imageLinks } =  this.props;
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
    const color           =  imageLinks[i].iconStyle.color ===  'red' ? 'white' : 'red';

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

  handleDelete = () => fetch('http://localhost:56029/api/remove_temp');

  handleDownload = async() => {
    const { comicName, filename, filetype, issueNumber, initialize } = this.props;
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

      initialize();
    }
    catch(e) { print('error: ', e); }
    finally  { this.handleDelete(); }

  }

  handleClickCustomCover = () => this.setState({isShowAddCoverInput: true});

  handleAddCoverImage = () => {
    const {customImageCover, imageLinks} = this.state;
    const newCover = {
      'url'       :  customImageCover,
      'iconStyle' :  ICON_STYLE,
      'selected'  :  false,
    }
    this.setState({
      isShowAddCoverBtn   :  false,
      imageLinks          :  [ newCover, ...imageLinks ],
      isShowAddCoverInput :  false
    })
  }
  handleAddCoverInputChange = (event) => this.setState({'customImageCover': event.target.value});

  render = () => {
    const { imageLinks, isShowAddCoverInput, isShowAddCoverBtn } = this.state;
    return (
      <div>

        <ComicNavbar
          handleDownload            =  {this.handleDownload}
          handleRemove              =  {this.handleRemove}
          handleAddCoverImage       =  {this.handleAddCoverImage}
          isShowAddCoverInput       =  {isShowAddCoverInput}
          handleSearch              =  {this.props.handleSearch}
          handleChange              =  {this.props.handleChange}
          handleAddCoverInputChange =  {this.handleAddCoverInputChange} />

        <Row>
          <Col xs={12} sm={4} md={3} onClick={this.handleClickCustomCover} style= {{ display: isShowAddCoverBtn ? 'block' : 'none'}}>
            <div style={ADD_NEW_BOX_STYLE} className ="d-flex align-items-center justify-content-center flex-column flex-wrap">
              <FontAwesomeIcon icon={faPlusCircle} />
              <span style={{'paddingTop': '5px'}}>add cover page</span>
            </div>
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
      </div>
    );
  }
}


export default Radium(ImageContainer);
