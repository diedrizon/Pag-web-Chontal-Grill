const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Menu';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  //Invoke-RestMethod -Uri "http://localhost:5000/menu/read" -Method GET








  router.post('/create', (req, res) => {
    const { ID_Categoria, Nombre, Descripcion, Precio, Imagen } = req.body;
    if (!ID_Categoria || !Nombre || !Descripcion || !Precio || !Imagen) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const sql = `
      INSERT INTO Menu (ID_Categoria, Nombre, Descripcion, Precio, Imagen)
      VALUES (?, ?, ?, ?, ?)
    `;
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

  //Invoke-RestMethod -Uri "http://localhost:5000/menu/create" -Method POST -ContentType "application/json" -Body '{"ID_Categoria": 1, "Nombre": "Nuevo Menú", "Descripcion": "Descripción del menú", "Precio": 10.99, "Imagen": "base64_de_tu_imagen_aqui"}'




  

  router.put('/update/:id', (req, res) => {
    const ID_Menu = req.params.id;
    const { ID_Categoria, Nombre, Descripcion, Precio, Imagen } = req.body;
    if (!ID_Categoria || !Nombre || !Descripcion || !Precio || !Imagen) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    const sql = `
      UPDATE Menu
      SET ID_Categoria = ?, Nombre = ?, Descripcion = ?, Precio = ?, Imagen = ?
      WHERE ID_Menu = ?
    `;
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

  //Invoke-RestMethod -Uri "http://localhost:5000/menu/update/1" -Method PUT -ContentType "application/json" -Body '{"ID_Categoria": 2, "Nombre": "Menú Actualizado", "Descripcion": "Descripción actualizada", "Precio": 12.99, "Imagen": "base64_de_tu_nueva_imagen_aqui"}'








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
};
//Invoke-RestMethod -Uri "http://localhost:5000/menu/delete/1" -Method DELETE





