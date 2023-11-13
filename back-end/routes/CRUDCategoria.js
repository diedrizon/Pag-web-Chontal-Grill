const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Categoria';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });

//Invoke-RestMethod -Uri "http://localhost:5000/categoria/read" -Method Get



  router.post('/create', (req, res) => {
    const { Nombre } = req.body;
    if (!Nombre) {
      return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
    }
    const sql = `INSERT INTO Categoria (Nombre) VALUES (?)`;
    const values = [Nombre];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/categoria/create" -Method POST -ContentType "application/json" -Body '{"Nombre":"Nueva Categoría"}'




  router.put('/update/:id', (req, res) => {
    const ID_Categoria = req.params.id;
    const { Nombre } = req.body;
    if (!Nombre) {
      return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
    }
    const sql = `UPDATE Categoria SET Nombre = ? WHERE ID_Categoria = ?`;
    const values = [Nombre, ID_Categoria];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

//Invoke-RestMethod -Uri "http://localhost:5000/categoria/update/4" -Method PUT -ContentType "application/json" -Body '{"Nombre":"Categoría Actualizada"}'







  router.delete('/delete/:id', (req, res) => {
    const ID_Categoria = req.params.id;
    const sql = 'DELETE FROM Categoria WHERE ID_Categoria = ?';
    db.query(sql, [ID_Categoria], (err, result) => {
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


//Invoke-RestMethod -Uri "http://localhost:5000/categoria/delete/2" -Method DELETE




router.get('/buscarcategoria/:searchText', (req, res) => {
  const searchText = req.params.searchText;
  const sql = 'SELECT * FROM Categoria WHERE Nombre LIKE ?';
  db.query(sql, [`%${searchText}%`], (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error en la consulta de la base de datos', error: err });
    } else {
      res.status(200).send(results);
    }
  });
});

