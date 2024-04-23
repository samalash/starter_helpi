import { Button} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(){
const name = localStorage.getItem("name");

return(
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#/">Career Helpi</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#/">Home</Nav.Link>
      <Nav.Link href="#/basic-questions">Basic Questions</Nav.Link>
      <Nav.Link href="#/detailed-questions">Detailed Questions</Nav.Link>
    </Nav>
      <Button disabled={name !== ""} className="ms-auto">{name === "" ? "Sign In" : name}</Button>
  </Navbar>
);
}

export default Header;