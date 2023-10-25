
USE  chontal_grill;

-- Creacion de la tabla Bitafora

CREATE TABLE Bitacora (
    ID_Bitacora int not null auto_increment,
    Trasaccion varchar (10) not null,
    Usuario varchar (40) not null,
    Fecha datetime not null,
    Tabla varchar ( 20) not null,
    ID_Registro_afectado int,
    Valores_Antiguos text,
    Valores_Nuevos text,
    primary key (ID_Bitacora)
);

-- Creacion de los Trigger

-- Trigger de Categoria 
DELIMITER //
CREATE TRIGGER after_insert_categoria
AFTER INSERT ON Categoria
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, 
    ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Categoria', NEW.ID_Categoria, 
    CONCAT('Nombre: ', NEW.Nombre));
END;
//

CREATE TRIGGER after_update_categoria
AFTER UPDATE ON Categoria
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado,
     Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Categoria', NEW.ID_Categoria, 
    CONCAT('Nombre: ', OLD.Nombre), CONCAT('Nombre: ', NEW.Nombre));
END;
//

CREATE TRIGGER after_delete_categoria
AFTER DELETE ON Categoria
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla,
     ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Categoria',
     OLD.ID_Categoria, CONCAT('Nombre: ', OLD.Nombre));
END;
//
DELIMITER ;




-- Pruebas 
INSERT INTO Categoria (Nombre) VALUES ('Categoria de Prueba');
UPDATE Categoria SET Nombre = 'Nueva Categoria' WHERE ID_Categoria = 1;
DELETE FROM Categoria WHERE ID_Categoria = 1;



-- Consulta

SELECT * FROM Bitacora





-- Trigger de Menu
DELIMITER //

CREATE TRIGGER after_insert_menu
AFTER INSERT ON Menu
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', USER(), NOW(), 'Menu', NEW.ID_Menu, CONCAT('Nombre: ', NEW.Nombre, ', Descripcion: ', NEW.Descripcion, ', Precio: ', NEW.Precio));
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_update_menu
AFTER UPDATE ON Menu
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', USER(), NOW(), 'Menu', NEW.ID_Menu, CONCAT('Nombre: ', OLD.Nombre, ', Descripcion: ', OLD.Descripcion, ', Precio: ', OLD.Precio), CONCAT('Nombre: ', NEW.Nombre, ', Descripcion: ', NEW.Descripcion, ', Precio: ', NEW.Precio));
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_delete_menu
AFTER DELETE ON Menu
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', USER(), NOW(), 'Menu', OLD.ID_Menu, CONCAT('Nombre: ', OLD.Nombre, ', Descripcion: ', OLD.Descripcion, ', Precio: ', OLD.Precio));
END;
//

DELIMITER ;


-- Pruebas 
INSERT INTO Menu (ID_Categoria, Nombre, Descripcion, Precio, Imagen) VALUES (2,'Hamburguesa', 'Deliciosa hamburguesa con queso', 9.99, 'imagen_de_hamburguesa');
UPDATE Menu SET Nombre = 'Nueva Hamburguesa', Precio = 10.99 WHERE ID_Menu = 3;
DELETE FROM Menu WHERE ID_Menu = 2;
INSERT INTO Menu (ID_Categoria, Nombre, Descripcion, Precio, Imagen) VALUES (2,'Sopa', 'Rica sopa de res', 9.99, 'Imagen_sopa');







-- Consulta

SELECT * FROM Bitacora





-- Trigger de Detalle_Orden

DELIMITER //
CREATE TRIGGER after_insert_detalle_orden
AFTER INSERT ON Detalle_Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Detalle_Orden', NEW.ID_Detalle_Orden, CONCAT('ID_Menu: ', NEW.ID_Menu, ', ID_Orden: ', NEW.ID_Orden, ', Cantidad: ', NEW.Cantidad));
END;
//

