import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import jsPDF from "jspdf";
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
} from "chart.js";
import html2canvas from "html2canvas";

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
  const contentRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/empleado/read")
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) =>
        console.error("Error al obtener los empleados:", error)
      );
  }, []);

  useEffect(() => {
    if (empleados.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const newChart = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: empleados.map((emp) => emp.Nombres + " " + emp.Apellidos),
            datasets: [
              {
                label: "ID Empleado",
                data: empleados.map((emp) => emp.ID_Empleado),
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
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
                type: "category",
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
    const pdf = new jsPDF();
    let y = 10; // Posición vertical inicial para la información

    empleados.forEach((empleado) => {
      pdf.text(
        `ID: ${empleado.ID_Empleado} - Nombre: ${empleado.Nombres} ${empleado.Apellidos} - Cargo: ${empleado.Cargo}`,
        10,
        y
      );
      y += 10; // Incrementa la posición vertical
      if (y > pdf.internal.pageSize.height - 20) {
        pdf.addPage(); // Agrega una nueva página si se excede el espacio
        y = 10; // Reinicia la posición vertical
      }
    });

    // Asegúrate de que el gráfico se agregue en una nueva página si no hay suficiente espacio
    if (y + 100 > pdf.internal.pageSize.height) {
      pdf.addPage();
      y = 10;
    }

    // Agrega el gráfico
    html2canvas(chartRef.current)
      .then((canvas) => {
        const image = canvas.toDataURL("image/png");
        pdf.addImage(image, "PNG", 10, y, 190, 100);
        pdf.save("reporte_empleados.pdf");
      })
      .catch((error) => {
        console.error("Error al generar el PDF:", error);
      });
  };

  return (
    <div className=".body-content">
      <Container className=".mt-custom">
       
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Estadísticas de Empleado</Card.Title>
                <canvas ref={chartRef} height="100"></canvas>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={generarReporteEmpleados}>
                  Generar PDF
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <div ref={contentRef} style={{ display: "none" }}>
        <h1>Reporte de Empleados</h1>
        {empleados.map((empleado) => (
          <div key={empleado.ID_Empleado}>
            <p>ID: {empleado.ID_Empleado}</p>
            <p>
              Nombre: {empleado.Nombres} {empleado.Apellidos}
            </p>
            <p>Cargo: {empleado.Cargo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EstadisticasEmpleado;
