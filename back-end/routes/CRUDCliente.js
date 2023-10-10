const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Cliente';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });
//Invoke-RestMethod -Uri "http://localhost:5000/cliente/read" -Method GET




  

  router.post('/create', (req, res) => {
    const { Cedula, Nombres, Apellidos, Telefono, Correo } = req.body;
    if (!Cedula || !Nombres || !Apellidos || !Telefono || !Correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const sql = `
      INSERT INTO Cliente (Cedula, Nombres, Apellidos, Telefono, Correo)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [Cedula, Nombres, Apellidos, Telefono, Correo];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });
//Invoke-RestMethod -Uri "http://localhost:5000/cliente/create" -Method POST -ContentType "application/json" -Body '{"Cedula": "123456789", "Nombres": "Juan", "Apellidos": "Perez", "Telefono": "123456789", "Correo": "juan@example.com"}'









  router.put('/update/:id', (req, res) => {
    const ID_Cliente = req.params.id;
    const { Cedula, Nombres, Apellidos, Telefono, Correo } = req.body;
    if (!Cedula || !Nombres || !Apellidos || !Telefono || !Correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const sql = `
      UPDATE Cliente
      SET Cedula = ?, Nombres = ?, Apellidos = ?, Telefono = ?, Correo = ?
      WHERE ID_Cliente = ?
    `;
    const values = [Cedula, Nombres, Apellidos, Telefono, Correo, ID_Cliente];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/cliente/update/3" -Method PUT -ContentType "application/json" -Body '{"Cedula": "987654321", "Nombres": "Maria", "Apellidos": "Gonzalez", "Telefono": "987654321", "Correo": "maria@example.com"}'








  router.delete('/delete/:id', (req, res) => {
    const ID_Cliente = req.params.id;
    const sql = 'DELETE FROM Cliente WHERE ID_Cliente = ?';
    db.query(sql, [ID_Cliente], (err, result) => {
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


//Invoke-RestMethod -Uri "http://localhost:5000/cliente/delete/3" -Method DELETE
