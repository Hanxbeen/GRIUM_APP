-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: k4c104.p.ssafy.io    Database: test1
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `condolence`
--

DROP TABLE IF EXISTS `condolence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condolence` (
  `dead_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`dead_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condolence`
--

LOCK TABLES `condolence` WRITE;
/*!40000 ALTER TABLE `condolence` DISABLE KEYS */;
INSERT INTO `condolence` VALUES (_binary '\�\�鹈벇y�m t',_binary '&SW\�0ID�\�L0P��K'),(_binary '\�\�鹈벇y�m t',_binary ':\�5�\�\�H����Y��'),(_binary '\�\�鹈벇y�m t',_binary '�r��Gi�gB�\r�Ub'),(_binary '�9�$�D�,b:z\�BS',_binary '\�*	\�\�I��\�f�h�0');
/*!40000 ALTER TABLE `condolence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dead`
--

DROP TABLE IF EXISTS `dead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dead` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cemetery_address` varchar(255) DEFAULT NULL,
  `cemetery_lat` varchar(255) DEFAULT NULL,
  `cemetery_lng` varchar(255) DEFAULT NULL,
  `cemetery_name` varchar(255) DEFAULT NULL,
  `dead_id` binary(16) DEFAULT NULL,
  `deceased_date` varchar(255) DEFAULT NULL,
  `imprint_date` varchar(255) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT '0',
  `murmur_address` varchar(255) DEFAULT NULL,
  `murmur_lat` varchar(255) DEFAULT NULL,
  `murmur_lng` varchar(255) DEFAULT NULL,
  `murmur_name` varchar(255) DEFAULT NULL,
  `portrait_url` varchar(255) DEFAULT NULL,
  `progress_check` tinyint(1) DEFAULT '0',
  `user_id` binary(16) DEFAULT NULL,
  `view_count` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dead`
--

LOCK TABLES `dead` WRITE;
/*!40000 ALTER TABLE `dead` DISABLE KEYS */;
INSERT INTO `dead` VALUES (1,NULL,NULL,NULL,NULL,_binary '\�*	\�\�I��\�f�h�0',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(2,'인천광역시 남동구 문화로 147','37.4522872227896','126.69949849608','해오름T.S',_binary '��\�I�fD���\�\�iH\�','2021-05-12','2021-05-21',1,'인천광역시 남동구 문화로 147','37.4522872227896','126.69949849608','해오름T.S','https://grium.s3.ap-northeast-2.amazonaws.com/deadimage/8eb4cb49-fd66-449a-97a4-c4cf691b48c5/3622db69-8956-43b9-b53f-826421dc5889.jpg',0,_binary '\���\�\�DBD�6��\�v)',0),(3,'경기도 남양주시 사릉로264번길 244-120','37.6650050105138','127.209021701351','영락공원묘원',_binary '�9�$�D�,b:z\�BS','2021-05-20','2021-05-31',1,'강원도 속초시 영랑호반길 3','38.216026603425','128.587938597529','강원도속초의료원장례식장','https://grium.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20210521_013303457.jpg',0,_binary '\�*	\�\�I��\�f�h�0',0),(4,NULL,NULL,NULL,NULL,_binary ':\�5�\�\�H����Y��',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(5,NULL,NULL,NULL,NULL,_binary '�<>_�\�Ho�Z���q',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(6,NULL,NULL,NULL,NULL,_binary '\���\�\�DBD�6��\�v)',NULL,NULL,0,NULL,NULL,NULL,NULL,'https://grium.s3.ap-northeast-2.amazonaws.com/deadimage/c3f797c5-e644-4244-ab0b-36f9fbe67629/c43a15a0-a93a-4b21-9b2a-a0c3a2a8ac55.jpg',0,NULL,0),(7,NULL,NULL,NULL,NULL,_binary '&SW\�0ID�\�L0P��K',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(8,'전남 강진군 도암면 학장로 155','34.5536424','126.7409375','전남 강진군 도암면 학장로 155',_binary '\�\�鹈벇y�m t','2021-01-07','2021-01-09',0,'광주광역시 동구 남문로 697','35.1327731','126.9257887','금호장례식장','https://grium.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2021-05-21-02-25-57.jpeg',0,_binary ':\�5�\�\�H����Y��',0),(9,NULL,NULL,NULL,NULL,_binary '�r��Gi�gB�\r�Ub',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(10,NULL,NULL,NULL,NULL,_binary 'mp^��벇y�m t',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(11,NULL,NULL,NULL,NULL,_binary '`P����벇y�m t',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(12,'전라북도 전주시 덕진구 전진로 107-13','35.8453383515794','127.178922177484','천주교구공동묘지',_binary 'B��?\�B��V1��\�\'','2021-05-12','2021-05-11',0,'충청북도 청주시 청원구 공항로 177','36.6732438036808','127.48409605391','성모병원장례식장','https://grium.s3.ap-northeast-2.amazonaws.com/deadimage/428b883f-de05-4216-9593-563195f6d027/862465af-de93-4461-8837-bbe8dd6234b5.jpg',0,_binary '�9�$�D�,b:z\�BS',0),(13,NULL,NULL,NULL,NULL,_binary '�Z[\�J��m% \�L\�',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0),(14,'광주광역시 북구 장등길112번길 100-41','35.2251557749041','126.921261225259','영락공원제2시립묘지',_binary '�s{M��	\�~','2021-05-24','2021-05-21',0,'광주광역시 광산구 수완로 6','35.1855507405914','126.829533341168','수완장례식장','https://grium.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2021-05-21-12-07-31.jpeg',1,_binary '�<>_�\�Ho�Z���q',0);
/*!40000 ALTER TABLE `dead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_comment`
--

DROP TABLE IF EXISTS `guest_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_comment` (
  `guest_comment_id` bigint NOT NULL AUTO_INCREMENT,
  `contents` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dead_id` binary(16) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `report` int DEFAULT '0',
  `user_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`guest_comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_comment`
--

LOCK TABLES `guest_comment` WRITE;
/*!40000 ALTER TABLE `guest_comment` DISABLE KEYS */;
INSERT INTO `guest_comment` VALUES (1,'할머니 사랑해요 ?','2021-05-20 17:26:46',_binary '\�\�鹈벇y�m t',0,0,_binary '&SW\�0ID�\�L0P��K'),(2,'할머니와 함께한 모든 순간이 행복했어요','2021-05-20 17:34:27',_binary '\�\�鹈벇y�m t',0,0,_binary '&SW\�0ID�\�L0P��K'),(3,'할머니 보고싶어요. 사랑해요','2021-05-20 18:16:56',_binary '\�\�鹈벇y�m t',0,0,_binary '�r��Gi�gB�\r�Ub'),(4,'어머니 많이 그립습니다.','2021-05-21 01:35:33',_binary '\�\�鹈벇y�m t',0,0,_binary '�Z[\�J��m% \�L\�');
/*!40000 ALTER TABLE `guest_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_comment_like`
--

DROP TABLE IF EXISTS `guest_comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_comment_like` (
  `guest_comment_id` bigint NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`guest_comment_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_comment_like`
--

LOCK TABLES `guest_comment_like` WRITE;
/*!40000 ALTER TABLE `guest_comment_like` DISABLE KEYS */;
INSERT INTO `guest_comment_like` VALUES (1,_binary '&SW\�0ID�\�L0P��K'),(1,_binary '�r��Gi�gB�\r�Ub'),(2,_binary '�Z[\�J��m% \�L\�'),(2,_binary '�r��Gi�gB�\r�Ub'),(3,_binary '�r��Gi�gB�\r�Ub'),(4,_binary ':\�5�\�\�H����Y��'),(4,_binary '�Z[\�J��m% \�L\�');
/*!40000 ALTER TABLE `guest_comment_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_comment_report`
--

DROP TABLE IF EXISTS `guest_comment_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_comment_report` (
  `guest_comment_id` bigint NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`guest_comment_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_comment_report`
--

LOCK TABLES `guest_comment_report` WRITE;
/*!40000 ALTER TABLE `guest_comment_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `guest_comment_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_image`
--

DROP TABLE IF EXISTS `guest_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_image` (
  `guest_image_id` bigint NOT NULL AUTO_INCREMENT,
  `contents` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dead_id` binary(16) DEFAULT NULL,
  `image_url` text,
  `is_deleted` tinyint(1) DEFAULT '0',
  `report` int NOT NULL,
  `user_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`guest_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_image`
--

LOCK TABLES `guest_image` WRITE;
/*!40000 ALTER TABLE `guest_image` DISABLE KEYS */;
INSERT INTO `guest_image` VALUES (1,'어릴 때 부터 할머니를 정말 좋아했는데 , 이유를 알 것 같은 사진 ㅎㅎ','2021-05-20 17:21:00',_binary '\�\�鹈벇y�m t','https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/7eb27100-a9a4-4262-af4e-9c02b9e5a050.png',0,0,_binary '&SW\�0ID�\�L0P��K'),(2,'할머니가 주신 사랑 절대 잊지 못할거에요.  사랑해요?','2021-05-20 17:25:32',_binary '\�\�鹈벇y�m t','https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/f88ca796-9556-462f-9039-48353d40f371.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/65e108d3-55ee-494d-8379-8d72dc8f9530.jpg',0,0,_binary '&SW\�0ID�\�L0P��K'),(3,'할머니를 보내드린 날','2021-05-20 17:29:47',_binary '\�\�鹈벇y�m t','https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/fe31632c-e3b0-4582-95e4-a791a582e9a0.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/c5ba47ad-e965-4dc0-85a5-eda86221b6ac.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/31804476-eb97-44a4-a5b7-48a533e9a536.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/6edb75f3-fc8a-456f-9db2-681e412d22af.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/4503c915-06c1-48af-9987-b2c7fff83321.jpg',0,0,_binary '&SW\�0ID�\�L0P��K'),(4,'성빈이 졸업한 날에,, 아버지와 할머니와 성빈이','2021-05-20 17:30:41',_binary '\�\�鹈벇y�m t','https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/ed3db1ed-0dd7-4e4f-8156-d9282c953dfd.jpg',0,0,_binary '&SW\�0ID�\�L0P��K'),(5,'할머니와 함께하신 부모님','2021-05-20 17:31:32',_binary '\�\�鹈벇y�m t','https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/c27577cd-d3f8-4df7-b89c-d8c93dbdbc3d.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/bf2beda7-781a-42b8-aa04-29c85c1c8555.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/a61fc4bd-c856-43cc-8d98-96661344d17a.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/dee96d16-f9e3-4e8a-92e1-1ba5402435af.jpg',0,0,_binary '&SW\�0ID�\�L0P��K'),(6,'아름다우신 할머니 사진?','2021-05-20 17:32:29',_binary '\�\�鹈벇y�m t','https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/32dec589-c1a7-4ea7-a1d1-4980095a1838.jpg,https://grium.s3.ap-northeast-2.amazonaws.com/guestimage/2653571e-cc30-4944-86db-4c305097ac4b/be579f0f-ea48-400b-a705-35ea29f71e01.jpg',0,0,_binary '&SW\�0ID�\�L0P��K');
/*!40000 ALTER TABLE `guest_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_image_like`
--

DROP TABLE IF EXISTS `guest_image_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_image_like` (
  `guest_image_id` bigint NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`guest_image_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_image_like`
--

LOCK TABLES `guest_image_like` WRITE;
/*!40000 ALTER TABLE `guest_image_like` DISABLE KEYS */;
INSERT INTO `guest_image_like` VALUES (1,_binary ':\�5�\�\�H����Y��'),(1,_binary '�r��Gi�gB�\r�Ub'),(2,_binary '�r��Gi�gB�\r�Ub'),(3,_binary ':\�5�\�\�H����Y��'),(5,_binary '�r��Gi�gB�\r�Ub');
/*!40000 ALTER TABLE `guest_image_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_image_report`
--

DROP TABLE IF EXISTS `guest_image_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_image_report` (
  `guest_image_id` bigint NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`guest_image_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_image_report`
--

LOCK TABLES `guest_image_report` WRITE;
/*!40000 ALTER TABLE `guest_image_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `guest_image_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propose_relation`
--

DROP TABLE IF EXISTS `propose_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propose_relation` (
  `receiver_uid` binary(16) NOT NULL,
  `sender_uid` binary(16) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `receiver_to_sender` varchar(255) DEFAULT NULL,
  `sender_to_receiver` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`receiver_uid`,`sender_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propose_relation`
--

LOCK TABLES `propose_relation` WRITE;
/*!40000 ALTER TABLE `propose_relation` DISABLE KEYS */;
INSERT INTO `propose_relation` VALUES (_binary '\�*	\�\�I��\�f�h�0',_binary '�<>_�\�Ho�Z���q',NULL,'형제','형제'),(_binary '&SW\�0ID�\�L0P��K',_binary '�Z[\�J��m% \�L\�',NULL,'아버지','아들'),(_binary '&SW\�0ID�\�L0P��K',_binary '�r��Gi�gB�\r�Ub',NULL,'형제','형제'),(_binary ':\�5�\�\�H����Y��',_binary '�s{M��	\�~',NULL,'친구','친구'),(_binary '�9�$�D�,b:z\�BS',_binary '��\�I�fD���\�\�iH\�',NULL,'형제','형제');
/*!40000 ALTER TABLE `propose_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relation`
--

DROP TABLE IF EXISTS `relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relation` (
  `relation_id` bigint NOT NULL AUTO_INCREMENT,
  `is_deleted` bit(1) NOT NULL,
  `relation_name` varchar(255) DEFAULT NULL,
  `concern_uid` binary(16) DEFAULT NULL,
  `self_uid` binary(16) DEFAULT NULL,
  PRIMARY KEY (`relation_id`),
  KEY `FKo1o3xy4oa69o23137lc1gts3p` (`concern_uid`),
  KEY `FKl873m0itebbx2uu3tfw71qfvd` (`self_uid`),
  CONSTRAINT `FKl873m0itebbx2uu3tfw71qfvd` FOREIGN KEY (`self_uid`) REFERENCES `user` (`uid`),
  CONSTRAINT `FKo1o3xy4oa69o23137lc1gts3p` FOREIGN KEY (`concern_uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relation`
--

LOCK TABLES `relation` WRITE;
/*!40000 ALTER TABLE `relation` DISABLE KEYS */;
INSERT INTO `relation` VALUES (1,_binary '\0','아들',_binary '��\�I�fD���\�\�iH\�',_binary '\�*	\�\�I��\�f�h�0'),(2,_binary '\0','아버지',_binary '\�*	\�\�I��\�f�h�0',_binary '��\�I�fD���\�\�iH\�'),(3,_binary '\0','아들',_binary '\�*	\�\�I��\�f�h�0',_binary '�9�$�D�,b:z\�BS'),(4,_binary '\0','아버지',_binary '�9�$�D�,b:z\�BS',_binary '\�*	\�\�I��\�f�h�0'),(7,_binary '\0','아들',_binary '��\�I�fD���\�\�iH\�',_binary '\���\�\�DBD�6��\�v)'),(8,_binary '\0','어머니',_binary '\���\�\�DBD�6��\�v)',_binary '��\�I�fD���\�\�iH\�'),(9,_binary '\0','어머니',_binary '\�\�鹈벇y�m t',_binary ':\�5�\�\�H����Y��'),(10,_binary '\0','며느리',_binary ':\�5�\�\�H����Y��',_binary '\�\�鹈벇y�m t'),(11,_binary '\0','손자',_binary '&SW\�0ID�\�L0P��K',_binary '\�\�鹈벇y�m t'),(12,_binary '\0','할머니',_binary '\�\�鹈벇y�m t',_binary '&SW\�0ID�\�L0P��K'),(13,_binary '\0','어머니',_binary ':\�5�\�\�H����Y��',_binary '&SW\�0ID�\�L0P��K'),(14,_binary '\0','아들',_binary '&SW\�0ID�\�L0P��K',_binary ':\�5�\�\�H����Y��'),(15,_binary '\0','딸',_binary '�r��Gi�gB�\r�Ub',_binary ':\�5�\�\�H����Y��'),(16,_binary '\0','어머니',_binary ':\�5�\�\�H����Y��',_binary '�r��Gi�gB�\r�Ub'),(17,_binary '\0','손자',_binary 'mp^��벇y�m t',_binary '\�\�鹈벇y�m t'),(18,_binary '\0','할머니',_binary '\�\�鹈벇y�m t',_binary 'mp^��벇y�m t'),(19,_binary '\0','어머니',_binary '\�\�鹈벇y�m t',_binary '`P����벇y�m t'),(20,_binary '\0','아들',_binary '`P����벇y�m t',_binary '\�\�鹈벇y�m t'),(21,_binary '\0','손녀',_binary '�r��Gi�gB�\r�Ub',_binary '\�\�鹈벇y�m t'),(22,_binary '\0','할머니',_binary '\�\�鹈벇y�m t',_binary '�r��Gi�gB�\r�Ub'),(25,_binary '\0','어머니',_binary '\�\�鹈벇y�m t',_binary '�Z[\�J��m% \�L\�'),(26,_binary '\0','아들',_binary '�Z[\�J��m% \�L\�',_binary '\�\�鹈벇y�m t'),(29,_binary '\0','기타',_binary '�<>_�\�Ho�Z���q',_binary '�s{M��	\�~'),(30,_binary '\0','기타',_binary '�s{M��	\�~',_binary '�<>_�\�Ho�Z���q');
/*!40000 ALTER TABLE `relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_history`
--

DROP TABLE IF EXISTS `transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_history` (
  `tid` varchar(255) NOT NULL,
  `amount_total` bigint DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `dead_id` binary(16) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT NULL,
  `partner_order_id` varchar(255) DEFAULT NULL,
  `partner_user_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES ('T2898599323123897549',15,'2021-05-21 12:25:56','2021-05-21 12:25:47',_binary '��\�I�fD���\�\�iH\�',_binary '\0','한재희',_binary '\���\�\�DBD�6��\�v)'),('T2898599795570217581',888888,'2021-05-21 12:27:45','2021-05-21 12:27:37',_binary '��\�I�fD���\�\�iH\�',_binary '\0','한재희',_binary '\���\�\�DBD�6��\�v)'),('T2898599950189122767',2558,'2021-05-21 12:28:22','2021-05-21 12:28:12',_binary '��\�I�fD���\�\�iH\�',_binary '\0','한재희',_binary '\���\�\�DBD�6��\�v)'),('T2898601071175504499',1000,'2021-05-21 12:32:43','2021-05-21 12:32:34',_binary '��\�I�fD���\�\�iH\�',_binary '\0','한재희',_binary '\���\�\�DBD�6��\�v)'),('T2898606525783970423',5000,'2021-05-21 12:53:52','2021-05-21 12:53:44',_binary '��\�I�fD���\�\�iH\�',_binary '\0','한재희',_binary '�<>_�\�Ho�Z���q'),('T2898660642371900027',1000,'2021-05-21 16:23:53','2021-05-21 16:23:44',_binary '��\�I�fD���\�\�iH\�',_binary '\0','풀잎',_binary '\���\�\�DBD�6��\�v)'),('T2898660719681311357',100000,'2021-05-21 16:24:09','2021-05-21 16:24:01',_binary '��\�I�fD���\�\�iH\�',_binary '\0','풀잎',_binary '\���\�\�DBD�6��\�v)'),('T2898660784105903313',50000,'2021-05-21 16:24:25','2021-05-21 16:24:16',_binary '��\�I�fD���\�\�iH\�',_binary '\0','풀잎',_binary '\���\�\�DBD�6��\�v)'),('T2898660865710199423',300000,'2021-05-21 16:24:44','2021-05-21 16:24:36',_binary '��\�I�fD���\�\�iH\�',_binary '\0','풀잎',_binary '\���\�\�DBD�6��\�v)'),('T2898715102557214601',100000,'2021-05-21 19:55:10','2021-05-21 19:55:03',_binary '��\�I�fD���\�\�iH\�',_binary '\0','한재희',_binary '�<>_�\�Ho�Z���q'),('T2898715175571741091',100000,'2021-05-21 19:55:31','2021-05-21 19:55:21',_binary '\�\�鹈벇y�m t',_binary '\0','조영승',_binary ':\�5�\�\�H����Y��'),('T2898726359666579963',100000,'2021-05-21 20:38:51','2021-05-21 20:38:45',_binary '�s{M��	\�~',_binary '\0','김민중',_binary '�<>_�\�Ho�Z���q');
/*!40000 ALTER TABLE `transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unauthenticated_relation`
--

DROP TABLE IF EXISTS `unauthenticated_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unauthenticated_relation` (
  `unauth_relation_id` bigint NOT NULL AUTO_INCREMENT,
  `dead_id` binary(16) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `relation_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`unauth_relation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unauthenticated_relation`
--

LOCK TABLES `unauthenticated_relation` WRITE;
/*!40000 ALTER TABLE `unauthenticated_relation` DISABLE KEYS */;
INSERT INTO `unauthenticated_relation` VALUES (1,_binary '�\�6?\r\�M��!]d\��X','김동생','동생');
/*!40000 ALTER TABLE `unauthenticated_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` binary(16) NOT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `alarm_setting` varchar(255) DEFAULT NULL,
  `background_music` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `comment_for_condolence` varchar(255) DEFAULT NULL,
  `comment_for_resident` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `jwt` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider` int DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `role_type` varchar(255) DEFAULT NULL,
  `testament` varchar(255) DEFAULT NULL,
  `birthyear` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (_binary '�s{M��	\�~','UEgHVpc9uXNwVQZsuO2trMFAXV0sizv8J1eJXwopyV8AAAF5jL7kRg',NULL,NULL,'0426','잘 살다 갑니다..',NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwODhjNzMwYy0xYjdiLTRkZjktYTkwOS0xY2VkYTgwNDdlMTYiLCJpYXQiOjE2MjE1NjM5OTEsImV4cCI6MTYyMTU2NzU5MX0.lb4jErykJxvKmfEyzDIsWqfZrKq3W6hkVeux0o6f9TiBE1Dptwi10ykJhhGcFsWpYgp2eRUrMzilcL-0oLoDIg','조준영',NULL,0,'1698871730','USER',NULL,'1995'),(_binary '\�*	\�\�I��\�f�h�0','4Srb-TZQu5clo5EWW51V40egDpELLkfAKt9-zQo9cusAAAF5jLOqCQ',NULL,NULL,NULL,NULL,NULL,NULL,'http://k.kakaocdn.net/dn/CjeEs/btqWT8B05P1/wmiEbbiCtk2FJMi8Gej9z0/img_640x640.jpg','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwZWU2MmEwOS1lMmQ3LTQ5MTktYmVmOC1kMzY2OGU2ODljMzAiLCJpYXQiOjE2MjE1NjMyNTUsImV4cCI6MTYyMTU2Njg1NX0.QPvQGcXDTPnxrW03GwNaB92PrDvLBAPAEDy2kwPMqcwEkTrE0nviq_1jDi7xKIEw3_nckGSg-e6LCZarxWjDcA','한재희',NULL,0,'1697572858','USER',NULL,NULL),(_binary '&SW\�0ID�\�L0P��K','dtIbxzdx_UmFjhzLpQjz61jpWlETnx5QUj8SfAo9c04AAAF5jNBL2A',NULL,NULL,NULL,NULL,NULL,NULL,'http://k.kakaocdn.net/dn/bEmYRQ/btqTDIMUfI8/FtMaxd9eQGMSqeErTzAhKk/img_640x640.jpg','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNjUzNTcxZS1jYzMwLTQ5NDQtODZkYi00YzMwNTA5N2FjNGIiLCJpYXQiOjE2MjE1NjUxMzIsImV4cCI6MTYyMTU2ODczMn0.tCw7VjQGu9RQfdQPN8AUPqfxUUdbgmgoCn342ZBqjcjMYXoxkmP4-PoxC9E6BH6HiNBQIAVN593fWcwR_7xPbw','조한빈',NULL,0,'1730001475','USER',NULL,NULL),(_binary ':\�5�\�\�H����Y��','JeCR4SCuL7GUvJYygI-WVfQNDji6eEIEEmM19Qo9dJkAAAF5jNHN1Q',NULL,NULL,NULL,NULL,NULL,NULL,'http://k.kakaocdn.net/dn/bu5MEL/btq2yvFpsLj/tQod136RWW80NKtgBghPJ0/img_640x640.jpg','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzYWUwMzVmMS1lNmQ1LTQ4YWYtOWM5Ny05MzU5MTU5NGE1MTAiLCJpYXQiOjE2MjE1NjUyMzEsImV4cCI6MTYyMTU2ODgzMX0.mC-fkViMWV6brbQL5MMP-7DpBSBH_BBfti0z2604VtB1dyTzbBVeDouiFfI75Esbsq0VK5a3TyNN4ymidTGxgg','이순우',NULL,0,'1738738342','USER',NULL,NULL),(_binary 'B��?\�B��V1��\�\'','4HXTAcR3af_ew_PwbAiPtrjpvlN-BLSiZnzTbAo9dNkAAAF5i2VZxA',NULL,NULL,'0515','설마',NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0MjhiODgzZi1kZTA1LTQyMTYtOTU5My01NjMxOTVmNmQwMjciLCJpYXQiOjE2MjE1NDEzNDYsImV4cCI6MTYyMTU0NDk0Nn0.yIyIptmA4b5d4sGAQCdYgrV6s-Cow3qCDPJz0s2xaCJ5FGCntMUh_U_AXgh3HkMNmBfd6L2rAkktZjRY9YonQQ','dd',NULL,0,'1739647858','USER',NULL,'1997'),(_binary '`P����벇y�m t',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'조영승',NULL,NULL,NULL,NULL,NULL,NULL),(_binary 'mp^��벇y�m t',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'조성빈',NULL,NULL,NULL,NULL,NULL,NULL),(_binary 'y\�Y幔벇y�m t',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'김경관',NULL,NULL,NULL,NULL,NULL,NULL),(_binary '�Z[\�J��m% \�L\�','mfolP8OcFsTwzQJHTdQQSnGrkWjb4KkSZFuTZgorDKcAAAF5jIabbA',NULL,NULL,NULL,NULL,NULL,NULL,'http://k.kakaocdn.net/dn/cqHjEn/btqGSrQ7X4v/dkPHQHzY5VNa9bXqhKXvr1/img_640x640.jpg','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4YTE4NWEwYi01YmUyLTRhMDgtOWI5My02ZDI1MjBkMTRjYzMiLCJpYXQiOjE2MjE1NjAzMDIsImV4cCI6MTYyMTU2MzkwMn0.FwuuppCGEYLpBRHNj8eGSbJGSCHres_DW8IepBZVFb1k68QCilWaOsbdGyxTMDTCIfkxRq823yKZVG2hkEpxIA','조영승',NULL,0,'1739912743','USER',NULL,NULL),(_binary '��\�I�fD���\�\�iH\�','IFsNX7VZLDil2BjC4VV6qQnpq49fOoONzWYaWwo9cxgAAAF5jHmxHg',NULL,NULL,NULL,NULL,NULL,NULL,'http://k.kakaocdn.net/dn/dcIkhr/btqM9U0LBN4/RShiqHD84exqAHebIk8Kt0/img_640x640.jpg','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ZWI0Y2I0OS1mZDY2LTQ0OWEtOTdhNC1jNGNmNjkxYjQ4YzUiLCJpYXQiOjE2MjE1NTk0NTYsImV4cCI6MTYyMTU2MzA1Nn0.Kds96PyVHQULRwRCpRuvVfUZwngnWWSt7_Ou7tf4coLosW_RfFsd9WfU5QTKHVRPJR_kOG7cQPUpxD8rmO-y3w','배 용렬',NULL,0,'1698875294','USER',NULL,NULL),(_binary '�<>_�\�Ho�Z���q','b9EM1eh9z5sBD5QvhWis4WNF7aII_VaobzXQ3go9dNsAAAF5jKGDRQ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMzNjM2U1Zi04OGM1LTQ4NmYtODg1YS03Zjg2ZjcxYmJjNzEiLCJpYXQiOjE2MjE1NjIwNjYsImV4cCI6MTYyMTU2NTY2Nn0.Z46YNvN5mKYvw3OT8TBz23cLiaCC8GgcgybHsAvNmZQSOf0Mt-FfM1SaGJfc73wo8FJBXHhsGP6fENxCGAyNBw','김민중',NULL,0,'1698873642','USER',NULL,NULL),(_binary '�r��Gi�gB�\r�Ub','PcBh9WZrOaeBw6fEVmAYYVEQX0dJnIPM9zBgFwopcSEAAAF5itwnDQ',NULL,NULL,NULL,NULL,NULL,NULL,'http://k.kakaocdn.net/dn/crxOQD/btq5g4SLcaZ/sX17QSDx7jcTtYo6JQIMCk/img_640x640.jpg','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZDEzNzJiZC0wNGJjLTQ3NjktOTA2Ny00MmFmMGQ4NTU1NjIiLCJpYXQiOjE2MjE1MzIzNTQsImV4cCI6MTYyMTUzNTk1NH0.B9oC9nyq7cCBZ3l23gRyfFO1SX5BShbmekxt2eRgkYKzdN22WaaLIrAbOYtiQY4p0jCEggqzti_5q26wzIBJBg','조은아',NULL,0,'1739734617','USER',NULL,NULL),(_binary '\���\�\�DBD�6��\�v)','qJeReAF4jhtSNOjCdZgqJ2E954SqUoRMoBIDNQopb1UAAAF5i-OcWQ',NULL,NULL,'0909','Dd',NULL,NULL,'http://k.kakaocdn.net/dn/hAKDd/btqTcQ4PCzD/MkSRTYVNnFQkXM8ZBJFki1/img_640x640.jpg','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjM2Y3OTdjNS1lNjQ0LTQyNDQtYWIwYi0zNmY5ZmJlNjc2MjkiLCJpYXQiOjE2MjE1NDk2MjAsImV4cCI6MTYyMTU1MzIyMH0.YLFOqwLOmMr9Yp2yKO_-mZbO_gnBFhnoRt2ElPEv_i395rXFIGXfx1vKvr9_s7xryHjQoZ_maBEuSlOSk62Onw','풀잎',NULL,0,'1725773309','USER',NULL,'1999'),(_binary '\�\�鹈벇y�m t',NULL,NULL,NULL,'1008','두려워하지 말라\n내가 너와 함께 함이라\n놀라지 말라 나는 네 하나님이 됨이라\n내가 너를 굳세게 하리라\n참으로 너를 도와 주리라\n참으로 나의 의로운 오른손으로 너를 붙들리라',NULL,NULL,NULL,NULL,'민옥만',NULL,NULL,NULL,NULL,'두려워하지 말라\\n내가 너와 함께 함이라\\n놀라지 말라 나는 네 하나님이 됨이라\\n내가 너를 굳세게 하리라\\n참으로 너를 도와 주리라\\n참으로 나의 의로운 오른손으로 너를 붙들리라\\n','1938'),(_binary '�9�$�D�,b:z\�BS','gRC22cMinEfbKLb2-GMCqJc_Tm0m0eWn-fTL9wopyWAAAAF5in7X7Q',NULL,NULL,'1227','괜찮아 안죽어',NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZDM5OGIxNC0yNDlhLTQ0MDctYWYyYy02MjNhN2FkYzQyNTMiLCJpYXQiOjE2MjE1MjYyMzksImV4cCI6MTYyMTUyOTgzOX0.QXYOYeUZ-RxDx8Qla6olpNvMAFdCW_76mN_BTAG-3iEiUqwko29_mwDN9h77i6-HlQ2wCPFB8MvGyxRcg4KdTw','이종희',NULL,0,'1698874020','USER',NULL,'1993');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_image`
--

DROP TABLE IF EXISTS `user_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_image` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `contents` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `image_url` text,
  `is_deleted` bit(1) NOT NULL,
  `uid` binary(16) DEFAULT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_image`
--

LOCK TABLES `user_image` WRITE;
/*!40000 ALTER TABLE `user_image` DISABLE KEYS */;
INSERT INTO `user_image` VALUES (1,'','2021-05-21 01:43:22','https://grium.s3.ap-northeast-2.amazonaws.com/userimage/fd398b14-249a-4407-af2c-623a7adc4253/f458b56e-8c7d-4d04-a683-d9db1ff1a7f5.jpg',_binary '\0',_binary '�9�$�D�,b:z\�BS'),(2,'가족사진','2021-05-21 02:02:23','https://grium.s3.ap-northeast-2.amazonaws.com/userimage/dd17c7e9-b988-11eb-b287-0279946d2074/9b1a83d2-d937-464d-9b19-a2f9e91128d2.jpg',_binary '\0',_binary '\�\�鹈벇y�m t'),(3,'가족들과 함께 보낸 행복한 시간','2021-05-21 02:06:59','https://grium.s3.ap-northeast-2.amazonaws.com/userimage/dd17c7e9-b988-11eb-b287-0279946d2074/4970692f-ed44-4c88-9b0b-1afd06f51bf7.jpg',_binary '\0',_binary '\�\�鹈벇y�m t'),(4,' ','2021-05-21 02:12:36','https://grium.s3.ap-northeast-2.amazonaws.com/userimage/dd17c7e9-b988-11eb-b287-0279946d2074/5d8a278c-81e8-4364-93ff-9a4fdfb69b8f.jpg',_binary '\0',_binary '\�\�鹈벇y�m t'),(5,' ','2021-05-21 02:13:01','https://grium.s3.ap-northeast-2.amazonaws.com/userimage/dd17c7e9-b988-11eb-b287-0279946d2074/1b051cd1-5512-4a4c-8e94-977391802fd9.jpg',_binary '\0',_binary '\�\�鹈벇y�m t');
/*!40000 ALTER TABLE `user_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-21 12:12:04
