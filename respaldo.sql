-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: terminal_autobuses
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autobus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `placa` varchar(20) NOT NULL,
  `modelo` varchar(60) NOT NULL,
  `capacidad` int NOT NULL,
  `estado` varchar(20) NOT NULL,
  `terminal_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `placa` (`placa`),
  KEY `fk_autobus_terminal` (`terminal_id`),
  CONSTRAINT `fk_autobus_terminal` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autobus`
--

LOCK TABLES `autobus` WRITE;
/*!40000 ALTER TABLE `autobus` DISABLE KEYS */;
INSERT INTO `autobus` VALUES (1,'AUT-001','Volvo 9800',44,'DISPONIBLE',1),(2,'AUT-002','Mercedes-Benz O500',40,'DISPONIBLE',2),(3,'AUT-003','Scania K360',40,'DISPONIBLE',3),(4,'AUT-004','Irizar i6',44,'DISPONIBLE',4),(5,'AUT-005','Volvo 9800',40,'DISPONIBLE',5),(6,'AUT-006','Mercedes-Benz O500',40,'DISPONIBLE',6),(7,'AUT-007','Scania K360',44,'DISPONIBLE',7),(8,'AUT-008','Irizar i6',40,'DISPONIBLE',8),(9,'AUT-009','Volvo 9800',40,'DISPONIBLE',9),(10,'AUT-010','Mercedes-Benz O500',44,'DISPONIBLE',10),(11,'AUT-011','Scania K360',40,'DISPONIBLE',1),(12,'AUT-012','Irizar i6',40,'DISPONIBLE',2);
/*!40000 ALTER TABLE `autobus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boleto`
--

DROP TABLE IF EXISTS `boleto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `codigo` varchar(30) NOT NULL,
  `numero_asiento` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `reservacion_id` bigint DEFAULT NULL,
  `taquillero_id` bigint DEFAULT NULL,
  `viaje_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `fk_boleto_reservacion` (`reservacion_id`),
  KEY `fk_boleto_taquillero` (`taquillero_id`),
  KEY `idx_boleto_viaje` (`viaje_id`,`numero_asiento`),
  CONSTRAINT `fk_boleto_reservacion` FOREIGN KEY (`reservacion_id`) REFERENCES `reservacion` (`id`),
  CONSTRAINT `fk_boleto_taquillero` FOREIGN KEY (`taquillero_id`) REFERENCES `taquillero` (`id`),
  CONSTRAINT `fk_boleto_viaje` FOREIGN KEY (`viaje_id`) REFERENCES `viaje` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleto`
--

LOCK TABLES `boleto` WRITE;
/*!40000 ALTER TABLE `boleto` DISABLE KEYS */;
INSERT INTO `boleto` VALUES (1,'BOL-SEED001',1,180.00,'ACTIVO',1,NULL,1),(2,'BOL-SEED002',2,205.00,'ACTIVO',2,NULL,2),(3,'BOL-SEED003',12,205.00,'ACTIVO',2,NULL,2),(4,'BOL-SEED004',3,230.00,'ACTIVO',3,NULL,3),(5,'BOL-SEED005',4,255.00,'ACTIVO',4,NULL,4),(6,'BOL-SEED006',14,255.00,'ACTIVO',4,NULL,4),(7,'BOL-SEED007',5,280.00,'ACTIVO',5,NULL,5),(8,'BOL-SEED008',6,305.00,'ACTIVO',6,NULL,6),(9,'BOL-SEED009',16,305.00,'ACTIVO',6,NULL,6),(10,'BOL-SEED010',7,330.00,'ACTIVO',7,NULL,7),(11,'BOL-SEED011',8,355.00,'ACTIVO',8,NULL,8),(12,'BOL-SEED012',18,355.00,'ACTIVO',8,NULL,8),(13,'BOL-SEED013',9,380.00,'ACTIVO',9,NULL,9),(14,'BOL-SEED014',10,405.00,'ACTIVO',10,NULL,10),(15,'BOL-SEED015',20,405.00,'ACTIVO',10,NULL,10),(16,'BOL-SEEDT01',5,180.00,'ACTIVO',NULL,1,11),(17,'BOL-SEEDT02',6,205.00,'ACTIVO',NULL,2,12),(18,'BOL-1A8E2C1C',1,205.00,'ACTIVO',11,NULL,2),(19,'BOL-0EE45A7F',1,230.00,'CANCELADO',12,NULL,3),(20,'BOL-1DB9E1EF',2,230.00,'CANCELADO',13,NULL,3),(21,'BOL-FD2040D4',4,230.00,'CANCELADO',14,NULL,3),(22,'BOL-D9A9526C',6,180.00,'CANCELADO',15,NULL,1),(23,'BOL-FF38446E',14,180.00,'CANCELADO',16,NULL,1),(24,'BOL-B8EC2DFF',8,205.00,'CANCELADO',17,NULL,2),(25,'BOL-31775EA5',15,205.00,'CANCELADO',17,NULL,2),(26,'BOL-0544E799',28,205.00,'CANCELADO',17,NULL,2),(27,'BOL-50C435FF',32,205.00,'CANCELADO',17,NULL,2),(28,'BOL-FD4D11DB',6,280.00,'CANCELADO',18,NULL,5),(29,'BOL-F422DA31',16,180.00,'CANCELADO',19,NULL,1),(30,'BOL-78A0BD5E',17,180.00,'CANCELADO',19,NULL,1),(31,'BOL-7E87D9F4',26,180.00,'CANCELADO',19,NULL,1),(32,'BOL-663831B4',28,180.00,'CANCELADO',19,NULL,1),(33,'BOL-C0987913',30,180.00,'CANCELADO',19,NULL,1),(34,'BOL-E51750E2',31,180.00,'CANCELADO',19,NULL,1),(35,'BOL-BCBA59B4',19,180.00,'CANCELADO',20,NULL,1),(36,'BOL-DF63A315',16,230.00,'CANCELADO',21,NULL,3),(37,'BOL-F1D7608F',24,230.00,'CANCELADO',21,NULL,3),(38,'BOL-67FD2F7B',28,230.00,'CANCELADO',21,NULL,3),(39,'BOL-3EFCBA54',12,180.00,'ACTIVO',22,NULL,1);
/*!40000 ALTER TABLE `boleto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chofer`
--

DROP TABLE IF EXISTS `chofer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chofer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `licencia` varchar(30) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `terminal_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `licencia` (`licencia`),
  KEY `fk_chofer_terminal` (`terminal_id`),
  CONSTRAINT `fk_chofer_terminal` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `telefono` varchar(20) NOT NULL,
  `usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'+525510000001',5),(2,'+525510000002',6),(3,'+525510000003',7),(4,'+525510000004',8),(5,'+525510000005',9),(6,'+525510000006',10),(7,'+525510000007',11),(8,'+525510000008',12),(9,'+525510000009',13),(10,'+525510000010',14),(12,'+529541591317',16),(13,'+529541591317',17);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','crearTablas','SQL','V1__crearTablas.sql',-1479222538,'terminal','2026-11-25 03:31:46',1947,1),(2,'2','cargarRoles','SQL','V2__cargarRoles.sql',654503639,'terminal','2026-11-25 03:31:46',4,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservacion`
--

DROP TABLE IF EXISTS `reservacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_reservacion` datetime(6) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `cliente_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservacion_cliente` (`cliente_id`),
  CONSTRAINT `fk_reservacion_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservacion`
--

LOCK TABLES `reservacion` WRITE;
/*!40000 ALTER TABLE `reservacion` DISABLE KEYS */;
INSERT INTO `reservacion` VALUES (1,'2026-11-24 21:32:00.440785','CONFIRMADA',180.00,1),(2,'2026-11-23 21:32:00.446979','CONFIRMADA',410.00,2),(3,'2026-11-22 21:32:00.449756','CONFIRMADA',230.00,3),(4,'2026-11-21 21:32:00.452196','CONFIRMADA',510.00,4),(5,'2026-11-20 21:32:00.455552','CONFIRMADA',280.00,5),(6,'2026-11-19 21:32:00.457390','CONFIRMADA',610.00,6),(7,'2026-11-18 21:32:00.459731','CONFIRMADA',330.00,7),(8,'2026-11-17 21:32:00.462170','CONFIRMADA',710.00,8),(9,'2026-11-16 21:32:00.465302','CONFIRMADA',380.00,9),(10,'2026-11-15 21:32:00.467330','CONFIRMADA',810.00,10),(11,'2026-11-24 21:34:14.412052','CONFIRMADA',205.00,12),(12,'2026-11-24 21:35:48.413663','CANCELADA',230.00,12),(13,'2026-11-24 21:39:18.962825','CANCELADA',230.00,12),(14,'2026-11-24 21:40:06.394215','CANCELADA',230.00,12),(15,'2026-11-25 22:42:04.041751','CANCELADA',180.00,1),(16,'2026-11-25 22:58:01.429159','CANCELADA',180.00,13),(17,'2026-11-25 23:05:28.544206','CANCELADA',820.00,13),(18,'2026-11-25 23:08:34.412977','CANCELADA',280.00,13),(19,'2026-11-25 23:10:42.075517','CANCELADA',1080.00,13),(20,'2026-11-25 23:16:27.373193','CANCELADA',180.00,13),(21,'2026-11-25 23:16:37.438993','CANCELADA',690.00,13),(22,'2026-11-25 23:27:31.405010','CONFIRMADA',180.00,12);
/*!40000 ALTER TABLE `reservacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ruta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `origen` varchar(80) NOT NULL,
  `destino` varchar(80) NOT NULL,
  `distancia_km` decimal(10,2) NOT NULL,
  `duracion_minutos` int NOT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ruta_terminal` (
  `ruta_id` bigint NOT NULL,
  `terminal_id` bigint NOT NULL,
  PRIMARY KEY (`ruta_id`,`terminal_id`),
  KEY `fk_rt_terminal` (`terminal_id`),
  CONSTRAINT `fk_rt_ruta` FOREIGN KEY (`ruta_id`) REFERENCES `ruta` (`id`),
  CONSTRAINT `fk_rt_terminal` FOREIGN KEY (`terminal_id`) REFERENCES `terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruta_terminal`
--

LOCK TABLES `ruta_terminal` WRITE;
/*!40000 ALTER TABLE `ruta_terminal` DISABLE KEYS */;
INSERT INTO `ruta_terminal` VALUES (1,1),(9,1),(10,1),(1,2),(2,2),(10,2),(1,3),(2,3),(3,3),(2,4),(3,4),(4,4),(3,5),(4,5),(5,5),(4,6),(5,6),(6,6),(5,7),(6,7),(7,7),(6,8),(7,8),(8,8),(7,9),(8,9),(9,9),(8,10),(9,10),(10,10);
/*!40000 ALTER TABLE `ruta_terminal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taquillero`
--

DROP TABLE IF EXISTS `taquillero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taquillero` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `numero_empleado` varchar(20) NOT NULL,
  `usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fk_taquillero_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terminal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `ciudad` varchar(80) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `administrador_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_terminal_administrador` (`administrador_id`),
  CONSTRAINT `fk_terminal_administrador` FOREIGN KEY (`administrador_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminal`
--

LOCK TABLES `terminal` WRITE;
/*!40000 ALTER TABLE `terminal` DISABLE KEYS */;
INSERT INTO `terminal` VALUES (1,'Terminal Ciudad de México','Ciudad de México','Av. Central #100, Ciudad de México',1),(2,'Terminal Puebla','Puebla','Av. Central #110, Puebla',1),(3,'Terminal Oaxaca','Oaxaca','Av. Central #120, Oaxaca',1),(4,'Terminal Guadalajara','Guadalajara','Av. Central #130, Guadalajara',1),(5,'Terminal Monterrey','Monterrey','Av. Central #140, Monterrey',1),(6,'Terminal Veracruz','Veracruz','Av. Central #150, Veracruz',1),(7,'Terminal Querétaro','Querétaro','Av. Central #160, Querétaro',1),(8,'Terminal Morelia','Morelia','Av. Central #170, Morelia',1),(9,'Terminal Toluca','Toluca','Av. Central #180, Toluca',1),(10,'Terminal Cuernavaca','Cuernavaca','Av. Central #190, Cuernavaca',1);
/*!40000 ALTER TABLE `terminal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_invalidado`
--

DROP TABLE IF EXISTS `token_invalidado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_invalidado` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `huella` varchar(64) NOT NULL,
  `fecha_expiracion` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `huella` (`huella`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_invalidado`
--

LOCK TABLES `token_invalidado` WRITE;
/*!40000 ALTER TABLE `token_invalidado` DISABLE KEYS */;
INSERT INTO `token_invalidado` VALUES (1,'bfc7912da11f83ce0401660c94d6cf7adf75550b78df61a8927250d769d5210b','2026-11-25 23:39:29.000000'),(2,'11aaa47afddd6877e3ff3a6ce6e552cabee381ed733ec85380f24a646c1d3254','2026-11-25 23:41:56.000000'),(3,'0f1feb89843da6d35ef0ccaf187ea5cb41c8e74ee0cc602d17ba4dfa75cd78fa','2026-11-25 23:55:54.000000'),(4,'5d1bad0481ba3c12c5d4ab6fc5fdbd0e629facb4d2e54d3cc9724d8a816d3ece','2026-11-25 23:57:56.000000'),(5,'975232fe75f11a064da4db86b5a7b12e8b45c928ab9105f5d3334d671a3c6bf3','2026-11-26 00:18:24.000000'),(6,'319ee2d136314b48b1df4e1a898bb0b8c2db32ff14635ab3dd6c348a3f5e21a7','2026-11-26 00:25:51.000000'),(7,'9b9bea07ce6f93ae6a188338c6c0713c7aaf24659cee26400e26a06a5539ae88','2026-11-26 00:26:23.000000');
/*!40000 ALTER TABLE `token_invalidado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_recuperacion`
--

DROP TABLE IF EXISTS `token_recuperacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_recuperacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(80) NOT NULL,
  `fecha_expiracion` datetime(6) NOT NULL,
  `usado` bit(1) NOT NULL,
  `usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `fk_tokenrec_usuario` (`usuario_id`),
  CONSTRAINT `fk_tokenrec_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_recuperacion`
--

LOCK TABLES `token_recuperacion` WRITE;
/*!40000 ALTER TABLE `token_recuperacion` DISABLE KEYS */;
INSERT INTO `token_recuperacion` VALUES (1,'65619ef4-47da-41d2-84af-db838e881975','2026-11-25 23:54:28.798783',_binary '',16);
/*!40000 ALTER TABLE `token_recuperacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `edad` int NOT NULL,
  `activo` bit(1) NOT NULL,
  `rol_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  KEY `fk_usuario_rol` (`rol_id`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ana','Administradora','admin@terminal.com','$2a$10$Mbzkxj/kgd1Nptrv.DGMTOlAxV63WNZcxU6Y0Htyw8wOLPAqPL1e2',35,_binary '',1),(2,'Luis','Ramírez','taquillero@terminal.com','$2a$10$p5rVitUAeNwB7Psix80avuF0cDAZgfl.texGltOvJdD5RtLYvXB6O',28,_binary '',2),(3,'Marta','Ramírez','taquillero2@terminal.com','$2a$10$p5rVitUAeNwB7Psix80avuF0cDAZgfl.texGltOvJdD5RtLYvXB6O',29,_binary '',2),(4,'Jorge','Ramírez','taquillero3@terminal.com','$2a$10$p5rVitUAeNwB7Psix80avuF0cDAZgfl.texGltOvJdD5RtLYvXB6O',30,_binary '',2),(5,'Carlos','Hernández','cliente@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',20,_binary '',3),(6,'Lucía','Hernández','cliente2@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',21,_binary '',3),(7,'Pedro','Hernández','cliente3@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',22,_binary '',3),(8,'Sofía','Hernández','cliente4@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',23,_binary '',3),(9,'Miguel','Hernández','cliente5@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',24,_binary '',3),(10,'Valeria','Hernández','cliente6@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',25,_binary '',3),(11,'Diego','Hernández','cliente7@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',26,_binary '',3),(12,'Camila','Hernández','cliente8@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',27,_binary '',3),(13,'Andrés','Hernández','cliente9@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',28,_binary '',3),(14,'Fernanda','Hernández','cliente10@terminal.com','$2a$10$8QBtLDju80IYCTlhj8bmbOVKm7EQNsVM3ib9N1t4mrxYocUX6bAx6',29,_binary '',3),(16,'Prueba','Correo','yixux123@gmail.com','$2a$10$iCRGylbn5zmGgO45sj6NGeYPZrNeMdHOijJo9w/PLWtIJVB3XiOOC',25,_binary '',3),(17,'Jesus','Cortes','yixux@gmail.com','$2a$10$UFYI5YA5Z7KwrBsyijVBheGuWoC9IDR7w2IXgotkyIzCGltrGbVU.',22,_binary '\0',3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viaje`
--

DROP TABLE IF EXISTS `viaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viaje` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_salida` datetime(6) NOT NULL,
  `fecha_llegada` datetime(6) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `autobus_id` bigint NOT NULL,
  `chofer_id` bigint NOT NULL,
  `ruta_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_viaje_autobus` (`autobus_id`),
  KEY `fk_viaje_chofer` (`chofer_id`),
  KEY `fk_viaje_ruta` (`ruta_id`),
  KEY `idx_viaje_estado` (`estado`),
  CONSTRAINT `fk_viaje_autobus` FOREIGN KEY (`autobus_id`) REFERENCES `autobus` (`id`),
  CONSTRAINT `fk_viaje_chofer` FOREIGN KEY (`chofer_id`) REFERENCES `chofer` (`id`),
  CONSTRAINT `fk_viaje_ruta` FOREIGN KEY (`ruta_id`) REFERENCES `ruta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viaje`
--

LOCK TABLES `viaje` WRITE;
/*!40000 ALTER TABLE `viaje` DISABLE KEYS */;
INSERT INTO `viaje` VALUES (1,'2026-11-26 00:00:00.000000','2026-11-26 02:00:00.000000','PROGRAMADO',1,1,1),(2,'2026-11-27 01:00:00.000000','2026-11-27 03:20:00.000000','PROGRAMADO',2,2,2),(3,'2026-11-28 02:00:00.000000','2026-11-28 04:40:00.000000','PROGRAMADO',3,3,3),(4,'2026-11-29 03:00:00.000000','2026-11-29 06:00:00.000000','PROGRAMADO',4,4,4),(5,'2026-11-30 04:00:00.000000','2026-11-30 07:20:00.000000','PROGRAMADO',5,5,5),(6,'2026-12-01 05:00:00.000000','2026-12-01 08:40:00.000000','PROGRAMADO',6,6,6),(7,'2026-12-02 06:00:00.000000','2026-12-02 10:00:00.000000','PROGRAMADO',7,7,7),(8,'2026-12-03 07:00:00.000000','2026-12-03 11:20:00.000000','PROGRAMADO',8,8,8),(9,'2026-12-04 08:00:00.000000','2026-12-04 12:40:00.000000','PROGRAMADO',9,9,9),(10,'2026-12-05 09:00:00.000000','2026-12-05 14:00:00.000000','PROGRAMADO',10,10,10),(11,'2026-12-06 00:00:00.000000','2026-12-06 02:00:00.000000','PROGRAMADO',11,11,1),(12,'2026-12-07 01:00:00.000000','2026-12-07 03:20:00.000000','PROGRAMADO',12,12,2);
/*!40000 ALTER TABLE `viaje` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-28  4:01:07
