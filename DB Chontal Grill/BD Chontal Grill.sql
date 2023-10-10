USE chontal_grill;

CREATE TABLE `Categoria` (
  `ID_Categoria` INT AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(50)
);

CREATE TABLE `Menu` (
  `ID_Menu` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Categoria` INT,
  `Nombre` VARCHAR(100),
  `Descripcion` VARCHAR(200),
  `Precio` DECIMAL(6, 2),
  `Imagen` LONGBLOB
);

CREATE TABLE `Detalle_Orden` (
  `ID_Detalle_Orden` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Menu` INT,
  `ID_Orden` INT,
  `Cantidad` INT
);

CREATE TABLE `Orden` (
  `ID_Orden` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Cliente` INT,
  `ID_Empleado` INT,
  `Id_Tipo_Orden` INT,
  `Monto` DECIMAL(6, 2),
  `Estado` VARCHAR(50),
  `Modo_Pago` VARCHAR(100),
  `Fecha_Hora` DATETIME
);

CREATE TABLE `Empleado` (
  `ID_Empleado` INT AUTO_INCREMENT PRIMARY KEY,
  `Nombres` VARCHAR(50),
  `Apellidos` VARCHAR(50),
  `Telefono` VARCHAR(9),
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4,
  `Cargo` VARCHAR(32)
);

CREATE TABLE `Cliente` (
  `ID_Cliente` INT AUTO_INCREMENT PRIMARY KEY,
  `Cedula` VARCHAR(16),
  `Nombres` VARCHAR(50),
  `Apellidos` VARCHAR(50),
  `Telefono` VARCHAR(9),
  `Correo` VARCHAR(50) CHARACTER SET UTF8MB4
);

CREATE TABLE `Reservacion` (
  `ID_Reservacion` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Cliente` INT,
  `Descripcion` VARCHAR(200),
  `Fecha_Reservacion` DATE,
  `Fecha_Inicio` TIME,
  `Fecha_Fin` TIME
);

CREATE TABLE `Tipo_Orden` (
  `Id_Tipo_Orden` INT AUTO_INCREMENT PRIMARY KEY,
  `Nombre` VARCHAR(16),
  `Descripcion` VARCHAR(255),
  `Nota_Especial` VARCHAR(200),
  `Domicilio` VARCHAR(100)
);

CREATE TABLE `Comentarios` (
  `ID_Comentarios` INT AUTO_INCREMENT PRIMARY KEY,
  `ID_Cliente` INT,
  `Comentario` VARCHAR(500),
  `Calificacion` INT,
  `Fecha` DATETIME
);






ALTER TABLE `Comentarios` 
ADD CONSTRAINT `FK_Comentarios_Cliente` FOREIGN KEY (`ID_Cliente`) REFERENCES `Cliente` (`ID_Cliente`);

ALTER TABLE `Menu` 
ADD CONSTRAINT `FK_Menu_Categoria` FOREIGN KEY (`ID_Categoria`) REFERENCES `Categoria` (`ID_Categoria`);

ALTER TABLE `Detalle_Orden` 
ADD CONSTRAINT `FK_DetalleOrden_Menu` FOREIGN KEY (`ID_Menu`) REFERENCES `Menu` (`ID_Menu`);

ALTER TABLE `Detalle_Orden` 
ADD CONSTRAINT `FK_DetalleOrden_Orden` FOREIGN KEY (`ID_Orden`) REFERENCES `Orden` (`ID_Orden`);

ALTER TABLE `Orden` 
ADD CONSTRAINT `FK_Orden_Empleado` FOREIGN KEY (`ID_Empleado`) REFERENCES `Empleado` (`ID_Empleado`);

ALTER TABLE `Reservacion` 
ADD CONSTRAINT `FK_Reservacion_Cliente` FOREIGN KEY (`ID_Cliente`) REFERENCES `Cliente` (`ID_Cliente`);

ALTER TABLE `Orden` 
ADD CONSTRAINT `FK_Orden_Cliente` FOREIGN KEY (`ID_Cliente`) REFERENCES `Cliente` (`ID_Cliente`);

ALTER TABLE `Orden` 
ADD CONSTRAINT `FK_Orden_TipoOrden` FOREIGN KEY (`Id_Tipo_Orden`) REFERENCES `Tipo_Orden` (`Id_Tipo_Orden`);





