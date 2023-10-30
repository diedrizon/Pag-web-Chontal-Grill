import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function MeseroHeader() {
    const [showMenu, setShowMenu] = useState(false);
    const [showOrdenes, setShowOrdenes] = useState(false);

    const toggleMenu = () => {
        if (!showMenu) setShowOrdenes(false);
        setShowMenu(!showMenu);
    };

    const handleOrdenesClick = () => {
        if (!showOrdenes) setShowMenu(false);
        setShowOrdenes(true);
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
                            <Nav.Link href="#home" onClick={() => { setShowMenu(false); setShowOrdenes(false); }}>Inicio</Nav.Link>
                            <Link to="/menutext" className="nav-link" onClick={() => { setShowMenu(false); setShowOrdenes(false); }}>Menú</Link>
                            <Nav.Link href="#ordenes" onClick={handleOrdenesClick}>Ordenes</Nav.Link>
                            <Link to="/TipoOrden" className="nav-link" onClick={() => { setShowMenu(false); setShowOrdenes(false); }}>Tipo de Orden</Link>  {/* Nuevo enlace para Tipo de Orden */}
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
                        <Nav.Link href="#home" onClick={() => { setShowMenu(false); setShowOrdenes(false); }}>Inicio</Nav.Link>
                        <Link to="/menutext" className="nav-link" onClick={() => { setShowMenu(false); setShowOrdenes(false); }}>Menú</Link>
                        <Nav.Link href="#ordenes" onClick={handleOrdenesClick}>Ordenes</Nav.Link>
                        <Link to="/TipoOrden" className="nav-link" onClick={() => { setShowMenu(false); setShowOrdenes(false); }}>Tipo de Orden</Link>  {/* Nuevo enlace para Tipo de Orden */}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
}

export default MeseroHeader;
