import React  from 'react';
import Image  from 'react-bootstrap/Image'
import Col    from 'react-bootstrap/Col'
import { faTimesCircle }    from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";

const ImageElement = ({
  i,
  image,
  iconStyle,
  handleClick,
  handleMousePassage,
}) => {
  const overlayStyle = {
    background   :  'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 21%,rgba(0,0,0,0) 100%)',
    borderRadius :  '2px',
    position     :  'absolute',
    width        :  '84%',
    height       :  '100%',

    ':hover': { cursor :  'pointer' }
  }
  return (
    <Col xs={4} sm={4} md={3} key={image.url} >
      <div
        style        =  {overlayStyle}
        onClick      =  { () => handleClick(i) }
        onMouseEnter =  { () => handleMousePassage(i, 'white', 'gray') }
        onMouseLeave =  { () => handleMousePassage(i, 'gray', 'white') }
        />
      <FontAwesomeIcon style={ iconStyle } icon={ faTimesCircle } />
      <Image src={ image.url } thumbnail />
    </Col>
  )
}

export default ImageElement;
