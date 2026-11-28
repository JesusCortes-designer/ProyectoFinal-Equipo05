-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: terminal_autobuses
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autobus`
--

DROP TABLE IF EXISTS `autobus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autobus` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `placa` varchar(20) NOT NULL,
  `modelo` varchar(60) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `terminal_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `placa` (`placa`),
  KEY `fk_autobus_terminal` (`terminal_id`),
  CONSTRAINT `fk_autobus_terminal` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autobus`
--

LOCK TABLES `autobus` WRITE;
/*!40000 ALTER TABLE `autobus` DISABLE KEYS */;
INSERT INTO `autobus` VALUES (1,'AUT-001','Volvo 9800',44,'DISPONIBLE',1),(2,'AUT-002','Mercedes-Benz O500',40,'DISPONIBLE',2),(3,'AUT-003','Scania K360',40,'DISPONIBLE',3),(4,'AUT-004','Irizar i6',44,'DISPONIBLE',4),(5,'AUT-005','Volvo 9800',40,'DISPONIBLE',5),(6,'AUT-006','Mercedes-Benz O500',40,'DISPONIBLE',6),(7,'AUT-007','Scania K360',44,'DISPONIBLE',7),(8,'AUT-008','Irizar i6',40,'DISPONIBLE',8),(9,'AUT-009','Volvo 9800',40,'DISPONIBLE',9),(10,'AUT-010','Mercedes-Benz O500',44,'DISPONIBLE',10),(11,'AUT-011','Scania K360',40,'DISPONIBLE',1),(12,'AUT-012','Irizar i6',40,'MANTENIMIENTO',2);
/*!40000 ALTER TABLE `autobus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boleto`
--

DROP TABLE IF EXISTS `boleto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boleto` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(30) NOT NULL,
  `numero_asiento` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `reservacion_id` bigint(20) DEFAULT NULL,
  `taquillero_id` bigint(20) DEFAULT NULL,
  `viaje_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `fk_boleto_reservacion` (`reservacion_id`),
  KEY `fk_boleto_taquillero` (`taquillero_id`),
  KEY `idx_boleto_viaje` (`viaje_id`,`numero_asiento`),
  CONSTRAINT `fk_boleto_reservacion` FOREIGN KEY (`reservacion_id`) REFERENCES `reservacion` (`id`),
  CONSTRAINT `fk_boleto_taquillero` FOREIGN KEY (`taquillero_id`) REFERENCES `taquillero` (`id`),
  CONSTRAINT `fk_boleto_viaje` FOREIGN KEY (`viaje_id`) REFERENCES `viaje` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleto`
--

LOCK TABLES `boleto` WRITE;
/*!40000 ALTER TABLE `boleto` DISABLE KEYS */;
INSERT INTO `boleto` VALUES (1,'BOL-SEED001',1,180.00,'ACTIVO',1,NULL,1),(2,'BOL-SEED002',2,205.00,'ACTIVO',2,NULL,2),(3,'BOL-SEED003',12,205.00,'ACTIVO',2,NULL,2),(4,'BOL-SEED004',3,230.00,'ACTIVO',3,NULL,3),(5,'BOL-SEED005',4,255.00,'ACTIVO',4,NULL,4),(6,'BOL-SEED006',14,255.00,'ACTIVO',4,NULL,4),(7,'BOL-SEED007',5,280.00,'CANCELADO',5,NULL,5),(8,'BOL-SEED008',6,305.00,'ACTIVO',6,NULL,6),(9,'BOL-SEED009',16,305.00,'ACTIVO',6,NULL,6),(10,'BOL-SEED010',7,330.00,'ACTIVO',7,NULL,7),(11,'BOL-SEED011',8,355.00,'ACTIVO',8,NULL,8),(12,'BOL-SEED012',18,355.00,'ACTIVO',8,NULL,8),(13,'BOL-SEED013',9,380.00,'ACTIVO',9,NULL,9),(14,'BOL-SEED014',10,405.00,'ACTIVO',10,NULL,10),(15,'BOL-SEED015',20,405.00,'ACTIVO',10,NULL,10),(16,'BOL-SEEDT01',5,180.00,'ACTIVO',NULL,1,11),(17,'BOL-SEEDT02',6,205.00,'ACTIVO',NULL,2,12),(18,'BOL-9EAEA51B',16,180.00,'ACTIVO',11,NULL,1),(19,'BOL-F2994183',24,180.00,'ACTIVO',NULL,1,1),(20,'BOL-46EA7AF7',23,180.00,'CANCELADO',NULL,1,1),(21,'BOL-9FC9682A',4,205.00,'ACTIVO',NULL,1,2),(22,'BOL-7F24AC28',4,180.00,'CANCELADO',12,NULL,1);
/*!40000 ALTER TABLE `boleto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chofer`
--

DROP TABLE IF EXISTS `chofer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chofer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `licencia` varchar(30) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `terminal_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `licencia` (`licencia`),
  KEY `fk_chofer_terminal` (`terminal_id`),
  CONSTRAINT `fk_chofer_terminal` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chofer`
