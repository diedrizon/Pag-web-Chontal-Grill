import React, { useState, useEffect } from "react";
import { Table, Button, Container, Card, Form } from "react-bootstrap";
import "../styles/HeaderAdministrador.css";



import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function VisualizarCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState(""); // Para agregar
  const [nombreBusqueda, setNombreBusqueda] = useState(""); // Para buscar
  const [nombreSeleccionado, setNombreSeleccionado] = useState(""); // Para editar
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar el modo

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch("http://localhost:5000/categoria/read");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      alert("Error al obtener las categorías");
    }
  };

  const handleAgregar = async () => {
    const nuevaCategoria = {
      Nombre: nombre,
    };
    try {
      const response = await fetch(`http://localhost:5000/categoria/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCategoria),
      });

      if (response.ok) {
        alert("Categoría agregada con éxito");
        setNombre("");
        obtenerCategorias();
        setIsEditing(false);

      } else {
        alert("Error al agregar la categoría");
      }
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar la categoría");
    }
  };

  const handleActualizar = async () => {
    const dataToUpdate = {
      Nombre: nombreSeleccionado,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/categoria/update/${idSeleccionado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (response.ok) {
        alert("Categoría actualizada con éxito");
        obtenerCategorias();
        setIdSeleccionado(null);
        setNombreSeleccionado("");
        setIsEditing(false);
      } else {
        alert("Error al actualizar la categoría");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar la categoría");
    }
  };

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/categoria/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Categoría eliminada con éxito");
        obtenerCategorias();
      } else {
        alert("Error al eliminar la categoría");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar la categoría");
    }
  };

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.Nombre.toLowerCase().includes(nombreBusqueda.toLowerCase())
  );
  

  return (
    <div className="body-content">
    <Container className="mt-custom"> 
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Gestión de Categorías</Card.Title>

            <Form.Group>
              <Form.Label>{isEditing ? 'Editar Categoría' : 'Agregar Categoría'}</Form.Label>
              <Form.Control
                value={isEditing ? nombreSeleccionado : nombre}
                onChange={(e) => isEditing ? setNombreSeleccionado(e.target.value) : setNombre(e.target.value)}
                placeholder="Nombre de la categoría"
              />
              <Button className="mt-2" onClick={isEditing ? handleActualizar : handleAgregar}>
                {isEditing ? <FaEdit /> : <FaPlus />} {isEditing ? 'Actualizar' : 'Agregar'}
              </Button>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Buscar Categoría</Form.Label>
              <Form.Control
                value={nombreBusqueda}
                onChange={(e) => setNombreBusqueda(e.target.value)}
                placeholder="Buscar por nombre"
              />
            </Form.Group>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categoriasFiltradas.map((categoria) => (
                  <tr key={categoria.ID_Categoria}>
                    <td>{categoria.ID_Categoria}</td>
                    <td>{categoria.Nombre}</td>
                    <td>
                      <Button
                        className="button-margin"
                        onClick={() => {
                          setIdSeleccionado(categoria.ID_Categoria);
                          setNombreSeleccionado(categoria.Nombre);
                          setIsEditing(true);
                        }}
                      >
                        <FaEdit /> Editar
                      </Button>
                      <Button
                        variant="danger"
                        className="button-margin"
                        onClick={() => handleEliminar(categoria.ID_Categoria)}
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

export default VisualizarCategoria;