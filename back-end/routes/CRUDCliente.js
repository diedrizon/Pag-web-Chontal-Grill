const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
    // Leer todos los clientes
    router.get('/read', (req, res) => {
        const sql = 'SELECT ID_Cliente, Cedula, Nombres, Apellidos, Telefono, Correo FROM Cliente';
        db.query(sql, (err, result) => {
            if (err) {
                console.error('Error al leer registros:', err);
                res.status(500).json({ error: 'Error al leer registros' });
            } else {
                res.status(200).json(result);
            }
        });
    });

    // Crear un cliente
    router.post('/create', async (req, res) => {
        const { Cedula, Nombres, Apellidos, Telefono, Correo, Contraseña } = req.body;
        if (!Cedula || !Nombres || !Apellidos || !Telefono || !Correo || !Contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(Contraseña, 10);
            const sql = 'INSERT INTO Cliente SET ?';
            const newCliente = { Cedula, Nombres, Apellidos, Telefono, Correo, Contraseña: hashedPassword };
            db.query(sql, newCliente, (err, result) => {
                if (err) {
                    console.error('Error al insertar registro:', err);
                    res.status(500).json({ error: 'Error al insertar registro' });
                } else {
                    res.status(201).json({ message: 'Registro creado con éxito' });
                }
            });
        } catch (err) {
            console.error('Error al hashear la contraseña:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    // Actualizar un cliente
    router.put('/update/:id', async (req, res) => {
        const ID_Cliente = req.params.id;
        const { Cedula, Nombres, Apellidos, Telefono, Correo, Contraseña } = req.body;
        if (!Cedula || !Nombres || !Apellidos || !Telefono || !Correo || !Contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(Contraseña, 10);
            const sql = `
                UPDATE Cliente
                SET Cedula = ?, Nombres = ?, Apellidos = ?, Telefono = ?, Correo = ?, Contraseña = ?
                WHERE ID_Cliente = ?
            `;
            const values = [Cedula, Nombres, Apellidos, Telefono, Correo, hashedPassword, ID_Cliente];
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error al actualizar el registro:', err);
                    res.status(500).json({ error: 'Error al actualizar el registro' });
                } else {
                    res.status(200).json({ message: 'Registro actualizado con éxito' });
                }
            });
        } catch (err) {
            console.error('Error al hashear la contraseña:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    // Eliminar un cliente
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
