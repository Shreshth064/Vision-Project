import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import '../styles/header.css';

function Header() {
  return (
    <Navbar expand="lg" className="header">
      <Container fluid>
        <Navbar.Brand href="/"><img className='header-logo' src={logo}></img></Navbar.Brand>
        <Navbar.Brand className='header-title' href="/"><b>Visionnaires</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className='justify-content-end' id="navbarScroll">
          <Nav
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='header-link' href="/">Home</Nav.Link>
            <Nav.Link className='header-link' href="/products">Products</Nav.Link>
            <Nav.Link className='header-link' href="/aboutus">About Us</Nav.Link>
            <Nav.Link className='header-link' href="/contactus">Contact Us</Nav.Link>
            <Button className='header-button' variant="outline-primary" href="/login">Go to Dashboard</Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default Header;