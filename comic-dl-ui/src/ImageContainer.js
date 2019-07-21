import React, { Component } from 'react'
import Image    from 'react-bootstrap/Image'
import Col      from 'react-bootstrap/Col'
import Radium   from 'radium'

const print = console.log;

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

  componentDidMount = async() => {
    const { imageLinks }  =  this.props;
    const selectIconStyle =  {
      'color'    :  'gray',
      'position' :  'absolute',
      'padding'  :  '10px 0 0 10px'
    };
    const imageIdMappedToState = imageLinks
      .map( (link) => (
        {
          'url': link,
          'iconStyle': { ...selectIconStyle }
        }
      ));

    await this.setState({imageLinks: imageIdMappedToState});
    print(this.state)
  }
  handleClick = (i, iStyle) => {
    const { imageLinks } =  this.state;
    const color          =  imageLinks[i].iconStyle.color === 'limegreen' ? 'white' : 'limegreen';
    imageLinks[i].iconStyle  = { ...iStyle, color }

    this.setState({ imageLinks })
  }
  handleMousePassage = (i, iStyle, newColor, ignoreColor) => {
    const { imageLinks } =  this.state;
    const elementStyle   =  imageLinks[i].iconStyle;
    const color          =  newColor;

    if (elementStyle.color !== ignoreColor) { return }

    imageLinks[i].iconStyle = {...iStyle, color}
    this.setState({ imageLinks })
  }

  render = () => {
    const { imageLinks } = this.state;
    const { imageStyle, addNewBoxStyle } = this.state;
    return (
      <>
        <Col
          xs={12} sm={4} md={3}
          style     =  {addNewBoxStyle}
          className =  "d-flex align-items-center justify-content-center flex-column flex-wrap">
          <i className="glyphicon glyphicon-plus-sign" />
          <span style={{'paddingTop': '5px'}}>add cover page</span>
          <Image />

        </Col>

        {
          imageLinks.map( (image, i) => (
            <Col
              xs={4} sm={4} md={3}
              key={image.url}
              >
              <i style={ { ...imageLinks[i]['iconStyle'] } } className="glyphicon glyphicon-ok-sign" />
              <Image
                src          =  {image.url}
                style        =  {imageStyle}
                onClick      =  { () => this.handleClick(i, imageLinks[i]['iconStyle']) }
                onMouseEnter =  { () => this.handleMousePassage(i, imageLinks[i]['iconStyle'], 'white', 'gray') }
                onMouseLeave =  { () => this.handleMousePassage(i, imageLinks[i]['iconStyle'], 'gray', 'white') }
                thumbnail
                />
            </Col>
          ) )
        }
      </>
    );
  }
}

export default Radium(ImageContainer);
