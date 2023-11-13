/*Procedimiento almacenado de Categoria*/


DELIMITER //
CREATE PROCEDURE InsertarCategoria(
    IN p_Nombre VARCHAR(50)
)
BEGIN
    INSERT INTO Categoria (Nombre)
    VALUES (p_Nombre);
END //
DELIMITER ;




DELIMITER //
CREATE PROCEDURE ObtenerCategorias()
BEGIN
    SELECT * FROM Categoria;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE ActualizarCategoria(
    IN p_ID_Categoria INT,
    IN p_Nombre VARCHAR(50)
)
BEGIN
    UPDATE Categoria
    SET Nombre = p_Nombre
    WHERE ID_Categoria = p_ID_Categoria;
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE EliminarCategoria(
    IN p_ID_Categoria INT
)
BEGIN
    DELETE FROM Categoria
    WHERE ID_Categoria = p_ID_Categoria;
END //
DELIMITER ;


/* Aqui terminan los procedimiento almacenado de categoria*/






/*Procedimiento almacenado de Menu*/

DELIMITER //
CREATE PROCEDURE InsertarMenu(
    IN p_ID_Categoria INT,
    IN p_Nombre VARCHAR(100),
    IN p_Descripcion VARCHAR(200),
    IN p_Precio DECIMAL(6, 2),
    IN p_Imagen LONGBLOB
)
BEGIN
    INSERT INTO Menu (ID_Categoria, Nombre, Descripcion, Precio, Imagen)
    VALUES (p_ID_Categoria, p_Nombre, p_Descripcion, p_Precio, p_Imagen);
END //
DELIMITER ;




DELIMITER //
CREATE PROCEDURE ObtenerMenu()
BEGIN
    SELECT M.ID_Menu, M.ID_Categoria, M.Nombre, M.Descripcion, M.Precio, M.Imagen, C.Nombre AS NombreCategoria
    FROM Menu AS M
    JOIN Categoria AS C ON M.ID_Categoria = C.ID_Categoria;
END //
DELIMITER ;






DELIMITER //
CREATE PROCEDURE ActualizarMenu(
    IN p_ID_Menu INT,
    IN p_ID_Categoria INT,
    IN p_Nombre VARCHAR(100),
    IN p_Descripcion VARCHAR(200),
    IN p_Precio DECIMAL(6, 2),
    IN p_Imagen LONGBLOB
)
BEGIN
    UPDATE Menu
    SET ID_Categoria = p_ID_Categoria,
        Nombre = p_Nombre,
        Descripcion = p_Descripcion,
        Precio = p_Precio,
        Imagen = p_Imagen
    WHERE ID_Menu = p_ID_Menu;
END //
DELIMITER ;






DELIMITER //
CREATE PROCEDURE EliminarMenu(
    IN p_ID_Menu INT
)
BEGIN
    DELETE FROM Menu
    WHERE ID_Menu = p_ID_Menu;
END //
DELIMITER ;


/*Aqui termina los procedimiento de menu*/


/*Procedimiento almacenado de Empleado*/

DELIMITER //
CREATE PROCEDURE InsertarEmpleado(
  IN p_Nombres VARCHAR(50),
  IN p_Apellidos VARCHAR(50),
  IN p_Telefono VARCHAR(9),
  IN p_Correo VARCHAR(50) CHARACTER SET UTF8MB4,
  IN p_Cargo VARCHAR(32)
)
BEGIN
  INSERT INTO Empleado (Nombres, Apellidos, Telefono, Correo, Cargo)
  VALUES (p_Nombres, p_Apellidos, p_Telefono, p_Correo, p_Cargo);
END //
DELIMITER ;



DELIMITER //
CREATE PROCEDURE ActualizarEmpleado(
  IN p_ID_Empleado INT,
  IN p_Nombres VARCHAR(50),
  IN p_Apellidos VARCHAR(50),
  IN p_Telefono VARCHAR(9),
  IN p_Correo VARCHAR(50) CHARACTER SET UTF8MB4,
  IN p_Cargo VARCHAR(32)
)
BEGIN
  UPDATE Empleado
  SET Nombres = p_Nombres,
      Apellidos = p_Apellidos,
      Telefono = p_Telefono,
      Correo = p_Correo,
      Cargo = p_Cargo
  WHERE ID_Empleado = p_ID_Empleado;
