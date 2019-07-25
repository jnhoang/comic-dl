import React   from 'react'
import Navbar  from 'react-bootstrap/Navbar'
import Nav     from 'react-bootstrap/Nav'
import Button  from 'react-bootstrap/Button'


const ComicNavbar = ({ handleSubmit, handleRemove }) => {

  return (
    <Navbar sticky="top">
      <Nav>
      <Button className='btn-danger mr-5' onClick={handleRemove}>Remove Panels</Button>
      <Button className='btn-success'     onClick={handleSubmit}>Download</Button>
      </Nav>
    </Navbar>
  )
}

export default ComicNavbar;
