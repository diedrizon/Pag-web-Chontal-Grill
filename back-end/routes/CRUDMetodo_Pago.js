const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // READ
  router.get('/read', (req, res) => {
    db.query('CALL VisualizarMetodosPago()', (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result[0]); // El resultado se devuelve en un array con un elemento por cada conjunto de resultados de la llamada
      }
    });
  });

  // CREATE
  router.post('/create', (req, res) => {
    const { Descripcion } = req.body;
    if (!Descripcion) {
      return res.status(400).json({ error: 'El campo Descripcion es obligatorio' });
    }
    db.query('CALL AgregarMetodoPago(?)', [Descripcion], (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });

  // UPDATE
  router.put('/update/:id', (req, res) => {
    const ID_Metodo_Pago = req.params.id;
    const { Descripcion } = req.body;
    if (!Descripcion) {
      return res.status(400).json({ error: 'El campo Descripcion es obligatorio' });
    }
    db.query('CALL ActualizarMetodoPago(?, ?)', [ID_Metodo_Pago, Descripcion], (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  // DELETE
  router.delete('/delete/:id', (req, res) => {
    const ID_Metodo_Pago = req.params.id;
    db.query('CALL EliminarMetodoPago(?)', [ID_Metodo_Pago], (err, result) => {
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
