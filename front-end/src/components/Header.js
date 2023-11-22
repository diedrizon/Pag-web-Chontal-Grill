import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Offcanvas, Button, Container,NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Importación del ícono de salida
import "../styles/App.css";
import logo from "../assets/images/LogoOficial.png";

function Header({ rol, setRol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    setRol("Cliente");
    localStorage.setItem("userRol", "Cliente");
  };

  return (
    <div>
      {rol === "Cliente" && (
        <div>
          <Navbar
            className={`navbar-color-${rol.toLowerCase()}`}
            variant="dark"
            expand="md"
            fixed="top"
          >
            <Container>
              <Navbar.Brand href="#home">
                <img src={logo} alt="Logo" className="brand-logo" />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={toggleMenu}
                className="d-md-none d-block"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link
                    as={Link}
                    to="/menucliente"
                    className="btn btn-outline-dark ms-2"
                  >
                    Menú
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/reservacion"
                    className="btn btn-outline-dark ms-2"
                  >
                    Reservaciones
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className="btn btn-outline-dark ms-2"
                  >
                    Iniciar sesión
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? "true" : "false"}
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
                <Nav.Link as={Link} to="/menucliente" className="link-unstyled">
                  Menú
                </Nav.Link>
                <Nav.Link as={Link} to="/reservacion" className="link-unstyled">
                  Reservaciones
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="link-unstyled">
                  Iniciar sesión
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
      {rol === "Administrador" && (
        <div>
          <Navbar
            className={`navbar-color-${rol.toLowerCase()}`}
            variant="dark"
            expand="md"
            fixed="top"
          >
            <Container>
              <Navbar.Brand href="#home">
                <img src={logo} alt="Logo" className="brand-logo" />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={toggleMenu}
                className="d-md-none d-block"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link
                    as={Link}
                    to="/"
                    className="btn btn-outline-dark ms-2"
                  >
                    Inicio
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/menu"
                    className="btn btn-outline-dark ms-2"
                  >
                    Menú
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/empleado"
                    className="btn btn-outline-dark ms-2"
                  >
                    Empleado
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/categoria"
                    className="btn btn-outline-dark ms-2"
                  >
                    Registrar Categoría
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/reservacion"
                    className="btn btn-outline-dark ms-2"
                  >
                    Registrar Reservaciones
                  </Nav.Link>
                  <NavDropdown title="Estadisticas" id="descuentos">
  <NavDropdown.Item>
    <Link to="/EstadisticasEmpleado" className="link-unstyled">Estadisticas Empleado</Link>
  </NavDropdown.Item>
  <NavDropdown.Item>
    <Link to="/EstadisticasOrden" className="link-unstyled">Estadisticas Orden</Link>
  </NavDropdown.Item>
</NavDropdown>

                  
                  <Button
                    variant="outline-light"
                    onClick={handleLogout}
                    className="ms-2"
                  >
                    <FaSignOutAlt /> Salir
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/" className="link-unstyled">
                  Inicio
                </Nav.Link>
                <Nav.Link as={Link} to="/menu" className="link-unstyled">
                  Menú
                </Nav.Link>
                <Nav.Link as={Link} to="/empleado" className="link-unstyled">
                  Empleado
                </Nav.Link>
                <Nav.Link as={Link} to="/categoria" className="link-unstyled">
                  Registrar Categoría
                </Nav.Link>
                <Nav.Link as={Link} to="/reservacion" className="link-unstyled">
                  Registrar Reservaciones
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/EstadisticasEmpleado"
                  className="link-unstyled"
                >
                  Estadísticas
                </Nav.Link>
                <Button
                  variant="outline-dark"
                  onClick={handleLogout}
                  className="w-100 mt-3"
                >
                  <FaSignOutAlt /> Salir
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}

      {rol === "Mesero" && (
        <div>
          <Navbar
            className={`navbar-color-${rol.toLowerCase()}`}
            variant="dark"
            expand="md"
            fixed="top"
          >
            <Container>
              <Navbar.Brand href="#home">
                <img src={logo} alt="Logo" className="brand-logo" />
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: "none" }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link
                    as={Link}
                    to="/"
                    className="btn btn-outline-dark ms-2"
                  >
                    Inicio
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/tipoorden"
                    className="btn btn-outline-dark ms-2"
                  >
                    Registrar tipo de orden
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/orden"
                    className="btn btn-outline-dark ms-2"
                  >
                    Registrar Orden
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/gestionOrden"
                    className="btn btn-outline-dark ms-2"
                  >
                    Gestion Orden
                  </Nav.Link>
                  <Button
                    variant="outline-light"
                    onClick={handleLogout}
                    className="ms-2"
                  >
                    <FaSignOutAlt /> Salir
                  </Button>
                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? "true" : "false"}
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
                <Nav.Link as={Link} to="/" className="link-unstyled">
                  Inicio
                </Nav.Link>

                <Nav.Link as={Link} to="/tipoorden" className="link-unstyled">
                  Tipo de Orden
                </Nav.Link>
                <Nav.Link as={Link} to="/orden" className="link-unstyled">
                  Registrar Orden
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/gestionOrden"
                  className="link-unstyled"
                >
                  Gestion Orden
                </Nav.Link>
                <Button
                    variant="outline-light"
                    onClick={handleLogout}
                    className="ms-2"
                  >
                    <FaSignOutAlt /> Salir
                  </Button>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </div>
  );
}

export default Header;
