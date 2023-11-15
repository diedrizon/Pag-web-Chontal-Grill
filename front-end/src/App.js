import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Categoria from './pages/Categoria';
import Empleado from './pages/Empleado';
import Reservacion from './pages/Reservaciones';
import TipoOrden from './pages/Tipodeorden'; 
import Menu from './pages/Menu'; 
import GestionOrden from './pages/GestionOrden';
import Orden from './pages/Orden';
import EstadisticasEmpleado from './pages/EstadisticasEmpleado';
import MenuCliente from './pages/MenuCliente';

function App() {
  const [userRol, setUserRol] = useState('Cliente');

  // Envuelve el componente de la página con el Header
  const withHeader = (PageComponent, props) => (
    <>
      <Header rol={userRol} />
      <PageComponent {...props} />
    </>
  );

  return (
    <Router>
      <Routes>
        {/* La ruta raíz ahora muestra MenuCliente con el Header */}
        <Route path="/" element={withHeader(MenuCliente)} />
        {/* Ruta para el login. Se maneja el rol después de la autenticación */}
        <Route path="/login" element={<Login setRol={setUserRol} />} />
        {/* Resto de las rutas envueltas con el Header */}
        <Route path="/categoria" element={withHeader(Categoria)} />
        <Route path="/empleado" element={withHeader(Empleado)} />
        <Route path="/menu" element={withHeader(Menu)} />
        <Route path="/gestionOrden" element={withHeader(GestionOrden)} />
        <Route path="/gestionOrden/:id" element={withHeader(GestionOrden)} />
        <Route path="/reservacion" element={withHeader(Reservacion)} />
        <Route path="/tipoorden" element={withHeader(TipoOrden)} />
        <Route path="/orden" element={withHeader(Orden)} />
        <Route path="/EstadisticasEmpleado" element={withHeader(EstadisticasEmpleado)} />
        <Route path="/menucliente" element={withHeader(MenuCliente)} />
      </Routes>
    </Router>
  );
}

export default App;
