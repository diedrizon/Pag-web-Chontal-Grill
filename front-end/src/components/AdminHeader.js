import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function AdminHeader() {
    const [showMenu, setShowMenu] = useState(false);

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
                            <Link className="nav-link" to="/home">Inicio</Link>
                            <Link className="nav-link" to="/menu">Menú</Link>
                            <Link className="nav-link" to="/Reservaciones">Reservaciones</Link>
                            <Link className="nav-link" to="/Categoria">Categoría</Link>
                            <Link className="nav-link" to="/Empleado">Empleado</Link>
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
                        <Link className="nav-link" to="/home">Inicio</Link>
                        <Link className="nav-link" to="/menu">Menú</Link>
                        <Link className="nav-link" to="/Reservaciones">Reservaciones</Link>
                        <Link className="nav-link" to="/Categoria">Categoría</Link>
                        <Link className="nav-link" to="/Empleado">Empleado</Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default AdminHeader;
