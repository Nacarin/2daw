-- Crear usuario sobre todo
CREATE USER 'user'@'localhost' IDENTIFIED BY '1234';

-- Crear un usuario sobre una base de datos concreta
CREATE USER 'jesuita1'@'jesuitas' IDENTIFIED BY '1234';

-- Borrar usuario
DELETE FROM mysql.user WHERE user = 'jesuita1';

-- Dar privilegios de todo sobre todas las tablas
GRANT ALL PRIVILEGES ON *.* TO 'jesuita1'@'localhost';

-- Dar permisos de consulta,añadir,modificar y borrar
GRANT SELECT, INSERT, UPDATE, DELETE ON jesuitas.* TO 'jesuita1'@'localhost';

-- Comprobar la lista de usuarios
SELECT user FROM mysql.user;

-- Quitar permisos
REVOKE UPDATE, DELETE ON *.* FROM 'jesuita2'@'localhost';

-- Quitar todos los permisos
REVOKE ALL PRIVILEGES ON *.* FROM 'jesuita1'@'localhost';

-- Ver los permisos que tiene un usuario
SHOW GRANTS FOR 'jesuita2'@'jesuitas';




