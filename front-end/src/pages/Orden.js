// GestionDeOrden.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import "../styles/HeaderMesero.css";

function GestionDeOrden() {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  async function obtenerOrdenes() {
    try {
      const response = await fetch('http://localhost:5000/orden/read');
      if (response.ok) {
        const jsonData = await response.json();
        setOrdenes(jsonData);
      } else {
        throw new Error('No se pudo obtener la respuesta del servidor.');
      }
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      alert('Error al cargar las órdenes.');
    }
  }
    
  console.table(ordenes);

  async function handleEliminar(idOrden) {
    try {
      const response = await fetch(`http://localhost:5000/orden/delete/${idOrden}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Orden eliminada con éxito.');
        setOrdenes(ordenes.filter((orden) => orden.ID_Orden !== idOrden)); // Actualizar lista
      } else {
        alert('Error al eliminar la orden.');
      }
    } catch (error) {
      console.error('Error al eliminar orden:', error);
      alert('Error al eliminar la orden.');
    }
  }

  function handleEditar(orden) {
  navigate(`/gestionOrden/${orden.ID_Orden}`, { state: { orden } });
}


  return (
    <div className="body-content">
      <Container className="mt-custom"> {/* Utiliza solo mt-custom si ya tiene en cuenta el espacio del Navbar */}
        <Card>
          <Card.Body>
            <Card.Title>Gestión de Órdenes</Card.Title>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID Orden</th>
                  <th>Cliente</th>
                  <th>Empleado</th>
                  <th>Tipo de Orden</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Fecha y Hora</th>
                  <th>Método de Pago</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((orden) => (
                  <tr key={orden.ID_Orden}>
                    <td>{orden.ID_Orden}</td>
                    <td>{orden.Cliente}</td>
                    <td>{orden.Empleado}</td>
                    <td>{orden.TipoOrden || 'No especificado'}</td>
                    <td>{orden.Monto.toFixed(2)}</td>
                    <td>{orden.Estado}</td>
                    <td>{new Date(orden.Fecha_Hora).toLocaleString()}</td>
                    <td>{orden.MetodoPago || 'No especificado'}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="button-margin"
                        onClick={() => handleEditar(orden)}
                      >
                        <FaEdit /> Editar
                      </Button>
                      <Button
                        variant="danger"
                        className="button-margin"
                        onClick={() => handleEliminar(orden.ID_Orden)}
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

export default GestionDeOrden;
