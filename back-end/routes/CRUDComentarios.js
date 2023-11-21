const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/read", (req, res) => {
    const sql = `
    SELECT 
    Comentarios.ID_Comentarios, 
    Cliente.Nombres, 
    Cliente.Apellidos,
    Comentarios.Comentario, 
    Comentarios.Calificacion, 
    Comentarios.Fecha
  FROM Comentarios 
  INNER JOIN Cliente ON Comentarios.ID_Cliente = Cliente.ID_Cliente;
    `;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error al leer registros:", err);
        res.status(500).json({ error: "Error al leer registros" });
      } else {
        res.status(200).json(result);
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/comentarios/read" -Method GET

  router.post("/create", (req, res) => {
    const { ID_Cliente, Comentario, Calificacion, Fecha } = req.body;
    if (!ID_Cliente || !Comentario || !Calificacion || !Fecha) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const sql = `
      INSERT INTO Comentarios (ID_Cliente, Comentario, Calificacion, Fecha)
      VALUES (?, ?, ?, ?)
    `;
    const values = [ID_Cliente, Comentario, Calificacion, Fecha];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al insertar registro:", err);
        res.status(500).json({ error: "Error al insertar registro" });
      } else {
        res.status(201).json({ message: "Registro creado con éxito" });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/comentarios/create" -Method POST -ContentType "application/json" -Body '{"ID_Cliente": 2, "Comentario": "Buena comida", "Calificacion": 5, "Fecha": "2023-10-05T10:00:00"}'

  router.put("/update/:id", (req, res) => {
    const ID_Comentarios = req.params.id;
    const { ID_Cliente, Comentario, Calificacion, Fecha } = req.body;
    if (!ID_Cliente || !Comentario || !Calificacion || !Fecha) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const sql = `
      UPDATE Comentarios
      SET ID_Cliente = ?, Comentario = ?, Calificacion = ?, Fecha = ?
      WHERE ID_Comentarios = ?
    `;
    const values = [
      ID_Cliente,
      Comentario,
      Calificacion,
      Fecha,
      ID_Comentarios,
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

  //Invoke-RestMethod -Uri "http://localhost:5000/comentarios/update/6" -Method PUT -ContentType "application/json" -Body '{"ID_Cliente": 2, "Comentario": "Excelente servicio", "Calificacion": 4, "Fecha": "2023-10-05T12:00:00"}'

  router.delete("/delete/:id", (req, res) => {
    const ID_Comentarios = req.params.id;
    const sql = "DELETE FROM Comentarios WHERE ID_Comentarios = ?";
    db.query(sql, [ID_Comentarios], (err, result) => {
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

//Invoke-RestMethod -Uri "http://localhost:5000/comentarios/delete/5" -Method DELETE
