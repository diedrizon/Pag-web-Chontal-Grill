import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles/App.css';



function Home() {
  return(
    <div>
      <Header />
      <Link to="/about">Ir a Informacion</Link>
    </div>
  );
}

export default Home;