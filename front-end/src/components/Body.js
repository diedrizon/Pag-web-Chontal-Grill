import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/Body.css';

const Body = () => {
    return (
        <Container fluid className="p-0">

            {/* Banner Principal */}
            <section className="hero">
                <h1>Restaurante Gourmet</h1>
                <p>Una experiencia culinaria única.</p>
                <Button variant="light">Reserva tu mesa</Button>
            </section>

            {/* Sección de Especialidades */}
            <section className="specialties py-5">
                <Container>
                    <Row>
                        <Col md={4} sm={12}>
                            <img src="https://unsplash.com/photos/8CiMfxWndho/download?force=true" alt="Plato principal" className="img-fluid rounded-circle mb-4" />
                            <h3>Plato Principal</h3>
                            <p>Deliciosos platos preparados con ingredientes frescos y de calidad.</p>
                        </Col>
                        <Col md={4} sm={12}>
                            <img src="https://unsplash.com/photos/IGfIGP5ONV0/download?force=true" alt="Postres" className="img-fluid rounded-circle mb-4" />
                            <h3>Postres</h3>
                            <p>Endulza tu paladar con nuestras delicias.</p>
                        </Col>
                        <Col md={4} sm={12}>
                            <img src="https://unsplash.com/photos/4_jhDO54BYg/download?force=true" alt="Bebidas" className="img-fluid rounded-circle mb-4" />
                            <h3>Bebidas</h3>
                            <p>Refrescantes bebidas para acompañar tu comida.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonios */}
            <section className="testimonials py-5 bg-light">
                <Container>
                    <h2 className="text-center mb-5">Lo que nuestros clientes dicen</h2>
                    <Row>
                        <Col md={6} sm={12}>
                            <p>"Una experiencia culinaria inolvidable. ¡Volveré sin duda!"</p>
                            <h4>- Andrea L.</h4>
                        </Col>
                        <Col md={6} sm={12}>
                            <p>"El mejor restaurante de la ciudad. Excelente servicio y comida deliciosa."</p>
                            <h4>- Carlos M.</h4>
                        </Col>
                    </Row>
                </Container>
            </section>

        </Container>
    );
}

export default Body;

