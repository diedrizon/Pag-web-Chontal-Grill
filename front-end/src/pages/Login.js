import React, { useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: `url("https://png.pngtree.com/thumb_back/fw800/20170803/pngtree-Food-Menu-Fare-Meal-background-photo-869492.jpg") no-repeat`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  loginContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Fondo transparente
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "400px",
    position: "relative",
    zIndex: 1,
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    border: "none",
    borderBottom: "2px solid #fff",
    borderRadius: "0",
    outline: "none",
    boxShadow: "none",
    marginBottom: "20px",
    fontSize: "16px",
    backgroundColor: "transparent", // Fondo transparente
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    transition: "background 0.3s",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    transition: "color 0.3s",
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Manejo de inicio de sesión aquí...
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
    <div style={styles.container}>
      <Container className="text-center mt-5" style={styles.loginContainer}>
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
      </Container>
      <div className="text-center mt-3">
        <Link to="/register" style={styles.link}>
          ¿No tienes una cuenta? Regístrate
        </Link>
      </div>
    </div>
  );
};

export default Login;