CREATE TRIGGER after_update_detalle_orden
AFTER UPDATE ON Detalle_Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Detalle_Orden', NEW.ID_Detalle_Orden, CONCAT('ID_Menu: ', OLD.ID_Menu, ', ID_Orden: ', OLD.ID_Orden, ', Cantidad: ', OLD.Cantidad), CONCAT('ID_Menu: ', NEW.ID_Menu, ', ID_Orden: ', NEW.ID_Orden, ', Cantidad: ', NEW.Cantidad));
END;
//

CREATE TRIGGER after_delete_detalle_orden
AFTER DELETE ON Detalle_Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Detalle_Orden', OLD.ID_Detalle_Orden, CONCAT('ID_Menu: ', OLD.ID_Menu, ', ID_Orden: ', OLD.ID_Orden, ', Cantidad: ', OLD.Cantidad));
END;
//
DELIMITER ;



-- Pruebas 

-- INSERT
INSERT INTO Detalle_Orden (ID_Menu, ID_Orden, Cantidad)
VALUES (3, 2, 2);


-- UPDATE
UPDATE Detalle_Orden
SET Cantidad = 3
WHERE ID_Detalle_Orden = 3;

-- DELETE
DELETE FROM Detalle_Orden WHERE ID_Detalle_Orden = 3;

INSERT INTO Detalle_Orden (ID_Menu, ID_Orden, Cantidad)
VALUES (3, 2, 2);


-- Consulta

SELECT * FROM Bitacora







-- Trigger de Orden

DELIMITER //
CREATE TRIGGER after_insert_orden
AFTER INSERT ON Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Orden', NEW.ID_Orden, CONCAT('ID_Cliente: ', NEW.ID_Cliente, ', ID_Empleado: ', NEW.ID_Empleado, ', Id_Tipo_Orden: ', NEW.Id_Tipo_Orden, ', Monto: ', NEW.Monto, ', Estado: ', NEW.Estado, ', Modo_Pago: ', NEW.Modo_Pago, ', Fecha_Hora: ', NEW.Fecha_Hora));
END;
//

CREATE TRIGGER after_update_orden
AFTER UPDATE ON Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Orden', NEW.ID_Orden, CONCAT('ID_Cliente: ', OLD.ID_Cliente, ', ID_Empleado: ', OLD.ID_Empleado, ', Id_Tipo_Orden: ', OLD.Id_Tipo_Orden, ', Monto: ', OLD.Monto, ', Estado: ', OLD.Estado, ', Modo_Pago: ', OLD.Modo_Pago, ', Fecha_Hora: ', OLD.Fecha_Hora), CONCAT('ID_Cliente: ', NEW.ID_Cliente, ', ID_Empleado: ', NEW.ID_Empleado, ', Id_Tipo_Orden: ', NEW.Id_Tipo_Orden, ', Monto: ', NEW.Monto, ', Estado: ', NEW.Estado, ', Modo_Pago: ', NEW.Modo_Pago, ', Fecha_Hora: ', NEW.Fecha_Hora));
END;
//

CREATE TRIGGER after_delete_orden
AFTER DELETE ON Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Orden', OLD.ID_Orden, CONCAT('ID_Cliente: ', OLD.ID_Cliente, ', ID_Empleado: ', OLD.ID_Empleado, ', Id_Tipo_Orden: ', OLD.Id_Tipo_Orden, ', Monto: ', OLD.Monto, ', Estado: ', OLD.Estado, ', Modo_Pago: ', OLD.Modo_Pago, ', Fecha_Hora: ', OLD.Fecha_Hora));
END;
//
DELIMITER ;



-- Pruebas 

-- INSERT
INSERT INTO Orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Monto, Estado, Modo_Pago, Fecha_Hora)
VALUES (2, 4, 2, 25.99, 'En proceso', 'Tarjeta', '2023-10-02 12:30:00');



-- UPDATE
UPDATE Orden
SET Monto = 30.50
WHERE ID_Orden = 1;

-- DELETE
DELETE FROM Orden WHERE ID_Orden = 1;

INSERT INTO Orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Monto, Estado, Modo_Pago, Fecha_Hora)
VALUES (2, 4, 2, 25.99, 'En proceso', 'Tarjeta', '2023-10-02 12:30:00');


