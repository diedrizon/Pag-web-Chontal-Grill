import React, { useState, useEffect } from "react";
import { Table, Button, Container, Card, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import "../styles/HeaderAdministrador.css";

function VisualizarEmpleado() {
  const [empleados, setEmpleados] = useState([]);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [cargo, setCargo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:5000/empleado/read");
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener los empleados:", error);
      alert("Error al obtener los empleados");
    }
  };

  const handleAgregar = async () => {
    const nuevoEmpleado = {
      Nombres: nombres,
      Apellidos: apellidos,
      Telefono: telefono,
      Correo: correo,
      Cargo: cargo,
    };
    try {
      const response = await fetch(`http://localhost:5000/empleado/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (response.ok) {
        alert("Empleado agregado con éxito");
        setNombres("");
        setApellidos("");
        setTelefono("");
        setCorreo("");
        setCargo("");
        obtenerEmpleados();
      } else {
        alert("Error al agregar el empleado");
      }
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar el empleado");
    }
  };

  const handleEditar = (empleado) => {
    setIdSeleccionado(empleado.ID_Empleado);
    setNombres(empleado.Nombres);
    setApellidos(empleado.Apellidos);
    setTelefono(empleado.Telefono);
    setCorreo(empleado.Correo);
    setCargo(empleado.Cargo);
    setIsEditing(true);
  };

  const handleActualizar = async () => {
    const empleadoActualizado = {
      Nombres: nombres,
      Apellidos: apellidos,
      Telefono: telefono,
      Correo: correo,
      Cargo: cargo,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/empleado/update/${idSeleccionado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(empleadoActualizado),
        }
      );

      if (response.ok) {
        alert("Empleado actualizado con éxito");
        setIdSeleccionado(null);
        setNombres("");
        setApellidos("");
        setTelefono("");
        setCorreo("");
        setCargo("");
        setIsEditing(false);
        obtenerEmpleados();
      } else {
        alert("Error al actualizar el empleado");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el empleado");
    }
  };

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/empleado/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Empleado eliminado con éxito");
        obtenerEmpleados();
      } else {
        alert("Error al eliminar el empleado");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el empleado");
    }
  };

  const empleadosFiltrados = empleados.filter(
    (empleado) =>
      empleado.Nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.Apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.Correo.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.Cargo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className=".body-content">
      <Container className=".mt-custom">
        <Card>
          <Card.Body>
            <Card.Title>Gestión de Empleados</Card.Title>

            <Form.Group>
              <Form.Label>
                {isEditing ? "Editar Empleado" : "Agregar Empleado"}
              </Form.Label>
              <Form.Control
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Nombres"
                className="mt-2 mb-2"
              />
              <Form.Control
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Apellidos"
                className="mt-2 mb-2"
              />
              <InputMask
                mask="9999-9999"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="form-control"
                placeholder="Teléfono"
                classsName="mt-2 mb-2"
              />
              <Form.Control
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo"
                className="mt-2 mb-2"
              />
              <Form.Select
                className="mt-2 mb-2"
                aria-label="Cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              >
                <option value="">Selecciona un cargo</option>
                <option value="Mesero">Mesero</option>
                <option value="Cajero">Cajero</option>
                <option value="Jefe de cocina">Jefe de cocina</option>
                <option value="Personal de cocina">Personal de cocina</option>
              </Form.Select>
              <Button
                className="mt-2"
                onClick={isEditing ? handleActualizar : handleAgregar}
              >
                {isEditing ? "Actualizar" : "Agregar"}
              </Button>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Buscar Empleado</Form.Label>
              <Form.Control
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, apellido, correo o cargo"
              />
            </Form.Group>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Telefono</th>
                  <th>Correo</th>
                  <th>Cargo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleadosFiltrados.map((empleado) => (
                  <tr key={empleado.ID_Empleado}>
                    <td>{empleado.ID_Empleado}</td>
                    <td>{empleado.Nombres}</td>
                    <td>{empleado.Apellidos}</td>
                    <td>{empleado.Telefono}</td>
                    <td>{empleado.Correo}</td>
                    <td>{empleado.Cargo}</td>
                    <td>
                      <Button
                        className="mt-2 mb-2"
                        onClick={() => handleEditar(empleado)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleEliminar(empleado.ID_Empleado)}
                      >
                        Eliminar
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

export default VisualizarEmpleado;
