import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import logo from './assets/images/LogoPNG.png';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import Login from './pages/Login';
import AdminHeader from './components/AdminHeader';

function MainContent() {
  let location = useLocation();

  const specialPages = ['/login', '/Administrador'];
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
              <Route path="/Administrador" element={<AdminHeader />} />
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
