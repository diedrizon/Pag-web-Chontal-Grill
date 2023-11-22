import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import jsPDF from 'jspdf';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PieController, // Importa PieController
} from 'chart.js';
import html2canvas from 'html2canvas';

// Registra los componentes necesarios de Chart.js, incluyendo PieController
ChartJS.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

function EstadisticasOrden() {
  const [ordenes, setOrdenes] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/orden/readOrden')
      .then((response) => response.json())
      .then((data) => setOrdenes(data))
      .catch((error) => console.error('Error al obtener las órdenes:', error));
  }, []);

  useEffect(() => {
    if (ordenes.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const newChart = new ChartJS(ctx, {
          type: 'pie',
          data: {
            labels: ordenes.map((orden) => orden.Fecha_Hora),
            datasets: [
              {
                label: 'Monto',
                data: ordenes.map((orden) => orden.Monto),
                backgroundColor: [
                  // Puedes definir diferentes colores para cada sector
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  // ... otros colores
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  // ... otros colores
                ],
                borderWidth: 1,
              },
            ],
          },
        });

        return () => newChart.destroy();
      }
    }
  }, [ordenes]);

  const generarReporteOrdenes = () => {
    const pdf = new jsPDF();
    let y = 10;

    ordenes.forEach((orden) => {
      pdf.text(
        `ID Orden: ${orden.ID_Orden} - Cliente: ${orden.Cliente} - Monto: ${orden.Monto}`,
        10,
        y
      );
      y += 10;
      if (y > pdf.internal.pageSize.height - 20) {
        pdf.addPage();
        y = 10;
      }
    });

    if (y + 100 > pdf.internal.pageSize.height) {
      pdf.addPage();
      y = 10;
    }

    html2canvas(chartRef.current)
      .then((canvas) => {
        const image = canvas.toDataURL('image/png');
        pdf.addImage(image, 'PNG', 10, y, 190, 100);
        pdf.save('reporte_ordenes.pdf');
      })
      .catch((error) => {
        console.error('Error al generar el PDF:', error);
      });
  };

  const canvasStyles = {
    maxWidth: '400px', // Ajusta esto según tus necesidades
    margin: 'auto'
  };

  return (
    <div className=".body-content">
      <Container className=".mt-custom">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Estadísticas de Órdenes del Mes</Card.Title>
                <div style={canvasStyles}>
                  <canvas ref={chartRef} height="100"></canvas>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={generarReporteOrdenes}>
                  Generar PDF
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EstadisticasOrden;
