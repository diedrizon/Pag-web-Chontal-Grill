import React from 'react';
import '../assets/styles/Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Dirección</h4>
          <p>Calle Principal donde fueron los bombero, Juigalpa,Chontales, Nicaragua</p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Teléfono: +505 456 7890</p>
          <p>Email: info@chontalgrill.com</p>
        </div>
        <div className="footer-section">
          <h4>Síguenos</h4>
          <p>
        <a href="https://www.facebook.com/chontalgrill/" target="_blank" rel="noopener noreferrer">Facebook</a> | 
        <a href="https://www.facebook.com/chontalgrill/" target="_blank" rel="noopener noreferrer">Instagram</a> | 
        <a href="https://www.facebook.com/chontalgrill/" target="_blank" rel="noopener noreferrer">Twitter</a>
    </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Chontal Grill. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}

export default Footer;
