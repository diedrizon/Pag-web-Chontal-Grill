// App.js
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

  const renderHomePage = () => {
    switch (userRol) {
      case 'Administrador':
        return <Categoria />;
      case 'Mesero':
        return <TipoOrden />;
      case 'Cliente':
      default:
        return <MenuCliente />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header rol={userRol} />{renderHomePage()}</>} />
        <Route path="/login" element={<Login setRol={setUserRol} />} />
        <Route path="/categoria" element={<><Header rol={userRol} /><Categoria /></>} />
        <Route path="/empleado" element={<><Header rol={userRol} /><Empleado /></>} />
        <Route path="/menu" element={<><Header rol={userRol} /><Menu /></>} />
        <Route path="/gestionOrden" element={<><Header rol={userRol} /><GestionOrden /></>} />
        <Route path="/gestionOrden/:id" element={<><Header rol={userRol} /><GestionOrden /></>} />
        <Route path="/reservacion" element={<><Header rol={userRol} /><Reservacion /></>} />
        <Route path="/tipoorden" element={<><Header rol={userRol} /><TipoOrden /></>} />
        <Route path="/orden" element={<><Header rol={userRol} /><Orden /></>} />
        <Route path="/EstadisticasEmpleado" element={<><Header rol={userRol} /><EstadisticasEmpleado /></>} />
        <Route path="/menucliente" element={<><Header rol={userRol} /><MenuCliente /></>} />
      </Routes>
    </Router>
  );
}

export default App;
