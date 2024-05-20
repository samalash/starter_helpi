import { Button} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header({setDarkMode, darkMode}: {setDarkMode: (value: boolean) => void, darkMode: boolean}){
  const isSignedIn = localStorage.getItem("isSignedIn") === "true";

return(
  <Navbar bg="primary" variant="dark" className="px-2">
    <Navbar.Brand href="#/" className='pl-2'>Future Fit</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#/basic-questions">Basic Questions</Nav.Link>
      <Nav.Link href="#/detailed-questions">Detailed Questions</Nav.Link>
    </Nav>
    <Button className="ms-auto" onClick={() => {localStorage.setItem("isSignedIn", JSON.stringify(!isSignedIn)); window.location.reload();}}>
      <span>{isSignedIn ? "Sign out" : "Sign in"}</span>
    </Button>
    <Button className="text-6xl" onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☾" : "☼"}</Button>
  </Navbar>
);
}

export default Header;