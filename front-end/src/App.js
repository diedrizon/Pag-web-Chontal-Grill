import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import EstadisticasOrden from './pages/EstadisticasOrde';
import MenuCliente from './pages/MenuCliente';

function App() {
  const [userRol, setUserRol] = useState(localStorage.getItem('userRol') || 'Cliente');

  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);

  const setRol = (rol) => {
    setUserRol(rol);
    localStorage.setItem('userRol', rol);
  };


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

  const PrivateRoute = ({ children, allowedRoles }) => {
    return allowedRoles.includes(userRol) ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<><Header rol={userRol} setRol={setRol} />{renderHomePage()}</>} />
        <Route path="/login" element={<Login setRol={setRol} />} />
        <Route path="/categoria" element={<PrivateRoute allowedRoles={['Administrador']}><><Header rol={userRol} /><Categoria /></></PrivateRoute>} />
        <Route path="/empleado" element={<PrivateRoute allowedRoles={['Administrador']}><><Header rol={userRol} /><Empleado /></></PrivateRoute>} />
        <Route path="/menu" element={<PrivateRoute allowedRoles={['Administrador']}><><Header rol={userRol} /><Menu /></></PrivateRoute>} />
        <Route path="/gestionOrden" element={<PrivateRoute allowedRoles={['Mesero']}><><Header rol={userRol} /><GestionOrden /></></PrivateRoute>} />
        <Route path="/reservacion" element={<PrivateRoute allowedRoles={['Administrador']}><><Header rol={userRol} /><Reservacion /></></PrivateRoute>} />
        <Route path="/tipoorden" element={<PrivateRoute allowedRoles={['Mesero']}><><Header rol={userRol} /><TipoOrden /></></PrivateRoute>} />
        <Route path="/orden" element={<PrivateRoute allowedRoles={['Mesero']}><><Header rol={userRol} /><Orden /></></PrivateRoute>} />
        <Route path="/EstadisticasEmpleado" element={<PrivateRoute allowedRoles={['Administrador']}><><Header rol={userRol} /><EstadisticasEmpleado /></></PrivateRoute>} />
        <Route path="/EstadisticasOrden" element={<PrivateRoute allowedRoles={['Administrador']}><><Header rol={userRol} /><EstadisticasOrden /></></PrivateRoute>} />

        <Route path="/menucliente" element={<><Header rol={userRol} /><MenuCliente /></>} />
      </Routes>
    </Router>
  );
}

export default App;