-- Consulta

SELECT * FROM Bitacora






-- Trigger de Empleado

DELIMITER //
CREATE TRIGGER after_insert_empleado
AFTER INSERT ON Empleado
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Empleado', NEW.ID_Empleado, CONCAT('Nombres: ', NEW.Nombres, ', Apellidos: ', NEW.Apellidos, ', Telefono: ', NEW.Telefono, ', Correo: ', NEW.Correo, ', Cargo: ', NEW.Cargo));
END;
//

CREATE TRIGGER after_update_empleado
AFTER UPDATE ON Empleado
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Empleado', NEW.ID_Empleado, CONCAT('Nombres: ', OLD.Nombres, ', Apellidos: ', OLD.Apellidos, ', Telefono: ', OLD.Telefono, ', Correo: ', OLD.Correo, ', Cargo: ', OLD.Cargo), CONCAT('Nombres: ', NEW.Nombres, ', Apellidos: ', NEW.Apellidos, ', Telefono: ', NEW.Telefono, ', Correo: ', NEW.Correo, ', Cargo: ', NEW.Cargo));
END;
//

CREATE TRIGGER after_delete_empleado
AFTER DELETE ON Empleado
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Empleado', OLD.ID_Empleado, CONCAT('Nombres: ', OLD.Nombres, ', Apellidos: ', OLD.Apellidos, ', Telefono: ', OLD.Telefono, ', Correo: ', OLD.Correo, ', Cargo: ', OLD.Cargo));
END;
//
DELIMITER ;












-- Pruebas 
-- INSERT
INSERT INTO Empleado (Nombres, Apellidos, Telefono, Correo, Cargo)
VALUES ('Ana', 'Gonzalez', '987654321', 'ana@example.com', 'Cajero');

-- UPDATE
UPDATE Empleado
SET Cargo = 'Gerente'
WHERE ID_Empleado = 1;

-- DELETE
DELETE FROM Empleado 
WHERE
    ID_Empleado = 1;
    
INSERT INTO Empleado (Nombres, Apellidos, Telefono, Correo, Cargo)
VALUES ('Pedro', 'Gonzalez', '987654321', 'ana@example.com', 'Cajero');






-- Consulta

SELECT * FROM Bitacora
SELECT * FROM Empleado







-- Trigger de Cliente

DELIMITER //
CREATE TRIGGER after_insert_cliente
AFTER INSERT ON Cliente
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Cliente', NEW.ID_Cliente, CONCAT('Cedula: ', NEW.Cedula, ', Nombres: ', NEW.Nombres, ', Apellidos: ', NEW.Apellidos, ', Telefono: ', NEW.Telefono, ', Correo: ', NEW.Correo));
END;
//

CREATE TRIGGER after_update_cliente
AFTER UPDATE ON Cliente
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Cliente', NEW.ID_Cliente, CONCAT('Cedula: ', OLD.Cedula, ', Nombres: ', OLD.Nombres, ', Apellidos: ', OLD.Apellidos, ', Telefono: ', OLD.Telefono, ', Correo: ', OLD.Correo), CONCAT('Cedula: ', NEW.Cedula, ', Nombres: ', NEW.Nombres, ', Apellidos: ', NEW.Apellidos, ', Telefono: ', NEW.Telefono, ', Correo: ', NEW.Correo));
END;
//

CREATE TRIGGER after_delete_cliente
AFTER DELETE ON Cliente
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Cliente', OLD.ID_Cliente, CONCAT('Cedula: ', OLD.Cedula, ', Nombres: ', OLD.Nombres, ', Apellidos: ', OLD.Apellidos, ', Telefono: ', OLD.Telefono, ', Correo: ', OLD.Correo));
END;
//
DELIMITER ;



-- Pruebas 

-- INSERT
INSERT INTO Cliente (Cedula, Nombres, Apellidos, Telefono, Correo)
VALUES ('123456789', 'Luis', 'Martinez', '678901234', 'luis@example.com');

