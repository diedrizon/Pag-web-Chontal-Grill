import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    border: 'none',
    borderBottom: '2px solid #84fab0',
    borderRadius: '0',
    outline: 'none',
    boxShadow: 'none',
    marginBottom: '20px',
    fontSize: '16px'
  },
  button: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    color: '#fff',
    transition: 'background 0.3s',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'color 0.3s',
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:5000/autenticacion_empleado/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Correo: email, Contraseña: password }),
      }
    );
    const data = await response.json();
    if (data.success) {
      switch (data.cargo) {
        case "Administrador":
          navigate("/Administrador"); 
          break;
        case "Cajero":
          navigate("/Cajero"); 
          break;
        case "Mesero":
          navigate("/Mesero"); 
          break;
        case "Jefe de cocina":
          navigate("/JefeCocina"); 
          break;
        default:
          alert("Cargo no reconocido");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <Container style={styles.container}>
      <div className="text-center mt-5" style={styles.form}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label style={styles.label}>Correo</Form.Label>
            <Form.Control
              style={styles.input}
              type="email"
              placeholder="Ingresar correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label style={styles.label}>Contraseña</Form.Label>
            <Form.Control
              style={styles.input}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={styles.button}>
            Iniciar sesión
          </Button>
        </Form>
      </div>
      <div className="text-center mt-3">
        <Link to="/register" style={styles.link}>¿No tienes una cuenta? Regístrate</Link>
      </div>
    </Container>
  );
};

export default Login;