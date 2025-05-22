-- MySQL dump 10.13  Distrib 9.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: tadak_dev
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `barebone_options`
--

DROP TABLE IF EXISTS `barebone_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barebone_options` (
  `is_valid` bit(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `barebone_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `image_id` bigint DEFAULT NULL,
  `layout` bigint DEFAULT NULL,
  `material` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`barebone_id`),
  UNIQUE KEY `UKrnqx65gf4tfe3pc3y2phukjnj` (`image_id`),
  CONSTRAINT `FKp61445ynp9fift6kghk7pqdyn` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barebone_options`
--

LOCK TABLES `barebone_options` WRITE;
/*!40000 ALTER TABLE `barebone_options` DISABLE KEYS */;
INSERT INTO `barebone_options` VALUES (NULL,60000,16,1,'2025-05-21 19:15:50.000000',NULL,1,3,'2025-05-21 19:16:02.000000','타닥 금속 베어본'),(NULL,79000,20,2,'2025-05-21 19:15:52.000000',NULL,1,3,'2025-05-21 19:16:03.000000','타닥 금속 베어본2'),(NULL,45000,7,3,'2025-05-21 19:15:53.000000',NULL,1,4,'2025-05-21 19:16:04.000000','타닥 플라스틱 베어본'),(NULL,49000,34,4,'2025-05-21 19:15:55.000000',NULL,2,3,'2025-05-21 19:16:06.000000','타닥 텐키리스 금속'),(NULL,39000,32,5,'2025-05-21 19:17:48.000000',NULL,2,4,'2025-05-21 19:17:47.000000','타닥 텐키리스 플라스틱');
/*!40000 ALTER TABLE `barebone_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buckets`
--

DROP TABLE IF EXISTS `buckets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buckets` (
  `is_public` bit(1) NOT NULL,
  `bucket_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `bucket_name` varchar(255) NOT NULL,
  PRIMARY KEY (`bucket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buckets`
--

LOCK TABLES `buckets` WRITE;
/*!40000 ALTER TABLE `buckets` DISABLE KEYS */;
INSERT INTO `buckets` VALUES (_binary '',1,'2025-05-21 19:27:48.000000','2025-05-21 19:27:49.000000','test'),(_binary '',2,'2025-05-21 19:28:03.000000','2025-05-21 19:28:04.000000','profile'),(_binary '',3,'2025-05-21 19:28:13.000000','2025-05-21 19:28:13.000000','review'),(_binary '\0',4,'2025-05-21 19:28:25.000000','2025-05-21 19:28:24.000000','model'),(_binary '\0',5,'2025-05-21 19:28:35.000000','2025-05-21 19:28:34.000000','background'),(_binary '\0',6,'2025-05-21 19:28:43.000000','2025-05-21 19:28:42.000000','keyboard'),(_binary '',7,'2025-05-21 19:28:52.000000','2025-05-21 19:28:51.000000','kbti');
/*!40000 ALTER TABLE `buckets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_id` bigint DEFAULT NULL,
  `cart_item_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `keyboard_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  KEY `FK7wdq71a9cunt0s0dceo13of2` (`keyboard_id`),
  CONSTRAINT `FK7wdq71a9cunt0s0dceo13of2` FOREIGN KEY (`keyboard_id`) REFERENCES `keyboards` (`keyboard_id`),
  CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,'2025-05-21 10:10:31.900858','2025-05-21 10:10:31.900884',2),(2,'2025-05-21 10:35:23.725397','2025-05-21 10:35:23.725416',18),(3,'2025-05-21 23:28:17.071174','2025-05-21 23:28:17.071186',29),(4,'2025-05-21 23:28:43.135615','2025-05-21 23:28:43.135627',12);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'2025-05-21 19:12:36.000000','2025-05-21 19:12:39.000000','layout'),(2,'2025-05-21 19:12:50.000000','2025-05-21 19:12:51.000000','material'),(3,'2025-05-21 19:12:59.000000','2025-05-21 19:13:00.000000','switchType');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `bucket_id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FK7xvcctt7q8d7qo4dsg1m7uvyg` (`bucket_id`),
  CONSTRAINT `FK7xvcctt7q8d7qo4dsg1m7uvyg` FOREIGN KEY (`bucket_id`) REFERENCES `buckets` (`bucket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (5,NULL,1,NULL,'uploads/67bff956-2702-447e-b64b-8f87f454d269_basic.png'),(5,NULL,2,NULL,'uploads/2c74a63d-c366-422c-a2cd-69ec443be88a_basic2.png'),(5,NULL,3,NULL,'uploads/75cdf481-7bb7-4ff5-a4db-d049a8351ff5_basic3.png'),(6,NULL,4,NULL,'uploads/5ca401e7-6c14-4335-9031-768cc4a40943_preview.png'),(4,NULL,5,NULL,'uploads/cab5ddb5-09db-4e96-8be3-8461d319c0be_keyboard.glb'),(6,NULL,6,NULL,'uploads/a00099dc-9195-4ae6-8b0a-7e1fcd4a374b_preview.png'),(4,NULL,7,NULL,'uploads/dba336b3-1a00-4acb-8ad7-e20a55643798_keyboard.glb');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyboard_options`
--

DROP TABLE IF EXISTS `keyboard_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyboard_options` (
  `created_at` datetime(6) DEFAULT NULL,
  `keyboard_id` bigint NOT NULL,
  `keyboard_option_id` bigint NOT NULL AUTO_INCREMENT,
  `option_id` bigint NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`keyboard_option_id`),
  KEY `FK822cqdg5n1lmatatnlxqck3o3` (`keyboard_id`),
  KEY `FKms5oqp0p13t2y0b8cjw7l9gli` (`option_id`),
  CONSTRAINT `FK822cqdg5n1lmatatnlxqck3o3` FOREIGN KEY (`keyboard_id`) REFERENCES `keyboards` (`keyboard_id`),
  CONSTRAINT `FKms5oqp0p13t2y0b8cjw7l9gli` FOREIGN KEY (`option_id`) REFERENCES `options` (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyboard_options`
--

LOCK TABLES `keyboard_options` WRITE;
/*!40000 ALTER TABLE `keyboard_options` DISABLE KEYS */;
INSERT INTO `keyboard_options` VALUES ('2025-05-21 10:35:23.636392',1,1,1,'2025-05-21 10:35:23.636408'),('2025-05-21 10:35:23.640128',1,2,4,'2025-05-21 10:35:23.640139'),('2025-05-21 10:35:23.642083',1,3,8,'2025-05-21 10:35:23.642095'),('2025-05-21 23:02:28.111950',2,4,1,'2025-05-21 23:02:28.111960'),('2025-05-21 23:02:28.113818',2,5,3,'2025-05-21 23:02:28.113828'),('2025-05-21 23:02:28.115421',2,6,7,'2025-05-21 23:02:28.115431');
/*!40000 ALTER TABLE `keyboard_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyboards`
--

DROP TABLE IF EXISTS `keyboards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyboards` (
  `keyboard_price` int DEFAULT NULL,
  `barebone_option_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `keyboard_id` bigint NOT NULL AUTO_INCREMENT,
  `keycap_option_id` bigint DEFAULT NULL,
  `model_id` bigint DEFAULT NULL,
  `switch_option_id` bigint DEFAULT NULL,
  `thumbnail_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `keyboard_color` json DEFAULT NULL,
  `keyboard_name` varchar(255) NOT NULL,
  PRIMARY KEY (`keyboard_id`),
  UNIQUE KEY `UK4nft6fcdecxxis02gvkord3lh` (`model_id`),
  UNIQUE KEY `UKsvhqxdhtn1ol01odqau5opiej` (`thumbnail_id`),
  KEY `FKj6uw0d3epjt3gu385k6u3ijh6` (`barebone_option_id`),
  KEY `FK202wrr96wjk81y1j8i5c5kwbq` (`keycap_option_id`),
  KEY `FKjut2py9g1cl2k9easckk7hytw` (`switch_option_id`),
  CONSTRAINT `FK202wrr96wjk81y1j8i5c5kwbq` FOREIGN KEY (`keycap_option_id`) REFERENCES `keycap_options` (`keycap_option_id`),
  CONSTRAINT `FKclycltlibtnigu4ck5xrvqb15` FOREIGN KEY (`thumbnail_id`) REFERENCES `images` (`image_id`),
  CONSTRAINT `FKgh2fdwqfbdhsukcysrh8yful4` FOREIGN KEY (`model_id`) REFERENCES `images` (`image_id`),
  CONSTRAINT `FKj6uw0d3epjt3gu385k6u3ijh6` FOREIGN KEY (`barebone_option_id`) REFERENCES `barebone_options` (`barebone_id`),
  CONSTRAINT `FKjut2py9g1cl2k9easckk7hytw` FOREIGN KEY (`switch_option_id`) REFERENCES `switch_options` (`switch_option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyboards`
--

LOCK TABLES `keyboards` WRITE;
/*!40000 ALTER TABLE `keyboards` DISABLE KEYS */;
INSERT INTO `keyboards` VALUES (106500,3,'2025-05-21 10:35:23.606661',1,1,5,4,4,'2025-05-21 10:35:25.302345',18,'{\"keycap\": {\"basicColor\": \"#ffffff\", \"pointColors\": {\"A\": \"#FFFFFF\", \"D\": \"#FFFFFF\", \"S\": \"#FFFFFF\", \"W\": \"#FFFFFF\", \"Esc\": \"#FFFFFF\", \"Enter\": \"#FFFFFF\", \"Space\": \"#FFFFFF\", \"ArrowUp\": \"#FFFFFF\", \"ArrowDown\": \"#FFFFFF\", \"ArrowLeft\": \"#FFFFFF\", \"ArrowRight\": \"#FFFFFF\"}}, \"outerColor\": \"#ffffff\"}','so'),(112500,1,'2025-05-21 23:02:28.101118',2,1,7,3,6,'2025-05-21 23:50:14.661206',32,'{\"keycap\": {\"basicColor\": \"#55ffd9\", \"pointColors\": {\"Q\": \"#ffff69\", \"W\": \"#ff54d1\", \"Esc\": \"#ffffff\", \"Enter\": \"#7c54ff\", \"Space\": \"#67c935\"}}, \"outerColor\": \"#4f8aff\"}','키보드 타닥');
/*!40000 ALTER TABLE `keyboards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keycap_options`
--

DROP TABLE IF EXISTS `keycap_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keycap_options` (
  `is_valid` bit(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image_id` bigint DEFAULT NULL,
  `keycap_option_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`keycap_option_id`),
  UNIQUE KEY `UKkcfrpxxr8s63724xkg6q4ddlm` (`image_id`),
  CONSTRAINT `FK7p1krui01i8ynkxr910msb5j0` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keycap_options`
--

LOCK TABLES `keycap_options` WRITE;
/*!40000 ALTER TABLE `keycap_options` DISABLE KEYS */;
INSERT INTO `keycap_options` VALUES (NULL,25000,23,'2025-05-21 19:21:34.000000',NULL,1,'2025-05-21 19:21:40.000000','타닥 키캡'),(NULL,15000,6,'2025-05-21 19:21:35.000000',NULL,2,'2025-05-21 19:21:43.000000','타닥 키캡 2'),(NULL,30000,18,'2025-05-21 19:21:37.000000',NULL,3,'2025-05-21 19:21:41.000000','타닥 키캡 3');
/*!40000 ALTER TABLE `keycap_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_placements`
--

DROP TABLE IF EXISTS `main_placements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_placements` (
  `created_at` datetime(6) DEFAULT NULL,
  `keyboard_id` bigint DEFAULT NULL,
  `main_placement_id` bigint NOT NULL AUTO_INCREMENT,
  `placement_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`main_placement_id`),
  KEY `FKrhrp34815rqgk1b0259xwchif` (`keyboard_id`),
  KEY `FK669a8xr5wpbck5jma15ivo093` (`placement_id`),
  CONSTRAINT `FK669a8xr5wpbck5jma15ivo093` FOREIGN KEY (`placement_id`) REFERENCES `placements` (`background_id`),
  CONSTRAINT `FKrhrp34815rqgk1b0259xwchif` FOREIGN KEY (`keyboard_id`) REFERENCES `keyboards` (`keyboard_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_placements`
--

LOCK TABLES `main_placements` WRITE;
/*!40000 ALTER TABLE `main_placements` DISABLE KEYS */;
INSERT INTO `main_placements` VALUES ('2025-05-21 10:34:17.638019',NULL,1,4,'2025-05-21 10:34:17.638035',18),('2025-05-21 22:59:40.629094',2,2,7,'2025-05-21 22:59:40.629103',32),('2025-05-21 23:52:51.573274',NULL,3,10,'2025-05-21 23:52:51.573280',1),('2025-05-21 23:54:37.457369',NULL,4,13,'2025-05-21 23:54:37.457375',35);
/*!40000 ALTER TABLE `main_placements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `is_valid` bit(1) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `option_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `option_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`option_id`),
  KEY `FKnv43t4cvq5gujcu8lyep1j3f6` (`category_id`),
  CONSTRAINT `FKnv43t4cvq5gujcu8lyep1j3f6` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (NULL,1,'2025-05-21 19:14:23.000000',1,'2025-05-21 19:14:55.000000','풀배열'),(NULL,1,'2025-05-21 19:14:24.000000',2,'2025-05-21 19:14:56.000000','텐키리스'),(NULL,2,'2025-05-21 19:14:25.000000',3,'2025-05-21 19:14:57.000000','금속'),(NULL,2,'2025-05-21 19:14:26.000000',4,'2025-05-21 19:15:00.000000','플라스틱'),(NULL,3,'2025-05-21 19:14:27.000000',5,'2025-05-21 19:14:59.000000','청축'),(NULL,3,'2025-05-21 19:14:30.000000',6,'2025-05-21 19:15:02.000000','적축'),(NULL,3,'2025-05-21 19:14:28.000000',7,'2025-05-21 19:15:01.000000','갈축'),(NULL,3,'2025-05-21 19:14:31.000000',8,'2025-05-21 19:15:03.000000','흑축');
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placements`
--

DROP TABLE IF EXISTS `placements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placements` (
  `can_delete` bit(1) DEFAULT NULL,
  `locatioin_x` double DEFAULT NULL,
  `location_y` double DEFAULT NULL,
  `rotation_x` double DEFAULT NULL,
  `rotation_y` double DEFAULT NULL,
  `rotation_z` double DEFAULT NULL,
  `scale_x` double DEFAULT NULL,
  `scale_y` double DEFAULT NULL,
  `scale_z` double DEFAULT NULL,
  `background_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `image_id` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`background_id`),
  KEY `FKf9rgncv4l0iwp2448yo4ktc9p` (`image_id`),
  CONSTRAINT `FKf9rgncv4l0iwp2448yo4ktc9p` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placements`
--

LOCK TABLES `placements` WRITE;
/*!40000 ALTER TABLE `placements` DISABLE KEYS */;
INSERT INTO `placements` VALUES (_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,1,'2025-05-21 19:30:44.000000',1,'2025-05-21 19:30:37.000000',NULL),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,2,'2025-05-21 19:30:45.000000',2,'2025-05-21 19:30:38.000000',NULL),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,3,'2025-05-21 19:30:47.000000',3,'2025-05-21 19:30:39.000000',NULL),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,4,'2025-05-21 10:34:17.619777',1,'2025-05-21 10:34:17.619800',18),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,5,'2025-05-21 10:34:17.624202',2,'2025-05-21 10:34:17.624216',18),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,6,'2025-05-21 10:34:17.626871',3,'2025-05-21 10:34:17.626885',18),(_binary '\0',-0.0010013922663861252,-1.5000000000000002,-0.17079632679489698,0.009203673205103399,1.0842480941885277e-19,0.5,0.5,0.5,7,'2025-05-21 22:59:40.619171',1,'2025-05-21 23:50:14.661062',32),(_binary '\0',-0.019183174699473587,-1.4712252379507889,0,0,0,0.5,0.5,0.5,8,'2025-05-21 22:59:40.621766',2,'2025-05-21 23:04:59.602647',32),(_binary '\0',1.1989484187171264,-1.5671411114481595,0.13920367320510296,0.159203673205103,1.7569420467363865e-18,0.5,0.5,0.5,9,'2025-05-21 22:59:40.623788',3,'2025-05-21 23:04:43.360721',32),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,10,'2025-05-21 23:52:51.563848',1,'2025-05-21 23:52:51.563856',1),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,11,'2025-05-21 23:52:51.566467',2,'2025-05-21 23:52:51.566473',1),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,12,'2025-05-21 23:52:51.568472',3,'2025-05-21 23:52:51.568479',1),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,13,'2025-05-21 23:54:37.448273',1,'2025-05-21 23:54:37.448285',35),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,14,'2025-05-21 23:54:37.451039',2,'2025-05-21 23:54:37.451046',35),(_binary '\0',0,-1.5,0,0,0,0.5,0.5,0.5,15,'2025-05-21 23:54:37.452792',3,'2025-05-21 23:54:37.452798',35);
/*!40000 ALTER TABLE `placements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popular_products`
--

DROP TABLE IF EXISTS `popular_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popular_products` (
  `ranking` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`ranking`),
  UNIQUE KEY `UK20mcpp31kcafi171hiqva0gd4` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popular_products`
--

LOCK TABLES `popular_products` WRITE;
/*!40000 ALTER TABLE `popular_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `popular_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_type` enum('BAREBONE','SWITCH','KEYCAP') NOT NULL,
  `hits` bigint NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `author_id` bigint DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `uniq_product_name_type` (`product_name`,`product_type`)
) ENGINE=InnoDB AUTO_INCREMENT=853 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (520,'글로리어스 GMMK2 65% 기계식 커스텀 베어본 (블랙)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(521,'FL ESPORTS X80 유무선 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(522,'FL ESPORTS MK750 유무선 기계식 커스텀 베어본 (불투명 블랙)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(523,'글로리어스 GMMK PRO 기계식 커스텀 베어본 (블랙)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(524,'글로리어스 GMMK2 96% 기계식 커스텀 베어본 (핑크)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(525,'Keydous NJ80-AP 유무선 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(526,'LEOBOG HI75 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-21 17:08:32',NULL,NULL),(527,'VTER Galaxy80 PRO 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-21 17:08:32',NULL,NULL),(528,'몬스타 몬스타기어 닌자87PRO v2 유무선 기계식 커스텀 베어본 (화이트)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(529,'몬스타 가츠 스텔라87 유무선 기계식 베어본','BAREBONE',8,'2025-05-04 18:33:57','2025-05-21 19:33:22',NULL,NULL),(530,'몬스타 가츠 스텔라100 유무선 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(531,'SPM AL68A 스플릿 유무선 기계식 커스텀 베어본','BAREBONE',1,'2025-05-04 18:33:57','2025-05-22 08:24:58',NULL,NULL),(532,'SPM AL66B 기계식 커스텀 베어본','BAREBONE',1,'2025-05-04 18:33:57','2025-05-22 08:25:28',NULL,NULL),(533,'SPM AL87B 기계식 커스텀 베어본','BAREBONE',1,'2025-05-04 18:33:57','2025-05-22 08:25:28',NULL,NULL),(534,'몬스타 몬스타기어 닌자108 PRO 유무선 기계식 커스텀 베어본 (화이트)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(535,'몬스타 가츠 X504PRO 유무선 기계식 배어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(536,'몬스타 몬스타기어 닌자84PRO 유무선 기계식 커스텀 베어본 (화이트)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(537,'LEOBOG Hi8SE 유무선 기계식 커스텀 베어본 (블랙)','BAREBONE',4,'2025-05-04 18:33:57','2025-05-22 08:24:58',NULL,NULL),(538,'몬스타 가츠 위캣7 유무선 기계식 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(539,'몬스타 몬스타기어 닌자96PRO 유무선 기계식 커스텀 베어본 (화이트)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(540,'몬스타 몬스타기어 클래식 TKL 유무선 기계식 커스텀 베어본 (그레이)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(541,'QSENN A75 유무선 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(542,'80Retros GAME1989 기계식 커스텀 베어본','BAREBONE',1,'2025-05-04 18:33:57','2025-05-21 19:10:21',NULL,NULL),(543,'몬스타 가츠 위캣8 유무선 기계식 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(544,'VARMILO SWORD68 기계식 커스텀 베어본','BAREBONE',2,'2025-05-04 18:33:57','2025-05-21 19:10:51',NULL,NULL),(545,'SPM AL82B 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(546,'몬스타 가츠 스텔라100 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(547,'MONSGEEK M5 기계식 커스텀 베어본 해외구매 (블랙)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(548,'몬스타 몬스타기어 닌자87PRO ALU DIY키트 유무선 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(549,'TKD Cycle 7 풀알루미늄 기계식 커스텀 베어본 (Cream)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(550,'몬스타 몬스타기어 닌자104PRO 유무선 기계식 커스텀 베어본 (화이트)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(551,'몬스타 몬스타기어 닌자87PRO RGB 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(552,'ZUOYA GMK87 유무선 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(553,'몬스타 몬스타기어 다크TKL 유무선 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(554,'몬스타 가츠 스텔라75 유무선 기계식 베어본','BAREBONE',1,'2025-05-04 18:33:57','2025-05-21 21:04:23',NULL,NULL),(555,'NuPhy Gem80 유무선 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:57','2025-05-04 18:33:57',NULL,NULL),(556,'몬스타 가츠 X208 기계식 커스텀 베어본','BAREBONE',1,'2025-05-04 18:33:58','2025-05-21 19:10:21',NULL,NULL),(557,'MONSGEEK M1 기계식 커스텀 베어본 해외구매 (블랙)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(558,'MONSGEEK M5W 유무선 기계식 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(559,'DrunkDeer G65 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(560,'Keychron Q2 노브 알루미늄 기계식 커스텀 베어본 (블랙)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-21 17:08:32',NULL,NULL),(561,'Pulsar PCMK 60% 기계식 커스텀 베어본 (블랙)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(562,'SUPERBY SP87C 기계식 커스텀 베어본 (적축)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(563,'ZUOYA GMK67 유무선 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(564,'MONSGEEK M1W V3 유무선 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-21 17:08:32',NULL,NULL),(565,'몬스타 몬스타기어 닌자87PRO DIY키트 기계식 유무선 베어본','BAREBONE',2,'2025-05-04 18:33:58','2025-05-21 21:04:23',NULL,NULL),(566,'MONSGEEK MG75W 유무선 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(567,'Createkeebs LUMINKEY 75 기계식 커스텀 베어본 해외구매 (크림 화이트)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(568,'Luminkey 80 기계식 커스텀 베어본','BAREBONE',2,'2025-05-04 18:33:58','2025-05-21 22:21:53',NULL,NULL),(569,'SUPERBY SP108C 기계식 커스텀 베어본 (청축)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(570,'DrunkDeer A75 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(571,'KiiBOOM Moonshadow 81 기계식 커스텀 베어본 (해외구매)','BAREBONE',2,'2025-05-04 18:33:58','2025-05-22 08:25:28',NULL,NULL),(572,'몬스타 몬스타기어 클래식 TKL 아크릴 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(573,'ZUOYA GMK81 유무선 기계식 커스텀 베어본 (해외구매)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-21 17:08:32',NULL,NULL),(574,'몬스타 몬스타기어 야옹67 기계식 커스텀 베어본','BAREBONE',0,'2025-05-04 18:33:58','2025-05-04 18:33:58',NULL,NULL),(575,'Keychron Q4 알루미늄 기계식 커스텀 베어본 (블루)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-21 17:08:32',NULL,NULL),(576,'Keychron Q1 노브 알루미늄 기계식 커스텀 베어본 (블랙)','BAREBONE',0,'2025-05-04 18:33:58','2025-05-21 17:08:32',NULL,NULL),(577,'앱코 HACKER QUICK SWAP용 OUTEMU 스위치 (8개, 갈축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(578,'COX 카일 정품 광축 스위치 (10개, 리니어)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(579,'앱코 HACKER 카일 정품 광축 스위치 (5+5개, 클릭/리니어)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(580,'글로리어스 PANDA 스위치 (36개)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(581,'글로리어스 FOX 사전 윤활 스위치 세트','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(582,'글로리어스 LYNX 스위치 사전윤활 (36개)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(583,'글로리어스 LYNX 스위치 (36개)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(584,'글로리어스 PANDA HE 마그네틱 자석축 사전 윤활 스위치 36Pcs 사일런트','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(585,'MOUNTAIN 스위치 (리니어)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(586,'글로리어스 PANDA 스위치 사전 윤활 (36개)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(587,'Razer Mechanical Switches Pack (옐로우)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(588,'글로리어스 RAPTOR HE 마그네틱 자석축 사전 윤활 스위치 36Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(589,'글로리어스 RAPTOR 스위치 사전 윤활 36pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(590,'글로리어스 FOX HE 마그네틱 자석축 사전 윤활 스위치 36Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(591,'글로리어스 PANDA HE 마그네틱 자석축 사전 윤활 스위치 36Pcs 스탠다드','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(592,'글로리어스 LYNX HE 마그네틱 자석축 사전 윤활 스위치 36Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(593,'SPM HMX x SPM 은행나무 리니어 스위치 (35Pcs)','SWITCH',1,'2025-05-04 18:39:24','2025-05-21 19:32:52',NULL,NULL),(594,'엠스톤글로벌 수제윤활 그루브스톤 특주축 55ea (저소음 밀키, 38g)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(595,'CHERRY MX Switch (1개, 저소음 적축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(596,'Keychron K PRO 스위치 110Pcs (바나나축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(597,'SPM HMX PEBBLE 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(598,'SPM 오테뮤 피치 V3 리니어 저소음 스위치 (35Pcs)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(599,'몬스타 가츠 오테뮤 피치 V3 리니어 스위치 1Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-21 17:08:32',NULL,NULL),(600,'CHERRY MX Switch Tester Sampler 12종','SWITCH',0,'2025-05-04 18:39:24','2025-05-21 17:08:32',NULL,NULL),(601,'CHERRY MX RGB Switch (1개, 은축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(602,'AKKO 크림블루프로 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(603,'SPM 오테뮤 라임 V3 택타일 저소음 스위치 (35Pcs)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(604,'프리플로우 QuickSilver Longpring','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(605,'SPM BSUN 몽돌 블랙 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(606,'Keychron 게이트론 로우프로파일 스위치 110Pcs (청축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(607,'Keychron 하이무 미드나잇 리니어 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(608,'Keychron 로우프로파일 옵티컬 스위치 90Pcs (오렌지축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(609,'몬스타 몬스타기어 홀리판다 V2 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(610,'SPM HMX WOBLAB VIOLET 리니어 스위치 (35Pcs)','SWITCH',0,'2025-05-04 18:39:24','2025-05-21 17:08:32',NULL,NULL),(611,'엠스톤글로벌 수제윤활 엠스톤 특주축 테스터 12구','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(612,'Keychron 로우프로파일 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(613,'Keychron K PRO 스위치 45Pcs (저소음 적축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(614,'Keychron 게이트론 G PRO 3.0 스위치 110Pcs (갈축)','SWITCH',0,'2025-05-04 18:39:24','2025-05-04 18:39:24',NULL,NULL),(615,'Keychron 체리 MX2A 스위치 110Pcs (갈축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(616,'SPM 하이무 바다소금 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(617,'Keychron 교체용 Cherry MX Switch Set (청축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(618,'Keychron 교체용 Cherry MX RGB Switch Set (은축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(619,'Keychron 게이트론 노스폴 2.0 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(620,'Keychron 하이무 바다소금 리니어 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(621,'Keychron 게이트론 저소음 스위치 110pcs (저소음 적축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(622,'CHERRY XTRFY MX2A 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-21 17:08:32',NULL,NULL),(623,'몬스타 가츠 밀감 스위치','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(624,'SPM HMX 그린 애플 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(625,'SPM 하이무 미드나잇 리니어 스위치 (35Pcs)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(626,'NuPhy AIR 시리즈 스위치 100Pcs (알로에)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(627,'NuPhy 게이트론 G Pro 2.0 스위치 110Pcs (은축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(628,'SPM HMX x SPM JELLY 리니어 스위치 (105Pcs)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(629,'AKKO 피아노 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(630,'몬스타 가츠 오테뮤 라임 V3 스위치','SWITCH',0,'2025-05-04 18:39:25','2025-05-21 17:08:32',NULL,NULL),(631,'몬스타 가츠 목란 리니어 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(632,'AKKO 라벤더퍼플 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(633,'SPM 하이무 하트비트 저소음 리니어 스위치 (35Pcs)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(634,'Keychron 슈퍼 스위치 110Pcs (적축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(635,'몬스타 몬스타기어 후르츠 피치 저소음 리니어 스위치 (1pcs)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(636,'SPM HMX x Soulcat PORO Light 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(637,'SPM 하이무 아이스실버 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(638,'SPM HMX x Soulcat PORO Medium 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(639,'Keychron 카일 스위치 110Pcs (갈축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(640,'SPM 카일 아일렛 저소음 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(641,'SPM 카일 웨일 저소음 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(642,'SPM 비선 블루 리니어 스위치 (35Pcs)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(643,'Keychron 카일 박스 스위치 110Pcs (갈축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(644,'SPM HMX HIBISCUS 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(645,'Keychron 게이트론 팬텀 스위치 35Pcs (청축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(646,'Pulsar 카일 기계식 스위치 90피스 (스피드 핑크축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(647,'NuPhy AIR75 스위치 100Pcs (갈축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(648,'Keychron 게이트론 캥거루 택타일 스위치 110Pcs (59g)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(649,'Keychron 게이트론 G Pro 스위치 110pcs (갈축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(650,'SPM 하이무 바다소금 저소음 리니어 스위치 35Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(651,'EPOMAKER Sea Salt 스위치 35Pcs (해외구매)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(652,'하이무 저소음 딥블루 90Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(653,'Keychron 게이트론 Oil King 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(654,'AKKO 오션블루 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(655,'Pulsar 게이트론 스위치 90피스 (갈축)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(656,'몬스타 가츠 HMX 핑크 피그 스위치','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(657,'몬스타 가츠 동백 스위치','SWITCH',1,'2025-05-04 18:39:25','2025-05-22 08:24:58',NULL,NULL),(658,'몬스타 가츠 하이무 미드나잇 리니어 스위치 1Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(659,'오테뮤 오션블루 톰 크림옐로우 스위치 90Pcs + 윤활제','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(660,'Sillyworks 히아신스 스위치 V2 10Pcs (해외구매)','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(661,'몬스타 몬스타기어 KTT 마카롱 블루 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(662,'몬스타 몬스타기어 Haimu 바다소금 스위치 10pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(663,'몬스타 가츠 HMX 딸기 스무디 스위치','SWITCH',1,'2025-05-04 18:39:25','2025-05-22 08:25:28',NULL,NULL),(664,'몬스타 가츠 HMX 망고 스무디 스위치','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(665,'몬스타 가츠 HMX 블루베리 스무디 스위치','SWITCH',0,'2025-05-04 18:39:25','2025-05-21 17:08:32',NULL,NULL),(666,'몬스타 가츠 폭스테일 바다소금 V2 스위치','SWITCH',0,'2025-05-04 18:39:25','2025-05-21 17:08:32',NULL,NULL),(667,'NuPhy 레몬축 택타일 스위치 90Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(668,'NuPhy 라즈베리축 리니어 스위치 90Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(669,'NuPhy 민트축 리니어 스위치 90Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(670,'NuPhy 플리팅 골드 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(671,'NuPhy 폴라리스 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(672,'NuPhy 게이트론 베이비 라쿤 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(673,'NuPhy 로즈 글래이셔 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(674,'NuPhy 나이트 브리즈 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:25','2025-05-04 18:39:25',NULL,NULL),(675,'몬스타 몬스타기어 Haimu 바다소금 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(676,'몬스타 가츠 블루레몬 리니어 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(677,'몬스타 가츠 할로윈 택타일 스위치 pcs1','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(678,'몬스타 가츠 아델리v2 리니어 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(679,'몬스타 가츠 후르츠 리치 리니어 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(680,'몬스타 가츠 후르츠 망고 넌클릭 택타일 스위치 1pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(681,'SPM 하이무 아이스실버 리니어 스위치 105Pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(682,'Keychron 하이무 미드나잇 리니어 스위치 45Pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(683,'오테뮤 스위치 90Pcs + 윤활제','SWITCH',2,'2025-05-04 18:39:26','2025-05-22 08:28:28',NULL,NULL),(684,'NuPhy AIR 시리즈 게이트론 스위치 100Pcs (갈축)','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(685,'TTC Holy Panda V2 10Pcs (해외구매)','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(686,'Keychron 하이무 바다소금 리니어 스위치 1Pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(687,'몬스타 몬스타기어 TTC Water melon 1pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(688,'몬스타 몬스타기어 TTC Golden Brown 1pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(689,'엠스톤글로벌 표준윤활 특주축 테스터 5구','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(690,'Keychron 게이트론 스위치 테스터 35Pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(691,'Keychron 카일 미드나잇 프로 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(692,'Keychron 카일 폴리아 스위치 110Pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(693,'AJAZZ 후아노 과일 바나나 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(694,'AJAZZ 후아노 과일 복숭아 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(695,'AKKO 스위치 샘플러 16pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(696,'AKKO 폼 브라운 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(697,'AKKO 크림옐로우프로 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(698,'AKKO 젤리블루 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(699,'AKKO 젤리블랙 스위치 45pcs','SWITCH',0,'2025-05-04 18:39:26','2025-05-04 18:39:26',NULL,NULL),(700,'몬스타 몬스타기어 오테뮤 라임 스위치 10pcs','SWITCH',1,'2025-05-04 18:39:26','2025-05-21 19:11:21',NULL,NULL),(701,'Pulsar 게이트론 스위치 10피스 (황축)','SWITCH',2,'2025-05-04 18:39:26','2025-05-22 08:52:59',NULL,NULL),(702,'CHERRY MX Switch Tester Sampler 9종','SWITCH',3,'2025-05-04 18:39:26','2025-05-22 08:24:58',NULL,NULL),(703,'COX GN08 게이트론 기계식 스위치 세트 (청축)','SWITCH',3,'2025-05-04 18:39:26','2025-05-22 08:52:59',NULL,NULL),(704,'ASUS ROG RX PBT 이중사출 키캡 세트','KEYCAP',0,'2025-05-04 18:42:39','2025-05-21 17:08:32',NULL,NULL),(705,'글로리어스 POLYCHROMA RGB 키캡 세트','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(706,'앱코 SEOUL 서울 염료승화 PBT 키캡','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(707,'앱코 HACKER 배틀 가이드 PBT 염료승화 108키','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(708,'글로리어스 GPBT 키캡 세트 (RAIN FOREST)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(709,'앱코 레트로 써클 키캡 (87키)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(710,'Razer PBT Keycap Upgrade Set (화이트)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(711,'CORSAIR Drop MiTo Keysterine 키캡 세트 R2','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(712,'VARMILO X ZOMO 고양이 발바닥 ABS 키캡 (샴냥)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(713,'ASUS ROG PBT KEYCAP SET','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(714,'COX 145Key 염료승화 PBT 한글 포인트 컬러 키캡 (블루)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(715,'글로리어스 GPBT CELESTIAL 키캡 세트 (ICE)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(716,'COX CX158 PBT 이색사출 키캡 트레이 세트 (Ocellaris)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(717,'ASUS ROG Dye-Sub PBT 키캡 세트','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(718,'MOUNTAIN PBT 이중사출 키캡 세트 (Aquamarine_B)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(719,'쿨러마스터 MASTERKEYS MECHANICAL KEYCAP','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(720,'글로리어스 AURA KEYCAPS V2 (핑크)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-04 18:42:39',NULL,NULL),(721,'글로리어스 GMMK PRO 볼륨 노브 (NAVY BLUE)','KEYCAP',0,'2025-05-04 18:42:39','2025-05-21 17:08:32',NULL,NULL),(722,'글로리어스 GPBT Backlit RGB','KEYCAP',0,'2025-05-04 18:42:39','2025-05-21 17:08:32',NULL,NULL),(723,'갤럭시 XANOVA 한영 ABS 104 키캡','KEYCAP',0,'2025-05-04 18:42:39','2025-05-21 17:08:32',NULL,NULL),(724,'한성컴퓨터 ABS 이색사출 키캡 (블루)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(725,'글로리어스 GPBT Backlit Classic','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(726,'Razer PBT Keycap Coiled Cable Set (핑크)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(727,'앱코 레트로 써클 컬러 키캡 104키 (블랙)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(728,'글로리어스 GPBT GRAPEFRUIT 키캡 세트','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(729,'마이크로닉스 ZOMO 크리스탈 냥냥젤리 포인트 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(730,'SPM PC 투명 실크인쇄 한영 키캡 165키 블랙스모그','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(731,'SPM Soulcat 고함량 PBT 염료승화 한영 키캡 107키 BOG','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(732,'몬스타 가츠 다크올리비아','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(733,'데이소이 컬러풀 기계식 PBT','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(734,'컴튜 컴튜 한글 투명 크리스탈 키캡 CBSA 132키','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(735,'지클릭커 레트로 PBT 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(736,'시이닷 한국의 미 키캡 (모노 단청)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(737,'몬스타 가츠 아이스','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(738,'컴튜 애플 레트로 키캡 XDA PBT 127키','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(739,'몬스타 가츠 하늘고래','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(740,'몬스타 몬스타기어 한영정각 ABS 키캡 화이트','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(741,'ASUS ROG AZOTH BLACK 한글 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(742,'Pulsar 베이직 한영 키캡 104키 (블랙)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(743,'엠스톤글로벌 mStone Unicolor 119Key (에메랄드 키릴)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(744,'G.SKILL 크리스탈 크라운 키캡 (해외구매)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(745,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 142키 검은고양이 네로','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(746,'CORSAIR PBT DOUBLE-SHOT PRO KEYCAP MOD KIT (화이트)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(747,'로지텍 오로라 컬렉션 G713/G715 전용 키보드 키캡 (핑크)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(748,'SPM PC 투명 실크인쇄 한영 키캡 165키 클리어','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(749,'Pulsar 베이직 영문 키캡 104키 (블랙)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(750,'몬스타 몬스타기어 집사 PBT 키캡 (페르시안)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(751,'Pulsar 로우 프로파일 한영 키캡 104키 (화이트)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(752,'장우컴퍼니 빵 시리즈 포인트 키캡 (소금빵)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-21 17:08:32',NULL,NULL),(753,'시이닷 네모진 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(754,'몬스타 가츠 고양이 발바닥','KEYCAP',0,'2025-05-04 18:42:40','2025-05-21 17:08:32',NULL,NULL),(755,'몬스타 가츠 구름냥 스카이 139Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(756,'무영테크 ROOKY PBT DoubleShot 104 KeyCap (Acid Green)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(757,'Pulsar 로우 프로파일 영문 키캡 104키 (블랙)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(758,'몬스타 몬스타기어 PBT 한영정각 108 키캡 (화이트)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(759,'엠스톤글로벌 mStone Duo 108Key (R-G 8비트)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(760,'CORSAIR FPS/MOBA Pudding Keycap Mod Kit Gunmetal Gray','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(761,'몬스타 가츠 구름냥 퍼플 139Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(762,'MAXTILL 한/영 이중사출 104키 가디언 컬러키캡 (오렌지)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(763,'Keychron OSA 더블샷 PBT 키보드 교체용 커스텀 포인트 키캡 2pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(764,'사오파오 OEM 컬러측각 LED 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(765,'몬스타 가츠 집현전 139Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(766,'사오파오 체리 트래블 측각 LED','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(767,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 154키 Dice','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(768,'Keychron OEM 염료승화 PBT 영문 키캡 풀 세트 교체용 (Hacker)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(769,'장우컴퍼니 버거멍 시리즈 포인트 키캡 (동글멍)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(770,'몬스타 가츠 북극아침','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(771,'사오파오 우주인 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(772,'SPM 3색조합 PBT 이중사출 영문 키캡 147키 오션블루','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(773,'몬스타 몬스타기어 고양이 8키 포인트 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(774,'엠스톤글로벌 3KEY 포인트 키캡 (세이지그린)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(775,'키밍 KM5017-347 104 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(776,'라인업시스템 LANSTAR LS-CAP-S 키캡 (실버)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(777,'Keychron 체리 프로파일 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(778,'엠스톤글로벌 mStone 페인팅 플레이 87키 QC미달 키캡 (벌크)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(779,'몬스타 몬스타기어 마카롱 쑥인절미 PBT 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(780,'PFU HHKB 해피해킹 PD-KB400KT01 키캡 (해외구매)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(781,'스틸시리즈 TKL PBT','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(782,'몬스타 몬스타기어 달토끼 PBT 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(783,'몬스타 몬스타기어 마카롱 피치요거트 PBT 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(784,'SPM PBT 이중사출 컬러 포인트키캡 16키 오렌지','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(785,'사오파오 도트 블랙','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(786,'몬스타 몬스타기어 딸기우유 PBT 한영정각 104키 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(787,'몬스타 가츠 구름냥 그린 139Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(788,'사오파오 New 사과','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(789,'몬스타 가츠 사막여우','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(790,'Keychron K2 PBT 레트로 키캡세트 영문','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(791,'SPM 3색조합 PBT 이중사출 영문 키캡 147키 파스텔퍼플','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(792,'엠스톤글로벌 mStone 2Key ESC + ENTER 승화 키캡 (퍼플)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(793,'몬스타 가츠 꿀벌','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(794,'몬스타 가츠 퍼플나비','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(795,'타란툴라 그라데이션 측면 투과','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(796,'Keychron 더블샷 KSA 프로파일 키캡 (137Pcs)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(797,'ZECTUS OEM 프로파일 PBT 푸딩키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(798,'엠스톤글로벌 mStone 2Key ESC + ENTER 인디핑크 승화 키캡 (냥이)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(799,'가또키트 리그오브레전드 키캡 세트 21Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-21 17:08:32',NULL,NULL),(800,'SPM Soulcat 고함량 PBT 염료승화 한영 키캡 107키 Classic Sprinkle','KEYCAP',0,'2025-05-04 18:42:40','2025-05-21 17:08:32',NULL,NULL),(801,'시이닷 아바로떼스베 믹뜰란 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(802,'몬스타 가츠 매직버니 173Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(803,'몬스타 가츠 퍼플레빗 V2 139Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(804,'사오파오 MOA 포차코','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(805,'몬스타 몬스타기어 마카롱 흑임자라떼 PBT 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(806,'스틸시리즈 PrismCAPS 푸딩 PBT 키캡 영문 (정품) (블랙)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(807,'AKKO 드래곤볼 PBT 키캡 108키 (손오공)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(808,'사오파오 MOA 5면 시나모롤 쿠로미 모음 120Pcs','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(809,'SPM Soulcat 고함량 PBT 염료승화 한영 키캡 107키 BOW','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(810,'사오파오 코모도어64','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(811,'사오파오 클라우드','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(812,'Keychron 더블샷 OSA 프로파일 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(813,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 141키 고양이카페','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(814,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 141키 워킹퍼피','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(815,'SPM 3색조합 PBT 이중사출 영문 키캡 168키 포터리 블루','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(816,'엠스톤글로벌 3KEY MA 포인트 키캡 (레드)','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(817,'SPM Soulcat 고함량 PBT 염료승화 한영 키캡 107키 ROW','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(818,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 151키 9009 그리스','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(819,'컴튜 파스텔 고양이 4in1 포인트 키캡','KEYCAP',0,'2025-05-04 18:42:40','2025-05-04 18:42:40',NULL,NULL),(820,'컴튜 치즈 포인트 키캡 (R4)','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(821,'사오파오 그리너리 그라디언트','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(822,'SPM OSHID 크리스마스 투명 레진 아티산 포인트 키캡 (쿠키)','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(823,'사오파오 사이버펑크','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(824,'사오파오 어웨이큰','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(825,'아지오 캐스케이드 슬림 포인트 키캡','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(826,'사오파오 체리 컬러 포인트 키캡','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(827,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 151키 Metabolism','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(828,'SPM 3색조합 PBT 이중사출 영문 키캡 168키 몬스테라 그린','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(829,'사오파오 귀상어다크','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(830,'사오파오 게이머','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(831,'사오파오 오션트립','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(832,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 199키 쫑긋 강아지 대가족','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(833,'사오파오 GMK 문라이즈st XDA','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(834,'SPM PBT 이중사출 컬러 포인트키캡 16키 딥 레드','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(835,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 142키 쫑긋 고양이','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(836,'Workey 체리 PBT 던 포레스트 키캡','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(837,'몬스타 데빌스킬 한영 이중사출 키캡 (104키, 화이트)','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(838,'컴튜 Hazeltine 1500 포인트 키캡','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(839,'컴튜 반투명 유령 포인트 키캡 (대머리 유령)','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(840,'키캡올 뉴 발로란트 29Pcs','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(841,'SPM Soulcat 고함량 PBT 염료승화 영문 키캡 143키 쫑긋 강아지','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(842,'NuPhy AIR60 전용 키캡 시그니처','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(843,'몬스타 가츠 아델리','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(844,'사오파오 키티 고양이','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(845,'사오파오 밀크스카이','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(846,'몬스타 가츠 프라임 V2 139Pcs','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(847,'사오파오 반투명 안개','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(848,'사오파오 레트로 믹스 한/영 RGBY','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(849,'사오파오 여행 동물의숲 XDA','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(850,'Mojo68 플라스틱 키캡 140키 (해외구매)','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(851,'몬스타 몬스타기어 스완 PBT 키캡','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL),(852,'사오파오 플레이마리오 키캡','KEYCAP',0,'2025-05-04 18:42:41','2025-05-04 18:42:41',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_images`
--

DROP TABLE IF EXISTS `review_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_images` (
  `review_id` bigint NOT NULL,
  `images` varchar(255) NOT NULL,
  KEY `FK3aayo5bjciyemf3bvvt987hkr` (`review_id`),
  CONSTRAINT `FK3aayo5bjciyemf3bvvt987hkr` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_images`
--

LOCK TABLES `review_images` WRITE;
/*!40000 ALTER TABLE `review_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `score` int NOT NULL,
  `author_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `switch_options`
--

DROP TABLE IF EXISTS `switch_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `switch_options` (
  `is_valid` bit(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image_id` bigint DEFAULT NULL,
  `switch_option_id` bigint NOT NULL AUTO_INCREMENT,
  `type` bigint DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`switch_option_id`),
  UNIQUE KEY `UKlygo2mr52et0abc73vpvtd1mq` (`image_id`),
  CONSTRAINT `FKthlhl1xilt1pbh99u27o15p9c` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `switch_options`
--

LOCK TABLES `switch_options` WRITE;
/*!40000 ALTER TABLE `switch_options` DISABLE KEYS */;
INSERT INTO `switch_options` VALUES (NULL,32000,43,'2025-05-21 19:23:16.000000',NULL,1,5,'2025-05-21 19:23:25.000000','타닥 청축'),(NULL,28000,35,'2025-05-21 19:23:18.000000',NULL,2,6,'2025-05-21 19:23:26.000000','타닥 적축'),(NULL,25000,46,'2025-05-21 19:23:21.000000',NULL,3,7,'2025-05-21 19:23:27.000000','타닥 갈축'),(NULL,31000,37,'2025-05-21 19:23:23.000000',NULL,4,8,'2025-05-21 19:23:28.000000','타닥 흑축');
/*!40000 ALTER TABLE `switch_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_uuid` bigint NOT NULL AUTO_INCREMENT,
  `login_type` varchar(255) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`user_uuid`),
  UNIQUE KEY `UK6efs5vmce86ymf5q7lmvn2uuf` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zzims`
--

DROP TABLE IF EXISTS `zzims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zzims` (
  `owner_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `zzim_id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`zzim_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zzims`
--

LOCK TABLES `zzims` WRITE;
/*!40000 ALTER TABLE `zzims` DISABLE KEYS */;
/*!40000 ALTER TABLE `zzims` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22  9:55:04