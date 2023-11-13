import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import "../styles/HeaderMesero.css";


function GestionOrden() {
  const [formData, setFormData] = useState({
    ID_Orden: '',
    Cliente: '',
    ID_Cliente: 0,
    Empleado: '',
    ID_Empleado: 0,
    TipoOrden: '',
    Id_Tipo_Orden: 0,
    Monto: '',
    Estado: '',
    Fecha_Hora: '',
    MetodoPago: '',
    ID_Metodo_Pago: 0,
  });
  const [editing, setEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

/*   useEffect(() =>{
    const obtenerOrdenes = async () => {
      try {
        const response = await fetch('http://localhost:5000/orden/read');
        if (response.ok) {
          const jsonData = await response.json();
          setFormData(jsonData);
        } else {
          throw new Error('No se pudo obtener la respuesta del servidor.');
        }
      } catch (error) {
        console.error('Error al obtener órdenes:', error);
        alert('Error al cargar las órdenes.');
      }
    }

    obtenerOrdenes();
  }) */

  useEffect(() => {
    if (id && !location.state?.orden) {
      cargarDatosOrden(id);
    } else if (location.state?.orden) {
      const orden = location.state.orden;
      setFormData({
        ID_Orden: orden.ID_Orden,
        Cliente: orden.Cliente,
        ID_Cliente: orden.ID_Cliente,
        Empleado: orden.Empleado,
        ID_Empleado: orden.ID_Empleado,
        TipoOrden: orden.TipoOrden,
        Id_Tipo_Orden: orden.Id_Tipo_Orden,
        Monto: orden.Monto,
        Estado: orden.Estado,
        Fecha_Hora: orden.Fecha_Hora ? new Date(orden.Fecha_Hora).toISOString().slice(0, 16) : '',
        MetodoPago: orden.MetodoPago,
        ID_Metodo_Pago: orden.ID_Metodo_Pago,
      });
      setEditing(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state]);

  const cargarDatosOrden = async (ordenId) => {
    try {
      const response = await fetch(`http://localhost:5000/orden/read/${ordenId}`);
      if (!response.ok) {
        throw new Error('No se pudo cargar la orden');
      }
      const ordenData = await response.json();
      setFormData({
        ID_Orden: ordenData.ID_Orden,
        Cliente: ordenData.Cliente,
        Empleado: ordenData.Empleado,
        TipoOrden: ordenData.TipoOrden,
        Monto: ordenData.Monto,
        Estado: ordenData.Estado,
        Fecha_Hora: ordenData.Fecha_Hora ? new Date(ordenData.Fecha_Hora).toISOString().slice(0, 16) : '',
        MetodoPago: ordenData.MetodoPago,
      });
      setEditing(true);
    } catch (error) {
      setResponseMessage({
        type: 'danger',
        text: 'Error al cargar la orden: ' + error.message,
      });
    }
  };

  console.table(formData);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateOrUpdateSubmit = async (event) => {
    event.preventDefault();
    const url = editing ? `http://localhost:5000/orden/update/${formData.ID_Orden}` : 'http://localhost:5000/orden/create';
    const method = editing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Error al procesar la solicitud');
      }
      setResponseMessage({
        type: 'success',
        text: `Orden ${editing ? 'actualizada' : 'creada'} con éxito`,
      });
      navigate('/orden'); // Asumiendo que '/orden' es la ruta para ver órdenes
    } catch (error) {
      setResponseMessage({
        type: 'danger',
        text: 'Error al procesar la solicitud: ' + error.message,
      });
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{editing ? 'Editar Orden' : 'Crear Nueva Orden'}</Card.Title>
          {responseMessage && <Alert variant={responseMessage.type}>{responseMessage.text}</Alert>}
          <Form onSubmit={handleCreateOrUpdateSubmit}>
            <Form.Group controlId="formIDOrden">
              <Form.Label>ID de la Orden</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID de la Orden"
                name="ID_Orden"
                value={formData.ID_Orden}
                onChange={handleInputChange}
                disabled={editing}
              />
            </Form.Group>
            <Form.Group controlId="formCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Cliente"
                name="Cliente"
                value={formData.Cliente}
                onChange={handleInputChange}
                disabled={editing}
              />
            </Form.Group>
            <Form.Group controlId="formEmpleado">
              <Form.Label>Empleado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Empleado"
                name="Empleado"
                value={formData.Empleado}
                onChange={handleInputChange}
                disabled={editing}
              />
            </Form.Group>
            <Form.Group controlId="formTipoOrden">
              <Form.Label>Tipo de Orden</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tipo de Orden"
                name="TipoOrden"
                value={formData.TipoOrden}
                onChange={handleInputChange}
                disabled={editing}
              />
            </Form.Group>
            <Form.Group controlId="formMonto">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Monto"
                name="Monto"
                value={formData.Monto}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Estado"
                name="Estado"
                value={formData.Estado}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formFechaHora">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                name="Fecha_Hora"
                value={formData.Fecha_Hora}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMetodoPago">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Control
                type="text"
                placeholder="Método de Pago"
                name="MetodoPago"
                value={formData.MetodoPago}
                onChange={handleInputChange}
                disabled={editing}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editing ? 'Actualizar' : 'Crear'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default GestionOrden;
