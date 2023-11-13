const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Operación de lectura con un SELECT que une múltiples tablas
  router.get("/read", (req, res) => {
    const sql = `SELECT 
      o.ID_Orden,
      c.ID_Cliente,
      e.ID_Empleado,
      t.Id_Tipo_Orden,
      o.Monto,
      o.Estado,
      o.Fecha_Hora,
      mp.ID_Metodo_Pago,
      CONCAT(c.Nombres, ' ', c.Apellidos) AS Cliente,
      CONCAT(e.Nombres, ' ', e.Apellidos) AS Empleado,
      COALESCE(t.Tipo, 'Sin especificar') AS TipoOrden,
      COALESCE(mp.Descripcion, 'Sin método de pago') AS MetodoPago
    FROM Orden o
    LEFT JOIN Cliente c ON o.ID_Cliente = c.ID_Cliente
    LEFT JOIN Empleado e ON o.ID_Empleado = e.ID_Empleado
    LEFT JOIN Tipo_Orden t ON o.Id_Tipo_Orden = t.Id_Tipo_Orden
    LEFT JOIN \`Metodo de Pago\` mp ON o.ID_Metodo_Pago = mp.ID_Metodo_Pago`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error al leer órdenes:", err);
        res.status(500).json({ error: "Error al leer órdenes" });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Operación de creación para la tabla Orden
  router.post("/create", (req, res) => {
    const {
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Fecha_Hora,
      ID_Metodo_Pago,
    } = req.body;
    const sql = `INSERT INTO Orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Monto, Estado, Fecha_Hora, ID_Metodo_Pago) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Fecha_Hora,
      ID_Metodo_Pago,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al crear orden:", err);
        res.status(500).json({ error: "Error al crear orden" });
      } else {
        res.status(201).json({ message: "Orden creada con éxito" });
      }
    });
  });

  // Operación de actualización para la tabla Orden
  router.put("/update/:id", (req, res) => {
    const ID_Orden = req.params.id;
    const {
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Fecha_Hora,
      ID_Metodo_Pago,
    } = req.body;

    // Aquí no necesitas convertir nombres a IDs ya que esperas IDs directamente
    const sql = `UPDATE Orden SET 
      ID_Cliente = ?, 
      ID_Empleado = ?, 
      Id_Tipo_Orden = ?, 
      Monto = ?, 
      Estado = ?, 
      Fecha_Hora = ?, 
      ID_Metodo_Pago = ? 
    WHERE ID_Orden = ?`;

    const values = [
      ID_Cliente,
      ID_Empleado,
      Id_Tipo_Orden,
      Monto,
      Estado,
      Fecha_Hora,
      ID_Metodo_Pago,
      ID_Orden,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al actualizar orden:", err);
        res.status(500).json({ error: "Error al actualizar orden" });
      } else {
        res.status(200).json({ message: "Orden actualizada con éxito" });
      }
    });
  });

  // Operación de eliminación para la tabla Orden
  router.delete("/delete/:id", (req, res) => {
    const ID_Orden = req.params.id;
    const sql = "DELETE FROM Orden WHERE ID_Orden = ?";
    db.query(sql, [ID_Orden], (err, result) => {
      if (err) {
        console.error("Error al eliminar orden:", err);
        res.status(500).json({ error: "Error al eliminar orden" });
      } else {
        res.status(200).json({ message: "Orden eliminada con éxito" });
      }
    });
  });

  return router;
};
