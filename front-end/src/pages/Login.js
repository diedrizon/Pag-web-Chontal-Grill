import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setRol }) => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoRegistro, setCorreoRegistro] = useState("");
  const [contrasenaRegistro, setContrasenaRegistro] = useState("");
  const [showModal, setShowModal] = useState(false);

  //Funciones del Cierre y Apertura del Modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);



  const cedulaPattern = "[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Za-z]";
  const nombreApellidoPattern = "[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+";
  const telefonoPattern = "[0-9]{4}-[0-9]{4}";
  const validarContrasena = (contrasena) => contrasena.length <= 50;


  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { Correo: correo, Contraseña: contrasena };
    const response = await fetch(
      "http://localhost:5000/autenticacion_empleado/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const { cargo } = await response.json();
      setRol(cargo);
      navigate("/"); // Se cambió a la ruta principal
    } else {
      const { message } = await response.json();
      alert(message || "¡Credenciales incorrectas!");
    }
  };
// Función para registrar el cliente
const handleAgregar = async (event) => {
  event.preventDefault();

  // Crear expresiones regulares a partir de las cadenas
  const regexCedula = new RegExp(cedulaPattern);
  const regexNombreApellido = new RegExp(nombreApellidoPattern);
  const regexTelefono = new RegExp(telefonoPattern);

  if (
    regexCedula.test(cedula) &&
    regexNombreApellido.test(nombre) &&
    regexNombreApellido.test(apellidos) &&
    regexTelefono.test(telefono) &&
    correoRegistro.includes('@') &&
    validarContrasena(contrasenaRegistro)
  ) {
    // Lógica de registro del cliente
    const nuevoCliente = {
      Cedula: cedula,
      Nombres: nombre,
      Apellidos: apellidos,
      Telefono: telefono,
      Correo: correoRegistro,
      Contraseña: contrasenaRegistro,
    };

    try {
      const response = await fetch(`http://localhost:5000/cliente/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (response.ok) {
        alert("Cliente registrado con éxito");
        handleCloseModal();
        setCedula("");
        setNombre("");
        setApellidos("");
        setTelefono("");
        setCorreoRegistro("");
        setContrasenaRegistro("");
      } else {
        alert("Error al agregar el empleado");
      }
    } catch (error) {
      console.error("Error al agregar:", error);
      alert("Error al agregar el empleado");
    }
  } else {
    alert("Verifica los datos ingresados");
  }
};


  

  return (
    <div className="login-container">
      <div className="containerWithBorder">
        <h2 className="login-title">Bienvenido</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="correo" className="formGroup">
            <Form.Label className="label">Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="input"
              required
            />
          </Form.Group>
          <Form.Group controlId="contrasena" className="formGroup">
            <Form.Label className="label">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="input"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="button">
            Iniciar Sesión
          </Button>
          <Button
            variant="link"
            onClick={handleShowModal}
            className="registerLink"
          >
            ¿No tienes cuenta? Regístrate
          </Button>
        </Form>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAgregar}>
            {/* Cédula */}
            <Form.Group controlId="registroCedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              pattern={cedulaPattern}
              maxLength="16"
              placeholder="xxx-xxxxxx-xxxxL"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </Form.Group>

          {/* Nombre con restricción de entrada */}
          <Form.Group controlId="registroNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              pattern={nombreApellidoPattern}
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          {/* Apellidos con restricción de entrada */}
          <Form.Group controlId="registroApellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              pattern={nombreApellidoPattern}
              placeholder="Ingresa tus apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </Form.Group>

          {/* Teléfono con restricción de entrada */}
          <Form.Group controlId="registroTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              pattern={telefonoPattern}
              placeholder="xxxx-xxxx"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </Form.Group>

            {/* Correo Electrónico */}
            <Form.Group controlId="registroCorreo">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={correoRegistro}
                onChange={(e) => setCorreoRegistro(e.target.value)}
              />
            </Form.Group>

            {/* Contraseña */}
            <Form.Group controlId="registroContrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Elige una contraseña segura"
                value={contrasenaRegistro}
                onChange={(e) => setContrasenaRegistro(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="modal-register-button">
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
