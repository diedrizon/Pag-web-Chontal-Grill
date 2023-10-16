// Login.js
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container>
      <div className="text-center mt-5">
        {/* Utiliza el componente Link para redirigir a /administrador */}
        <Link to="/Administrador">
          <Button variant="primary">
            Iniciar sesión
          </Button>
        </Link>
      </div>
      <div className="text-center mt-3">
        <Link to="/register">¿No tienes una cuenta? Regístrate</Link>
      </div>
    </Container>
  );
};

export default Login;

