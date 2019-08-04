import React        from 'react'
import Navbar       from 'react-bootstrap/Navbar'
import Nav          from 'react-bootstrap/Nav'
import Button       from 'react-bootstrap/Button'
import InputGroup   from 'react-bootstrap/InputGroup'
import FormControl  from 'react-bootstrap/FormControl'

const ComicNavbar = ({
  handleDownload,
  handleRemove,
  isShowAddCoverInput,
  handleAddCoverImage,
  handleAddCoverInputChange,
}) => {

  return (
    <React.Fragment>
      <Navbar sticky="top">
        <Nav>
          <Button className='btn-danger mr-5' onClick={handleRemove}>Remove Panels</Button> <Button className='btn-success'     onClick={handleDownload}>Download</Button>
        </Nav>
      </Navbar>

      <Navbar>
        {
          isShowAddCoverInput && (
            <InputGroup className="mb-3">
              <FormControl placeholder="paste cover URL here" onChange={handleAddCoverInputChange} />
              <InputGroup.Append>
                <Button
                  onClick={handleAddCoverImage}
                  variant="outline-secondary">
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          )
        }
      </Navbar>
    </React.Fragment>
  )
}

export default ComicNavbar;
