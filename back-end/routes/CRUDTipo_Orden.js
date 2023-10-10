const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Tipo_Orden';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/tipo_orden/read" -Method GET






  router.post('/create', (req, res) => {
    const { Nombre, Descripcion, Nota_Especial, Domicilio } = req.body;
    if (!Nombre) {
      return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
    }
    const sql = `
      INSERT INTO Tipo_Orden (Nombre, Descripcion, Nota_Especial, Domicilio)
      VALUES (?, ?, ?, ?)
    `;
    const values = [Nombre, Descripcion || null, Nota_Especial || null, Domicilio || null];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/tipo_orden/create" -Method POST -ContentType "application/json" -Body '{"Nombre": "Delivery", "Descripcion": "Entrega a domicilio", "Nota_Especial": "Rápido", "Domicilio": "123 Calle Principal"}'








  router.put('/update/:id', (req, res) => {
    const Id_Tipo_Orden = req.params.id;
    const { Nombre, Descripcion, Nota_Especial, Domicilio } = req.body;
    if (!Nombre) {
      return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
    }
    const sql = `
      UPDATE Tipo_Orden
      SET Nombre = ?, Descripcion = ?, Nota_Especial = ?, Domicilio = ?
      WHERE Id_Tipo_Orden = ?
    `;
    const values = [Nombre, Descripcion || null, Nota_Especial || null, Domicilio || null, Id_Tipo_Orden];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/tipo_orden/update/2" -Method PUT -ContentType "application/json" -Body '{"Nombre": "Para llevar", "Descripcion": "Pedido para llevar", "Nota_Especial": "Empaque especial", "Domicilio": "456 Calle Secundaria"}'







  router.delete('/delete/:id', (req, res) => {
    const Id_Tipo_Orden = req.params.id;
    const sql = 'DELETE FROM Tipo_Orden WHERE Id_Tipo_Orden = ?';
    db.query(sql, [Id_Tipo_Orden], (err, result) => {
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

//Invoke-RestMethod -Uri "http://localhost:5000/tipo_orden/delete/3" -Method DELETE
