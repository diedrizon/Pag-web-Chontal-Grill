const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/login', (req, res) => {
    const { Correo, Contraseña } = req.body;
    if (!Correo || !Contraseña) {
      return res.status(400).json({ error: 'Los campos Correo y Contraseña son obligatorios' });
    }
    const sql = `
      SELECT ae.*, e.Cargo FROM Autenticacion_Empleado ae
      JOIN Empleado e ON ae.ID_Empleado = e.ID_Empleado
      WHERE ae.Correo = ? AND ae.Contraseña = ?;
    `;
    db.query(sql, [Correo, Contraseña], (err, result) => {
      console.log(result);  // Agrega esta línea
      if (err) {
        console.error('Error al verificar las credenciales:', err);
        res.status(500).json({ error: 'Error al verificar las credenciales' });
      } else {
        if (result.length > 0) {
          res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', cargo: result[0].Cargo });
        } else {
          res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
      }
    });
  });

  return router;
};
