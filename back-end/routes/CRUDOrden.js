const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/read', (req, res) => {
    const sql = 'SELECT * FROM Orden';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  //Invoke-RestMethod -Uri "http://localhost:5000/orden/read" -Method GET








  router.post('/create', (req, res) => {
    const {
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora
    } = req.body;

    if (
      !ID_Cliente ||
      !ID_Empleado ||
      !Id_Tipo_Orden ||
      !Monto ||
      !Estado ||
      !Modo_Pago ||
      !Fecha_Hora
    ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
      INSERT INTO Orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Monto, Estado, Modo_Pago, Fecha_Hora)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        res.status(201).json({ message: 'Registro creado con éxito' });
      }
    });
  });
  //Invoke-RestMethod -Uri "http://localhost:5000/orden/create" -Method POST -ContentType "application/json" -Body '{"ID_Cliente": 2, "ID_Empleado": 4, "Id_Tipo_Orden": 2, "Monto": 50.99, "Estado": "En proceso", "Modo_Pago": "Tarjeta", "Fecha_Hora": "2023-10-03 14:30:00"}'










  router.put('/update/:id', (req, res) => {
    const ID_Orden = req.params.id;
    const {
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora
    } = req.body;

    if (
      !ID_Cliente ||
      !ID_Empleado ||
      !Id_Tipo_Orden ||
      !Monto ||
      !Estado ||
      !Modo_Pago ||
      !Fecha_Hora
    ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
      UPDATE Orden
      SET ID_Cliente = ?, ID_Empleado = ?, Id_Tipo_Orden = ?, Monto = ?, Estado = ?, Modo_Pago = ?, Fecha_Hora = ?
      WHERE ID_Orden = ?
    `;

    const values = [
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Modo_Pago,
      Fecha_Hora,
      ID_Orden
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  //Invoke-RestMethod -Uri "http://localhost:5000/orden/update/3" -Method PUT -ContentType "application/json" -Body '{"ID_Cliente": 2, "ID_Empleado": 4, "Id_Tipo_Orden": 2, "Monto": 55.99, "Estado": "Entregado", "Modo_Pago": "Efectivo", "Fecha_Hora": "2023-10-03 15:45:00"}'





  router.delete('/delete/:id', (req, res) => {
    const ID_Orden = req.params.id;
    const sql = 'DELETE FROM Orden WHERE ID_Orden = ?';
    db.query(sql, [ID_Orden], (err, result) => {
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

//Invoke-RestMethod -Uri "http://localhost:5000/orden/delete/3" -Method DELETE




