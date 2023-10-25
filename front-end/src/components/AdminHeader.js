import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


function AdminHeader() {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();  // Hook de navegación

    const handleNavigation = (path) => {
        setShowMenu(false);  // Esto cerrará el menú cada vez que se navegue a una nueva página
        navigate(path);
    };
    
    return (
        <div>
            <Navbar className="navbar-color" variant="dark" expand="md">
                <Container>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        style={{ display: 'none' }}
                        className="d-sm-none d-xs-none"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home" onClick={() => { setShowMenu(false); }}>Inicio</Nav.Link>
                            <Link to="/menu" className="nav-link" onClick={() => { setShowMenu(false); }}>Menú</Link>
                            <Nav.Link href="#reservaciones" onClick={() => { setShowMenu(false); }}>Reservaciones</Nav.Link>
                            <Nav.Link onClick={() => handleNavigation('/Categoria')}>Categoría</Nav.Link>
                            <Nav.Link onClick={() => handleNavigation('/Empleado')}>Empleado</Nav.Link>
                        </Nav>
                        <Button
                            variant="outline-light"
                            onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}
                            className="d-md-none d-block"
                            aria-controls="basic-navbar-nav"
                            aria-expanded={showMenu ? 'true' : 'false'}
                        >
                            Menú
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menú</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="#home" onClick={() => { setShowMenu(false); }}>Inicio</Nav.Link>
                        <Link to="/menu" className="nav-link" onClick={() => { setShowMenu(false); }}>Menú</Link>
                        <Nav.Link href="#reservaciones" onClick={() => { setShowMenu(false); }}>Reservaciones</Nav.Link>
                        <Nav.Link onClick={() => handleNavigation('/Categoria')}>Categoría</Nav.Link>
                        <Nav.Link onClick={() => handleNavigation('/Empleado')}>Empleado</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default AdminHeader;
