-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.4.3 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage des données de la table nlf.aut_centres_conservation_fonciere : ~1 rows (environ)
INSERT INTO `aut_centres_conservation_fonciere` (`id`, `nom`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `regionId`) VALUES
	(1, 'Centre du Grand Lomé', NULL, '2025-06-11 01:23:05', '2025-06-11 01:23:06', NULL, 7);

-- Listage des données de la table nlf.aut_profils : ~6 rows (environ)
INSERT INTO `aut_profils` (`id`, `titre`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Administrateur', NULL, '2025-03-27 22:38:42', '2025-03-27 22:38:44', NULL),
	(2, 'Indexeur', NULL, '2025-03-27 22:38:45', '2025-03-27 22:38:46', NULL),
	(3, 'Contrôleur', NULL, '2025-03-27 22:38:47', '2025-03-27 22:38:48', NULL),
	(4, 'Profil 4', NULL, '2025-03-27 22:38:47', '2025-03-27 22:38:48', NULL),
	(5, 'Indexeur & Contrôleur', NULL, '2025-03-27 22:38:47', '2025-03-27 22:38:48', NULL),
	(6, 'Profil 6', NULL, '2025-03-27 22:38:49', '2025-03-27 22:38:50', NULL);

-- Listage des données de la table nlf.aut_roles : ~6 rows (environ)
INSERT INTO `aut_roles` (`id`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	('INDEXATION_ADMINISTRATEUER', 'Administration du module Indexation', '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('INDEXATION_ATTRIBUTEUR_LOTS', 'Attribution de lots aux indexeurs et contrôleurs qualité', '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('INDEXATION_CONTROLEUR', 'Profil de contrôle qualité', '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('INDEXATION_GESTIONNAIRE_DONNEES', 'Gestion des données saisies et contrôlées', '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('INDEXATION_INDEXEUR', 'Profil d\'indexation de documents', '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('INDEXATION_INJECTEUR', 'Injection de documents', '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL);

-- Listage des données de la table nlf.aut_roles_profil : ~11 rows (environ)
INSERT INTO `aut_roles_profil` (`profilId`, `roleId`, `actif`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'INDEXATION_ADMINISTRATEUER', 1, '2025-02-10 18:37:34', '2025-02-10 18:37:34', NULL),
	(1, 'INDEXATION_ATTRIBUTEUR_LOTS', 1, '2025-02-10 18:37:34', '2025-02-10 18:37:34', NULL),
	(1, 'INDEXATION_CONTROLEUR', 1, '2025-02-10 18:37:34', '2025-02-10 18:37:34', NULL),
	(1, 'INDEXATION_GESTIONNAIRE_DONNEES', 1, '2025-02-10 18:37:34', '2025-02-10 18:37:34', NULL),
	(1, 'INDEXATION_INDEXEUR', 0, '2025-02-10 18:37:34', '2025-02-10 18:37:34', NULL),
	(1, 'INDEXATION_INJECTEUR', 1, '2025-02-10 18:37:34', '2025-02-10 18:37:34', NULL),
	(2, 'INDEXATION_INDEXEUR', 1, '2025-02-10 18:37:34', '2025-02-10 18:37:34', NULL),
	(3, 'INDEXATION_CONTROLEUR', 1, '2025-02-10 18:37:59', '2025-02-10 18:37:59', NULL),
	(4, 'INDEXATION_INDEXEUR', 1, '2025-02-10 19:27:27', '2025-02-10 19:27:27', NULL),
	(5, 'INDEXATION_CONTROLEUR', 1, '2025-02-12 06:21:07', '2025-02-12 06:21:07', NULL),
	(5, 'INDEXATION_INDEXEUR', 1, '2025-02-11 17:48:53', '2025-02-11 17:48:53', NULL);

-- Listage des données de la table nlf.aut_utilisateurs : ~6 rows (environ)
INSERT INTO `aut_utilisateurs` (`id`, `matricule`, `nom`, `prenoms`, `identifiant`, `email`, `motDePasse`, `contact`, `photoDeProfil`, `actif`, `dateVerificationEmail`, `createdAt`, `updatedAt`, `deletedAt`, `profilId`, `centreConservationFonciereId`) VALUES
	(1, '0019532', 'ADMIN', 'Armand', 'admin', 'armandkadev@gmail.com', '$2b$10$N.6cGIbi//07nf9waUVgP.hSpcq75hMHBeLWSSjRIFVOCrlmBVCZW', '96 20 62 50', NULL, 1, NULL, '2025-01-11 15:33:32', '2025-06-23 13:47:39', NULL, 1, 1),
	(2, '1234568', 'KAYI', 'Kodjo Armand', 'armand', 'armand@gmail.com', '$2b$10$RRfVS81gzeUCQDNXReR8X.ud/huKiqN9UXDPI0NuU9hJwPlLrGwne', '96 20 62 50', NULL, 1, NULL, '2025-02-10 18:37:34', '2025-06-23 18:58:03', NULL, 5, NULL),
	(3, NULL, 'KAYI 2', 'K. Armand', 'armand2', 'armand2@gmail.com', '$2b$10$J12gXu.IwMfse6KMP7FZMuWP.uLx902cM/cFKu5DuQY58qw9Dsedy', '96 20 62 50', NULL, 0, NULL, '2025-02-10 18:37:59', '2025-03-19 22:09:17', NULL, 2, NULL),
	(4, NULL, 'TESTT', 'Testt', 'testt', 'testt@mail.com', '$2b$10$rQRXI0XYLwuYzsWalpGtfuWHd6ZZ8PHKID8S0ybvrDgLHpV1hPmKK', '78898796', NULL, 1, NULL, '2025-02-10 19:27:27', '2025-02-10 19:33:51', NULL, 2, NULL),
	(5, NULL, 'INDEXEUR', 'indexeur', 'indexeur', 'john.doe@gmail.com', '$2b$10$6h1S6DI22FrQRSlEIjBlzexGTeKpBquN0C7Hho9Jp7KCXZJvDUN3a', '87953.', NULL, 1, NULL, '2025-02-11 17:48:53', '2025-02-12 06:08:01', NULL, 2, NULL),
	(6, NULL, 'CONTROLEUR', 'Controleur', 'controleur', 'controleur@gmail.com', '$2b$10$oVBtwm7jDSVznKjbo7Kxzuiy.dZp9wZWzkuGr/dYf2TduGLmwrHDe', '96 20 62 50', NULL, 1, NULL, '2025-02-12 06:21:07', '2025-02-12 06:21:07', NULL, 3, NULL);

-- Listage des données de la table nlf.com_cantons : ~4 rows (environ)
INSERT INTO `com_cantons` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `communeId`) VALUES
	(1, 'AGOE-NYIVE', NULL, '2025-03-27 22:38:42', '2025-03-27 22:38:44', NULL, 1),
	(2, 'LEGBASSITO', NULL, '2025-03-27 22:38:45', '2025-03-27 22:38:46', NULL, 1),
	(3, 'VAKPOSSITO', NULL, '2025-03-27 22:38:47', '2025-03-27 22:38:48', NULL, 1),
	(4, 'TOGBLEKOPE', NULL, '2025-03-27 22:38:49', '2025-03-27 22:38:50', NULL, 1);

-- Listage des données de la table nlf.com_civilites : ~3 rows (environ)
INSERT INTO `com_civilites` (`id`, `libelle`, `abbreviation`, `sexe`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Monsieur', 'M.', 'masculin', NULL, '2025-03-01 12:57:27', '2025-03-01 12:57:27', NULL),
	(2, 'Mademoiselle', 'Mlle', 'feminin', NULL, '2025-03-01 12:57:27', '2025-03-01 12:57:27', NULL),
	(3, 'Madame', 'Mme', 'feminin', NULL, '2025-03-01 12:57:27', '2025-03-01 12:57:27', NULL);

-- Listage des données de la table nlf.com_communes : ~13 rows (environ)
INSERT INTO `com_communes` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `prefectureId`) VALUES
	(1, 'AGOE-NYIVE 1', NULL, '2025-03-27 22:39:05', '2025-03-27 22:39:17', NULL, 1),
	(2, 'AGOE-NYIVE 2', NULL, '2025-03-27 22:39:06', '2025-03-27 22:39:18', NULL, 1),
	(3, 'AGOE-NYIVE 3', NULL, '2025-03-27 22:39:07', '2025-03-27 22:39:19', NULL, 1),
	(4, 'AGOE-NYIVE 4', NULL, '2025-03-27 22:39:08', '2025-03-27 22:39:20', NULL, 1),
	(5, 'AGOE-NYIVE 5', NULL, '2025-03-27 22:39:09', '2025-03-27 22:39:20', NULL, 1),
	(6, 'AGOE-NYIVE 6', NULL, '2025-03-27 22:39:09', '2025-03-27 22:39:21', NULL, 1),
	(7, 'GOLFE 1', NULL, '2025-03-27 22:39:11', '2025-03-27 22:39:22', NULL, 2),
	(8, 'GOLFE 2', NULL, '2025-03-27 22:39:11', '2025-03-27 22:39:23', NULL, 2),
	(9, 'GOLFE 3', NULL, '2025-03-27 22:39:12', '2025-03-27 22:39:24', NULL, 2),
	(10, 'GOLFE 4', NULL, '2025-03-27 22:39:13', '2025-03-27 22:39:24', NULL, 2),
	(11, 'GOLFE 5', NULL, '2025-03-27 22:39:14', '2025-03-27 22:39:25', NULL, 2),
	(12, 'GOLFE 6', NULL, '2025-03-27 22:39:15', '2025-03-27 22:39:27', NULL, 2),
	(13, 'GOLFE 7', NULL, '2025-03-27 22:39:04', '2025-03-27 22:39:28', NULL, 2);

-- Listage des données de la table nlf.com_formes_juridiques : ~3 rows (environ)
INSERT INTO `com_formes_juridiques` (`id`, `sigle`, `libelle`, `declaree`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, NULL, 'Non déclarée', 0, NULL, '2025-02-25 20:16:04', '2025-02-25 20:16:05', NULL),
	(2, 'SARL', 'Société à Responsabilité Limitée', 1, NULL, '2025-02-25 20:16:04', '2025-02-25 20:16:05', NULL),
	(3, 'SA', 'Société Anonyme', 1, NULL, '2025-02-25 20:16:04', '2025-02-25 20:16:05', NULL);

-- Listage des données de la table nlf.com_nationalites : ~0 rows (environ)
INSERT INTO `com_nationalites` (`id`, `libelle`, `pays`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Togolaise', 'TOGO', NULL, '2025-03-01 13:25:20', '2025-03-01 13:25:20', NULL);

-- Listage des données de la table nlf.com_periodes : ~3 rows (environ)
INSERT INTO `com_periodes` (`id`, `libelle`, `sigle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Période coloniale (des cercles)', NULL, NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	(2, 'Période du Territoire du Togo', 'TT', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	(3, 'Période de la République togolaise', 'RT', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL);

-- Listage des données de la table nlf.com_pieces_identite : ~4 rows (environ)
INSERT INTO `com_pieces_identite` (`id`, `libelle`, `description`, `categorie`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Carte d\'identité nationale (CNI)', NULL, 'personne_physique', '2025-09-17 10:40:01', '2025-09-17 10:40:01', NULL),
	(2, 'Carte d\'Electeur', NULL, 'personne_physique', '2025-09-17 10:41:34', '2025-09-17 10:41:34', NULL),
	(3, 'Carte unique de création d’entreprise', NULL, 'personne_morale', '2025-09-17 10:41:46', '2025-09-17 10:41:46', NULL),
	(4, 'Carte d’immatriculation fiscale', NULL, 'personne_morale', '2025-09-17 10:42:07', '2025-09-17 10:42:07', NULL),
	(5, 'Carte biométrique', NULL, 'personne_physique', '2025-10-03 11:03:23', '2025-10-03 11:03:23', NULL);

-- Listage des données de la table nlf.com_prefectures : ~2 rows (environ)
INSERT INTO `com_prefectures` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `regionId`) VALUES
	(1, 'AGOE-NYIVE', NULL, '2025-03-27 17:32:24', '2025-03-27 17:32:25', NULL, 7),
	(2, 'GOLFE', NULL, '2025-03-27 17:32:26', '2025-03-27 17:32:27', NULL, 7);

-- Listage des données de la table nlf.com_professions : ~0 rows (environ)
INSERT INTO `com_professions` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Revendeur', NULL, '2025-03-01 13:25:41', '2025-03-01 13:25:41', NULL);

-- Listage des données de la table nlf.com_qualites_document : ~3 rows (environ)
INSERT INTO `com_qualites_document` (`id`, `libelle`, `description`, `aSignaler`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'BONNE', NULL, 0, '2025-02-25 20:32:24', '2025-02-25 20:32:24', NULL),
	(2, 'ILLISIBLE', NULL, 1, '2025-02-25 20:32:24', '2025-02-25 20:32:24', NULL),
	(3, 'MAUVAISE', 'Pour les documents dégradés', 1, '2025-04-03 15:02:05', '2025-04-03 15:02:05', NULL);

-- Listage des données de la table nlf.com_quartiers : ~11 rows (environ)
INSERT INTO `com_quartiers` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `villeId`) VALUES
	(1, 'ADJOUGBA', NULL, '2025-03-27 22:37:01', '2025-03-27 22:37:02', NULL, NULL),
	(2, 'ADOUIKO', NULL, '2025-03-27 22:37:04', '2025-03-27 22:37:05', NULL, NULL),
	(3, 'AHONGAKOPE ASSIYEYE', NULL, '2025-03-27 22:37:06', '2025-03-27 22:37:06', NULL, NULL),
	(4, 'ANOKUI', NULL, '2025-03-27 22:37:07', '2025-03-27 22:37:08', NULL, NULL),
	(5, 'ANOKUI NOGO', NULL, '2025-03-27 22:37:09', '2025-03-27 22:37:10', NULL, NULL),
	(6, 'ANOME GBONVE', NULL, '2025-03-27 22:37:11', '2025-03-27 22:37:11', NULL, NULL),
	(7, 'ANOMEGBLE', NULL, '2025-03-27 22:37:12', '2025-03-27 22:37:13', NULL, NULL),
	(8, 'APEGNIGBI', NULL, '2025-03-27 22:37:14', '2025-03-27 22:37:14', NULL, NULL),
	(9, 'ATSANVE', NULL, '2025-03-27 22:37:16', '2025-03-27 22:37:15', NULL, NULL),
	(10, 'BOTOKOPE', NULL, '2025-03-27 22:37:15', '2025-03-27 22:37:17', NULL, NULL),
	(11, 'Kégué', NULL, '2025-05-09 20:02:46', '2025-05-09 20:02:46', NULL, 1);

-- Listage des données de la table nlf.com_regions : ~13 rows (environ)
INSERT INTO `com_regions` (`id`, `libelle`, `sigle`, `description`, `actuelle`, `createdAt`, `updatedAt`, `deletedAt`, `periodeId`) VALUES
	(1, 'Cercle de Kloto', 'CK', NULL, 0, '2025-03-27 11:08:35', '2025-03-27 11:08:35', NULL, 1),
	(2, 'Cercle d\'Aného', 'CA', NULL, 0, '2025-03-27 11:08:37', '2025-03-27 11:08:38', NULL, 1),
	(3, 'Cercle d\'Atakpamé', 'CAT', NULL, 0, '2025-03-27 11:08:36', '2025-03-27 11:08:37', NULL, 1),
	(4, 'Cercle de Sokodé', 'CS', NULL, 0, '2025-03-27 11:08:31', '2025-03-27 11:08:31', NULL, 1),
	(5, 'Cercle de Lomé', 'CL', NULL, 0, '2025-03-27 11:08:32', '2025-03-27 11:08:33', NULL, 1),
	(6, 'Territoire Togolais', 'TT', NULL, 0, '2025-03-27 11:08:17', '2025-03-27 11:08:19', NULL, 2),
	(7, 'Grand Lomé', 'GL', NULL, 1, '2025-03-27 11:08:29', '2025-03-27 11:08:30', NULL, 3),
	(8, 'Région Maritime', 'RM', NULL, 1, '2025-03-27 11:08:21', '2025-03-27 11:08:22', NULL, 3),
	(9, 'Région des Plateaux', 'RP', NULL, 1, '2025-03-27 11:08:24', '2025-03-27 11:08:25', NULL, 3),
	(10, 'Région Centrale', 'RC', NULL, 1, '2025-03-27 11:08:27', '2025-03-27 11:08:28', NULL, 3),
	(11, 'Région de la Kara', 'RK', NULL, 1, '2025-03-27 11:08:26', '2025-03-27 11:08:26', NULL, 3),
	(12, 'Région des Savanes', 'RS', NULL, 1, '2025-03-27 11:08:23', '2025-03-27 11:08:23', NULL, 3),
	(13, 'Test 2', 'TEE', 'Un peu de description...', 1, '2025-03-27 11:42:39', '2025-03-27 13:36:20', '2025-03-27 13:36:20', 3);

-- Listage des données de la table nlf.com_secteurs_activite : ~4 rows (environ)
INSERT INTO `com_secteurs_activite` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Informatique', 'Pas de description', '2025-03-30 22:34:32', '2025-03-30 22:34:32', NULL),
	(2, 'Bureautique', NULL, '2025-03-30 22:34:45', '2025-03-30 22:34:45', NULL),
	(3, 'Test', NULL, '2025-03-30 22:35:44', '2025-03-30 22:35:44', NULL),
	(4, 'Test 3', NULL, '2025-03-30 22:36:35', '2025-03-30 22:36:57', '2025-03-30 22:36:57');

-- Listage des données de la table nlf.com_types_lien_groupe : ~3 rows (environ)
INSERT INTO `com_types_lien_groupe` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Non précisé', NULL, '2025-03-01 14:03:56', '2025-03-01 14:03:56', NULL),
	(2, 'Amis', NULL, '2025-03-01 14:03:56', '2025-03-01 14:03:56', NULL),
	(3, 'Collègues', NULL, '2025-03-01 14:03:56', '2025-03-01 14:03:56', NULL);

-- Listage des données de la table nlf.com_types_personne_morale : ~4 rows (environ)
INSERT INTO `com_types_personne_morale` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Entreprise', NULL, '2025-02-25 20:17:38', '2025-02-25 20:17:38', NULL),
	(2, 'Collectivité', NULL, '2025-02-25 20:17:38', '2025-02-25 20:17:38', NULL),
	(3, 'Association', NULL, '2025-02-25 20:17:38', '2025-02-25 20:17:38', NULL),
	(4, 'ONG', NULL, '2025-02-25 20:17:38', '2025-02-25 20:17:38', NULL);

-- Listage des données de la table nlf.com_types_registre : ~4 rows (environ)
INSERT INTO `com_types_registre` (`id`, `abbreviation`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	('depots', 'DPT', 'Dépôts', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('formalites', 'FP', 'Formalités préalables', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('oppositions', 'OPP', 'Oppositions', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL),
	('titres-fonciers', 'LF', 'Titres fonciers', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL);

-- Listage des données de la table nlf.com_types_relation_legale : ~4 rows (environ)
INSERT INTO `com_types_relation_legale` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Héritiers', NULL, '2025-02-25 21:22:20', '2025-02-25 21:22:20', NULL),
	(2, 'Successeurs', NULL, '2025-02-25 21:22:32', '2025-02-25 21:22:32', NULL),
	(3, 'Conjoint', NULL, '2025-02-25 21:22:32', '2025-02-25 21:22:32', NULL),
	(4, 'Epouse', NULL, '2025-02-25 21:22:32', '2025-02-25 21:22:32', NULL);

-- Listage des données de la table nlf.com_villages : ~1 rows (environ)
INSERT INTO `com_villages` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `cantonId`) VALUES
	(1, 'Vogan', NULL, '2025-04-15 12:02:39', '2025-04-15 12:02:40', NULL, NULL);

-- Listage des données de la table nlf.com_villes : ~1 rows (environ)
INSERT INTO `com_villes` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `cantonId`) VALUES
	(1, 'Lomé', NULL, '2025-04-15 12:02:48', '2025-04-15 12:02:49', NULL, NULL);

-- Listage des données de la table nlf.gds_actes_registres : ~16 rows (environ)
INSERT INTO `gds_actes_registres` (`id`, `numeroOrdre`, `folio`, `dateValidation`, `createdAt`, `updatedAt`, `deletedAt`, `typeRegistreId`, `regionId`, `centreConservationFonciereId`, `dossierRegistreId`, `utilisateurCreationId`, `utilisateurValidationId`) VALUES
	('089de0bb-3f16-4a2d-9c02-1928b4c2865c', '1', 1, NULL, '2025-06-21 08:19:14', '2025-06-21 08:19:14', NULL, 'depots', 7, 1, '58a98cbf-285e-4f16-a1ed-67809cda16c4', NULL, NULL),
	('28128ec8-e686-4325-be9c-2979a971d65f', '1', 1, NULL, '2025-06-21 08:05:01', '2025-06-21 08:05:01', NULL, 'oppositions', 7, 1, 'f4030a2f-ecb3-4e54-b1ca-3bd56a3f7481', NULL, NULL),
	('3e1450ed-a0b2-48bd-9b14-eac34351e860', NULL, 1, NULL, '2025-06-12 05:36:08', '2025-06-12 05:36:09', NULL, 'formalites', 7, 1, '93d2765c-a48c-4f21-9be2-242911a75b38', NULL, NULL),
	('754b479a-017c-44d1-bb08-20f53bdc7310', '2', 2, NULL, '2025-07-01 20:00:33', '2025-07-01 20:00:33', NULL, 'depots', 7, 1, '58a98cbf-285e-4f16-a1ed-67809cda16c4', NULL, NULL),
	('8c6ae46d-b692-4bda-a922-62682deb4399', '1', 1, NULL, '2025-06-21 06:23:50', '2025-06-21 06:23:50', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('8e791cb8-6344-47e4-a3f2-25247e934674', '1bis', 3, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('967fc588-2bac-49a4-94ff-1660728d7316', '8', 10, NULL, '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, 'formalites', 7, 1, 'd479d846-1ad3-4b4e-a0fd-56989c9b8db9', 1, NULL),
	('9a791cb8-6344-47e4-a3f2-25240e934674', '2', 4, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('9b791cb8-6344-47e4-a3f2-25240e834674', '3', 5, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('9c791cb8-6344-47e4-a3f2-15240e834674', '4', 6, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('9d791cb8-6344-47e4-a3f2-15250e834674', '5', 7, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('9e791cb8-6344-47e4-a3f2-15250e834674', '6', 8, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('9f791cb8-6344-47e4-a3f2-15250e834674', '7', 9, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd479d846-1ad3-4b4e-a0fd-56989c9b8db9', NULL, NULL),
	('9a791cb8-6344-47e4-a3f2-15250e834674', '8', 10, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db0', NULL, NULL),
	('9b791cb8-6344-47e4-a3f2-15250e834674', '9', 11, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 'formalites', 7, 1, 'd679d846-1ad3-4b4e-a0fd-56989c9b8db0', NULL, NULL);

-- Listage des données de la table nlf.gds_augmentations : ~3 rows (environ)
INSERT INTO `gds_augmentations` (`id`, `numeroBordereauAnalytique`, `dateInscription`, `numeroTitreAcquis`, `designationImmeuble`, `contenanceImmeubleAcquisEnHectare`, `contenanceImmeubleAcquisEnAre`, `contenanceImmeubleAcquisEnCentiare`, `prixAcquisition`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`, `modeAcquisitionId`) VALUES
	(1, '1', '2001-01-01', 'GL-00051-RT', 'Une parcelle ayant la forme de ....', 0, 2, 25, 1000000, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2, 1),
	(2, '1', '2001-01-01', 'GL-00051-RT', 'Mme Jane DOE', 0, 2, 25, 1000000, '2025-04-22 10:25:24', '2025-05-04 03:02:09', NULL, 3, 1),
	(3, '4', '2025-05-04', 'GL-00051-RT', 'Parcelle de Mr TEST Test', 0, 1, 21, 500000, '2025-05-04 03:13:36', '2025-05-09 19:43:39', NULL, 3, 1);

-- Listage des données de la table nlf.gds_bornages : ~7 rows (environ)
INSERT INTO `gds_bornages` (`id`, `dateInsertionJournalOfficiel`, `dateAvisIndividuels`, `dateProcesVerbal`, `createdAt`, `updatedAt`, `deletedAt`, `formalitePrealableId`) VALUES
	(1, NULL, NULL, NULL, '2025-03-11 09:34:18', '2025-03-14 12:57:24', NULL, 1),
	(2, NULL, NULL, NULL, '2025-03-11 10:57:39', '2025-03-14 12:57:33', NULL, 2),
	(3, NULL, NULL, NULL, '2025-03-14 12:36:27', '2025-03-14 12:36:27', NULL, 3),
	(4, NULL, NULL, NULL, '2025-03-14 12:36:41', '2025-03-14 12:36:41', NULL, 4),
	(5, NULL, NULL, NULL, '2025-03-14 12:38:37', '2025-03-14 12:57:41', NULL, 5),
	(6, NULL, NULL, NULL, '2025-03-14 19:10:33', '2025-03-14 19:10:33', NULL, 6),
	(7, NULL, NULL, '2001-03-12', '2025-04-08 08:58:07', '2025-04-08 10:39:50', NULL, 7);

-- Listage des données de la table nlf.gds_causes_indisponibilite : ~2 rows (environ)
INSERT INTO `gds_causes_indisponibilite` (`id`, `numeroBordereauAnalytiqueStipulationExecution`, `dateInscription`, `indicationClausesConventionnelles`, `numeroBordereauAnalytiqueRadiation`, `dateRadiation`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`) VALUES
	(1, '4', '2004-01-01', 'Indication de ces clauses conventionnelles ....', NULL, NULL, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2),
	(2, '4', '2004-01-01', 'Indication de ces clauses conventionnelles ....', NULL, NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3);

-- Listage des données de la table nlf.gds_conjoints_personnes_disposants : ~1 rows (environ)
INSERT INTO `gds_conjoints_personnes_disposants` (`id`, `informationsDisponibles`, `createdAt`, `updatedAt`, `deletedAt`, `groupeHeritiersId`, `personnePhysiqueId`) VALUES
	(1, 1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 7);

-- Listage des données de la table nlf.gds_demandes_etats_descriptifs : ~1 rows (environ)
INSERT INTO `gds_demandes_etats_descriptifs` (`id`, `requerant`, `reponse`, `statut`, `dateDemande`, `dateTraitement`, `createdAt`, `updatedAt`, `deletedAt`, `utilisateurDemandeId`, `utilisateurTraitementId`, `titreFoncierId`) VALUES
	(1, 'Mr ALI Ali', NULL, 'a_traiter', '2025-07-24 19:02:02', NULL, '2025-07-24 19:02:04', '2025-07-24 19:02:06', NULL, 5, NULL, 4);

-- Listage des données de la table nlf.gds_demandes_transferts : ~5 rows (environ)
INSERT INTO `gds_demandes_transferts` (`id`, `message`, `reponse`, `statut`, `dateDemande`, `dateTraitement`, `createdAt`, `updatedAt`, `deletedAt`, `centreConservationFonciereId`, `typeRegistreId`, `utilisateurDemandeId`, `utilisateurTraitementId`) VALUES
	(1, NULL, NULL, 'rejetee', '2025-06-10 03:18:03', '2025-06-21 09:01:41', '2025-06-10 03:18:03', '2025-06-12 08:53:36', NULL, 1, NULL, 1, 1),
	(2, 'Transférez les actes FP_2024_1002 et FP_2024_1006 dans notre centre de conservation foncière', NULL, 'annulee', '2025-06-12 05:16:02', NULL, '2025-06-12 05:16:02', '2025-06-12 08:52:34', NULL, 1, 'formalites', 1, NULL),
	(3, NULL, 'Votre demande a été bien traitée\n\nCordialement', 'traitee', '2025-06-12 06:20:00', NULL, '2025-06-12 06:20:00', '2025-06-12 09:43:42', NULL, 1, 'formalites', 1, NULL),
	(4, 'Veuillez transférer les ', NULL, 'traitee', '2025-06-23 18:49:48', NULL, '2025-06-23 18:49:48', '2025-06-23 18:54:34', NULL, 1, 'formalites', 1, NULL),
	(5, 'Transfert des actes', NULL, 'traitee', '2025-06-23 18:56:08', NULL, '2025-06-23 18:56:08', '2025-07-24 19:13:09', NULL, 1, 'formalites', 1, NULL);

-- Listage des données de la table nlf.gds_demandes_transferts_actes : ~6 rows (environ)
INSERT INTO `gds_demandes_transferts_actes` (`id`, `statut`, `commentaire`, `dateTraitement`, `createdAt`, `updatedAt`, `deletedAt`, `demandeTransfertId`, `centreSourceId`, `acteRegistreId`) VALUES
	(1, 'rejete', NULL, '2025-06-12 06:20:00', '2025-06-12 06:20:00', '2025-06-12 09:43:42', NULL, 3, 1, '3e1450ed-a0b2-48bd-9b14-eac34351e860'),
	(2, 'valide', NULL, '2025-06-12 09:41:21', '2025-06-12 09:41:21', '2025-06-12 09:41:21', NULL, 3, 1, '3e1450ed-a0b2-48bd-9b14-eac34351e860'),
	(3, 'valide', NULL, '2025-06-23 18:49:48', '2025-06-23 18:49:48', '2025-06-23 18:54:34', NULL, 4, 1, '089de0bb-3f16-4a2d-9c02-1928b4c2865c'),
	(4, 'valide', NULL, '2025-06-23 18:49:48', '2025-06-23 18:49:48', '2025-06-23 18:54:34', NULL, 4, 1, '28128ec8-e686-4325-be9c-2979a971d65f'),
	(5, 'rejete', NULL, '2025-06-23 18:49:48', '2025-06-23 18:49:48', '2025-06-23 18:54:34', NULL, 4, 1, '3e1450ed-a0b2-48bd-9b14-eac34351e860'),
	(6, 'valide', NULL, '2025-06-23 18:56:08', '2025-06-23 18:56:08', '2025-07-24 19:13:09', NULL, 5, 1, '8c6ae46d-b692-4bda-a922-62682deb4399');

-- Listage des données de la table nlf.gds_depots : ~7 rows (environ)
INSERT INTO `gds_depots` (`id`, `numeroRequisition`, `dateDepotRequisition`, `statut`, `informationsStatut`, `designationDroitReel`, `nombrePiecesDeposees`, `montantOperation`, `dateDepot`, `createdAt`, `updatedAt`, `deletedAt`, `utilisateurId`, `typeDepotId`, `typeOperationPostImmatriculationId`, `acteRegistreId`, `formalitePrealableId`, `titreFoncierId`) VALUES
	(1, '123652897', '2003-05-15', 'valide', NULL, NULL, NULL, NULL, '2004-01-11', '2025-04-15 16:11:13', '2025-04-15 16:11:13', NULL, NULL, 1, NULL, NULL, NULL, NULL),
	(2, '1234', NULL, 'annulé', 'C\'est annulé pour une raison X', NULL, NULL, NULL, '2000-11-11', '2025-04-15 16:17:02', '2025-04-15 16:17:02', NULL, NULL, 1, NULL, NULL, NULL, NULL),
	(3, '133498', NULL, 'valide', NULL, NULL, NULL, NULL, '2000-12-11', '2025-04-17 12:33:13', '2025-04-17 12:33:13', NULL, 1, 1, NULL, NULL, NULL, NULL),
	(4, NULL, NULL, 'valide', NULL, 'kjkj kj kj ', NULL, 10000, '2000-12-11', '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, 1, 2, 3, NULL, NULL, NULL),
	(5, '13213215', '2025-06-20', 'a_valider', NULL, NULL, NULL, NULL, '2025-06-13', '2025-06-21 08:19:14', '2025-06-21 08:19:14', NULL, 1, 1, NULL, '089de0bb-3f16-4a2d-9c02-1928b4c2865c', NULL, NULL),
	(6, '4652368', '2025-01-01', 'a_valider', NULL, 'Désignation', NULL, NULL, '2025-07-01', '2025-07-01 20:00:33', '2025-07-01 20:00:33', NULL, 1, 1, NULL, '754b479a-017c-44d1-bb08-20f53bdc7310', NULL, NULL);

-- Listage des données de la table nlf.gds_depots_titres_fonciers : ~1 rows (environ)
INSERT INTO `gds_depots_titres_fonciers` (`id`, `numeroTitreFoncier`, `createdAt`, `updatedAt`, `deletedAt`, `depotId`) VALUES
	(1, 'RP-0020-RT', '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, 4);

-- Listage des données de la table nlf.gds_diminutions : ~2 rows (environ)
INSERT INTO `gds_diminutions` (`id`, `numeroBordereauAnalytique`, `dateInscription`, `numeroTitreAliene`, `designationImmeuble`, `contenanceParcelleAlieneeEnHectare`, `contenanceParcelleAlieneeEnAre`, `contenanceParcelleAlieneeEnCentiare`, `prixAlienation`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`, `modeAlienationId`) VALUES
	(1, '2', '2002-01-01', 'GL-00052-RT', 'Une parcelle de ...', 0, 0, 50, 2000000, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2, 1),
	(2, '2', '2002-01-01', 'GL-00052-RT', 'Une parcelle de ...', 0, 0, 50, 2000000, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3, 1);

-- Listage des données de la table nlf.gds_directions_limite : ~4 rows (environ)
INSERT INTO `gds_directions_limite` (`id`, `libelle`, `abbreviation`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Nord', 'N', NULL, '2025-04-18 15:54:54', '2025-04-18 15:54:55', NULL),
	(2, 'Sud', 'S', NULL, '2025-04-18 15:54:54', '2025-04-18 15:54:55', NULL),
	(3, 'Ouest', 'O', NULL, '2025-04-18 15:54:54', '2025-04-18 15:54:55', NULL),
	(4, 'Est', 'E', NULL, '2025-04-18 15:54:54', '2025-04-18 15:54:55', NULL);

-- Listage des données de la table nlf.gds_divisions_en_lot : ~1 rows (environ)
INSERT INTO `gds_divisions_en_lot` (`id`, `numeroLotOuVolume`, `situationBatiment`, `situationNiveau`, `natureDescription`, `affectation`, `contenance`, `quotePartPartiesCommunes`, `valeurLot`, `mutationTitreFoncier`, `extinctionLot`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`, `modeAlienationId`) VALUES
	(1, '1', 'A', '2', 'Nature et description', 'Affectation', 500, 1002, 1000000, 'GL-00061-RM', 'edezssc', '2025-05-06 13:58:51', '2025-05-06 13:58:51', NULL, 3, 1);

-- Listage des données de la table nlf.gds_divisions_en_volumes : ~1 rows (environ)
INSERT INTO `gds_divisions_en_volumes` (`id`, `numeroVolume`, `situationBatiment`, `situationNiveau`, `natureDescription`, `affectation`, `contenance`, `valeurVolume`, `mutationTitreFoncier`, `extinctionVolume`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`, `modeAlienationId`) VALUES
	(1, '1', 'A', '2', 'Nature et description', 'Affectation', 1000, 1000000, 'GL-00060-RM', 'msl,v', '2025-05-06 13:50:17', '2025-05-06 13:50:17', NULL, 3, 1);

-- Listage des données de la table nlf.gds_dossiers_registres : ~20 rows (environ)
INSERT INTO `gds_dossiers_registres` (`id`, `nom`, `volume`, `estRegistre`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `dossierRegistreParentId`, `typeRegistreId`, `regionId`, `centreConservationFonciereId`) VALUES
	('007f7621-cb9b-4517-8443-92ca79656d9e', 'Registres GL', '', 0, NULL, '2025-06-11 01:38:41', '2025-06-11 01:38:41', NULL, '572ba89d-f67a-4899-8bd4-e2d1c960af4c', 'formalites', NULL, NULL),
	('2b9df4d4-8fdc-4494-9466-95c130661046', 'LF_GL_2025', '1', 1, NULL, '2025-06-21 08:39:43', '2025-06-21 08:39:43', NULL, '864dae52-7eb8-4945-af4e-b8b01a251fb2', 'titres-fonciers', 7, 1),
	('3e1444ed-a0b2-48bd-9b14-eac34351e860', '2025', '', 0, 'Les registres de l\'année 2025', '2025-06-05 00:39:08', '2025-06-05 00:39:08', NULL, 'formalites', 'formalites', NULL, NULL),
	('572ba89d-f67a-4899-8bd4-e2d1c960af4c', '2024', '', 0, NULL, '2025-06-11 01:34:49', '2025-06-11 01:34:49', NULL, 'formalites', 'formalites', NULL, NULL),
	('58a98cbf-285e-4f16-a1ed-67809cda16c4', 'DEPOTS_GL', '1', 1, NULL, '2025-06-21 08:18:19', '2025-06-21 08:18:19', NULL, '7e73f42a-caa6-43e6-93c1-a2c816e0a73b', 'depots', 7, 1),
	('7e73f42a-caa6-43e6-93c1-a2c816e0a73b', '2025', NULL, 0, NULL, '2025-06-21 08:18:02', '2025-06-21 08:18:02', NULL, 'depots', 'depots', NULL, NULL),
	('864dae52-7eb8-4945-af4e-b8b01a251fb2', 'Grand Lomé', NULL, 0, NULL, '2025-06-21 08:39:11', '2025-06-21 08:39:11', NULL, 'c6d7eca8-d098-4fe2-8824-befadb60a839', 'titres-fonciers', NULL, NULL),
	('93d2765c-a48c-4f21-9be2-242911a75b38', 'FP_GL', '1', 1, NULL, '2025-06-11 01:39:05', '2025-06-11 02:28:11', NULL, '007f7621-cb9b-4517-8443-92ca79656d9e', 'formalites', 7, 1),
	('a1955a59-0883-424f-b11e-b95f8ac0db29', 'Registres Scannés', NULL, 0, NULL, '2025-06-23 22:58:06', '2025-06-23 22:58:06', NULL, '3e1444ed-a0b2-48bd-9b14-eac34351e860', 'formalites', NULL, NULL),
	('c03a36b9-9b12-4868-9b87-0be82a290dde', '2025', NULL, 0, NULL, '2025-06-21 07:57:44', '2025-06-21 07:57:44', NULL, 'oppositions', 'oppositions', NULL, NULL),
	('c6d7eca8-d098-4fe2-8824-befadb60a839', '2025', NULL, 0, NULL, '2025-06-21 08:39:00', '2025-06-21 08:39:00', NULL, 'titres-fonciers', 'titres-fonciers', NULL, NULL),
	('d479d846-1ad3-4b4e-a0fd-56989c9b8db9', 'FORMALITE_GL', '1', 1, 'Le volume N° 1 de la région du Grand Lomé', '2025-06-05 00:47:22', '2025-06-11 18:03:25', NULL, '3e1444ed-a0b2-48bd-9b14-eac34351e860', 'formalites', 7, 1),
	('d679d846-1ad3-4b4e-a0fd-56989c9b8db0', 'FORMALITE_GL', '3', 1, 'Le volume N° 3 de la région du Grand Lomé', '2025-06-05 00:47:22', '2025-06-11 18:03:25', NULL, '3e1444ed-a0b2-48bd-9b14-eac34351e860', 'formalites', 7, 1),
	('d679d846-1ad3-4b4e-a0fd-56989c9b8db9', 'FORMALITE_GL', '2', 1, 'Le volume N° 2 de la région du Grand Lomé', '2025-06-05 00:47:22', '2025-06-11 18:03:25', NULL, '3e1444ed-a0b2-48bd-9b14-eac34351e860', 'formalites', 7, 1),
	('depots', 'Dépôts', '', 0, NULL, '2025-06-05 00:24:30', '2025-06-05 00:24:30', NULL, NULL, NULL, NULL, NULL),
	('e679d846-1ad3-4b4e-a0fd-56989c9b8db0', 'FORMALITE_GL', '4', 1, 'Le volume N° 4 de la région du Grand Lomé', '2025-06-05 00:47:22', '2025-06-11 18:03:25', NULL, '3e1444ed-a0b2-48bd-9b14-eac34351e860', 'formalites', 7, 1),
	('f4030a2f-ecb3-4e54-b1ca-3bd56a3f7481', 'OPPOSITIONS', '1', 1, NULL, '2025-06-21 07:58:10', '2025-06-21 07:58:10', NULL, 'c03a36b9-9b12-4868-9b87-0be82a290dde', 'oppositions', 7, 1),
	('formalites', 'Formalités préalables', '', 0, NULL, '2025-06-05 00:24:30', '2025-06-05 00:24:30', NULL, NULL, NULL, NULL, NULL),
	('oppositions', 'Oppositions', '', 0, NULL, '2025-06-05 00:24:30', '2025-06-05 00:24:30', NULL, NULL, NULL, NULL, NULL),
	('titres-fonciers', 'Titres fonciers', '', 0, NULL, '2025-06-05 00:24:30', '2025-06-05 00:24:30', NULL, NULL, NULL, NULL, NULL);

-- Listage des données de la table nlf.gds_droits_reels_constitues_par_denombrement : ~2 rows (environ)
INSERT INTO `gds_droits_reels_constitues_par_denombrement` (`id`, `numeroBordereauAnalytiqueConstitution`, `dateInscription`, `indicationChargeOuConstitue`, `prix`, `numeroBordereauAnalytiqueRadiation`, `dateRadiation`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`) VALUES
	(1, '3', '2003-01-01', 'Indication de cette charge ...', 1000000, NULL, NULL, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2),
	(2, '3', '2003-01-01', 'Indication de cette charge ...', 1000000, NULL, NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3);

-- Listage des données de la table nlf.gds_formalites_prealables : ~11 rows (environ)
INSERT INTO `gds_formalites_prealables` (`id`, `numeroRequisition`, `statut`, `informationsStatut`, `dateDeDepot`, `dateForclusion`, `nombrePiecesJointes`, `dateSommationDepotDePieces`, `dateDepotDepotDePieces`, `nombreCopiesTitresFonciersEtablies`, `nombreCertificatsInscriptionEtablis`, `dateRemisePieces`, `createdAt`, `updatedAt`, `deletedAt`, `utilisateurId`, `acteRegistreId`) VALUES
	(1, '123546', 'validée', NULL, '2005-06-23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-11 09:34:18', '2025-03-11 09:34:18', NULL, NULL, '9a791cb8-6344-47e4-a3f2-25240e934674'),
	(2, '9884532', 'validée', NULL, '2002-06-23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-11 10:57:39', '2025-03-11 10:57:39', NULL, NULL, '9b791cb8-6344-47e4-a3f2-25240e834674'),
	(3, '32123465', 'validée', NULL, '2000-03-13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 12:36:27', '2025-03-14 12:36:27', NULL, NULL, '9c791cb8-6344-47e4-a3f2-15240e834674'),
	(4, '5684323', 'validée', NULL, '2000-06-23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 12:36:41', '2025-03-14 12:36:41', NULL, NULL, '9d791cb8-6344-47e4-a3f2-15250e834674'),
	(5, '133498', 'validée', NULL, '2020-06-20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 12:38:37', '2025-03-14 12:38:37', NULL, NULL, '9b791cb8-6344-47e4-a3f2-15250e834674'),
	(6, '321168', 'validée', NULL, '2000-06-23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 19:10:33', '2025-03-14 19:10:33', NULL, NULL, '9a791cb8-6344-47e4-a3f2-15250e834674'),
	(7, '89332', 'suspendue', NULL, '2000-03-12', '0001-03-12', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, NULL, '9f791cb8-6344-47e4-a3f2-15250e834674'),
	(8, '12346', 'validée', NULL, '2025-04-17', NULL, NULL, '2025-05-11', NULL, NULL, NULL, NULL, '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 1, '9e791cb8-6344-47e4-a3f2-15250e834674'),
	(9, '1321321', 'a_valider', NULL, '2025-06-11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-21 06:23:50', '2025-06-21 06:23:50', NULL, 1, '8c6ae46d-b692-4bda-a922-62682deb4399'),
	(10, '13213215', 'a_valider', NULL, '2025-06-06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 1, '8e791cb8-6344-47e4-a3f2-25247e934674'),
	(11, '4652368', 'a_valider', NULL, '2000-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, NULL, '967fc588-2bac-49a4-94ff-1660728d7316');

-- Listage des données de la table nlf.gds_groupes_conjoints : ~1 rows (environ)
INSERT INTO `gds_groupes_conjoints` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `partiePrenanteId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 5);

-- Listage des données de la table nlf.gds_groupes_heritiers : ~1 rows (environ)
INSERT INTO `gds_groupes_heritiers` (`id`, `termesSuccession`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `partiePrenanteId`) VALUES
	(1, 'On met à ce niveau les termes de la succession i.e. comment les droits vont être repartis (équitablement entre le héritiers ou non)', 'La description de la successsion', '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 6);

-- Listage des données de la table nlf.gds_groupes_personnes_physiques : ~1 rows (environ)
INSERT INTO `gds_groupes_personnes_physiques` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `partiePrenanteId`, `typeLienGroupeId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 4, 1);

-- Listage des données de la table nlf.gds_informations_propriete : ~5 rows (environ)
INSERT INTO `gds_informations_propriete` (`id`, `description`, `contenanceEnHectare`, `contenanceEnAre`, `contenanceEnCentiare`, `valeurVenale`, `valeurLocative`, `createdAt`, `updatedAt`, `deletedAt`, `formalitePrealableId`, `natureTypeImmeubleId`, `natureEtatImmeubleId`) VALUES
	(1, NULL, 1, 0, 20, NULL, NULL, '2025-04-09 16:21:09', '2025-04-09 16:21:11', NULL, 7, 2, 2),
	(2, 'un de description', 0, 15, 20, 1000000, 1200000, '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 8, 1, 1),
	(3, 'Desc', 1, 0, 53, 1000000, 0, '2025-06-21 06:23:50', '2025-06-21 06:23:50', NULL, 9, 1, 2),
	(4, 'Terrain en forme de quadrilatère irrégulier', 1, 0, 50, 2200000, 0, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 10, 1, 1),
	(5, 'Un terrain....', 0, 26, 40, 10000000, 0, '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, 11, 1, 1);

-- Listage des données de la table nlf.gds_limites : ~5 rows (environ)
INSERT INTO `gds_limites` (`id`, `limitrophe`, `createdAt`, `updatedAt`, `deletedAt`, `directionLimiteId`, `titreFoncierId`) VALUES
	(1, 'Par la rue 12', '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 1, 2),
	(2, 'Par le titre foncier GL-00049-RT', '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 3, 2),
	(3, 'Par la rue 12', '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 1, 3),
	(4, 'Par le titre foncier GL-00049-RT', '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3, 3),
	(5, 'Par la rue du nors', '2025-04-22 10:43:16', '2025-04-22 10:43:16', NULL, 1, 4);

-- Listage des données de la table nlf.gds_modes_acquisition : ~0 rows (environ)
INSERT INTO `gds_modes_acquisition` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Vente', NULL, '2025-04-18 16:11:24', '2025-04-18 16:11:25', NULL);

-- Listage des données de la table nlf.gds_modes_alienation : ~0 rows (environ)
INSERT INTO `gds_modes_alienation` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Vente', NULL, '2025-04-18 16:11:33', '2025-04-18 16:11:34', NULL);

-- Listage des données de la table nlf.gds_mutations : ~9 rows (environ)
INSERT INTO `gds_mutations` (`id`, `numeroBordereauAnalytique`, `dateInscription`, `description`, `prixAcquisition`, `valeurVenaleOuEstimee`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`, `modeAcquisitionId`) VALUES
	(1, '5', '2000-01-01', 'La description de cette mutation', 20000000, NULL, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2, 1),
	(2, '5', '2000-01-01', 'La description de cette mutation', 20000000, NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3, 1),
	(3, '1', '2000-01-01', NULL, NULL, NULL, '2025-04-22 10:43:16', '2025-04-22 10:43:16', NULL, 4, 1),
	(4, '1', '2000-01-01', NULL, 1000000, NULL, '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, 5, 1),
	(5, '2', '2000-01-01', NULL, NULL, NULL, '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, 5, 1),
	(6, '01', '2000-01-01', NULL, NULL, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 6, 1),
	(7, '2', '2001-01-01', NULL, 10000000, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 6, 1),
	(8, '6', '2025-02-01', NULL, NULL, NULL, '2025-05-09 19:47:55', '2025-05-09 19:47:55', NULL, 3, 1),
	(9, '1', '2000-01-01', NULL, NULL, NULL, '2025-05-15 22:45:43', '2025-05-15 22:45:43', NULL, 7, 1);

-- Listage des données de la table nlf.gds_natures_etats_immeuble : ~2 rows (environ)
INSERT INTO `gds_natures_etats_immeuble` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Bâti', NULL, '2025-04-17 01:18:23', '2025-04-17 01:18:24', NULL),
	(2, 'Non Bâti', NULL, '2025-04-17 01:18:23', '2025-04-17 01:18:24', NULL);

-- Listage des données de la table nlf.gds_natures_types_immeuble : ~2 rows (environ)
INSERT INTO `gds_natures_types_immeuble` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Urbain', NULL, '2025-04-17 01:18:46', '2025-04-17 01:18:47', NULL),
	(2, 'Rural', NULL, NULL, NULL, NULL);

-- Listage des données de la table nlf.gds_oppositions : ~4 rows (environ)
INSERT INTO `gds_oppositions` (`id`, `statut`, `informationsStatut`, `description`, `designationDroitReel`, `nombrePiecesDeposees`, `dateOpposition`, `dateMainLevee`, `createdAt`, `updatedAt`, `deletedAt`, `utilisateurId`, `acteRegistreId`) VALUES
	(1, 'recevable', NULL, NULL, NULL, NULL, '2025-04-14', NULL, '2025-04-14 14:41:14', '2025-04-14 14:41:16', NULL, NULL, NULL),
	(2, 'levée', NULL, 'Un peu de description par ici', NULL, NULL, '2005-02-15', NULL, '2025-04-15 12:32:33', '2025-04-15 13:10:23', NULL, NULL, NULL),
	(3, 'recevable', NULL, 'Un peu de description par ici', NULL, NULL, '2005-11-11', NULL, '2025-04-17 12:37:05', '2025-04-17 12:37:05', NULL, 1, NULL),
	(4, 'a_valider', NULL, 'Un peu de description', NULL, NULL, '2025-06-11', NULL, '2025-06-21 08:05:00', '2025-06-21 08:05:00', NULL, 1, '28128ec8-e686-4325-be9c-2979a971d65f');

-- Listage des données de la table nlf.gds_oppositions_cas_inscription_differee : ~4 rows (environ)
INSERT INTO `gds_oppositions_cas_inscription_differee` (`id`, `dateOpposition`, `numeroRegistreDepots`, `dureeValiditeOpposition`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`) VALUES
	(1, '2000-01-02', '2', NULL, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2),
	(2, '2000-01-01', '1', NULL, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2),
	(3, '2000-01-01', '1', NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3),
	(4, '2000-01-02', '2', NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3);

-- Listage des données de la table nlf.gds_oppositions_requisitions : ~7 rows (environ)
INSERT INTO `gds_oppositions_requisitions` (`id`, `numeroRequisition`, `createdAt`, `updatedAt`, `deletedAt`, `oppositionId`) VALUES
	(1, '123568', '2025-04-14 17:41:01', '2025-04-14 17:41:03', NULL, 1),
	(2, '634439', '2025-04-14 17:41:01', '2025-04-14 17:41:03', NULL, 1),
	(3, '153595', '2025-04-15 12:32:33', '2025-04-15 12:32:33', NULL, 2),
	(4, '53320', '2025-04-15 12:32:33', '2025-04-15 13:10:23', NULL, 2),
	(5, '12346', '2025-04-15 12:32:33', '2025-04-15 12:32:33', NULL, 2),
	(6, '12346', '2025-04-17 12:37:06', '2025-04-17 12:37:06', NULL, 3),
	(7, '02259', '2025-06-21 08:05:01', '2025-06-21 08:05:01', NULL, 4);

-- Listage des données de la table nlf.gds_parties_prenantes : ~37 rows (environ)
INSERT INTO `gds_parties_prenantes` (`id`, `type`, `categorie`, `createdAt`, `updatedAt`, `deletedAt`, `formalitePrealableId`, `oppositionId`, `depotId`, `mutationId`) VALUES
	(1, 'requerant', 'personne_physique', '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 7, 1, NULL, NULL),
	(2, 'requerant', 'personne_morale', '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 7, NULL, NULL, NULL),
	(3, 'requerant', 'personne_relation_legale', '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 7, NULL, NULL, NULL),
	(4, 'requerant', 'groupe_personne_physique', '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 7, NULL, NULL, NULL),
	(5, 'requerant', 'groupe_conjoints', '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 7, 1, NULL, NULL),
	(6, 'proprietaire', 'groupe_heritiers', '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 7, NULL, NULL, NULL),
	(7, 'requerant', 'personne_physique', '2025-04-15 12:32:33', '2025-04-15 12:32:33', NULL, NULL, 2, NULL, NULL),
	(8, 'intervenant', 'personne_morale', '2025-04-15 12:32:33', '2025-04-15 12:32:33', NULL, NULL, 2, NULL, NULL),
	(9, 'alienateur', 'personne_physique', '2025-04-15 16:11:13', '2025-04-15 16:11:13', NULL, NULL, NULL, 1, NULL),
	(10, 'acquereur', 'personne_morale', '2025-04-15 16:11:13', '2025-04-15 16:11:13', NULL, NULL, NULL, 1, NULL),
	(11, 'alienateur', 'personne_physique', '2025-04-15 16:17:02', '2025-04-15 16:17:02', NULL, NULL, NULL, 2, NULL),
	(12, 'acquereur', 'personne_morale', '2025-04-15 16:17:02', '2025-04-15 16:17:02', NULL, NULL, NULL, 2, NULL),
	(13, 'requerant', 'personne_physique', '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 8, NULL, NULL, NULL),
	(14, 'proprietaire', 'personne_morale', '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 8, NULL, NULL, NULL),
	(15, 'alienateur', 'personne_physique', '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, NULL, NULL, 4, NULL),
	(16, 'acquereur', 'personne_morale', '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, NULL, NULL, 4, NULL),
	(17, 'requerant', 'personne_physique', '2025-04-17 12:37:06', '2025-04-17 12:37:06', NULL, NULL, 3, NULL, NULL),
	(18, 'intervenant', 'personne_morale', '2025-04-17 12:37:06', '2025-04-17 12:37:06', NULL, NULL, 3, NULL, NULL),
	(19, 'proprietaire_successif', 'personne_physique', '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, NULL, NULL, NULL, 2),
	(20, 'proprietaire_successif', 'personne_physique', '2025-04-22 10:43:16', '2025-04-22 10:43:16', NULL, NULL, NULL, NULL, 3),
	(21, 'proprietaire_successif', 'personne_morale', '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, NULL, NULL, NULL, 4),
	(22, 'proprietaire_successif', 'personne_physique', '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, NULL, NULL, NULL, 5),
	(23, 'proprietaire_successif', 'personne_physique', '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, NULL, NULL, NULL, 6),
	(24, 'proprietaire_successif', 'personne_morale', '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, NULL, NULL, NULL, 7),
	(25, 'proprietaire_successif', 'personne_physique', '2025-05-15 22:45:43', '2025-05-15 22:45:43', NULL, NULL, NULL, NULL, 9),
	(26, 'requerant', 'personne_physique', '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 10, NULL, NULL, NULL),
	(27, 'proprietaire', 'personne_morale', '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 10, NULL, NULL, NULL),
	(28, 'requerant', 'personne_physique', '2025-06-21 08:05:01', '2025-06-21 08:05:01', NULL, NULL, 4, NULL, NULL),
	(29, 'intervenant', 'personne_morale', '2025-06-21 08:05:01', '2025-06-21 08:05:01', NULL, NULL, 4, NULL, NULL),
	(30, 'alienateur', 'personne_physique', '2025-06-21 08:19:14', '2025-06-21 08:19:14', NULL, NULL, NULL, 5, NULL),
	(31, 'acquereur', 'personne_morale', '2025-06-21 08:19:14', '2025-06-21 08:19:14', NULL, NULL, NULL, 5, NULL),
	(32, 'requerant', 'personne_physique', '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, 11, NULL, NULL, NULL),
	(33, 'proprietaire', 'personne_morale', '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, 11, NULL, NULL, NULL),
	(34, 'alienateur', 'personne_physique', '2025-07-01 20:00:33', '2025-07-01 20:00:33', NULL, NULL, NULL, 6, NULL),
	(35, 'acquereur', 'personne_morale', '2025-07-01 20:00:33', '2025-07-01 20:00:33', NULL, NULL, NULL, 6, NULL);

-- Listage des données de la table nlf.gds_personnes_cibles : ~1 rows (environ)
INSERT INTO `gds_personnes_cibles` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `personneRelationLegaleId`, `personnePhysiqueId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 3);

-- Listage des données de la table nlf.gds_personnes_conjointes : ~2 rows (environ)
INSERT INTO `gds_personnes_conjointes` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `groupeConjointsId`, `personnePhysiqueId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 11),
	(2, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 10);

-- Listage des données de la table nlf.gds_personnes_disposants : ~1 rows (environ)
INSERT INTO `gds_personnes_disposants` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `groupeHeritiersId`, `personnePhysiqueId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 5);

-- Listage des données de la table nlf.gds_personnes_heritieres : ~2 rows (environ)
INSERT INTO `gds_personnes_heritieres` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `conjointPersonneDisposantId`, `personnePhysiqueId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 17),
	(2, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 16);

-- Listage des données de la table nlf.gds_personnes_membres : ~2 rows (environ)
INSERT INTO `gds_personnes_membres` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `groupePersonnePhysiqueId`, `personnePhysiqueId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 8),
	(2, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 9);

-- Listage des données de la table nlf.gds_personnes_morales : ~13 rows (environ)
INSERT INTO `gds_personnes_morales` (`id`, `raisonSocialeOuDenomination`, `adresse`, `telephone`, `createdAt`, `updatedAt`, `deletedAt`, `partiePrenanteId`, `formeJuridiqueId`, `secteurActiviteId`, `typePersonneMoraleId`, `numeroPieceIdentite`) VALUES
	(1, 'ENTREPRISO', NULL, NULL, '2025-04-08 08:58:07', '2025-04-08 10:39:50', NULL, 2, 2, 2, 1, NULL),
	(2, 'COLLECTIVITE ALAN', NULL, NULL, '2025-04-15 12:32:33', '2025-04-15 13:10:23', NULL, 8, 1, NULL, 2, NULL),
	(3, 'BCEAU', NULL, NULL, '2025-04-15 16:11:13', '2025-04-15 16:11:13', NULL, 10, 1, NULL, 1, NULL),
	(4, 'BABAO', NULL, NULL, '2025-04-15 16:17:02', '2025-04-15 16:17:02', NULL, 12, 1, NULL, 1, NULL),
	(5, 'Collecté La Grâce', 'Vogan', '52 24 24 30', '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 14, 1, NULL, 2, NULL),
	(6, 'TEST', NULL, NULL, '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, 16, 1, NULL, 1, NULL),
	(7, 'TEST', NULL, NULL, '2025-04-17 12:37:06', '2025-04-17 12:37:06', NULL, 18, 1, NULL, 1, NULL),
	(8, 'ENTREPRISE', NULL, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 24, 3, NULL, 1, NULL),
	(9, 'Collectivité GOLD', NULL, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 27, 1, NULL, 2, NULL),
	(10, 'Collectivité GOLD', NULL, NULL, '2025-06-21 08:05:01', '2025-06-21 08:05:01', NULL, 29, 1, NULL, 2, NULL),
	(11, 'Eglise AD', NULL, NULL, '2025-06-21 08:19:14', '2025-06-21 08:19:14', NULL, 31, 1, NULL, 2, NULL),
	(12, 'TEST', NULL, NULL, '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, 33, 1, NULL, 1, NULL),
	(13, 'Collectivité GOLD', NULL, NULL, '2025-07-01 20:00:33', '2025-07-01 20:00:33', NULL, 35, 1, NULL, 1, NULL);

-- Listage des données de la table nlf.gds_personnes_physiques : ~39 rows (environ)
INSERT INTO `gds_personnes_physiques` (`id`, `nom`, `prenoms`, `telephone`, `adresseDomicile`, `adresseResidence`, `anneeNaissance`, `dateNaissance`, `lieuNaissance`, `nif`, `vivant`, `nomEpoux`, `createdAt`, `updatedAt`, `deletedAt`, `civiliteId`, `nationaliteId`, `professionId`, `partiePrenanteId`, `nomJeuneFille`, `numeroPieceIdentite`) VALUES
	(1, 'TEST CORR', 'Test Test', '20 00 25 633', 'Lomé', 'Paris', 2001, '2001-04-08', 'Lomé', '11553366', 1, NULL, '2025-04-08 08:58:08', '2025-04-08 10:39:50', NULL, 1, 1, 1, 1, NULL, NULL),
	(2, 'REPRE', 'Repre', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(3, 'PAPI', 'Papi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(4, 'REPRE', 'Representant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(5, 'PAPI', 'Papi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(6, 'REPRE', 'Repre 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(7, 'MAMMIE', 'Mamito', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(8, 'INDIVISAIRE', 'Indivi 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, NULL, NULL, NULL, NULL),
	(9, 'INDIVISAIRE', 'Indivisi 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, NULL, NULL, NULL, NULL),
	(10, 'CONJOINT', 'Conjoint 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(11, 'CONJOINT', 'Conjoint 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(12, 'REPRE', 'Repre 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(13, 'REPRE', 'Repre 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(14, 'REPRE', 'Repre 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(15, 'REPRE', 'Reprepre', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(16, 'HERITIER', 'Heritiero 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 1, 1, NULL, NULL, NULL),
	(17, 'HERITIER', 'Heritiera', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 3, NULL, NULL, NULL, NULL, NULL),
	(18, 'REPRE', 'Reprero', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(19, 'TESTT', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-15 12:32:33', '2025-04-15 13:10:23', NULL, 1, NULL, NULL, 7, NULL, NULL),
	(20, 'REPRE', 'REPRE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-15 12:32:33', '2025-04-15 12:32:33', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(21, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-15 16:11:13', '2025-04-15 16:11:13', NULL, 1, NULL, NULL, 9, NULL, NULL),
	(22, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-15 16:17:02', '2025-04-15 16:17:02', NULL, 1, NULL, NULL, 11, NULL, NULL),
	(23, 'TEST', 'Test', '96 20 62 50', 'Lomé', 'Abuja', 2000, '2000-01-01', 'Lomé', '123365', 1, 'AFIWA', '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 1, 1, 1, 13, NULL, NULL),
	(24, 'REPRE', 'Repre', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 1, 1, 1, NULL, NULL, NULL),
	(25, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, 1, 1, NULL, 15, NULL, NULL),
	(26, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-04-17 12:37:06', '2025-04-17 12:37:06', NULL, 1, NULL, NULL, 17, NULL, NULL),
	(27, 'TEST', 'Test', '96 20 62 50', 'Lomé', 'Abuja', 2000, '2000-01-01', 'Lomé', '123365', 1, 'AFIWA', '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 1, 1, 1, 19, NULL, NULL),
	(28, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 1, 1, NULL, 23, NULL, NULL),
	(29, 'REPRE', 'Repre', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(30, 'DIRECTEUR', 'Directeur', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(31, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-05-15 22:45:43', '2025-05-15 22:45:43', NULL, 1, 1, 1, 25, NULL, NULL),
	(32, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 1, NULL, NULL, 26, NULL, NULL),
	(33, 'REPRE', 'Repre', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	(34, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-06-21 08:05:01', '2025-06-21 08:05:01', NULL, 1, NULL, NULL, 28, NULL, NULL),
	(35, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-06-21 08:19:14', '2025-06-21 08:19:14', NULL, 1, NULL, NULL, 30, NULL, NULL),
	(36, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, 1, NULL, NULL, 32, NULL, NULL),
	(37, 'TEST', 'Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, '2025-07-01 20:00:33', '2025-07-01 20:00:33', NULL, 1, 1, 1, 34, NULL, NULL);

-- Listage des données de la table nlf.gds_personnes_relation_legale : ~1 rows (environ)
INSERT INTO `gds_personnes_relation_legale` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `partiePrenanteId`, `typeRelationLegaleId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 10:39:50', NULL, 3, 1);

-- Listage des données de la table nlf.gds_pieces_deposees : ~4 rows (environ)
INSERT INTO `gds_pieces_deposees` (`id`, `nom`, `description`, `tailleEnOctets`, `extension`, `fichier`, `createdAt`, `updatedAt`, `deletedAt`, `formalitePrealableId`, `oppositionId`, `depotId`) VALUES
	(1, 'Carte nationale d\'identité', NULL, NULL, NULL, NULL, '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 8, NULL, NULL),
	(2, 'Acte de vente', NULL, NULL, NULL, NULL, '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 8, NULL, NULL),
	(3, 'Acte de dépôt', NULL, NULL, NULL, NULL, '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, NULL, NULL, 4),
	(4, 'Preuve de propriété', NULL, NULL, NULL, NULL, '2025-04-17 12:35:15', '2025-04-17 12:35:15', NULL, NULL, 3, NULL);

-- Listage des données de la table nlf.gds_privileges_hypotheques : ~2 rows (environ)
INSERT INTO `gds_privileges_hypotheques` (`id`, `numeroBordereauAnalytiqueConstitution`, `dateInscription`, `designationDroitConstitue`, `beneficiaire`, `montantCharge`, `numeroBordereauAnalytiqueRadiation`, `dateRadiation`, `createdAt`, `updatedAt`, `deletedAt`, `titreFoncierId`) VALUES
	(1, '6', '2006-01-01', 'Hypothèque', 'BECEA', 25000000, NULL, NULL, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, 2),
	(2, '6', '2006-01-01', 'Hypothèque', 'BECEA', 25000000, NULL, NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 3);

-- Listage des données de la table nlf.gds_procedures_judiciaires : ~0 rows (environ)

-- Listage des données de la table nlf.gds_publications_demandes : ~7 rows (environ)
INSERT INTO `gds_publications_demandes` (`id`, `dateTransmissionInsertionJournal`, `dateInsertionJournal`, `dateTransmissionAffichageAudienceTribunal`, `dateAffichageAudienceTribunal`, `dateEnvoiAffichagePublication`, `dateAccuseReceptionAffichagePublication`, `dateEnvoiNotificationsIndividuelles`, `dateRetourAccusesReceptionNotificationsIndividuelles`, `dateNormaleClotureDelais`, `propagationRaisonAbsencesClotureDelais`, `createdAt`, `updatedAt`, `deletedAt`, `formalitePrealableId`, `referenceJournalOfficiel`) VALUES
	(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-11 09:34:18', '2025-03-14 12:57:24', NULL, 1, NULL),
	(2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-11 10:57:39', '2025-03-14 12:57:33', NULL, 2, NULL),
	(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 12:36:27', '2025-03-14 12:36:27', NULL, 3, NULL),
	(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 12:36:41', '2025-03-14 12:36:41', NULL, 4, NULL),
	(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 12:38:37', '2025-03-14 12:57:41', NULL, 5, NULL),
	(6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-14 19:10:33', '2025-03-14 19:10:33', NULL, 6, NULL),
	(7, NULL, NULL, NULL, '2001-03-12', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-08 08:58:07', '2025-04-08 10:39:50', NULL, 7, NULL);

-- Listage des données de la table nlf.gds_representants_personne_morale : ~3 rows (environ)
INSERT INTO `gds_representants_personne_morale` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `personneMoraleId`, `representantId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 4),
	(2, '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 5, 24),
	(3, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 8, 30);

-- Listage des données de la table nlf.gds_representants_personne_physique : ~10 rows (environ)
INSERT INTO `gds_representants_personne_physique` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `personnePhysiqueId`, `representantId`) VALUES
	(1, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 2),
	(2, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 1, 6),
	(3, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 8, 12),
	(4, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 9, 13),
	(5, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 11, 15),
	(6, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 10, 14),
	(7, '2025-04-08 08:58:08', '2025-04-08 08:58:08', NULL, 16, 18),
	(8, '2025-04-15 12:32:33', '2025-04-15 12:32:33', NULL, 19, 20),
	(9, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 28, 29),
	(10, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 32, 33);

-- Listage des données de la table nlf.gds_situations_fiscales : ~0 rows (environ)

-- Listage des données de la table nlf.gds_situations_propriete : ~17 rows (environ)
INSERT INTO `gds_situations_propriete` (`id`, `lieudit`, `rue`, `createdAt`, `updatedAt`, `deletedAt`, `formalitePrealableId`, `regionId`, `prefectureId`, `communeId`, `villageId`, `villeId`, `cantonId`, `quartierId`, `titreFoncierId`) VALUES
	(1, NULL, NULL, '2025-03-11 09:34:18', '2025-03-14 12:57:24', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(2, NULL, NULL, '2025-03-11 10:57:39', '2025-03-14 12:57:33', NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(3, NULL, NULL, '2025-03-14 12:36:27', '2025-03-14 12:36:27', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, NULL, NULL, '2025-03-14 12:36:41', '2025-03-14 12:36:41', NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(5, NULL, NULL, '2025-03-14 12:38:37', '2025-03-14 12:57:41', NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, NULL, NULL, '2025-03-14 19:10:33', '2025-03-14 19:10:33', NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(7, NULL, NULL, '2025-04-08 08:58:07', '2025-04-08 10:39:50', NULL, 7, 2, 2, 12, NULL, NULL, 4, 9, NULL),
	(8, 'Lieudit', NULL, '2025-04-17 01:31:36', '2025-04-17 01:31:36', NULL, 8, 7, 2, 12, 1, 1, 4, 9, NULL),
	(9, 'Lieudit', 'Rue 2', '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, NULL, 7, 2, 12, 1, 1, 4, 9, 2),
	(10, 'Lieudit', 'Rue 2', '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, NULL, 7, 2, 12, 1, 1, 4, 9, 3),
	(11, 'Lieudit', 'Rue 12', '2025-04-22 10:43:16', '2025-04-22 10:43:16', NULL, NULL, 7, 2, 12, 1, 1, 4, 9, 4),
	(12, NULL, NULL, '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, NULL, 7, 2, 12, 1, 1, 4, 9, 5),
	(13, NULL, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, NULL, 2, 2, 12, NULL, NULL, 4, NULL, 6),
	(14, NULL, NULL, '2025-05-15 22:45:43', '2025-05-15 22:45:43', NULL, NULL, 7, 2, 12, 1, 1, 4, 11, 7),
	(15, NULL, NULL, '2025-06-21 06:23:50', '2025-06-21 06:23:50', NULL, 9, 7, 2, 12, 1, 1, 4, 11, NULL),
	(16, NULL, NULL, '2025-06-21 06:29:05', '2025-06-21 06:29:05', NULL, 10, 7, 2, 12, 1, 1, 4, 11, NULL),
	(17, NULL, NULL, '2025-06-26 01:18:11', '2025-06-26 01:18:11', NULL, 11, 7, 2, 12, 1, 1, 4, 11, NULL);

-- Listage des données de la table nlf.gds_tests : ~5 rows (environ)
INSERT INTO `gds_tests` (`id`, `data`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(14, 'data 2', '2025-05-07 00:21:47', '2025-05-07 00:27:28', NULL),
	(20, 'data 1', '2025-05-07 00:25:18', '2025-05-07 00:25:18', NULL),
	(21, 'data 1', '2025-05-07 00:25:18', '2025-05-07 00:25:18', NULL),
	(23, 'data 1', '2025-05-07 00:27:28', '2025-05-07 00:27:28', NULL),
	(24, 'data 1', '2025-05-07 00:27:28', '2025-05-07 00:27:28', NULL);

-- Listage des données de la table nlf.gds_titres_fonciers : ~7 rows (environ)
INSERT INTO `gds_titres_fonciers` (`id`, `numeroPrefixe`, `numero`, `numeroSuffixe`, `processusCreation`, `numeroRequisition`, `numeroTitreFoncierMorcelle`, `statut`, `informationsStatut`, `natureConsistanceImmeuble`, `contenanceEnHectare`, `contenanceEnAre`, `contenanceEnCentiare`, `nupParcelleAssise`, `titreParcelleAssise`, `numeroLot`, `numeroVolume`, `affectation`, `modificationDescription`, `descriptionPartiesCommunes`, `createdAt`, `updatedAt`, `deletedAt`, `acteRegistreId`) VALUES
	(1, 'RM', 10, 'RT', 'immatriculation', '32123465', NULL, 'valide', NULL, 'nature', 1, 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-18 17:46:38', '2025-04-18 17:46:38', NULL, NULL),
	(2, 'GL', 50, 'RT', 'immatriculation', NULL, NULL, 'valide', NULL, 'Un terrain ayant la forme d\'un quadrilatère', 0, 1, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 10:22:51', '2025-04-22 10:22:51', NULL, NULL),
	(3, 'GL', 51, 'RT', 'immatriculation', NULL, NULL, 'valide', NULL, 'Un terrain ayant la forme d\'un quadrilatère', 0, 1, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, NULL),
	(4, 'GL', 52, 'RT', 'immatriculation', '133498', NULL, 'valide', NULL, 'Une parcelle ayant la forme d\'un rectangle', 1, 0, 88, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-22 10:43:16', '2025-04-22 10:43:16', NULL, NULL),
	(5, 'GL', 75, 'RT', 'morcellement', '1365468', 'GL-00050-RT', 'valide', NULL, 'Immeuble rural non bâti ayant la forme d\'un quadrilatère irrégulier', 0, 20, 80, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, NULL),
	(6, 'GL', 10001, 'RT', 'immatriculation', '123456', NULL, 'annulé', NULL, 'Un parcelle rurale consistant en un terrain ayant la forme d\'un polygone irrégulier', 0, 10, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, NULL),
	(7, 'GL', 22, 'RT', 'immatriculation', '123456', NULL, 'valide', NULL, 'Immeuble rural, non bâti, en forme de pentagone irrégulier', 0, 6, 85, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 22:45:43', '2025-05-15 22:45:43', NULL, NULL);

-- Listage des données de la table nlf.gds_types_depot : ~2 rows (environ)
INSERT INTO `gds_types_depot` (`id`, `libelle`, `description`, `post`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Immatriculation', NULL, 0, '2025-02-25 20:34:34', '2025-02-25 20:34:34', NULL),
	(2, 'Post-Immatriculation', NULL, 1, '2025-02-25 20:34:34', '2025-02-26 01:22:53', NULL);

-- Listage des données de la table nlf.gds_types_operation_post_immatriculation : ~24 rows (environ)
INSERT INTO `gds_types_operation_post_immatriculation` (`id`, `libelle`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'Inscription d’hypothèque conventionnelle', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(2, 'Inscription d’hypothèque judiciaire provisoire', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(3, 'Inscription d’hypothèque judiciaire définitive', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(4, 'Inscription de bail', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(5, 'Inscription de prénotation', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(6, 'Inscription de commandement valant saisie réelle', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(7, 'Inscription de cahier de charges', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(8, 'Inscription d’usufruit/de droit d’usage', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(9, 'Radiation d’hypothèque conventionnelle', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(10, 'Radiation d’hypothèque judiciaire provisoire', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(11, 'Radiation d’hypothèque judiciaire définitive', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(12, 'Radiation de bail', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(13, 'Radiation de prénotation', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(14, 'Radiation de commandement valant saisie réelle', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(15, 'Radiation de cahier de charges', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(16, 'Radiation d’usufruit/de droit d’usage', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(17, 'Mutation totale du titre foncier', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(18, 'Réévaluation du titre foncier', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(19, 'Adjonction de nom', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(20, 'Rectification de nom', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(21, 'Correction de titre foncier', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(22, 'Actualisation de titre foncier', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(23, 'Duplicata de titre foncier', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL),
	(24, 'Autre', NULL, '2025-02-25 22:59:06', '2025-02-25 22:59:06', NULL);

-- Listage des données de la table nlf.ind_donnees_indexation : ~16 rows (environ)
INSERT INTO `ind_donnees_indexation` (`id`, `volumeRegistre`, `folioRegistre`, `dateValidation`, `createdAt`, `updatedAt`, `deletedAt`, `regionId`, `typeRegistreId`, `progressionTacheIndexationId`, `formalitePrealableId`, `oppositionId`, `depotId`, `titreFoncierId`) VALUES
	(1, '1', '1', NULL, '2025-03-11 09:34:18', '2025-03-11 09:34:18', NULL, 7, 'formalites', 1, 1, NULL, NULL, NULL),
	(2, '1', '2', NULL, '2025-03-11 10:57:39', '2025-03-11 10:57:39', NULL, 7, 'formalites', 2, 2, NULL, NULL, NULL),
	(3, NULL, NULL, NULL, '2025-03-14 12:36:27', '2025-03-14 12:36:27', NULL, 9, 'formalites', 3, 3, NULL, NULL, NULL),
	(4, NULL, NULL, NULL, '2025-03-14 12:36:41', '2025-03-14 12:36:41', NULL, 9, 'formalites', 4, 4, NULL, NULL, NULL),
	(5, '1', NULL, NULL, '2025-03-14 12:38:37', '2025-03-14 12:38:37', NULL, 7, 'formalites', 5, 5, NULL, NULL, NULL),
	(6, '1', '1', NULL, '2025-03-14 19:10:33', '2025-03-14 19:10:33', NULL, 9, 'formalites', 6, 6, NULL, NULL, NULL),
	(7, '1', '2', NULL, '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 9, 'formalites', 7, 7, NULL, NULL, NULL),
	(8, '1', '1', NULL, '2025-04-15 12:32:33', '2025-04-15 12:32:33', NULL, 6, 'oppositions', 8, NULL, 2, NULL, NULL),
	(9, '63', '1', NULL, '2025-04-15 16:11:13', '2025-04-15 16:11:13', NULL, 7, 'depots', 9, NULL, NULL, 1, NULL),
	(10, '63', '2', NULL, '2025-04-15 16:17:02', '2025-04-15 16:17:02', NULL, 7, 'depots', 11, NULL, NULL, 2, NULL),
	(11, '2', '1', NULL, '2025-04-18 17:46:38', '2025-04-18 17:46:38', NULL, 7, 'titres-fonciers', 12, NULL, NULL, NULL, 1),
	(12, '2', '2', NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 7, 'titres-fonciers', 14, NULL, NULL, NULL, 3),
	(13, '2', '3', NULL, '2025-04-22 10:43:16', '2025-04-22 10:43:16', NULL, 7, 'titres-fonciers', NULL, NULL, NULL, NULL, 4),
	(14, '2', '3', NULL, '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, 7, 'titres-fonciers', 16, NULL, NULL, NULL, 5),
	(15, '1', '1', NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 7, 'titres-fonciers', 17, NULL, NULL, NULL, 6),
	(16, '1', '2', NULL, '2025-05-15 22:45:43', '2025-05-15 22:45:43', NULL, 7, 'titres-fonciers', 18, NULL, NULL, NULL, 7);

-- Listage des données de la table nlf.ind_dossiers : ~12 rows (environ)
INSERT INTO `ind_dossiers` (`id`, `nom`, `description`, `createdAt`, `updatedAt`, `deletedAt`, `dossierParentId`, `typeRegistreId`) VALUES
	('6503e767-f0b6-476f-8b09-fc2a8ab55789', 'Grand Lomé', NULL, '2025-03-01 17:02:09', '2025-03-01 17:02:09', NULL, 'titres-fonciers', 'titres-fonciers'),
	('657081be-a86c-478a-80cc-d812c4e0458c', 'FP_GL_1', NULL, '2025-03-01 17:02:30', '2025-03-01 17:02:30', NULL, '6503e767-f0b6-476f-8b09-fc2a8ab55789', 'formalites'),
	('ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'FP_RP_1_1-1000', NULL, '2025-02-27 14:26:10', '2025-02-27 14:26:10', NULL, 'formalites', 'formalites'),
	('af11f4cb-f92d-45ce-a90c-e10b06185310', 'Région de Kara', NULL, '2025-03-01 17:02:17', '2025-03-01 17:02:17', NULL, 'titres-fonciers', 'titres-fonciers'),
	('b619ef72-e9d2-4e0c-8360-ba907ae618e1', 'FP_1_1-15000', NULL, '2025-02-25 09:18:21', '2025-02-25 09:18:21', NULL, 'formalites', 'formalites'),
	('b89e129a-8135-4811-bc30-a7b9da8a19d8', 'FORMALITES  BRUTES', NULL, '2025-03-14 19:27:50', '2025-03-14 19:27:50', NULL, 'formalites', 'formalites'),
	('d01057de-55da-4d93-b4c7-bfc2626cc8a6', 'FORMALITES DECOUPEES', NULL, '2025-03-14 19:28:01', '2025-03-14 19:28:01', NULL, 'formalites', 'formalites'),
	('depots', 'Dépôts', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL, NULL, 'depots'),
	('fc04009e-9141-4aa0-8f64-64f8608e9de9', 'FP_GL_33_1-12350', NULL, '2025-03-01 16:38:27', '2025-03-01 16:38:27', NULL, 'formalites', 'formalites'),
	('formalites', 'Formalités préalables', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL, NULL, 'formalites'),
	('oppositions', 'Oppositions', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL, NULL, 'oppositions'),
	('titres-fonciers', 'Titres fonciers', NULL, '2025-02-25 03:43:13', '2025-02-25 03:43:13', NULL, NULL, 'titres-fonciers');

-- Listage des données de la table nlf.ind_fichiers : ~30 rows (environ)
INSERT INTO `ind_fichiers` (`id`, `nom`, `description`, `tailleEnOctets`, `nombrePages`, `extension`, `indexable`, `fichier`, `createdAt`, `updatedAt`, `deletedAt`, `dossierId`, `typeRegistreId`, `regionId`) VALUES
	('05c88517-faca-4628-930e-935240c96046', 'FP_1_1-5000', NULL, 438074000, 460, '.pdf', 1, 'd14623fc22546a4e9a405d3832770a_1741007750692', '2025-02-25 09:41:37', '2025-03-03 13:16:00', NULL, 'formalites', 'formalites', 7),
	('08478063-f555-45d8-adee-a6e45123c53e', 'FP_RP_1_1-1000_2', NULL, 1024000000, 20, '.pdf', 1, 'b3c86b152f42f67b89596f6dcb47e7_1740666498270', '2025-02-27 14:29:34', '2025-02-27 14:29:34', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('0ef012d3-9cdc-4379-abf5-5c41d8a523fc', 'FP_GL_34_1-1235', NULL, 13810600000, 3000, '.pdf', 1, '6caa792f0f0050f67ae325fda42a61_1740847336437', '2025-03-01 16:46:29', '2025-03-03 13:33:35', NULL, 'fc04009e-9141-4aa0-8f64-64f8608e9de9', 'formalites', 7),
	('1fa077a7-93d1-40fc-82ed-206131645e65', 'DEPOT_IMMATRICULATION_65_33250-35582', NULL, 1024000000, 20, '.pdf', 1, '006437e196c0bc5332147a70191ade_1740521664395', '2025-02-25 22:14:54', '2025-02-25 22:14:54', NULL, 'depots', 'depots', 7),
	('28c04ea0-748d-4364-9f85-8220693b63fd', 'LF_GL_1_10001-15000', NULL, 2767380, 3, '.pdf', 1, '1b6161658c440f27a06ad0a65ee594_1740564203602', '2025-02-26 10:03:23', '2025-02-26 10:03:23', NULL, 'titres-fonciers', 'titres-fonciers', 7),
	('2aaa977d-143a-43a4-89d7-27f908d1aa62', 'LF_GL_1_1-5000', NULL, 438074000, 460, '.pdf', 1, 'ea61c27d94d7c2c5299a61d860c475_1740564203618', '2025-02-26 10:03:28', '2025-02-26 10:03:28', NULL, 'titres-fonciers', 'titres-fonciers', 7),
	('329801ef-b42c-4f02-9079-8d74ea5094c1', 'FP_2_1-2001', NULL, 4154210, 8, '.pdf', 1, 'f58e183e39b1cb84f1273da4f754e8_1741025720469', '2025-03-03 18:15:20', '2025-03-03 18:15:20', NULL, 'fc04009e-9141-4aa0-8f64-64f8608e9de9', 'formalites', 7),
	('33b04070-6818-4b3c-84c6-9dbe4218d089', 'NON INDEXABLE FP_GL_34_1-1235', NULL, 13810600000, 9720, '.pdf', 0, 'c61650f033404d9e3bc05f0f92567e_1742489150998', '2025-03-20 16:49:07', '2025-03-20 16:49:07', NULL, 'b89e129a-8135-4811-bc30-a7b9da8a19d8', 'formalites', 7),
	('3f2c849b-d87a-4722-b6de-b842efac8ca1', 'FP_RP_1_1-1000_8', NULL, 1024000000, 20, '.pdf', 1, '10387c2507f9e79876464893cb697d_1740666414386', '2025-02-27 14:28:18', '2025-02-27 14:28:18', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('3fd4106a-8443-4d4f-be81-83e9a6c715a5', 'LF_GL_2_1-2001', NULL, 2767380, 3, '.pdf', 1, 'd6a5d46ebc5002141f3e34552aa33a_1740564203611', '2025-02-26 10:03:23', '2025-02-26 10:03:23', NULL, 'titres-fonciers', 'titres-fonciers', 7),
	('409299f8-25eb-4bd8-9f2d-6422d9604d4e', 'FP_RP_1_1-1000_9', NULL, 1024000000, 20, '.pdf', 1, 'd42905c4e3110153d8c3df9736cfb4_1740666477155', '2025-02-27 14:29:19', '2025-02-27 14:29:19', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('42470e15-9d80-46ce-b463-744f94af9d26', 'OPPOSITION_1_2-465', NULL, 2767380, 3, '.pdf', 0, '56f6f6ae0c87c35c530dead54dfb31_1742297811817', '2025-03-18 11:36:52', '2025-03-18 11:36:52', NULL, 'oppositions', 'oppositions', 7),
	('43215169-b116-412b-8323-54c93c27e713', 'FP_RP_1_1-1000_5', NULL, 1024000000, 20, '.pdf', 1, '44104886683371de54b815000a63d7_1740666414362', '2025-02-27 14:27:56', '2025-02-27 14:27:56', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('45adaea9-2f9d-4d41-9731-9c734897748d', 'OPPOSITION_1_1-254', NULL, 2767380, 3, '.pdf', 1, 'a8f7a26dc131e829c9ec4db8caa721_1740532434668', '2025-02-26 01:13:54', '2025-02-26 01:13:54', NULL, 'oppositions', 'oppositions', 6),
	('553ff67e-1585-4e93-98e9-9022674872ef', 'OPPOSITION_1_2-465', NULL, 2767380, 3, '.pdf', 0, '0c8fd70d444d02e162dcb57e39a7f6_1742298072954', '2025-03-18 11:41:13', '2025-03-18 11:41:13', NULL, 'oppositions', 'oppositions', 7),
	('5a686e42-1787-4fec-8b20-3dd17f27c90f', 'OPPOSITION_1_2-465', NULL, 2767380, 3, '.pdf', 1, 'f1f6ff1161d1d5ee0123d7549af5f8_1742298218599', '2025-03-18 11:43:38', '2025-03-18 11:43:38', NULL, 'oppositions', 'oppositions', 7),
	('5c9579e8-87ac-4951-973d-60d1d336c47c', 'DEPOT_IMMATRICULATION_62_33250-35582', NULL, 1024000000, 20, '.pdf', 1, 'cfa6bad749332c40e28e7b307c2308_1740521664402', '2025-02-25 22:14:50', '2025-02-25 22:14:50', NULL, 'depots', 'depots', 7),
	('756d29e4-baaa-4a00-b7bc-867b2330ad5d', 'FP_RP_1_1-1000_4', NULL, 1024000000, 20, '.pdf', 1, '30d61d6ed0e69ef75e632de3b58806_1740666414354', '2025-02-27 14:28:30', '2025-02-27 14:28:30', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('76b39063-7ab6-4dd2-a062-08222e0289f7', 'FP_GL_33_1-1235', NULL, 4603500000, NULL, '.pdf', 1, 'd8d97fb25958520c09a008a5f48997_1740847135504', '2025-03-01 16:40:03', '2025-03-03 18:09:19', NULL, 'fc04009e-9141-4aa0-8f64-64f8608e9de9', 'formalites', 7),
	('7f88dabc-db31-452b-b86c-39e2e42284fd', 'DEPOT_IMMATRICULATION_64_33250-35582', NULL, 107059000, 100, '.pdf', 1, '377326d000ffa13d0f483c15a503eb_1740521664388', '2025-02-25 22:14:27', '2025-02-25 22:14:27', NULL, 'depots', 'depots', 7),
	('863c1ee7-34b4-42ff-bce5-db1f56eee765', 'DEPOT_IMMATRICULATION_63_33250-35582', NULL, 2767380, 3, '.pdf', 1, 'cebe37821e80fec823816fc6ed7b38_1740521664379', '2025-02-25 22:14:24', '2025-02-25 22:14:24', NULL, 'depots', 'depots', 7),
	('9dd19a72-5194-4c67-a909-f2492ae38a90', 'FP_1_5001-10000', NULL, 2767380, 3, '.pdf', 1, 'a1a8e945c91bad1ea4a6758115c11f_1740476490106', '2025-02-25 09:41:30', '2025-02-25 09:41:30', NULL, 'formalites', 'formalites', 7),
	('a25529aa-8bac-4fdd-9269-e679d6b45c57', 'FP_RP_1_1-1000_1', NULL, 1024000000, 20, '.pdf', 1, '00cb192c76a775979e3f3beb36655e_1741025020773', '2025-02-27 14:29:51', '2025-03-03 18:03:53', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('a7277c13-35a5-4b59-88a2-a74d80250887', 'FP_RP_1_1-1000_7', NULL, 1024000000, 20, '.pdf', 1, 'd30717ebda35a9959612670e723c45_1740666414376', '2025-02-27 14:28:24', '2025-02-27 14:28:24', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('bea744f5-5f04-4a45-a4ac-2b8e9728a104', 'OPPOSITION_1_2-465', NULL, 1024000000, 20, '.pdf', 1, 'a90e4f1ede21af24330f8ea2ebfcfd_1740532434661', '2025-02-26 01:14:12', '2025-02-26 01:14:12', NULL, 'oppositions', 'oppositions', 6),
	('c0d24ebe-2b92-4d08-90e9-1045b99e4284', 'FP_RP_1_1-1000_3', NULL, 1024000000, 20, '.pdf', 1, 'daa82c41b145fa38a1560080c091e2_1740666492255', '2025-02-27 14:29:41', '2025-02-27 14:29:41', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('c2aa5b12-2c46-4f6e-80d3-8006e4603e3d', 'LF_GL_1_5001-10000', NULL, 2767380, 3, '.pdf', 1, 'ea7046cdb1d069e255573c762af652_1740564203592', '2025-02-26 10:03:23', '2025-02-26 10:03:23', NULL, 'titres-fonciers', 'titres-fonciers', 7),
	('ce420580-6bdb-4f4e-b1ae-c86713aab83f', 'FP_1_10001-15000', NULL, 2767380, 3, '.pdf', 1, '379415a021fa916c0b30abeb1f47ab_1740476490119', '2025-02-25 09:41:30', '2025-02-25 09:41:30', NULL, 'formalites', 'formalites', 7),
	('e0d22a98-13f0-43c0-b8bf-725af9666ac9', 'FP_RP_1_1-1000_6', NULL, 1024000000, 20, '.pdf', 1, '73730751c40d154139660a8795591f_1740666414368', '2025-02-27 14:28:07', '2025-02-27 14:28:07', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9),
	('fae7b196-e141-47a2-93cb-8c279b80dab6', 'FP_RP_1_1-1000_10', NULL, 1024000000, 20, '.pdf', 1, '563c4d3a53711be1059705977fb786_1740666414396', '2025-02-27 14:28:12', '2025-02-27 14:28:12', NULL, 'ab7c40dc-fdb6-4cb5-a565-1f9312551476', 'formalites', 9);

-- Listage des données de la table nlf.ind_progressions : ~15 rows (environ)
INSERT INTO `ind_progressions` (`id`, `page`, `etat`, `motifRejet`, `commentaire`, `dateSaisie`, `dateControle`, `createdAt`, `updatedAt`, `deletedAt`, `tacheIndexationId`, `qualiteDocumentId`, `indexeurUtilisateurId`, `controleurUtilisateurId`) VALUES
	(1, 1, 'rejeté', NULL, NULL, '2025-03-11 10:57:39', NULL, '2025-03-11 09:34:18', '2025-03-14 12:57:23', NULL, 6, 1, 5, NULL),
	(2, 2, 'signalé', NULL, NULL, '2025-03-11 10:57:37', NULL, '2025-03-11 10:57:39', '2025-03-14 12:57:32', NULL, 6, 2, 5, NULL),
	(3, 1, 'indexé', NULL, NULL, '2025-03-14 12:36:23', NULL, '2025-03-14 12:36:27', '2025-03-14 12:36:27', NULL, 11, 1, 5, NULL),
	(4, 2, 'indexé', NULL, NULL, '2025-03-14 12:36:41', NULL, '2025-03-14 12:36:41', '2025-03-14 12:36:41', NULL, 11, 2, 5, NULL),
	(5, 3, 'validé', NULL, NULL, '2025-03-14 12:38:37', NULL, '2025-03-14 12:38:37', '2025-03-14 12:57:40', NULL, 6, 1, 5, NULL),
	(6, 1, 'signalé', NULL, NULL, '2025-03-14 19:10:33', NULL, '2025-03-14 19:10:33', '2025-03-14 19:10:33', NULL, 5, 1, 5, NULL),
	(7, 2, 'indexé', NULL, 'Un peu de commentaire', '2025-04-08 08:58:07', NULL, '2025-04-08 08:58:07', '2025-04-08 08:58:07', NULL, 5, 1, 5, NULL),
	(8, 1, 'indexé', NULL, 'Un peu de commentaire par ici...', '2025-04-15 13:10:22', NULL, '2025-04-15 12:32:33', '2025-04-15 13:10:22', NULL, 3, 1, 5, NULL),
	(9, 1, 'indexé', NULL, 'Un petit commentaire par là', '2025-04-15 16:03:52', NULL, '2025-04-15 16:03:52', '2025-04-15 16:03:52', NULL, 2, 1, 5, NULL),
	(11, 2, 'indexé', NULL, 'Un petit commentaire par là', '2025-04-15 16:17:02', NULL, '2025-04-15 16:17:02', '2025-04-15 16:17:02', NULL, 2, 1, 5, NULL),
	(12, 1, 'indexé', NULL, NULL, '2025-04-18 17:46:38', NULL, '2025-04-18 17:46:38', '2025-04-18 17:46:38', NULL, 4, 1, 5, NULL),
	(14, 2, 'indexé', NULL, NULL, '2025-04-22 10:25:24', NULL, '2025-04-22 10:25:24', '2025-04-22 10:25:24', NULL, 4, 1, 5, NULL),
	(16, 3, 'indexé', NULL, NULL, '2025-05-04 15:53:44', NULL, '2025-05-04 15:53:45', '2025-05-04 15:53:45', NULL, 4, 1, 5, NULL),
	(17, 1, 'indexé', NULL, NULL, '2025-05-04 16:44:42', NULL, '2025-05-04 16:44:42', '2025-05-04 16:44:42', NULL, 16, 1, 5, NULL),
	(18, 2, 'indexé', NULL, NULL, '2025-05-15 22:45:42', NULL, '2025-05-15 22:45:43', '2025-05-15 22:45:43', NULL, 16, 1, 5, NULL);

-- Listage des données de la table nlf.ind_taches_indexation : ~16 rows (environ)
INSERT INTO `ind_taches_indexation` (`id`, `etatSaisie`, `etatControle`, `dateAttributionSaisie`, `dateAttributionControle`, `createdAt`, `updatedAt`, `deletedAt`, `fichierId`, `indexeurUtilisateurId`, `controleurUtilisateurId`) VALUES
	(1, 'a_indexer', 'en_attente', NULL, NULL, '2025-02-25 09:52:58', '2025-02-25 09:52:58', NULL, '05c88517-faca-4628-930e-935240c96046', 5, 6),
	(2, 'en_cours', 'en_attente', NULL, NULL, '2025-02-25 22:17:27', '2025-02-25 22:17:27', NULL, '863c1ee7-34b4-42ff-bce5-db1f56eee765', 5, 6),
	(3, 'en_cours', 'en_attente', '2025-04-15 13:10:24', '2025-04-15 13:10:24', '2025-02-26 01:14:46', '2025-04-15 13:10:24', NULL, '45adaea9-2f9d-4d41-9731-9c734897748d', 5, 6),
	(4, 'indexé', 'a_controler', '2025-05-04 15:53:45', '2025-05-04 15:53:45', '2025-02-26 10:03:50', '2025-05-04 15:53:45', NULL, '3fd4106a-8443-4d4f-be81-83e9a6c715a5', 5, 6),
	(5, 'en_cours', 'en_attente', '2025-03-14 19:10:34', '2025-03-14 19:10:34', '2025-02-27 14:53:51', '2025-03-14 19:10:34', NULL, 'a25529aa-8bac-4fdd-9269-e679d6b45c57', 5, 6),
	(6, 'indexé', 'a_controler', '2025-03-14 12:57:41', '2025-03-14 12:57:41', '2025-03-03 11:53:38', '2025-03-14 12:57:41', NULL, '9dd19a72-5194-4c67-a909-f2492ae38a90', 5, 6),
	(7, 'a_indexer', 'en_attente', NULL, NULL, '2025-03-03 11:53:38', '2025-03-10 19:12:52', NULL, 'ce420580-6bdb-4f4e-b1ae-c86713aab83f', 2, 6),
	(8, 'a_indexer', 'en_attente', '2025-04-03 15:29:53', NULL, '2025-03-03 12:03:54', '2025-04-03 15:29:53', NULL, '76b39063-7ab6-4dd2-a062-08222e0289f7', 5, 6),
	(9, 'a_indexer', 'en_attente', '2025-04-10 12:28:43', '2025-04-10 12:28:43', '2025-03-03 12:03:54', '2025-04-10 12:28:43', NULL, '0ef012d3-9cdc-4379-abf5-5c41d8a523fc', 5, 1),
	(10, 'a_indexer', 'en_attente', '2025-04-03 15:29:52', NULL, '2025-03-03 18:15:33', '2025-04-03 15:29:53', NULL, '329801ef-b42c-4f02-9079-8d74ea5094c1', 5, 6),
	(11, 'en_cours', 'en_attente', '2025-03-14 12:36:28', '2025-03-14 12:36:28', '2025-03-03 18:18:43', '2025-03-14 12:36:28', NULL, 'fae7b196-e141-47a2-93cb-8c279b80dab6', 5, 6),
	(12, 'a_indexer', 'en_attente', NULL, NULL, '2025-03-03 18:18:43', '2025-03-03 18:19:03', NULL, '08478063-f555-45d8-adee-a6e45123c53e', 5, 6),
	(13, 'a_indexer', 'en_attente', NULL, NULL, '2025-03-03 18:18:43', '2025-03-03 18:18:43', NULL, 'c0d24ebe-2b92-4d08-90e9-1045b99e4284', 5, NULL),
	(14, 'a_indexer', 'en_attente', NULL, NULL, '2025-03-03 18:19:03', '2025-03-03 18:19:03', NULL, '43215169-b116-412b-8323-54c93c27e713', NULL, 6),
	(15, 'a_indexer', 'en_attente', NULL, NULL, '2025-03-03 18:19:03', '2025-03-03 18:19:03', NULL, '756d29e4-baaa-4a00-b7bc-867b2330ad5d', NULL, 6),
	(16, 'en_cours', 'en_attente', '2025-05-04 16:44:43', '2025-05-04 16:44:43', '2025-05-04 15:55:57', '2025-05-04 16:44:43', NULL, '28c04ea0-748d-4364-9f85-8220693b63fd', 5, 6);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
