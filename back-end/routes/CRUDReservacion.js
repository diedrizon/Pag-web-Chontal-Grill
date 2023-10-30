const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/read", (req, res) => {
    const sql = "SELECT * FROM Reservacion";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(result);
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/reservacion/read" -Method GET

  router.get("/visua", (req, res) => {
    const sql = `
      SELECT * 
      FROM Reservacion 
      WHERE Fecha_Reservacion > CURDATE()
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros", message: err.message });
      } else {
        res.status(200).json(result);
      }
      
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/reservacion/visua" -Method GET

  router.post("/create", (req, res) => {
    const {
      ID_Cliente,
      Descripcion,
      Fecha_Reservacion,
      Fecha_Inicio,
      Fecha_Fin,
    } = req.body;
    if (!ID_Cliente || !Fecha_Reservacion || !Fecha_Inicio || !Fecha_Fin) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const sql = `
      INSERT INTO Reservacion (ID_Cliente, Descripcion, Fecha_Reservacion, Fecha_Inicio, Fecha_Fin)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      ID_Cliente,
      Descripcion || null,
      Fecha_Reservacion,
      Fecha_Inicio,
      Fecha_Fin,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al insertar registro:", err);
        res.status(500).json({ error: "Error al insertar registro" });
      } else {
        res.status(201).json({ message: "Registro creado con éxito" });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/reservacion/create" -Method POST -ContentType "application/json" -Body '{"ID_Cliente": 2, "Descripcion": "Reserva de mesa", "Fecha_Reservacion": "2023-10-10", "Fecha_Inicio": "12:00:00", "Fecha_Fin": "14:00:00"}'

  router.put("/update/:id", (req, res) => {
    const ID_Reservacion = req.params.id;
    const {
      ID_Cliente,
      Descripcion,
      Fecha_Reservacion,
      Fecha_Inicio,
      Fecha_Fin,
    } = req.body;
    if (!ID_Cliente || !Fecha_Reservacion || !Fecha_Inicio || !Fecha_Fin) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const sql = `
      UPDATE Reservacion
      SET ID_Cliente = ?, Descripcion = ?, Fecha_Reservacion = ?, Fecha_Inicio = ?, Fecha_Fin = ?
      WHERE ID_Reservacion = ?
    `;
    const values = [
      ID_Cliente,
      Descripcion || null,
      Fecha_Reservacion,
      Fecha_Inicio,
      Fecha_Fin,
      ID_Reservacion,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al actualizar el registro:", err);
        res.status(500).json({ error: "Error al actualizar el registro" });
      } else {
        res.status(200).json({ message: "Registro actualizado con éxito" });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/reservacion/update/2" -Method PUT -ContentType "application/json" -Body '{"ID_Cliente": 2, "Descripcion": "Reserva de salón", "Fecha_Reservacion": "2023-10-11", "Fecha_Inicio": "15:00:00", "Fecha_Fin": "17:00:00"}'

  router.delete("/delete/:id", (req, res) => {
    const ID_Reservacion = req.params.id;
    const sql = "DELETE FROM Reservacion WHERE ID_Reservacion = ?";
    db.query(sql, [ID_Reservacion], (err, result) => {
      if (err) {
        console.error("Error al eliminar el registro:", err);
        res.status(500).json({ error: "Error al eliminar el registro" });
      } else {
        res.status(200).json({ message: "Registro eliminado con éxito" });
      }
    });
  });

  return router;
};

//Invoke-RestMethod -Uri "http://localhost:5000/reservacion/delete/2" -Method DELETE
