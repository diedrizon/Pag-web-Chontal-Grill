import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Header from '../components/Header'; 
import "../styles/HeaderAdministrador.css";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function EstadisticasEmpleado({ rol }) {
  const [empleados, setEmpleados] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/empleado/read')
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error('Error al obtener los empleados:', error));
  }, []);

  useEffect(() => {
    if (empleados.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const newChart = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: empleados.map((emp) => emp.Nombres + " " + emp.Apellidos), // Combina nombre y apellido para la etiqueta
            datasets: [
              {
                label: 'ID Empleado',
                data: empleados.map((emp) => emp.ID_Empleado), // Usa ID como dato
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
              x: { 
                type: 'category',
                labels: empleados.map((emp) => emp.Cargo), 
              },
            },
          },
        });

  
        return () => newChart.destroy();
      }
    }
  }, [empleados]);

  const generarReporteEmpleados = () => {
    const doc = new jsPDF();
    doc.setFontSize(10); // Set PDF font size
    doc.text("Reporte de Empleados", 10, 10);
    empleados.forEach((empleado, index) => {
      let y = 20 + (10 * index);
      doc.text(`ID: ${empleado.ID_Empleado} - Nombre: ${empleado.Nombres} ${empleado.Apellidos} - Cargo: ${empleado.Cargo}`, 10, y);
      if (y > doc.internal.pageSize.height) {
        doc.addPage();
        y = 10; // Reset Y on new page
      }
    });
    doc.save('reporte_empleados.pdf');
  };

  return (
    <div className="body-content">
      <Header rol={ rol } />  
      <Container className="mt-custom">

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Estadisticas de Empleado</Card.Title>
              <canvas ref={chartRef} height="100"></canvas>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={generarReporteEmpleados}>Generar PDF</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default EstadisticasEmpleado;