END //
DELIMITER ;





DELIMITER //
CREATE PROCEDURE EliminarEmpleado(
  IN p_ID_Empleado INT
)
BEGIN
  DELETE FROM Empleado WHERE ID_Empleado = p_ID_Empleado;
END //
DELIMITER ;


SELECT * FROM EMPLEADO

DELIMITER //
CREATE PROCEDURE ObtenerEmpleados()
BEGIN
  SELECT * FROM Empleado;
END //
DELIMITER ;


/*Hasta aqui terminan los de empleado */




/*Procedimiento almacenado de detalle Orden*/

DELIMITER //
CREATE PROCEDURE AgregarDetalleOrden(
  IN p_ID_Menu INT,
  IN p_ID_Orden INT,
  IN p_Cantidad INT
)
BEGIN
  INSERT INTO Detalle_Orden (ID_Menu, ID_Orden, Cantidad)
  VALUES (p_ID_Menu, p_ID_Orden, p_Cantidad);
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE EliminarDetalleOrden(
  IN p_ID_Detalle_Orden INT
)
BEGIN
  DELETE FROM Detalle_Orden
  WHERE ID_Detalle_Orden = p_ID_Detalle_Orden;
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE ActualizarCantidadDetalleOrden(
  IN p_ID_Detalle_Orden INT,
  IN p_NuevaCantidad INT
)
BEGIN
  UPDATE Detalle_Orden
  SET Cantidad = p_NuevaCantidad
  WHERE ID_Detalle_Orden = p_ID_Detalle_Orden;
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE MostrarDetallesDeOrden(
  IN p_ID_Orden INT
)
BEGIN
  SELECT *
  FROM Detalle_Orden
  WHERE ID_Orden = p_ID_Orden;
END;
//
DELIMITER ;


/*Hasta aqui llegan los de Detalle Orden*/



/*Procedimiento de Orden*/

DELIMITER //
CREATE PROCEDURE AgregarOrden(
  IN p_ID_Cliente INT,
  IN p_ID_Empleado INT,
  IN p_Id_Tipo_Orden INT,
  IN p_Monto DECIMAL(6, 2),
  IN p_Estado VARCHAR(50),
  IN p_Modo_Pago VARCHAR(100),
  IN p_Fecha_Hora DATETIME
)
BEGIN
  INSERT INTO Orden (ID_Cliente, ID_Empleado, Id_Tipo_Orden, Monto, Estado, Modo_Pago, Fecha_Hora)
  VALUES (p_ID_Cliente, p_ID_Empleado, p_Id_Tipo_Orden, p_Monto, p_Estado, p_Modo_Pago, p_Fecha_Hora);
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE EliminarOrden(
  IN p_ID_Orden INT
)
BEGIN
  DELETE FROM Orden
  WHERE ID_Orden = p_ID_Orden;
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE ActualizarOrden(
  IN p_ID_Orden INT,
  IN p_ID_Cliente INT,
  IN p_ID_Empleado INT,
  IN p_Id_Tipo_Orden INT,
  IN p_Monto DECIMAL(6, 2),
  IN p_Estado VARCHAR(50),
  IN p_Modo_Pago VARCHAR(100),
  IN p_Fecha_Hora DATETIME
)
BEGIN
  UPDATE Orden
  SET
    ID_Cliente = p_ID_Cliente,
    ID_Empleado = p_ID_Empleado,
    Id_Tipo_Orden = p_Id_Tipo_Orden,
    Monto = p_Monto,
    Estado = p_Estado,
    Modo_Pago = p_Modo_Pago,
    Fecha_Hora = p_Fecha_Hora
  WHERE ID_Orden = p_ID_Orden;
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE MostrarOrdenPorID(
  IN p_ID_Orden INT
)
BEGIN
  SELECT *
  FROM Orden
  WHERE ID_Orden = p_ID_Orden;
