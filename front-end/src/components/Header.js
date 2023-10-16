import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Asegúrate de importar Link
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
          {/* Navbar principal */}
          <Navbar className="navbar-color" variant="dark" expand="md">
              <Container>
                  <Navbar.Brand>
                      <img src={logo} alt="Logo de Chontal Grill" className="navbar-logo" />
                      Chontal Grill
                  </Navbar.Brand>
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <Nav.Link href="#home">Inicio</Nav.Link>
                          <Nav.Link href="#menu">Menú</Nav.Link>
                          <Nav.Link href="#reservaciones">Reservaciones</Nav.Link>
                          <Nav.Link href="#orden">Orden en línea</Nav.Link>
                          <Nav.Link href="#comentarios">Comentarios</Nav.Link>
                          <Nav.Link href="#contacto">Contacto</Nav.Link>
                      </Nav>
                      {/* Botón "Personal Autorizado" en la parte derecha */}
                      <Link to="/login">
                          <Button
                              variant="outline-light"
                              className="btn-personal-autorizado ml-2"
                          >
                              Personal Autorizado
                          </Button>
                      </Link>
                  </Navbar.Collapse>
                  {/* Botón para mostrar/ocultar el menú lateral */}
                  <Button
                      variant="outline-light"
                      onClick={toggleMenu}
                      className="d-md-none" // Solo para dispositivos móviles
                  >
                      Menú
                  </Button>
              </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
              <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menú</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                  <Nav className="flex-column">
                      <Nav.Link href="#home">Inicio</Nav.Link>
                      <Nav.Link href="#menu">Menú</Nav.Link>
                      <Nav.Link href="#reservaciones">Reservaciones</Nav.Link>
                      <Nav.Link href="#orden">Orden en línea</Nav.Link>
                      <Nav.Link href="#comentarios">Comentarios</Nav.Link>
                      <Nav.Link href="#contacto">Contacto</Nav.Link>
                  </Nav>
              </Offcanvas.Body>
          </Offcanvas>
      </div>
  );
}

export default Header;
