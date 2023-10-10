const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Detalle_Orden';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });
    
  //Invoke-RestMethod -Uri "http://localhost:5000/detalle_orden/read" -Method GET







  router.post('/create', (req, res) => {
    const { ID_Menu, ID_Orden, Cantidad } = req.body;

    if (!ID_Menu || !ID_Orden || !Cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
      INSERT INTO Detalle_Orden (ID_Menu, ID_Orden, Cantidad)
      VALUES (?, ?, ?)
    `;

    const values = [ID_Menu, ID_Orden, Cantidad];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/detalle_orden/create" -Method POST -ContentType "application/json" -Body '{"ID_Menu": 3, "ID_Orden": 2, "Cantidad": 3}'






  router.put('/update/:id', (req, res) => {
    const ID_Detalle_Orden = req.params.id;
    const { ID_Menu, ID_Orden, Cantidad } = req.body;

    if (!ID_Menu || !ID_Orden || !Cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
      UPDATE Detalle_Orden
      SET ID_Menu = ?, ID_Orden = ?, Cantidad = ?
      WHERE ID_Detalle_Orden = ?
    `;

    const values = [ID_Menu, ID_Orden, Cantidad, ID_Detalle_Orden];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/detalle_orden/update/4" -Method PUT -ContentType "application/json" -Body '{"ID_Menu": 3, "ID_Orden": 2, "Cantidad": 4}'








  router.delete('/delete/:id', (req, res) => {
    const ID_Detalle_Orden = req.params.id;
    const sql = 'DELETE FROM Detalle_Orden WHERE ID_Detalle_Orden = ?';
    db.query(sql, [ID_Detalle_Orden], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  return router;
};


//Invoke-RestMethod -Uri "http://localhost:5000/detalle_orden/delete/5" -Method DELETE