-- UPDATE
UPDATE Cliente
SET Telefono = '1122334455'
WHERE ID_Cliente = 2;

-- DELETE
DELETE FROM Cliente WHERE ID_Cliente = 1;

INSERT INTO Cliente (Cedula, Nombres, Apellidos, Telefono, Correo)
VALUES ('123456789', 'Luis', 'Martinez', '678901234', 'luis@example.com');


-- Consulta

SELECT * FROM Bitacora







-- Trigger de Reservacion

DELIMITER //
CREATE TRIGGER after_insert_reservacion
AFTER INSERT ON Reservacion
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Reservacion', NEW.ID_Reservacion, CONCAT('ID_Cliente: ', NEW.ID_Cliente, ', Descripcion: ', NEW.Descripcion, ', Fecha_Reservacion: ', NEW.Fecha_Reservacion, ', Fecha_Inicio: ', NEW.Fecha_Inicio, ', Fecha_Fin: ', NEW.Fecha_Fin));
END;
//

CREATE TRIGGER after_update_reservacion
AFTER UPDATE ON Reservacion
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Reservacion', NEW.ID_Reservacion, CONCAT('ID_Cliente: ', OLD.ID_Cliente, ', Descripcion: ', OLD.Descripcion, ', Fecha_Reservacion: ', OLD.Fecha_Reservacion, ', Fecha_Inicio: ', OLD.Fecha_Inicio, ', Fecha_Fin: ', OLD.Fecha_Fin), CONCAT('ID_Cliente: ', NEW.ID_Cliente, ', Descripcion: ', NEW.Descripcion, ', Fecha_Reservacion: ', NEW.Fecha_Reservacion, ', Fecha_Inicio: ', NEW.Fecha_Inicio, ', Fecha_Fin: ', NEW.Fecha_Fin));
END;
//

CREATE TRIGGER after_delete_reservacion
AFTER DELETE ON Reservacion
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Reservacion', OLD.ID_Reservacion, CONCAT('ID_Cliente: ', OLD.ID_Cliente, ', Descripcion: ', OLD.Descripcion, ', Fecha_Reservacion: ', OLD.Fecha_Reservacion, ', Fecha_Inicio: ', OLD.Fecha_Inicio, ', Fecha_Fin: ', OLD.Fecha_Fin));
END;
//
DELIMITER ;



-- Pruebas 
-- INSERT
INSERT INTO Reservacion (ID_Cliente, Descripcion, Fecha_Reservacion, Fecha_Inicio, Fecha_Fin)
VALUES (2, 'Mesa para dos personas', '2023-10-02', '18:00:00', '20:00:00');

-- UPDATE
UPDATE Reservacion
SET Descripcion = 'Mesa para cuatro personas'
WHERE ID_Reservacion = 1;

-- DELETE
DELETE FROM Reservacion WHERE ID_Reservacion = 1;

INSERT INTO Reservacion (ID_Cliente, Descripcion, Fecha_Reservacion, Fecha_Inicio, Fecha_Fin)
VALUES (2, 'Mesa para dos personas', '2023-10-02', '18:00:00', '20:00:00');



-- Consulta

SELECT * FROM Bitacora









-- Trigger de Tipo_Orden

DELIMITER //
CREATE TRIGGER after_insert_tipo_orden
AFTER INSERT ON Tipo_Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Tipo_Orden', NEW.Id_Tipo_Orden, CONCAT('Nombre: ', NEW.Nombre, ', Descripcion: ', NEW.Descripcion, ', Nota_Especial: ', NEW.Nota_Especial, ', Domicilio: ', NEW.Domicilio));
END;
//

CREATE TRIGGER after_update_tipo_orden
AFTER UPDATE ON Tipo_Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Tipo_Orden', NEW.Id_Tipo_Orden, CONCAT('Nombre: ', OLD.Nombre, ', Descripcion: ', OLD.Descripcion, ', Nota_Especial: ', OLD.Nota_Especial, ', Domicilio: ', OLD.Domicilio), CONCAT('Nombre: ', NEW.Nombre, ', Descripcion: ', NEW.Descripcion, ', Nota_Especial: ', NEW.Nota_Especial, ', Domicilio: ', NEW.Domicilio));
END;
//

