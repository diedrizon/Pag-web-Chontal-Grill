import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Ajustes en los estilos para asegurar que el componente use todo el espacio vertical
const styles = {
  container: {
    background: 'url("https://png.pngtree.com/thumb_back/fw800/20170803/pngtree-Food-Menu-Fare-Meal-background-photo-869492.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  containerWithBorder: {
    border: '2px solid #000',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    width: '80%',
    maxWidth: '350px',
    minHeight: '250px',
    margin: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    display: 'block',
    marginBottom: '0.5rem',
  },
  input: {
    border: '1px solid #ddd',
    borderRadius: '0',
    fontSize: '16px',
    padding: '10px',
    marginBottom: '20px',
    boxShadow: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#000',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    marginTop: '20px',
  },
};

const Login = ({ setRol }) => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { Correo: correo, Contraseña: contrasena };
    const response = await fetch('http://localhost:5000/autenticacion_empleado/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const { cargo } = await response.json();
      setRol(cargo);
      navigate('/Header');
    } else {
      const { message } = await response.json();
      alert(message || '¡Credenciales incorrectas!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.containerWithBorder}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="correo" style={styles.formGroup}>
            <Form.Label style={styles.label}>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={styles.input}
              required
            />
          </Form.Group>
          <Form.Group controlId="contrasena" style={styles.formGroup}>
            <Form.Label style={styles.label}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={styles.input}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={styles.button}>
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
