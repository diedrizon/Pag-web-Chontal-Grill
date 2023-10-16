// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../Styles/App.css';


function About() {
  return(
    <div>
      <Header />
      <Link to="/">Ir a inicio</Link>
    </div>
  );
}

export default About;