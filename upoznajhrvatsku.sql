-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 05, 2016 at 06:34 PM
-- Server version: 5.6.20-log
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `upoznajhrvatsku`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategorije`
--

CREATE TABLE IF NOT EXISTS `kategorije` (
`id` int(11) NOT NULL,
  `nazivKategorije` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=cp1250 COLLATE=cp1250_croatian_ci AUTO_INCREMENT=9 ;

--
-- Dumping data for table `kategorije`
--

INSERT INTO `kategorije` (`id`, `nazivKategorije`) VALUES
(1, 'Trgovina'),
(2, 'Restoran'),
(3, 'Muzej'),
(4, 'Hotel'),
(5, 'Banka'),
(6, 'Crkva'),
(7, 'Policija'),
(8, 'Bolnica');

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE IF NOT EXISTS `korisnici` (
`id` int(2) NOT NULL,
  `Ime` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Prezime` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Korisnicko_ime` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Lozinka` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=cp1250 COLLATE=cp1250_croatian_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `Ime`, `Prezime`, `Email`, `Korisnicko_ime`, `Lozinka`) VALUES
(1, 'Luka', 'Putrić', 'lputric@a.c', 'lputric', 'e10adc3949ba59abbe56e057f20f883e'),
(2, 'Marko', 'Marić', 'marko@maric.com', 'mmaric', 'e10adc3949ba59abbe56e057f20f883e'),
(3, 'Luka', 'Putrić', 'lputric4@gmail.com', 'admin', '21232f297a57a5a743894a0e4a801fc3'),
(4, 'Ivančica', 'Ivić', 'iivic@gmail.com', 'iivic', '6c44e5cd17f0019c64b042e4a745412a'),
(5, 'Pero', 'Perić', 'pero@tvz.hr', 'peroperic', 'e10adc3949ba59abbe56e057f20f883e');

-- --------------------------------------------------------

--
-- Table structure for table `mjesta`
--

CREATE TABLE IF NOT EXISTS `mjesta` (
`id` int(11) NOT NULL,
  `nazivMjesta` varchar(50) CHARACTER SET utf8 NOT NULL,
  `adresaMjesta` varchar(250) CHARACTER SET utf8 NOT NULL,
  `latitudaMjesta` double NOT NULL,
  `longitudaMjesta` double NOT NULL,
  `idKategorije` int(11) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=cp1250 COLLATE=cp1250_croatian_ci AUTO_INCREMENT=35 ;

--
-- Dumping data for table `mjesta`
--

INSERT INTO `mjesta` (`id`, `nazivMjesta`, `adresaMjesta`, `latitudaMjesta`, `longitudaMjesta`, `idKategorije`) VALUES
(1, 'Pivnica The Hole In One', 'Zagreb', 46, 16, 0),
(2, 'Pivnica The Hole In One', 'Zagreb', 45.81389617919922, 15.983012199401855, 0),
(3, 'Pod Zidom Bistro & Wine Bar', 'Ulica Pod zidom 5, Zagreb', 45.8138575, 15.97807280000006, 0),
(4, 'Zlatni medvjed', 'Schlosserove stube 2, Zagreb', 45.815632, 15.984914, 0),
(6, 'Moto13 d.o.o', 'Galdovačka ulica 252, Sisak', 45.4800175, 16.42203119999999, 0),
(8, 'Moto13 d.o.o', 'Galdovačka ulica 252, Sisak', 45.4800175, 16.42203119999999, 0),
(9, 'Proteka', 'A. Starčevića 26, Mošćenica', 45.440079, 16.3434499999999, 0),
(10, 'PROBUS K.I.G. d.o.o.', 'Kutinska 15, Novo Selo Palanječko, Sisak-Topolovac', 45.482656, 16.433604, 0),
(21, 'Moto13 d.o.o', 'Galdovačka ulica 252, Sisak', 45.4800175, 16.42203119999999, 0),
(12, 'MICROTON d.o.o.', 'Ul. grada Vukovara 237A, Zagreb', 45.8010455, 15.99095850000003, 0),
(20, 'Knjižara Teovizija', 'Kaptol ulica 26, Zagreb', 45.8161716, 15.97856449999994, 0),
(14, '9', '', 0, 0, 0),
(15, 'mjeto', '', 0, 0, 0),
(16, 'Knjižara Teovizija', 'Kaptol ulica 26, Zagreb', 45.8161716, 15.97856449999994, 0),
(23, 'Knjižara Teovizija', 'Kaptol ulica 26, Zagreb', 45.8161716, 15.97856449999994, 0),
(18, 'Moto13 d.o.o', 'Galdovačka ulica 252, Sisak', 45.4800175, 16.42203119999999, 0),
(19, 'Burberry', 'Nova ves 17, Zagreb', 45.8149065, 15.97861549999993, 0),
(22, 'Moto13 d.o.o', 'Galdovačka ulica 252, Sisak', 45.4800175, 16.42203119999999, 0),
(31, 'Marin Galdovo', 'Galdovačka ulica 209, Sisak', 45.4785274, 16.41531029999998, 1),
(32, 'Spar ZG-Vlaška', 'Vlaška ulica 44, Zagreb', 45.813771, 15.98364500000002, 1),
(33, 'Hostel Bureau', 'Vlaška ulica 40, Zagreb', 45.81388119999999, 15.9828334999999, 1),
(34, 'Mevjema', 'Vlaška ulica 7, Zagreb', 45.813551, 15.97950600000001, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ocjene_komentari`
--

CREATE TABLE IF NOT EXISTS `ocjene_komentari` (
`id` int(11) NOT NULL,
  `idMjesta` int(11) NOT NULL,
  `ocjena` int(11) NOT NULL,
  `komentar` varchar(250) CHARACTER SET utf8 NOT NULL,
  `datumKomentiranja` date NOT NULL,
  `idKorisnika` int(11) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=cp1250 COLLATE=cp1250_croatian_ci AUTO_INCREMENT=23 ;

--
-- Dumping data for table `ocjene_komentari`
--

INSERT INTO `ocjene_komentari` (`id`, `idMjesta`, `ocjena`, `komentar`, `datumKomentiranja`, `idKorisnika`) VALUES
(1, 31, 1, 'test', '2016-09-03', 1),
(22, 31, 1, 'komentar', '2016-09-03', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategorije`
--
ALTER TABLE `kategorije`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
 ADD PRIMARY KEY (`id`), ADD KEY `id` (`id`);

--
-- Indexes for table `mjesta`
--
ALTER TABLE `mjesta`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ocjene_komentari`
--
ALTER TABLE `ocjene_komentari`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategorije`
--
ALTER TABLE `kategorije`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
MODIFY `id` int(2) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `mjesta`
--
ALTER TABLE `mjesta`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `ocjene_komentari`
--
ALTER TABLE `ocjene_komentari`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
