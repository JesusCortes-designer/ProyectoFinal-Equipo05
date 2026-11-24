-- tablas del sistema de terminal de autobuses

CREATE TABLE rol (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    activo BIT(1) NOT NULL,
    rol_id BIGINT NOT NULL,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES rol (id)
);

CREATE TABLE cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    telefono VARCHAR(20) NOT NULL,
    usuario_id BIGINT NOT NULL UNIQUE,
    CONSTRAINT fk_cliente_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

CREATE TABLE taquillero (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_empleado VARCHAR(20) NOT NULL,
    usuario_id BIGINT NOT NULL UNIQUE,
    CONSTRAINT fk_taquillero_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

CREATE TABLE terminal (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(80) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    administrador_id BIGINT NOT NULL,
    CONSTRAINT fk_terminal_administrador FOREIGN KEY (administrador_id) REFERENCES usuario (id)
);

CREATE TABLE autobus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    modelo VARCHAR(60) NOT NULL,
    capacidad INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    terminal_id BIGINT NOT NULL,
    CONSTRAINT fk_autobus_terminal FOREIGN KEY (terminal_id) REFERENCES terminal (id)
);

CREATE TABLE chofer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    licencia VARCHAR(30) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    terminal_id BIGINT NOT NULL,
    CONSTRAINT fk_chofer_terminal FOREIGN KEY (terminal_id) REFERENCES terminal (id)
);

CREATE TABLE ruta (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    origen VARCHAR(80) NOT NULL,
    destino VARCHAR(80) NOT NULL,
    distancia_km DECIMAL(10,2) NOT NULL,
    duracion_minutos INT NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL
);

-- relacion muchos a muchos entre ruta y terminal
CREATE TABLE ruta_terminal (
    ruta_id BIGINT NOT NULL,
    terminal_id BIGINT NOT NULL,
    PRIMARY KEY (ruta_id, terminal_id),
    CONSTRAINT fk_rt_ruta FOREIGN KEY (ruta_id) REFERENCES ruta (id),
    CONSTRAINT fk_rt_terminal FOREIGN KEY (terminal_id) REFERENCES terminal (id)
);

CREATE TABLE viaje (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha_salida DATETIME(6) NOT NULL,
    fecha_llegada DATETIME(6) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    autobus_id BIGINT NOT NULL,
    chofer_id BIGINT NOT NULL,
    ruta_id BIGINT NOT NULL,
    CONSTRAINT fk_viaje_autobus FOREIGN KEY (autobus_id) REFERENCES autobus (id),
    CONSTRAINT fk_viaje_chofer FOREIGN KEY (chofer_id) REFERENCES chofer (id),
    CONSTRAINT fk_viaje_ruta FOREIGN KEY (ruta_id) REFERENCES ruta (id)
);

CREATE TABLE reservacion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha_reservacion DATETIME(6) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    cliente_id BIGINT NOT NULL,
    CONSTRAINT fk_reservacion_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id)
);

CREATE TABLE boleto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    numero_asiento INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    reservacion_id BIGINT NULL,
    taquillero_id BIGINT NULL,
    viaje_id BIGINT NOT NULL,
    CONSTRAINT fk_boleto_reservacion FOREIGN KEY (reservacion_id) REFERENCES reservacion (id),
    CONSTRAINT fk_boleto_taquillero FOREIGN KEY (taquillero_id) REFERENCES taquillero (id),
    CONSTRAINT fk_boleto_viaje FOREIGN KEY (viaje_id) REFERENCES viaje (id)
);

CREATE TABLE token_invalidado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    huella VARCHAR(64) NOT NULL UNIQUE,
    fecha_expiracion DATETIME(6) NOT NULL
);

CREATE TABLE token_recuperacion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(80) NOT NULL UNIQUE,
    fecha_expiracion DATETIME(6) NOT NULL,
    usado BIT(1) NOT NULL,
    usuario_id BIGINT NOT NULL,
    CONSTRAINT fk_tokenrec_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

CREATE INDEX idx_boleto_viaje ON boleto (viaje_id, numero_asiento);
CREATE INDEX idx_viaje_estado ON viaje (estado);
