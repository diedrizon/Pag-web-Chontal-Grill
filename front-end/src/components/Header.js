import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../assets/images/LogoPNG.png';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
      setShowMenu(!showMenu);
  };

  return (
      <div>

          <Navbar className="navbar-color" variant="dark" expand="md">
              <Container>
                  <Navbar.Brand>
                      <img src={logo} alt="Logo de Chontal Grill" className="navbar-logo" />
                      Chontal Grill
                  </Navbar.Brand>
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <Link className="nav-link" to="/home">Inicio</Link>
                          <Link className="nav-link" to="/menu">Menú</Link>
                          <Link className="nav-link" to="/reservaciones">Reservaciones</Link>
                          <Link className="nav-link" to="/orden">Orden en línea</Link>
                          <Link className="nav-link" to="/comentarios">Comentarios</Link>
                          <Link className="nav-link" to="/contacto">Contacto</Link>
                      </Nav>

                      <Link to="/login">
                          <Button
                              variant="outline-light"
                              className="btn-personal-autorizado ml-2"
                          >
                              Personal Autorizado
                          </Button>
                      </Link>
                  </Navbar.Collapse>

                  <Button
                      variant="outline-light"
                      onClick={toggleMenu}
                      className="d-md-none" 
                  >
                      Menú
                  </Button>
              </Container>
          </Navbar>

          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
              <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menú</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                  <Nav className="flex-column">
                      <Link className="nav-link" to="/home">Inicio</Link>
                      <Link className="nav-link" to="/menu">Menú</Link>
                      <Link className="nav-link" to="/reservaciones">Reservaciones</Link>
                      <Link className="nav-link" to="/orden">Orden en línea</Link>
                      <Link className="nav-link" to="/comentarios">Comentarios</Link>
                      <Link className="nav-link" to="/contacto">Contacto</Link>
                  </Nav>
              </Offcanvas.Body>
          </Offcanvas>
      </div>
  );
}

export default Header;
