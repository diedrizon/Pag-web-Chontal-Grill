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
import Empleado from "./pages/EmpleadoAdmin";  // Asegúrate de importar Empleado

function MainContent() {
  let location = useLocation();

  const specialPages = ["/login", "/Administrador", "/menu", "/Empleado", "/Categoria"];
  const isSpecialPage = specialPages.includes(location.pathname);

  return (
    <div className="app-container">
      {!isSpecialPage && <Header />}

      {!isSpecialPage && (
        <div className="logo-container">
          <img src={logo} alt="Logo Chontal Grill" />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Administrador/*" element={<AdminHeader />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Categoria" element={<Categoria />} />
        <Route path="/Empleado" element={<Empleado />} />
        <Route path="/Cajero" element={<Cajero />} />
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
