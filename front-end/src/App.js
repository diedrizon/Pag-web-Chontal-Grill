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

function App() {
  const [userRol, setUserRol] = useState('');


  const withHeader = (PageComponent, props) => (
    <>
      <Header rol={userRol} />
      <PageComponent {...props} />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/Header" element={<Header rol={userRol} />} />
        <Route path="/categoria" element={withHeader(Categoria, { rol: userRol })} />
        <Route path="/empleado" element={withHeader(Empleado, { rol: userRol })} />
        <Route path="/menu" element={withHeader(Menu, { rol: userRol })} />
        <Route path="/gestionOrden" element={withHeader(GestionOrden, { rol: userRol })} />
        <Route path="/gestionOrden/:id" element={withHeader(GestionOrden)} />
        <Route path="/reservacion" element={withHeader(Reservacion, { rol: userRol })} />
        <Route path="/tipoorden" element={withHeader(TipoOrden, { rol: userRol })} />
        <Route path="/orden" element={withHeader(Orden, { rol: userRol })} />
        <Route path="/EstadisticasEmpleado" element={withHeader(EstadisticasEmpleado, { rol: userRol })} />
        
      </Routes>
    </Router>
  );
}

export default App;
