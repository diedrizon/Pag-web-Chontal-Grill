const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get('/read', (req, res) => {
    const sql = `
      SELECT m.*, c.Nombre as NombreCategoria, TO_BASE64(m.Imagen) as ImagenBase64 
      FROM Menu m 
      INNER JOIN Categoria c ON m.ID_Categoria = c.ID_Categoria
    `;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  

  router.post('/create', (req, res) => {
    const { ID_Categoria, Nombre, Descripcion, Precio, Imagen } = req.body;
    const sql = `INSERT INTO Menu (ID_Categoria, Nombre, Descripcion, Precio, Imagen) VALUES (?, ?, ?, ?, FROM_BASE64(?))`;
    const values = [ID_Categoria, Nombre, Descripcion, Precio, Imagen];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  router.put('/update/:id', (req, res) => {
    const ID_Menu = req.params.id;
    const { ID_Categoria, Nombre, Descripcion, Precio, Imagen } = req.body;
    const sql = `UPDATE Menu SET ID_Categoria = ?, Nombre = ?, Descripcion = ?, Precio = ?, Imagen = FROM_BASE64(?) WHERE ID_Menu = ?`;
    const values = [ID_Categoria, Nombre, Descripcion, Precio, Imagen, ID_Menu];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  router.delete('/delete/:id', (req, res) => {
    const ID_Menu = req.params.id;
    const sql = 'DELETE FROM Menu WHERE ID_Menu = ?';
    db.query(sql, [ID_Menu], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  return router;
}


