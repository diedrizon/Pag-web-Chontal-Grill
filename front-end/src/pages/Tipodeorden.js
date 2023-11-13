import React, { useState, useEffect } from "react";
import { Table, Button, Container, Card, Form } from "react-bootstrap";
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

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  const limpiarFormulario = () => {
    setTipo("");
    setDescripcion("");
    setNotaEspecial("");
    setNumeroMesa("");
    setDireccion("");
    setIdSeleccionado(null); // Asegúrate de que el estado de edición también se limpie
    setIsEditing(false);
  };

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

  const handleAgregar = async () => {
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
        alert("Orden creada con éxito");
        setTipo("");
        setDescripcion("");
        setNotaEspecial("");
        setNumeroMesa("");
        setDireccion("");
        obtenerOrdenes();
        setIsEditing(false);
      } else {
        alert("Error al agregar la orden");
      }
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar la orden");
    }
    limpiarFormulario();
  };

  const handleActualizar = async () => {
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
        alert("Orden actualizada con éxito");
        obtenerOrdenes();
        setIdSeleccionado(null);
        setIsEditing(false);
      } else {
        alert("Error al actualizar la orden");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar la orden");
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
        alert("Orden eliminada con éxito");
        obtenerOrdenes();
      } else {
        alert("Error al eliminar la orden");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar la orden");
    }
  };
  return (
    <div className="body-content">

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Gestión de Órdenes</Card.Title>
            <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
              {mostrarFormulario ? "Ocultar" : "Mostrar"}
            </Button>
            {mostrarFormulario ? (
              <Form.Group>
                <Form.Label>
                  {isEditing ? "Editar Orden" : "Agregar Orden"}
                </Form.Label>
                <Form.Control
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  as="select"
                  custom
                >
                  <option value="" disabled>
                    Selecciona el tipo
                  </option>
                  <option value="Local">Local</option>
                  <option value="Domicilio">Domicilio</option>
                </Form.Control>
                <Form.Control
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción"
                  className="mt-2"
                />
                <Form.Control
                  value={notaEspecial}
                  onChange={(e) => setNotaEspecial(e.target.value)}
                  placeholder="Nota Especial"
                  className="mt-2"
                />
                <Form.Control
                  type="number"
                  value={numeroMesa}
                  onChange={(e) => setNumeroMesa(e.target.value)}
                  placeholder="Número de Mesa"
                  className="mt-2"
                />
                <Form.Control
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Dirección"
                  className="mt-2"
                />
                <Button
                  className="mt-2"
                  onClick={isEditing ? handleActualizar : handleAgregar}
                >
                  {isEditing ? <FaEdit /> : <FaPlus />}{" "}
                  {isEditing ? "Actualizar" : "Agregar"}
                </Button>
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={limpiarFormulario}
                >
                  Limpiar
                </Button>
              </Form.Group>
            ) : null}
            <Form.Group className="mt-3">
              <Form.Label>Buscar Orden</Form.Label>
              <Form.Control type="text" placeholder="Buscar por tipo" />
            </Form.Group>

            {/* Tabla para mostrar las órdenes */}
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
                {ordenes.map((orden) => (
                  <tr key={orden.Id_Tipo_Orden}>
                    <td>{orden.Id_Tipo_Orden}</td>
                    <td>{orden.Tipo}</td>
                    <td>{orden.Descripcion}</td>
                    <td>{orden.Nota_Especial}</td>
                    <td>{orden.Numero_Mesa}</td>
                    <td>{orden.Direccion}</td>
                    <td>
                      <Button
                        className="button-margin"
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
                        className="button-margin"
                        onClick={() => handleEliminar(orden.Id_Tipo_Orden)}
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
      </Container>
    </div>
  );
}

export default VisualizarOrden;
