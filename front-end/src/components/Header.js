import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import logo from '../assets/images/LogoPNG.png'; // Asegúrate de tener la ruta correcta a tu imagen

function Header({ rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      {rol === 'Administrador' && (
        <div>
          <Navbar className='navbar-color' variant='dark' expand='md' fixed='top'>
            <Container>
              <Navbar.Brand href='#home'>
                <img src={logo} alt='Logo' className='brand-logo' />
                Administrador
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls='basic-navbar-nav'
                style={{ display: 'none' }}
                className='d-sm-none d-xs-none'
              />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                  <Nav.Link as={Link} to='/' className='link-unstyled'>
                    Inicio
                  </Nav.Link>
                  <Nav.Link as={Link} to='/menu' className='link-unstyled'>
                    Menu
                  </Nav.Link>
                  <Nav.Link as={Link} to='/empleado' className='link-unstyled'>
                    Empleado
                  </Nav.Link>
                  <Nav.Link as={Link} to='/categoria' className='link-unstyled'>
                    Registrar Categoria
                  </Nav.Link>
                  <Nav.Link as={Link} to='/reservacion' className='link-unstyled'>
                    Registrar Reservaciones
                  </Nav.Link>
                  <Nav.Link as={Link} to='/EstadisticasEmpleado' className='link-unstyled'>
                    Estadísticas
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Button
                variant='outline-light'
                onClick={toggleMenu}
                className='d-md-none d-block'
                aria-controls='basic-navbar-nav'
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>
          <Offcanvas show={showMenu} onHide={toggleMenu} placement='start'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='flex-column'>
              <Nav.Link as={Link} to='/' className='link-unstyled'>
                    Inicio
                  </Nav.Link>
                  <Nav.Link as={Link} to='/menu' className='link-unstyled'>
                    Menu
                  </Nav.Link>
                  <Nav.Link as={Link} to='/empleado' className='link-unstyled'>
                    Empleado
                  </Nav.Link>
                  <Nav.Link as={Link} to='/categoria' className='link-unstyled'>
                    Registrar Categoria
                  </Nav.Link>
                  <Nav.Link as={Link} to='/reservacion' className='link-unstyled'>
                    Registrar Reservaciones
                  </Nav.Link>
                  <Nav.Link as={Link} to='/EstadisticasEmpleado' className='link-unstyled'>
                    Estadísticas
                  </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}

      {rol === 'Mesero' && (
        <div>
          <Navbar className='navbar-color' variant='dark' expand='md'>
            <Container>
              <Navbar.Brand href='#home'>
                <img src={logo} alt='Logo' className='brand-logo' />
                Mesero
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls='basic-navbar-nav'
                style={{ display: 'none' }}
                className='d-sm-none d-xs-none'
              />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                  <Nav.Link as={Link} to='/' className='link-unstyled'>
                    Inicio
                  </Nav.Link>
                  <Nav.Link as={Link} to='/tipoorden' className='link-unstyled'>
                    Registrar tipo de orden
                  </Nav.Link>
                  <Nav.Link as={Link} to='/orden' className='link-unstyled'>
                    Registrar Orden
                  </Nav.Link>
                  <Nav.Link as={Link} to='/gestionOrden' className='link-unstyled'>
                 Gestion Orden
                </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Button
                variant='outline-light'
                onClick={toggleMenu}
                className='d-md-none d-block'
                aria-controls='basic-navbar-nav'
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>
          <Offcanvas show={showMenu} onHide={toggleMenu} placement='start'>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='flex-column'>
                <Nav.Link as={Link} to='/' className='link-unstyled'>
                  Inicio
                </Nav.Link>
               
                <Nav.Link as={Link} to='/tipoorden' className='link-unstyled'>
                Tipo de Orden
                </Nav.Link>
                <Nav.Link as={Link} to='/orden' className='link-unstyled'>
                  Registrar Orden
                </Nav.Link>
                <Nav.Link as={Link} to='/gestionOrden' className='link-unstyled'>
                 Gestion Orden
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </div>
  );
}

export default Header;
