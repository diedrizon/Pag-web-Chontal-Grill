const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    db.query('CALL VisualizarCategorias()', (err, results) => {
      if (err) {
        console.error('Error al leer categorías:', err);
        return res.status(500).json({ error: 'Error al leer categorías' });
      }
      res.status(200).json(results[0]);
    });
  });
  

//Invoke-RestMethod -Uri "http://localhost:5000/categoria/read" -Method Get

router.post('/create', (req, res) => {
  const { Nombre } = req.body;
  if (!Nombre) {
    return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
  }
  db.query('CALL AgregarCategoria(?)', [Nombre], (err, results) => {
    if (err) {
      console.error('Error al agregar categoría:', err);
      return res.status(500).json({ error: 'Error al agregar categoría' });
    }
    res.status(201).json({ message: 'Categoría agregada con éxito' });
  });
});


  //Invoke-RestMethod -Uri "http://localhost:5000/categoria/create" -Method POST -ContentType "application/json" -Body '{"Nombre":"Nueva Categoría"}'

  router.put('/update/:id', (req, res) => {
    const ID_Categoria = parseInt(req.params.id);
    const { Nombre } = req.body;
    if (!Nombre) {
      return res.status(400).json({ error: 'El campo Nombre es obligatorio' });
    }
    db.query('CALL ActualizarCategoria(?, ?)', [ID_Categoria, Nombre], (err, results) => {
      if (err) {
        console.error('Error al actualizar categoría:', err);
        return res.status(500).json({ error: 'Error al actualizar categoría' });
      }
      res.status(200).json({ message: 'Categoría actualizada con éxito' });
    });
  });
  

//Invoke-RestMethod -Uri "http://localhost:5000/categoria/update/4" -Method PUT -ContentType "application/json" -Body '{"Nombre":"Categoría Actualizada"}'


router.delete('/delete/:id', (req, res) => {
  const ID_Categoria = parseInt(req.params.id);
  db.query('CALL BorrarCategoria(?)', [ID_Categoria], (err, results) => {
    if (err) {
      console.error('Error al eliminar categoría:', err);
      return res.status(500).json({ error: 'Error al eliminar categoría' });
    }
    res.status(200).json({ message: 'Categoría eliminada con éxito' });
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

