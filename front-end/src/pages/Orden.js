import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Container, Card, Form, Modal, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function GestionDeOrden() {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenFiltrada, setOrdenFiltrada] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [filtro, setFiltro] = useState("");
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [tiposOrden, setTiposOrden] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [error, setError] = useState('');

  const cargarDatosDropdown = useCallback(async (url, setState) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error al cargar datos de ${url}`);
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const cargarDatos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/orden/read');
      if (!response.ok) throw new Error('Error al cargar órdenes');
      const data = await response.json();
      setOrdenes(data);
      setOrdenFiltrada(data);
      
      await cargarDatosDropdown('http://localhost:5000/cliente/read', setClientes);
      await cargarDatosDropdown('http://localhost:5000/empleado/read', setEmpleados);
      await cargarDatosDropdown('http://localhost:5000/tipo_orden/read', setTiposOrden);
      await cargarDatosDropdown('http://localhost:5000/metodopago/read', setMetodosPago);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [cargarDatosDropdown]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleEliminar = async (idOrden) => {
    handleShowConfirmModal(async () => {
      try {
        const response = await fetch(`http://localhost:5000/orden/delete/${idOrden}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const nuevasOrdenes = ordenes.filter(orden => orden.ID_Orden !== idOrden);
          setOrdenes(nuevasOrdenes);
          setOrdenFiltrada(nuevasOrdenes);
        } else {
          throw new Error('Error al eliminar la orden');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la orden');
      }
    });
  };

  const handleAgregar = () => {
    setShowModal(true);
    setModalData({
      ID_Orden: '',
      ID_Cliente: '',
      ID_Empleado: '',
      Id_Tipo_Orden: '',
      Monto: '',
      Estado: '',
      Fecha_Hora: '',
      ID_Metodo_Pago: ''
    });
  };

  const handleEditar = (orden) => {
    setShowModal(true);
    setModalData({
      ...orden,
      Fecha_Hora: orden.Fecha_Hora ? new Date(orden.Fecha_Hora).toISOString().slice(0, 16) : ''
    });
  };

  const handleChangeFiltro = (event) => {
    const valorFiltro = event.target.value.toLowerCase();
    setFiltro(valorFiltro);
    const filtrados = ordenes.filter(orden => {
      const cliente = orden.Cliente ? orden.Cliente.toLowerCase() : '';
      const fechaHora = orden.Fecha_Hora ? orden.Fecha_Hora.toLowerCase() : '';
      return cliente.includes(valorFiltro) || fechaHora.includes(valorFiltro);
    });
    setOrdenFiltrada(filtrados);
  };

  const handleModalClose = () => setShowModal(false);

  const handleShowConfirmModal = (action) => {
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    confirmAction();
    setShowConfirmModal(false);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (!modalData.ID_Cliente) {
      setError('Debe seleccionar un cliente.');
      return;
    }
    if (!modalData.ID_Empleado) {
      setError('Debe seleccionar un empleado.');
      return;
    }
    if (!modalData.Id_Tipo_Orden) {
      setError('Debe seleccionar un tipo de orden.');
      return;
    }
    if (!modalData.Monto || modalData.Monto <= 0) {
      setError('El monto debe ser mayor que 0.');
      return;
    }
    if (!modalData.Estado) {
      setError('Debe seleccionar un estado.');
      return;
    }
    if (!modalData.Fecha_Hora) {
      setError('Debe seleccionar una fecha y hora.');
      return;
    }
    if (!modalData.ID_Metodo_Pago) {
      setError('Debe seleccionar un método de pago.');
      return;
    }

    const url = modalData.ID_Orden ? `http://localhost:5000/orden/update/${modalData.ID_Orden}` : 'http://localhost:5000/orden/create';
    const method = modalData.ID_Orden ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modalData),
      });
      if (response.ok) {
        setShowModal(false);
        cargarDatos();
      } else {
        const responseData = await response.json();
        setError(`Error al procesar la solicitud: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al procesar la solicitud: ' + error.message);
    }
  };

  return (
    <div className=".body-content">
      <Container className=".mt-custom">
        <Card>
          <Card.Body>
            <Card.Title>Gestión de Órdenes</Card.Title>
            <Button variant="success" className="mb-3" onClick={handleAgregar}><FaPlus /> Agregar Orden</Button>
            <Form.Control type="text" placeholder="Buscar por Cliente o Fecha y Hora" value={filtro} onChange={handleChangeFiltro} />
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
                {ordenFiltrada.map(orden => (
                  <tr key={orden.ID_Orden}>
                    <td>{orden.ID_Orden}</td>
                    <td>{orden.Cliente}</td>
                    <td>{orden.Empleado}</td>
                    <td>{orden.TipoOrden}</td>
                    <td>{new Intl.NumberFormat().format(orden.Monto)}</td>
                    <td>{orden.Estado}</td>
                    <td>{orden.Fecha_Hora}</td>
                    <td>{orden.MetodoPago}</td>
                    <td>
                    <div className="mb-2">
  <Button variant="primary" onClick={() => handleEditar(orden)}><FaEdit /></Button>
</div>
<div className="mb-2">
  <Button variant="danger" onClick={() => handleEliminar(orden.ID_Orden)}><FaTrash /></Button>
</div>


                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.ID_Orden ? 'Editar Orden' : 'Crear Nueva Orden'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleModalSubmit}>
            {/* Lista desplegable para clientes */}
            <Form.Group controlId="formCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Select name="ID_Cliente" value={modalData.ID_Cliente} onChange={(e) => setModalData({ ...modalData, ID_Cliente: e.target.value })}>
                <option value="">Seleccione un cliente</option>
                {clientes.map(cliente => <option key={cliente.ID_Cliente} value={cliente.ID_Cliente}>{cliente.Nombres}</option>)}
              </Form.Select>
            </Form.Group>

            {/* Lista desplegable para empleados */}
            <Form.Group controlId="formEmpleado">
              <Form.Label>Empleado</Form.Label>
              <Form.Select name="ID_Empleado" value={modalData.ID_Empleado} onChange={(e) => setModalData({ ...modalData, ID_Empleado: e.target.value })}>
                <option value="">Seleccione un empleado</option>
                {empleados.map(empleado => <option key={empleado.ID_Empleado} value={empleado.ID_Empleado}>{empleado.Nombres}</option>)}
              </Form.Select>
            </Form.Group>

            {/* Lista desplegable para tipos de orden */}
            <Form.Group controlId="formTipoOrden">
              <Form.Label>Tipo de Orden</Form.Label>
              <Form.Select name="Id_Tipo_Orden" value={modalData.Id_Tipo_Orden} onChange={(e) => setModalData({ ...modalData, Id_Tipo_Orden: e.target.value })}>
                <option value="">Seleccione un tipo de orden</option>
                {tiposOrden.map(tipo => <option key={tipo.Id_Tipo_Orden} value={tipo.Id_Tipo_Orden}>{tipo.Tipo}</option>)}
              </Form.Select>
            </Form.Group>

            {/* Lista desplegable para métodos de pago */}
            <Form.Group controlId="formMetodoPago">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Select name="ID_Metodo_Pago" value={modalData.ID_Metodo_Pago} onChange={(e) => setModalData({ ...modalData, ID_Metodo_Pago: e.target.value })}>
                <option value="">Seleccione un método de pago</option>
                {metodosPago.map(metodo => <option key={metodo.ID_Metodo_Pago} value={metodo.ID_Metodo_Pago}>{metodo.Descripcion}</option>)}
              </Form.Select>
            </Form.Group>

            {/* Campo para Monto */}
            <Form.Group controlId="formMonto">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="text"
                name="Monto"
                value={new Intl.NumberFormat().format(modalData.Monto)}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  setModalData({ ...modalData, Monto: value });
                }}
                min="1"
              />
            </Form.Group>

            {/* Selector de Estado */}
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Select name="Estado" value={modalData.Estado} onChange={(e) => setModalData({ ...modalData, Estado: e.target.value })}>
                <option value="">Seleccione un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aceptada">Aceptada</option>
                <option value="Facturada">Facturada</option>
                <option value="Despachada">Despachada</option>
                <option value="Rechazada">Rechazada</option>
              </Form.Select>
            </Form.Group>

            {/* Campo para Fecha y Hora */}
            <Form.Group controlId="formFechaHora">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control type="datetime-local" name="Fecha_Hora" value={modalData.Fecha_Hora} onChange={(e) => setModalData({ ...modalData, Fecha_Hora: e.target.value })} />
            </Form.Group>
          </Form>

          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cerrar</Button>
          <Button variant="primary" type="submit" onClick={handleModalSubmit}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres realizar esta acción?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>No</Button>
          <Button variant="danger" onClick={handleConfirm}>Sí</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GestionDeOrden;
