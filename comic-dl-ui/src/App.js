import React      from 'react';
import Container  from 'react-bootstrap/Container'
import            Row from 'react-bootstrap/Row'

import ImageContainer from './ImageContainer'
import './css/bootstrap.min.css'
const print = console.log

const App = () => {
  const imageLinks = [
    'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
    'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
    // 'https://2.bp.blogspot.com/-RxqtUUMHMbI/WqCKWYsAgXI/AAAAAAAAEUQ/QTn0DvwHM0Y70QIRi_Cj4lfEINxwP52EgCHMYCw/s1600/RCO001.jpg',
    // 'https://2.bp.blogspot.com/-uUVBZgQek2w/WqCKWkKzXXI/AAAAAAAAEUU/e7c_gvh_iOYqEK9Mo-VuL_96PYa5spOCgCHMYCw/s1600/RCO002_w.jpg',
    // 'https://2.bp.blogspot.com/-9o-T9zXEWKA/WqCKXIiIw1I/AAAAAAAAEUY/ccEHCHXHhkc19ESJpT7pssGc1gjXY-9JwCHMYCw/s1600/RCO003.jpg',
  ]

  return (
    <Container>
      <header className="App-header">
        This is the header
      </header>
      <Row>
        <ImageContainer
          imageLinks = {imageLinks}
        />
      </Row>

    </Container>
  );
}


export default App;