END;
//
DELIMITER ;


/*Hasta terminan los de Orden*/



/*Procedimiento de Cliente*/

DELIMITER //
CREATE PROCEDURE AgregarCliente(
  IN p_Cedula VARCHAR(16),
  IN p_Nombres VARCHAR(50),
  IN p_Apellidos VARCHAR(50),
  IN p_Telefono VARCHAR(9),
  IN p_Correo VARCHAR(50)
)
BEGIN
  INSERT INTO Cliente (Cedula, Nombres, Apellidos, Telefono, Correo)
  VALUES (p_Cedula, p_Nombres, p_Apellidos, p_Telefono, p_Correo);
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE EliminarCliente(
  IN p_ID_Cliente INT
)
BEGIN
  DELETE FROM Cliente
  WHERE ID_Cliente = p_ID_Cliente;
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE ActualizarCliente(
  IN p_ID_Cliente INT,
  IN p_Cedula VARCHAR(16),
  IN p_Nombres VARCHAR(50),
  IN p_Apellidos VARCHAR(50),
  IN p_Telefono VARCHAR(9),
  IN p_Correo VARCHAR(50)
)
BEGIN
  UPDATE Cliente
  SET
    Cedula = p_Cedula,
    Nombres = p_Nombres,
    Apellidos = p_Apellidos,
    Telefono = p_Telefono,
    Correo = p_Correo
  WHERE ID_Cliente = p_ID_Cliente;
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE MostrarClientePorID(
  IN p_ID_Cliente INT
)
BEGIN
  SELECT *
  FROM Cliente
  WHERE ID_Cliente = p_ID_Cliente;
END;
//
DELIMITER ;



/*Hasta aqui termina los de Cliente*/




/*Procedimiento de Reservacion*/


DELIMITER //
CREATE PROCEDURE AgregarReservacion(
  IN p_ID_Cliente INT,
  IN p_Descripcion VARCHAR(200),
  IN p_Fecha_Reservacion DATE,
  IN p_Fecha_Inicio TIME,
  IN p_Fecha_Fin TIME
)
BEGIN
  INSERT INTO Reservacion (ID_Cliente, Descripcion, Fecha_Reservacion, Fecha_Inicio, Fecha_Fin)
  VALUES (p_ID_Cliente, p_Descripcion, p_Fecha_Reservacion, p_Fecha_Inicio, p_Fecha_Fin);
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE EliminarReservacion(
  IN p_ID_Reservacion INT
)
BEGIN
  DELETE FROM Reservacion
  WHERE ID_Reservacion = p_ID_Reservacion;
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE ActualizarReservacion(
  IN p_ID_Reservacion INT,
  IN p_ID_Cliente INT,
  IN p_Descripcion VARCHAR(200),
  IN p_Fecha_Reservacion DATE,
  IN p_Fecha_Inicio TIME,
  IN p_Fecha_Fin TIME
)
BEGIN
  UPDATE Reservacion
  SET
    ID_Cliente = p_ID_Cliente,
    Descripcion = p_Descripcion,
    Fecha_Reservacion = p_Fecha_Reservacion,
    Fecha_Inicio = p_Fecha_Inicio,
    Fecha_Fin = p_Fecha_Fin
  WHERE ID_Reservacion = p_ID_Reservacion;
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE MostrarReservacionPorID(
  IN p_ID_Reservacion INT
)
BEGIN
  SELECT *
  FROM Reservacion
  WHERE ID_Reservacion = p_ID_Reservacion;
END;
//
DELIMITER ;





/*Hasta aqui llegan los de reservacion*/




/*`Procedimiento almacenado de tipo de orden*/