--

LOCK TABLES `chofer` WRITE;
/*!40000 ALTER TABLE `chofer` DISABLE KEYS */;
INSERT INTO `chofer` VALUES (1,'Roberto','Morales','LIC-01000','+527710000001',1),(2,'Héctor','Morales','LIC-01001','+527710000002',2),(3,'Javier','Morales','LIC-01002','+527710000003',3),(4,'Ernesto','Morales','LIC-01003','+527710000004',4),(5,'Gustavo','Morales','LIC-01004','+527710000005',5),(6,'Ricardo','Morales','LIC-01005','+527710000006',6),(7,'Armando','Morales','LIC-01006','+527710000007',7),(8,'Salvador','Morales','LIC-01007','+527710000008',8),(9,'Ignacio','Morales','LIC-01008','+527710000009',9),(10,'Félix','Morales','LIC-01009','+527710000010',10),(11,'Mauricio','Morales','LIC-01010','+527710000011',1),(12,'Teodoro','Morales','LIC-01011','+527710000012',2);
/*!40000 ALTER TABLE `chofer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `telefono` varchar(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'+525510000001',5),(2,'+525510000002',6),(3,'+525510000003',7),(4,'+525510000004',8),(5,'+525510000005',9),(6,'+525510000006',10),(7,'+525510000007',11),(8,'+525510000008',12),(9,'+525510000009',13),(10,'+525510000010',14),(11,'+525510000011',15);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int(11) NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int(11) DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `execution_time` int(11) NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','crearTablas','SQL','V1__crearTablas.sql',-1479222538,'root','2026-11-25 23:45:26',1901,1),(2,'2','cargarRoles','SQL','V2__cargarRoles.sql',654503639,'root','2026-11-25 23:45:26',4,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservacion`
--

DROP TABLE IF EXISTS `reservacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_reservacion` datetime(6) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservacion_cliente` (`cliente_id`),
  CONSTRAINT `fk_reservacion_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservacion`
--

LOCK TABLES `reservacion` WRITE;
/*!40000 ALTER TABLE `reservacion` DISABLE KEYS */;
INSERT INTO `reservacion` VALUES (1,'2026-11-25 17:45:30.000000','CONFIRMADA',180.00,1),(2,'2026-11-24 17:45:30.000000','CONFIRMADA',410.00,2),(3,'2026-11-23 17:45:30.000000','CONFIRMADA',230.00,3),(4,'2026-11-22 17:45:30.000000','CONFIRMADA',510.00,4),(5,'2026-11-21 17:45:30.000000','CANCELADA',280.00,5),(6,'2026-11-20 17:45:30.000000','CONFIRMADA',610.00,6),(7,'2026-11-19 17:45:30.000000','CONFIRMADA',330.00,7),(8,'2026-11-18 17:45:30.000000','CONFIRMADA',710.00,8),(9,'2026-11-17 17:45:30.000000','CONFIRMADA',380.00,9),(10,'2026-11-16 17:45:30.000000','CONFIRMADA',810.00,10),(11,'2026-11-25 20:06:17.000000','CONFIRMADA',180.00,1),(12,'2026-11-27 20:07:19.000000','CANCELADA',180.00,1);
/*!40000 ALTER TABLE `reservacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMINISTRADOR'),(3,'CLIENTE'),(2,'TAQUILLERO');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruta`
--

DROP TABLE IF EXISTS `ruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ruta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `origen` varchar(80) NOT NULL,
  `destino` varchar(80) NOT NULL,
  `distancia_km` decimal(10,2) NOT NULL,
  `duracion_minutos` int(11) NOT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruta`
--

LOCK TABLES `ruta` WRITE;
/*!40000 ALTER TABLE `ruta` DISABLE KEYS */;
INSERT INTO `ruta` VALUES (1,'Ciudad de México','Puebla',120.00,120,180.00),(2,'Puebla','Oaxaca',155.00,140,205.00),(3,'Oaxaca','Guadalajara',190.00,160,230.00),(4,'Guadalajara','Monterrey',225.00,180,255.00),(5,'Monterrey','Veracruz',260.00,200,280.00),(6,'Veracruz','Querétaro',295.00,220,305.00),(7,'Querétaro','Morelia',330.00,240,330.00),(8,'Morelia','Toluca',365.00,260,355.00),(9,'Toluca','Cuernavaca',400.00,280,380.00),(10,'Cuernavaca','Ciudad de México',435.00,300,405.00);
/*!40000 ALTER TABLE `ruta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruta_terminal`
--

DROP TABLE IF EXISTS `ruta_terminal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ruta_terminal` (
  `ruta_id` bigint(20) NOT NULL,
  `terminal_id` bigint(20) NOT NULL,
  PRIMARY KEY (`ruta_id`,`terminal_id`),
  KEY `fk_rt_terminal` (`terminal_id`),
  CONSTRAINT `fk_rt_ruta` FOREIGN KEY (`ruta_id`) REFERENCES `ruta` (`id`),
  CONSTRAINT `fk_rt_terminal` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruta_terminal`
--

LOCK TABLES `ruta_terminal` WRITE;
/*!40000 ALTER TABLE `ruta_terminal` DISABLE KEYS */;
INSERT INTO `ruta_terminal` VALUES (1,1),(1,2),(1,3),(2,2),(2,3),(2,4),(3,3),(3,4),(3,5),(4,4),(4,5),(4,6),(5,5),(5,6),(5,7),(6,6),(6,7),(6,8),(7,7),(7,8),(7,9),(8,8),(8,9),(8,10),(9,1),(9,9),(9,10),(10,1),(10,2),(10,10);
/*!40000 ALTER TABLE `ruta_terminal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taquillero`
--

DROP TABLE IF EXISTS `taquillero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taquillero` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `numero_empleado` varchar(20) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fk_taquillero_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taquillero`
--

LOCK TABLES `taquillero` WRITE;
/*!40000 ALTER TABLE `taquillero` DISABLE KEYS */;
INSERT INTO `taquillero` VALUES (1,'TAQ-001',2),(2,'TAQ-002',3),(3,'TAQ-003',4);
/*!40000 ALTER TABLE `taquillero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terminal`
--

DROP TABLE IF EXISTS `terminal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `terminal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `ciudad` varchar(80) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `administrador_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_terminal_administrador` (`administrador_id`),
  CONSTRAINT `fk_terminal_administrador` FOREIGN KEY (`administrador_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminal`
--

LOCK TABLES `terminal` WRITE;
/*!40000 ALTER TABLE `terminal` DISABLE KEYS */;
INSERT INTO `terminal` VALUES (1,'Terminal Ciudad de México','Ciudad de México','Av. Central #100, Ciudad de México',1),(2,'Terminal Puebla','Puebla','Av. Central #110, Puebla',1),(3,'Terminal Oaxaca','Oaxaca','Av. Central #120, Oaxaca',1),(4,'Terminal Guadalajara','Guadalajara','Av. Central #130, Guadalajara',1),(5,'Terminal Monterrey','Monterrey','Av. Central #140, Monterrey',1),(6,'Terminal Veracruz','Veracruz','Av. Central #150, Veracruz',1),(7,'Terminal Querétaro','Querétaro','Av. Central #160, Querétaro',1),(8,'Terminal Morelia','Morelia','Av. Central #170, Morelia',1),(9,'Terminal Toluca','Toluca','Av. Central #180, Toluca',1),(10,'Terminal Cuernavaca','Cuernavaca','Av. Central #190, Cuernavaca',1),(11,'Terminal Zacatecas','Zacatecas','Av. Central #170, Zacatecas',1);
/*!40000 ALTER TABLE `terminal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_invalidado`
--

DROP TABLE IF EXISTS `token_invalidado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token_invalidado` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `huella` varchar(64) NOT NULL,
  `fecha_expiracion` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `huella` (`huella`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_invalidado`
--

LOCK TABLES `token_invalidado` WRITE;
/*!40000 ALTER TABLE `token_invalidado` DISABLE KEYS */;
INSERT INTO `token_invalidado` VALUES (1,'43220c6206a177169aef87f7d45ab5c6eb24486cf8f7e4a6655fd096d31f639f','2026-11-25 18:49:54.000000'),(2,'0bd316d3cf4a05a2ba80d27b0d87d4aa8054a09ea7a7dc4e41473b3f71fb3cb8','2026-11-25 18:51:05.000000'),(3,'c9934cfcffc5693f2cfaeb3d5424a882ec10b0f9fce2e2352a7220ae06a278d2','2026-11-25 19:20:31.000000'),(4,'d6b4a871849fb814fdc2ff7b737ae4a108ee5790b2ff3e2a23f0087382c4dfaa','2026-11-25 20:57:35.000000'),(5,'c2e6f2f1b98e10c9df462196fd995552b59de09895b86a9cc8566a1cbec93149','2026-11-25 21:01:50.000000'),(6,'4af7ac6ed6aae1430c9978682e8e645f735801a4f0906c11e30565edbc06d2f6','2026-11-25 21:05:05.000000'),(7,'bb16adb67f3153026750702a7a10c2f05c402a154f5bee46c40fdbdb6c6494a3','2026-11-25 21:07:03.000000'),(8,'c1ebc982161c694efdbbbd2984358c1df1e7485a809ef328caf05521c813adae','2026-11-25 21:15:21.000000'),(9,'bbbdbc26f3461865df9d4372348bfdb0dfbe2c5e591339b09fcf181d895395db','2026-11-25 21:42:20.000000'),(10,'c89a15bd09651bd1a1f1cefc280af790273e251a5dc3ebb6a487b44e545726b1','2026-11-25 21:47:25.000000'),(11,'efff0474ec405f4364a289aee542273f11bc5cec3a29e3409e680e3ec98648e7','2026-11-27 20:09:08.000000'),(12,'388f127cd407bdb30d4c4d704b3d773c061c82d048c0d561b0befe6bb292dcb7','2026-11-27 20:50:08.000000'),(13,'9388a750e96d960e3c95bb6eecb5d7865d7e61fdcfd609abecf3232ec7b1bc19','2026-11-27 20:57:40.000000'),(14,'d7df8ed583d922357862e508f1b844bf1c0781d632ad296127476ae568a8b2ca','2026-11-27 21:05:46.000000'),(15,'97043df2f8a4d25b15f8095dac05facf4653d0472bcaffdaa698dd3e4fb33b35','2026-11-27 21:08:46.000000'),(16,'967426f560c025ab20efbd7ae5d377dfafc9eca851088dab2154d2edc5792246','2026-11-27 21:12:21.000000'),(17,'642d773f36a100d186bede4423074ed8ae29befe816aefecf30bb2ebd9a7c546','2026-11-27 21:39:43.000000'),(18,'4440954292ede2a1bb3272a7b539ac30b1cc5676866f7805f7f20739db622db3','2026-11-27 21:41:15.000000'),(19,'d5cf11401bd4590698a22c94e6e8f43e0b3dc3ebefdb4177a18ebfc69da06155','2026-11-27 21:42:31.000000'),(20,'d239c5a774f763347948da57fa95f6e6658da896f4cf34d13c3b33a3f9c9e424','2026-11-27 22:00:12.000000'),(21,'06a6e28e288c28716beea82c04b4a6408014877d9d9dd8f54d32b0d9a711f969','2026-11-27 22:00:33.000000'),(22,'64201b840cde213585332baedf20a0a9b42f3c207aecfcf3c6496c327c587bda','2026-11-27 22:00:44.000000'),(23,'b6e76736d2596c0a6eb694005611cc36eb7488ce532ed694d82d947fe8895813','2026-11-27 22:02:23.000000'),(24,'35ec29e54587e8ebfdb81eb5a61197d6264b74c5c5a6b2d240011bce971a858d','2026-11-27 22:07:30.000000'),(25,'9ac20fcfd38859ce9e2099903e0aff6dbc9c9c7ed0933afe4a780da4ff65fa9f','2026-11-27 22:08:02.000000');
/*!40000 ALTER TABLE `token_invalidado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_recuperacion`
--

DROP TABLE IF EXISTS `token_recuperacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token_recuperacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `token` varchar(80) NOT NULL,
  `fecha_expiracion` datetime(6) NOT NULL,
  `usado` bit(1) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `fk_tokenrec_usuario` (`usuario_id`),
  CONSTRAINT `fk_tokenrec_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_recuperacion`
--

LOCK TABLES `token_recuperacion` WRITE;
/*!40000 ALTER TABLE `token_recuperacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_recuperacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `activo` bit(1) NOT NULL,
  `rol_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `fk_usuario_rol` (`rol_id`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ana','Administradora','admin@terminal.com','$2a$10$H2O5MnYinoR8mU15XVpEG.3FKg9InaUoSAZOc1YLzPv.VxjMzrwl2',35,'',1),(2,'Luis','Ramírez','taquillero@terminal.com','$2a$10$MF0mdXrTstYtMQ19Ea2USusAbhIEN4lHgbY47YaiT7.SemrXXm3x6',28,'',2),(3,'Marta','Ramírez','taquillero2@terminal.com','$2a$10$MF0mdXrTstYtMQ19Ea2USusAbhIEN4lHgbY47YaiT7.SemrXXm3x6',29,'',2),(4,'Jorge','Ramírez','taquillero3@terminal.com','$2a$10$MF0mdXrTstYtMQ19Ea2USusAbhIEN4lHgbY47YaiT7.SemrXXm3x6',30,'',2),(5,'Carlos','Hernández','cliente@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',20,'',3),(6,'Lucía','Hernández','cliente2@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',21,'',3),(7,'Pedro','Hernández','cliente3@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',22,'',3),(8,'Sofía','Hernández','cliente4@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',23,'',3),(9,'Miguel','Hernández','cliente5@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',24,'',3),(10,'Valeria','Hernández','cliente6@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',25,'',3),(11,'Diego','Hernández','cliente7@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',26,'',3),(12,'Camila','Hernández','cliente8@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',27,'',3),(13,'Andrés','Hernández','cliente9@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',28,'',3),(14,'Fernanda','Hernández','cliente10@terminal.com','$2a$10$jCPlPIbSjkTgQm6.XXK.E.7TPHvLXtJr6xpb6xQqL0WUZSvbwB.4K',29,'',3),(15,'Raúl','Hernández','cliente11@terminal.com','$2a$10$uzn9vupoaKj2u0WWh81He.vDc6VWaqz66ahHH3dhzDUUOOj/8yIdq',30,'',3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viaje`
--

DROP TABLE IF EXISTS `viaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `viaje` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_salida` datetime(6) NOT NULL,
  `fecha_llegada` datetime(6) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `autobus_id` bigint(20) NOT NULL,
  `chofer_id` bigint(20) NOT NULL,
  `ruta_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_viaje_autobus` (`autobus_id`),
  KEY `fk_viaje_chofer` (`chofer_id`),
  KEY `fk_viaje_ruta` (`ruta_id`),
  KEY `idx_viaje_estado` (`estado`),
  CONSTRAINT `fk_viaje_autobus` FOREIGN KEY (`autobus_id`) REFERENCES `autobus` (`id`),
  CONSTRAINT `fk_viaje_chofer` FOREIGN KEY (`chofer_id`) REFERENCES `chofer` (`id`),
  CONSTRAINT `fk_viaje_ruta` FOREIGN KEY (`ruta_id`) REFERENCES `ruta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viaje`
--

LOCK TABLES `viaje` WRITE;
/*!40000 ALTER TABLE `viaje` DISABLE KEYS */;
INSERT INTO `viaje` VALUES (1,'2026-11-26 06:00:00.000000','2026-11-26 08:00:00.000000','PROGRAMADO',1,1,1),(2,'2026-11-27 07:00:00.000000','2026-11-27 09:20:00.000000','PROGRAMADO',2,2,2),(3,'2026-11-28 08:00:00.000000','2026-11-28 10:40:00.000000','FINALIZADO',3,3,3),(4,'2026-11-29 09:00:00.000000','2026-11-29 12:00:00.000000','PROGRAMADO',4,4,4),(5,'2026-11-30 10:00:00.000000','2026-11-30 13:20:00.000000','PROGRAMADO',5,5,5),(6,'2026-12-01 11:00:00.000000','2026-12-01 14:40:00.000000','PROGRAMADO',6,6,6),(7,'2026-12-02 12:00:00.000000','2026-12-02 16:00:00.000000','PROGRAMADO',7,7,7),(8,'2026-12-03 13:00:00.000000','2026-12-03 17:20:00.000000','PROGRAMADO',8,8,8),(9,'2026-12-04 14:00:00.000000','2026-12-04 18:40:00.000000','PROGRAMADO',9,9,9),(10,'2026-12-05 15:00:00.000000','2026-12-05 20:00:00.000000','PROGRAMADO',10,10,10),(11,'2026-12-06 06:00:00.000000','2026-12-06 08:00:00.000000','PROGRAMADO',11,11,1),(12,'2026-12-07 07:00:00.000000','2026-12-07 09:20:00.000000','PROGRAMADO',12,12,2);
/*!40000 ALTER TABLE `viaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'terminal_autobuses'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-27 21:11:52
