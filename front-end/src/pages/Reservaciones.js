import React, { useState, useEffect } from "react";
import { Table, Button, Container, Card, Form } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaEraser } from "react-icons/fa";
import "../styles/HeaderAdministrador.css";


function VisualizarReservacion() {
  const [reservaciones, setReservaciones] = useState([]);
  const [formFields, setFormFields] = useState({
    ID_Cliente: "",
    Descripcion: "",
    Fecha_Reservacion: "",
    Fecha_Inicio: "",
    Fecha_Fin: "",
  });
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewAll, setViewAll] = useState(true);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    obtenerReservaciones(viewAll); // pasamos viewAll como argumento
  }, [viewAll]); // Se ejecutará cada vez que viewAll cambie

  const obtenerReservaciones = async (viewAll) => {
    const endpoint = viewAll ? "/read" : "/visua"; // determinamos el endpoint basado en viewAll
    try {
      const response = await fetch(
        `http://localhost:5000/reservacion${endpoint}`
      );
      const data = await response.json();
      setReservaciones(data);
    } catch (error) {
      console.error("Error al obtener las reservaciones:", error);
      alert("Error al obtener las reservaciones");
    }
  };

  const toggleView = () => {
    setViewAll((prevViewAll) => !prevViewAll); // Invertimos el estado de viewAll
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLimpiar = () => {
    setFormFields({
      ID_Cliente: "",
      Descripcion: "",
      Fecha_Reservacion: "",
      Fecha_Inicio: "",
      Fecha_Fin: "",
    });
  };

  const handleAgregar = async () => {
    try {
      const response = await fetch("http://localhost:5000/reservacion/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });

      if (response.ok) {
        alert("Reservación agregada con éxito");
        setFormFields({
          ID_Cliente: "",
          Descripcion: "",
          Fecha_Reservacion: "",
          Fecha_Inicio: "",
          Fecha_Fin: "",
        });
        obtenerReservaciones();
        setIsEditing(false);
      } else {
        alert("Error al agregar la reservación");
      }
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar la reservación");
    }
  };

  const handleActualizar = async () => {
    const dataToUpdate = {
      ...formFields,
      ID_Reservacion: idSeleccionado,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/reservacion/update/${idSeleccionado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (response.ok) {
        alert("Reservación actualizada con éxito");
        obtenerReservaciones();
        setIdSeleccionado(null);
        setIsEditing(false);
      } else {
        alert("Error al actualizar la reservación");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar la reservación");
    }
  };

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/reservacion/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Reservación eliminada con éxito");
        obtenerReservaciones();
      } else {
        alert("Error al eliminar la reservación");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar la reservación");
    }
  };

  return (
    <div className="body-content">
    <Container className="mt-custom"> 
        <Card className="mt-custom">
          <Card.Body>
            <Card.Title>Gestión de Reservaciones</Card.Title>

            <Form.Group>
              <Form.Label>
                {isEditing ? "Editar Reservación" : "Agregar Reservación"}
              </Form.Label>
              <Form.Control
                type="text"
                name="ID_Cliente"
                value={formFields.ID_Cliente}
                onChange={handleInputChange}
                placeholder="ID del Cliente"
                className="mt-2 mb-2"
              />
              <Form.Control
                type="text"
                name="Descripcion"
                value={formFields.Descripcion}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="mt-2 mb-2"
              />
              <Form.Control
                type="date"
                name="Fecha_Reservacion"
                value={formFields.Fecha_Reservacion}
                onChange={handleInputChange}
                placeholder="Fecha de Reservación"
                className="mt-2 mb-2"
              />
              <Form.Control
                type="time"
                name="Fecha_Inicio"
                value={formFields.Fecha_Inicio}
                onChange={handleInputChange}
                placeholder="Hora de Inicio"
                className="mt-2 mb-2"
              />
              <Form.Control
                type="time"
                name="Fecha_Fin"
                value={formFields.Fecha_Fin}
                onChange={handleInputChange}
                placeholder="Hora de Fin"
                className="mt-2 mb-2"
              />
              <Button
                className="mt-2 button-margin" /* Aplica el estilo button-margin a cada Button */
                onClick={isEditing ? handleActualizar : handleAgregar}
              >
                {isEditing ? <FaEdit /> : <FaPlus />}{" "}
                {isEditing ? "Actualizar" : "Agregar"}
              </Button>
              <Button className="mt-2 button-margin" onClick={toggleView}>
                {viewAll ? "Reservas Pendientes" : "Todas las Reservas"}
              </Button>
              <Button className="mt-2 button-margin" onClick={handleLimpiar}>
                <FaEraser /> Limpiar
              </Button>

              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="mt-3 mb-3"
              />
            </Form.Group>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID Reservación</th>
                  <th>ID Cliente</th>
                  <th>Descripción</th>
                  <th>Fecha Reservación</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservaciones
                  .filter((reservacion) =>
                    Object.values(reservacion).some((value) =>
                      value
                        .toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                  )
                  .map((reservacion) => (
                    <tr key={reservacion.ID_Reservacion}>
                      <td>{reservacion.ID_Reservacion}</td>
                      <td>{reservacion.ID_Cliente}</td>
                      <td>{reservacion.Descripcion}</td>
                      <td>{reservacion.Fecha_Reservacion}</td>
                      <td>{reservacion.Fecha_Inicio}</td>
                      <td>{reservacion.Fecha_Fin}</td>
                      <td>
                        <Button
                          className="mt-2 mb-2"
                          onClick={() => {
                            setIdSeleccionado(reservacion.ID_Reservacion);
                            setFormFields({
                              ID_Cliente: reservacion.ID_Cliente,
                              Descripcion: reservacion.Descripcion,
                              Fecha_Reservacion: reservacion.Fecha_Reservacion,
                              Fecha_Inicio: reservacion.Fecha_Inicio,
                              Fecha_Fin: reservacion.Fecha_Fin,
                            });
                            setIsEditing(true);
                          }}
                        >
                          <FaEdit /> Editar
                        </Button>
                        <Button
                          variant="danger"
                          className="button-margin"
                          onClick={() =>
                            handleEliminar(reservacion.ID_Reservacion)
                          }
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

export default VisualizarReservacion;
