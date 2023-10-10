import logo from './assets/images/LogoPNG.png'; // Asegúrate de ajustar la ruta según donde hayas puesto tu logo
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';



function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="logo-container">
        <img src={logo} alt="Logo Chontal Grill" />
      </div>
      <Footer /> {/* Aquí agregamos el pie de página */}
    </div>
  );
}


export default App;

