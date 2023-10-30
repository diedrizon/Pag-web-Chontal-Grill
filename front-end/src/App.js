import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import logo from "./assets/images/LogoPNG.png";
import "./styles/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Categoria from "./pages/Customer";
import Cajero from "./components/CajeroHeader";
import JefeCocina from "./components/JefeCocinaHeader";
import Mesero from "./components/MeseroHeader";
import AdminHeader from "./components/AdminHeader";
import Empleado from "./pages/EmpleadoAdmin";
import VisualizarReservacion from "./pages/ReservacionesAdmin";
import TipoOrden from "./pages/Tipo de orden";

function MainContent() {
  let location = useLocation();

  const specialPages = ["/login", "/Administrador", "/menu","/Reservaciones", "/Empleado", "/Categoria","/Mesero", "/TipoOrden"];
  const isSpecialPage = specialPages.includes(location.pathname);



  const renderHeader = () => {
    switch(location.pathname) {
      case '/Administrador':
        return <AdminHeader />;
      case '/Mesero':
      case '/TipoOrden':  // Agrega esta línea
        return <Mesero />;
      default:
        return <Header />;
    }
  };

  return (
    <div className="app-container">
      {!isSpecialPage && renderHeader()}

      {!isSpecialPage && (
        <div className="logo-container">
          <img src={logo} alt="Logo Chontal Grill" />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Administrador" element={<AdminHeader />} />
       <Route path="/menu" element={<Menu />} />
        <Route path="/Reservaciones" element={<VisualizarReservacion />} />
        <Route path="/Categoria" element={<Categoria />} />
        <Route path="/Empleado" element={<Empleado />} />
        <Route path="/Cajero" element={<Cajero />} />
        <Route path="/TipoOrden" element={<TipoOrden />} />
        <Route path="/JefeCocina" element={<JefeCocina />} />
        <Route path="/Mesero" element={<Mesero />} />
      </Routes>

      {!isSpecialPage && <Footer />}
    </div>
  );
}

function App() {
  return (
      <Router>
        <MainContent />
      </Router>
  );
}

export default App;
