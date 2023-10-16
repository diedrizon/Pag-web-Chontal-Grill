import React, { useState } from 'react';
import Categoria from '../pages/Customer'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function AdminHeader() {
    const [showMenu, setShowMenu] = useState(false);
    const [showCategoria, setShowCategoria] = useState(false); 

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleCategoriaClick = () => {
        setShowCategoria(true);
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
                            <Nav.Link href="#home">Inicio</Nav.Link>
                            <Nav.Link href="#menu">Menú</Nav.Link>
                            <Nav.Link href="#reservaciones">Reservaciones</Nav.Link>
                            <Nav.Link href="#categoria" onClick={handleCategoriaClick}>Categoría</Nav.Link>
                        </Nav>
                        <Button
                            variant="outline-light"
                            onClick={toggleMenu}
                            className="d-md-none d-block"
                            aria-controls="basic-navbar-nav"
                            aria-expanded={showMenu ? 'true' : 'false'}
                        >
                            Menú
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menú</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link href="#home">Inicio</Nav.Link>
                        <Nav.Link href="#menu">Menú</Nav.Link>
                        <Nav.Link href="#reservaciones">Reservaciones</Nav.Link>
                        <Nav.Link href="#categoria" onClick={handleCategoriaClick}>Categoría</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {showCategoria && <Categoria />}
        </div>
    );
}

export default AdminHeader;