DELIMITER //
CREATE PROCEDURE AgregarTipoOrden(
  IN p_Nombre VARCHAR(16),
  IN p_Descripcion VARCHAR(255),
  IN p_Nota_Especial VARCHAR(200),
  IN p_Domicilio VARCHAR(100)
)
BEGIN
  INSERT INTO Tipo_Orden (Nombre, Descripcion, Nota_Especial, Domicilio)
  VALUES (p_Nombre, p_Descripcion, p_Nota_Especial, p_Domicilio);
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE EliminarTipoOrden(
  IN p_Id_Tipo_Orden INT
)
BEGIN
  DELETE FROM Tipo_Orden
  WHERE Id_Tipo_Orden = p_Id_Tipo_Orden;
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE ActualizarTipoOrden(
  IN p_Id_Tipo_Orden INT,
  IN p_Nombre VARCHAR(16),
  IN p_Descripcion VARCHAR(255),
  IN p_Nota_Especial VARCHAR(200),
  IN p_Domicilio VARCHAR(100)
)
BEGIN
  UPDATE Tipo_Orden
  SET
    Nombre = p_Nombre,
    Descripcion = p_Descripcion,
    Nota_Especial = p_Nota_Especial,
    Domicilio = p_Domicilio
  WHERE Id_Tipo_Orden = p_Id_Tipo_Orden;
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE MostrarTipoOrdenPorID(
  IN p_Id_Tipo_Orden INT
)
BEGIN
  SELECT *
  FROM Tipo_Orden
  WHERE Id_Tipo_Orden = p_Id_Tipo_Orden;
END;
//
DELIMITER ;


/*Hasta aqui llegan los de Tipo de Orden*/




/*Procedimiento almacenado de Comentarios*/

DELIMITER //
CREATE PROCEDURE AgregarComentario(
  IN p_ID_Cliente INT,
  IN p_Comentario VARCHAR(500),
  IN p_Calificacion INT,
  IN p_Fecha DATETIME
)
BEGIN
  INSERT INTO Comentarios (ID_Cliente, Comentario, Calificacion, Fecha)
  VALUES (p_ID_Cliente, p_Comentario, p_Calificacion, p_Fecha);
END;
//
DELIMITER ;



DELIMITER //
CREATE PROCEDURE EliminarComentario(
  IN p_ID_Comentarios INT
)
BEGIN
  DELETE FROM Comentarios
  WHERE ID_Comentarios = p_ID_Comentarios;
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE ActualizarComentario(
  IN p_ID_Comentarios INT,
  IN p_ID_Cliente INT,
  IN p_Comentario VARCHAR(500),
  IN p_Calificacion INT,
  IN p_Fecha DATETIME
)
BEGIN
  UPDATE Comentarios
  SET
    ID_Cliente = p_ID_Cliente,
    Comentario = p_Comentario,
    Calificacion = p_Calificacion,
    Fecha = p_Fecha
  WHERE ID_Comentarios = p_ID_Comentarios;
END;
//
DELIMITER ;




DELIMITER //
CREATE PROCEDURE MostrarComentarioPorID(
  IN p_ID_Comentarios INT
)
BEGIN
  SELECT *
  FROM Comentarios
  WHERE ID_Comentarios = p_ID_Comentarios;
END;
//
DELIMITER ;


/*Procedimiento almacenado de Metodos de pagos */

DELIMITER //
CREATE PROCEDURE AgregarMetodoPago(IN descripcion VARCHAR(100))
BEGIN
  INSERT INTO `Metodo de Pago` (`Descripcion`) VALUES (descripcion);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE VisualizarMetodosPago()
BEGIN
  SELECT * FROM `Metodo de Pago`;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE ActualizarMetodoPago(IN id_metodo_pago INT, IN descripcion VARCHAR(100))
BEGIN
  UPDATE `Metodo de Pago` SET `Descripcion` = descripcion WHERE `ID_Metodo_Pago` = id_metodo_pago;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE EliminarMetodoPago(IN id_metodo_pago INT)
BEGIN
  DELETE FROM `Metodo de Pago` WHERE `ID_Metodo_Pago` = id_metodo_pago;
END //
DELIMITER ;




/*Hasta aqui llegan los de comentarios*/












