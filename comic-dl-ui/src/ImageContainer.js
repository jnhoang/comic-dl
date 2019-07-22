import React, { Component } from 'react'
import Radium   from 'radium'
import Image    from 'react-bootstrap/Image'
import Col      from 'react-bootstrap/Col'
import Row      from 'react-bootstrap/Row'
import Button   from 'react-bootstrap/Button'

import {
  faCheckCircle,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const print = console.log;

const ICON_STYLE = {
  'color'    :  'gray',
  'position' :  'absolute',
  'padding'  :  '10px 0 0 10px',
  'height'   :  '1.75em',
  'width'    :  '1.75em',
};

class ImageContainer extends Component {
  state = {
    'imageLinks'     :  [],
    'addNewBoxStyle' :  {
      'backgroundColor' :  'white',
      'borderRadius'    :  '4px',
      'outline'         :  '1px solid #dee2e6',
      'height'          :  '123px',
      'width'           :  '213px'
    },
    'imageStyle': {
      ':hover': {
        'cursor'     :  'pointer',
        'transition' :  'none 0s ease 0s',
        'transform'  :  'translate3d(0px, 0px, 0px)',
      },
    }
  }

  componentDidMount = () => {
    const { imageLinks }     =  this.props;
    const imagesToMapToState =  imageLinks.map( (link) => (
        {
          'url'       :  link,
          'iconStyle' :  { ...ICON_STYLE },
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


  handleSubmit = () => {
    const selectedImages = this.state.imageLinks.filter( (link) => link.selected )
    print(selectedImages)

  }

  render = () => {
    const { imageLinks, imageStyle, addNewBoxStyle } = this.state;
    return (
      <div>
        <Row>
          <Col
            xs={12}  sm={4}  md={3}
            style     =  {addNewBoxStyle}
            className =  "d-flex align-items-center justify-content-center flex-column flex-wrap" >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span style={{'paddingTop': '5px'}}>add cover page</span>
            <Image />
          </Col>

          {
            imageLinks.map( (image, i) => (
              <ImageElement
                i                  =  {i}
                key                =  {i}
                image              =  {image}
                imageStyle         =  {imageStyle}
                iconStyle          =  {imageLinks[i].iconStyle}
                handleClick        =  {this.handleClick}
                handleMousePassage =  {this.handleMousePassage}
              />
            ) )
          }
        </Row>

        <Button onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}

const ImageElement = ({
  i,
  image,
  imageStyle,
  iconStyle,
  handleClick,
  handleMousePassage,
}) => {

  return (
    <Col xs={4} sm={4} md={3} key={image.url} >
      <FontAwesomeIcon style={ iconStyle } icon={ faCheckCircle } />
      <Image
        src          =  { image.url }
        style        =  { imageStyle }
        onClick      =  { () => handleClick(i) }
        onMouseEnter =  { () => handleMousePassage(i, 'white', 'gray') }
        onMouseLeave =  { () => handleMousePassage(i, 'gray', 'white') }
        thumbnail
        />
    </Col>
  )
}

export default Radium(ImageContainer);
