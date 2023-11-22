import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Container, Card, Form, Row, Col } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/HeaderMesero.css";

function VisualizarOrden() {
  const [ordenes, setOrdenes] = useState([]);
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [notaEspecial, setNotaEspecial] = useState("");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [direccion, setDireccion] = useState("");
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  const obtenerOrdenes = async () => {
    try {
      const response = await fetch("http://localhost:5000/tipo_orden/read");
      const data = await response.json();
      setOrdenes(data);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      alert("Error al obtener las órdenes");
    }
  };

  const limpiarFormulario = () => {
    setTipo("");
    setDescripcion("");
    setNotaEspecial("");
    setNumeroMesa("");
    setDireccion("");
    setIdSeleccionado(null);
    setIsEditing(false);
  };

  const validarFormulario = () => {
    if (tipo === "" || descripcion === "" || (tipo === "Local" && numeroMesa === "") || (tipo === "Domicilio" && direccion === "")) {
      handleShowModal("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setTipo(selectedTipo);
    if (selectedTipo === "Local") {
      setDireccion("");
    } else if (selectedTipo === "Domicilio") {
      setNumeroMesa("");
    }
  };

  const handleNumeroMesaChange = (e) => {
    const numero = e.target.value;
    setNumeroMesa(numero >= 1 ? numero : "");
  };

  const handleAgregar = async () => {
    if (!validarFormulario()) return;

    const nuevaOrden = {
      Tipo: tipo,
      Descripcion: descripcion,
      Nota_Especial: notaEspecial,
      Numero_Mesa: numeroMesa,
      Direccion: direccion,
    };

    try {
      const response = await fetch(`http://localhost:5000/tipo_orden/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaOrden),
      });

      if (response.ok) {
        handleShowModal("Orden creada con éxito");
        obtenerOrdenes();
      } else {
        handleShowModal("Error al agregar la orden");
      }
    } catch (error) {
      console.error("Error al agregar:", error);
      handleShowModal("Error al agregar la orden");
    }
    limpiarFormulario();
  };

  const handleActualizar = async () => {
    if (!validarFormulario() || idSeleccionado === null) return;

    const ordenToUpdate = {
      Tipo: tipo,
      Descripcion: descripcion,
      Nota_Especial: notaEspecial,
      Numero_Mesa: numeroMesa,
      Direccion: direccion,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/tipo_orden/update/${idSeleccionado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ordenToUpdate),
        }
      );

      if (response.ok) {
        handleShowModal("Orden actualizada con éxito");
        obtenerOrdenes();
      } else {
        handleShowModal("Error al actualizar la orden");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      handleShowModal("Error al actualizar la orden");
    }
    limpiarFormulario();
  };



  const handleEliminar = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/tipo_orden/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        handleShowModal("Orden eliminada con éxito");
        obtenerOrdenes();
      } else {
        handleShowModal("Error al eliminar la orden");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      handleShowModal("Error al eliminar la orden");
    }

  };

  const handleBuscar = (e) => {
    const textoBusqueda = e.target.value.toLowerCase();
    setBusqueda(textoBusqueda);
  };

  const ordenesFiltradas = ordenes.filter(orden => {
    const tipo = orden.Tipo ? orden.Tipo.toLowerCase() : "";
    const descripcion = orden.Descripcion ? orden.Descripcion.toLowerCase() : "";
    const notaEspecial = orden.Nota_Especial ? orden.Nota_Especial.toLowerCase() : "";
    const direccion = orden.Direccion ? orden.Direccion.toLowerCase() : "";
  
    return tipo.includes(busqueda) ||
      descripcion.includes(busqueda) ||
      notaEspecial.includes(busqueda) ||
      direccion.includes(busqueda);
  });
  

  return (
    <div className="body-content">
       <Container >
        <Card className="mt-1">
          <Card.Body>
            <Card.Title>Gestión de Órdenes</Card.Title>
            <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
              {mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}
            </Button>
            {mostrarFormulario && (
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formTipo">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control as="select" value={tipo} onChange={handleTipoChange}>
                        <option value="">Selecciona el tipo</option>
                        <option value="Local">Local</option>
                        <option value="Domicilio">Domicilio</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formDescripcion">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción de la orden" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formNotaEspecial">
                      <Form.Label>Nota Especial</Form.Label>
                      <Form.Control type="text" value={notaEspecial} onChange={(e) => setNotaEspecial(e.target.value)} placeholder="Nota especial si es necesaria" />
                    </Form.Group>
                  </Col>
                  <Col>
                    {tipo === "Local" && (
                      <Form.Group controlId="formNumeroMesa">
                        <Form.Label>Número de Mesa</Form.Label>
                        <Form.Control type="number" value={numeroMesa} onChange={handleNumeroMesaChange} placeholder="Número de mesa" min="1" />
                      </Form.Group>
                    )}
                    {tipo === "Domicilio" && (
                      <Form.Group controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección de entrega" disabled={tipo === "Local"} />
                      </Form.Group>
                    )}
                  </Col>
                </Row>
                <Button variant="primary" onClick={isEditing ? handleActualizar : handleAgregar}>
                  {isEditing ? <FaEdit /> : <FaPlus />} {isEditing ? "Actualizar Orden" : "Agregar Orden"}
                </Button>
                <Button variant="secondary" onClick={limpiarFormulario} className="ms-2">
                  Limpiar
                </Button>
                <Form.Group className="mt-3">
          <Form.Label>Buscar Orden</Form.Label>
          <Form.Control
            type="text"
            placeholder="Buscar por tipo, descripción, nota especial o dirección"
            value={busqueda}
            onChange={handleBuscar}
          />
        </Form.Group>
              </Form>
            )}
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Nota Especial</th>
                  <th>Número de Mesa</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {ordenesFiltradas.map((orden) => (
                  <tr key={orden.Id_Tipo_Orden}>
                    <td>{orden.Id_Tipo_Orden}</td>
                    <td>{orden.Tipo}</td>
                    <td>{orden.Descripcion}</td>
                    <td>{orden.Nota_Especial}</td>
                    <td>{orden.Numero_Mesa}</td>
                    <td>{orden.Direccion}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          setIdSeleccionado(orden.Id_Tipo_Orden);
                          setTipo(orden.Tipo);
                          setDescripcion(orden.Descripcion);
                          setNotaEspecial(orden.Nota_Especial);
                          setNumeroMesa(orden.Numero_Mesa);
                          setDireccion(orden.Direccion);
                          setIsEditing(true);
                        }}
                      >
                        <FaEdit /> Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleEliminar(orden.Id_Tipo_Orden)}
                        className="ms-2"
                      >
                        <FaTrash /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Mensaje</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default VisualizarOrden;
