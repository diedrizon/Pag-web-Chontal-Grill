import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Badge, Form, FloatingLabel, Button } from 'react-bootstrap';
import Header from '../components/Header';
import "../styles/MenuCliente.css";

function Galeria({ rol }) {
  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/menu/read')
      .then(response => response.json())
      .then(data => setMenus(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addToCart = (id, amount) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + amount
    }));
  };

  const adjustItemQuantity = (id, adjustment) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: Math.max((prevCart[id] || 0) + adjustment, 0)
    }));
  };

  const searchFilteredMenus = menus.filter((menu) => {
    const nombre = menu.Nombre.toLowerCase();
    const descripcion = menu.Descripcion.toLowerCase();
    const search = searchQuery.toLowerCase();
    return nombre.includes(search) || descripcion.includes(search);
  });

  const categorizeMenus = searchFilteredMenus.reduce((acc, menu) => {
    acc[menu.NombreCategoria] = [...(acc[menu.NombreCategoria] || []), menu];
    return acc;
  }, {});

  return (
    <div>
      <Header rol={rol} />
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="search" label="Buscar">
              <Form.Control
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FloatingLabel>
          </Col>
        </Row>

        {Object.keys(categorizeMenus).map((categoria, index) => (
          <div key={index}>
            <h3 className="mt-3">{categoria}</h3>
            <Row className="g-3">
              {categorizeMenus[categoria].map((menu, idx) => (
                <Col key={idx} sm="12" md="6" lg="4" xl="3">
                  <Card className="h-100 card-container">
                    <div className="image-container">
                      <Card.Img className="image-card" variant="top" src={`data:image/jpeg;base64,${menu.ImagenBase64}`} alt={menu.Nombre} />
                    </div>
                    <Card.Body>
                      <Card.Title className="card-title">{menu.Nombre}</Card.Title>
                      <Card.Text className="card-text">{menu.Descripcion}</Card.Text>
                      <div className="card-badge"><Badge bg="success">Precio: {menu.Precio}</Badge></div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="outline-secondary" onClick={() => adjustItemQuantity(menu.ID_Menu, -1)}>-</Button>
                        <span>{cart[menu.ID_Menu] || 0}</span>
                        <Button variant="outline-primary" onClick={() => adjustItemQuantity(menu.ID_Menu, 1)}>+</Button>
                      </div>
                      <Button className="mt-2 w-100" variant="outline-success" onClick={() => addToCart(menu.ID_Menu, cart[menu.ID_Menu] || 0)}>Agregar</Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Galeria;
