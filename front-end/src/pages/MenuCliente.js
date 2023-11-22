import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Badge,
  Button,
  ListGroup,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import Header from "../components/Header";
import "../styles/MenuCliente.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function Galeria({ rol }) {
  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [comentarios, setComentarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showOpiniones, setShowOpiniones] = useState(false);

  //Cerrar y abrir modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    fetch("http://localhost:5000/menu/read")
      .then((response) => response.json())
      .then((data) => setMenus(data))
      .catch((error) => console.error("Error:", error));

    fetch("http://localhost:5000/comentarios/read")
      .then((response) => response.json())
      .then((data) => setComentarios(data))
      .catch((error) =>
        console.error("Error al obtener los comentarios:", error)
      );
  }, []);

  //Total de Items
  const totalItems = Object.values(cart).reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Total de Compra
  const totalCompra = Object.values(cart).reduce(
    (total, item) => total + item.Precio * item.cantidad,
    0
  );

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const addToCart = (menu, amount) => {
    const newAmount = cart[menu.ID_Menu]
      ? cart[menu.ID_Menu].cantidad + amount
      : amount;
    setCart({
      ...cart,
      [menu.ID_Menu]: { ...menu, cantidad: Math.max(newAmount, 0) },
    });
  };

  const removeFromCart = (id) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
  };

  const searchFilteredMenus = menus.filter((menu) => {
    const nombre = menu.Nombre.toLowerCase();
    const descripcion = menu.Descripcion.toLowerCase();
    const search = searchQuery.toLowerCase();
    return nombre.includes(search) || descripcion.includes(search);
  });

  const categorizeMenus = searchFilteredMenus.reduce((acc, menu) => {
    const category = menu.NombreCategoria || "Otros";
    acc[category] = [...(acc[category] || []), menu];
    return acc;
  }, {});

  const renderStars = (calificacion, totalEstrellas = 5) => {
    let stars = [];
    // Añadir estrellas llenas
    for (let i = 0; i < totalEstrellas; i++) {
      stars.push(
        i < calificacion ? (
          <FaStar key={i} color="#ffc107" />
        ) : (
          <FaRegStar key={i} color="#e4e5e9" />
        )
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  // Calcular la calificación promedio y el número total de opiniones
  const calificacionPromedio =
    comentarios.reduce((acc, comentario) => acc + comentario.Calificacion, 0) /
    comentarios.length;
  const totalOpiniones = comentarios.length;

  return (
    <div>
      <Header rol={rol} />
      <Container className="mt-4">
        <Row className="mb-3 align-items-center">
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
        <Button variant="secondary" onClick={() => setShowOpiniones(true)}>
          {isNaN(calificacionPromedio) ? (
            "No hay opiniones"
          ) : (
            <>
              {renderStars(Math.round(calificacionPromedio))}
              <span>{totalOpiniones} opiniones</span>
            </>
          )}
        </Button>
        <Modal show={showOpiniones} onHide={() => setShowOpiniones(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Opiniones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {comentarios.map((comentario, index) => (
                <ListGroup.Item key={index} className="comentario-list-item">
                  <div className="comentario-content">
                    <div className="comentario-nombre">
                      <strong>
                        {comentario.Nombres} {comentario.Apellidos}
                      </strong>
                    </div>
                    <div className="comentario-rating">
                      {renderStars(comentario.Calificacion)}
                    </div>
                    <div className="comentario-texto">
                      {comentario.Comentario}
                    </div>
                    <div className="comentario-fecha">
                      {new Date(comentario.Fecha).toLocaleDateString()}
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>
        <Row>
          <Col md={11}>
            {Object.keys(categorizeMenus).map((categoria, index) => (
              <div key={index}>
                <h3 className="mt-3">{categoria}</h3>
                <Row className="g-3">
                  {categorizeMenus[categoria].map((menu, idx) => (
                    <Col key={idx} sm="12" md="6" lg="4" xl="3">
                      <Card className="h-100 card-container">
                        <Card.Img
                          variant="top"
                          src={`data:image/jpeg;base64,${menu.ImagenBase64}`}
                          alt={menu.Nombre}
                        />
                        <div className="product-info">
                          <Card.Title>{menu.Nombre}</Card.Title>
                          <Card.Text>{menu.Descripcion}</Card.Text>
                          <Badge bg="success">Precio: {menu.Precio}</Badge>
                        </div>
                        <Card.Footer>
                          <div className="d-flex justify-content-between align-items-center">
                            <Button
                              variant="outline-secondary"
                              onClick={() => addToCart(menu, -1)}
                            >
                              -
                            </Button>
                            <span>{cart[menu.ID_Menu]?.cantidad || 0}</span>
                            <Button
                              variant="outline-primary"
                              onClick={() => addToCart(menu, 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            className="mt-2 w-100"
                            variant="outline-success"
                            onClick={() => addToCart(menu, 1)}
                          >
                            Agregar
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              className="cart-button"
              onClick={handleShow}
            >
              <FaShoppingCart />
              <span className="cart-counter">{totalItems}</span>
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mi pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {Object.keys(cart).map((key) => (
              <ListGroup.Item
                key={key}
                className="d-flex justify-content-between align-items-stretch cart-list-item"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`data:image/jpeg;base64,${cart[key].ImagenBase64}`}
                    alt={cart[key].Nombre}
                    className="cart-item-image"
                  />
                  <div>
                    <div>{cart[key].Nombre}</div>
                    <Badge bg="success">Precio: {cart[key].Precio}</Badge>
                  </div>
                </div>
                <div className="button-group">
                  <Button
                    variant="outline-secondary"
                    onClick={() => addToCart(cart[key], -1)}
                  >
                    -
                  </Button>
                  <span className="px-3">{cart[key].cantidad}</span>
                  <Button
                    variant="outline-primary"
                    onClick={() => addToCart(cart[key], 1)}
                  >
                    +
                  </Button>
                  <Button variant="danger" onClick={() => removeFromCart(key)}>
                    Quitar
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <h1 className="total">Total = C${totalCompra}</h1>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Galeria;
