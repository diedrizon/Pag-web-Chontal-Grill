import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} xs={12}>
            <h4>Dirección</h4>
            <p>Calle Principal donde fueron los bomberos, Juigalpa, Chontales, Nicaragua</p>
          </Col>
          <Col md={4} xs={12}>
            <h4>Contacto</h4>
            <p>Teléfono: +505 456 7890</p>
            <p>Email: info@chontalgrill.com</p>
          </Col>
          <Col md={4} xs={12}>
            <h4>Síguenos</h4>
            <p>
              <a href="https://www.facebook.com/chontalgrill/" target="_blank" rel="noopener noreferrer">Facebook</a> |
              <a href="https://www.facebook.com/chontalgrill/" target="_blank" rel="noopener noreferrer">Instagram</a> |
              <a href="https://www.facebook.com/chontalgrill/" target="_blank" rel="noopener noreferrer">Twitter</a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <Form>
              <h4>Contacto</h4>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
              </Form.Group>

              <Form.Group controlId="formBasicMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Enviar mensaje
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <p>© 2023 Chontal Grill. Todos los derechos reservados.</p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