CREATE TRIGGER after_delete_tipo_orden
AFTER DELETE ON Tipo_Orden
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Tipo_Orden', OLD.Id_Tipo_Orden, CONCAT('Nombre: ', OLD.Nombre, ', Descripcion: ', OLD.Descripcion, ', Nota_Especial: ', OLD.Nota_Especial, ', Domicilio: ', OLD.Domicilio));
END;
//
DELIMITER ;


-- Pruebas 

-- INSERT
INSERT INTO Tipo_Orden (Nombre, Descripcion, Nota_Especial, Domicilio)
VALUES ('Para llevar', 'Orden para llevar', 'Sin cebolla', 'Calle Principal #123');


-- UPDATE
UPDATE Tipo_Orden
SET Nota_Especial = 'Sin tomate'
WHERE Id_Tipo_Orden = 1;

-- DELETE
DELETE FROM Tipo_Orden WHERE Id_Tipo_Orden = 1;

INSERT INTO Tipo_Orden (Nombre, Descripcion, Nota_Especial, Domicilio)
VALUES ('Para llevar', 'Orden para llevar', 'Sin cebolla', 'Calle Principal #123');


-- Consulta

SELECT * FROM Bitacora









-- Trigger de Comentarios

DELIMITER //
CREATE TRIGGER after_insert_comentarios
AFTER INSERT ON Comentarios
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Nuevos)
    VALUES ('INSERT', CURRENT_USER(), NOW(), 'Comentarios', NEW.ID_Comentarios, CONCAT('ID_Cliente: ', NEW.ID_Cliente, ', Comentario: ', NEW.Comentario, ', Calificacion: ', NEW.Calificacion, ', Fecha: ', NEW.Fecha));
END;
//

CREATE TRIGGER after_update_comentarios
AFTER UPDATE ON Comentarios
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos, Valores_Nuevos)
    VALUES ('UPDATE', CURRENT_USER(), NOW(), 'Comentarios', NEW.ID_Comentarios, CONCAT('ID_Cliente: ', OLD.ID_Cliente, ', Comentario: ', OLD.Comentario, ', Calificacion: ', OLD.Calificacion, ', Fecha: ', OLD.Fecha), CONCAT('ID_Cliente: ', NEW.ID_Cliente, ', Comentario: ', NEW.Comentario, ', Calificacion: ', NEW.Calificacion, ', Fecha: ', NEW.Fecha));
END;
//

CREATE TRIGGER after_delete_comentarios
AFTER DELETE ON Comentarios
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (Trasaccion, Usuario, Fecha, Tabla, ID_Registro_afectado, Valores_Antiguos)
    VALUES ('DELETE', CURRENT_USER(), NOW(), 'Comentarios', OLD.ID_Comentarios, CONCAT('ID_Cliente: ', OLD.ID_Cliente, ', Comentario: ', OLD.Comentario, ', Calificacion: ', OLD.Calificacion, ', Fecha: ', OLD.Fecha));
END;
//
DELIMITER ;


-- Pruebas 

-- INSERT
INSERT INTO Comentarios (ID_Cliente, Comentario, Calificacion, Fecha)
VALUES (2, 'Excelente servicio, volveré pronto.', 5, '2023-10-02 14:30:00');

-- UPDATE
UPDATE Comentarios
SET Comentario = 'Muy buena comida, pero el servicio puede mejorar.', Calificacion = 4
WHERE ID_Comentarios = 1;

-- DELETE
DELETE FROM Comentarios WHERE ID_Comentarios = 1;

INSERT INTO Comentarios (ID_Cliente, Comentario, Calificacion, Fecha)
VALUES (2, 'Excelente servicio, volveré pronto.', 5, '2023-10-02 14:30:00');




-- Consulta

SELECT * FROM Bitacora