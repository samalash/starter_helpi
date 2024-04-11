import { Button} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(){

return(
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#/">Career Helpi</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#/">Home</Nav.Link>
      <Nav.Link href="#/basic-questions">Basic Questions</Nav.Link>
      <Nav.Link href="#/detailed-questions">Detailed Questions</Nav.Link>
    </Nav>
      <Button className="ms-auto">Sign In</Button>
  </Navbar>
);
}

export default Header;