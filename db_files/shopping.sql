-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2022 at 08:01 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vue_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `shopping`
--

CREATE TABLE `shopping` (
  `transaction_id` int(11) NOT NULL,
  `user_name` varchar(256) DEFAULT NULL,
  `phone` varchar(256) DEFAULT NULL,
  `location` longtext DEFAULT NULL,
  `product_list` varchar(256) DEFAULT NULL,
  `product_prices` varchar(256) DEFAULT NULL,
  `total_cost` bigint(20) DEFAULT NULL,
  `user_id` varchar(256) DEFAULT NULL,
  `transaction_status` varchar(256) DEFAULT NULL,
  `delivery_status` varchar(256) DEFAULT NULL,
  `delivery_date` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shopping`
--

INSERT INTO `shopping` (`transaction_id`, `user_name`, `phone`, `location`, `product_list`, `product_prices`, `total_cost`, `user_id`, `transaction_status`, `delivery_status`, `delivery_date`) VALUES
(2, 'Sai teja Potnuri', '9666435575', '#34-11-60,Siluva Gurthu Street , Gnanapuram', 'POCO X3,vivo V9,SAMSUNG Galaxy M33 5G', '17999,26000,16999', 60998, 'potnurisaiteja@gmail.com', 'CONFIRMED', 'PENDING', ''),
(3, 'harsha', '1234567895', 'jhjhvhjvhj', 'POCO X3', '17999', 17999, 'potnurisaiteja@gmail.com', 'CONFIRMED', 'PENDING', ''),
(4, 'Sai teja Potnuri', '9666435575', '#34-11-60,Siluva Gurthu Street , Gnanapuram', 'POCO F4,Moto E4 Plus', '27999,9999', 37998, 'potnurisaiteja@gmail.com', 'PENDING', 'PENDING', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shopping`
--
ALTER TABLE `shopping`
  ADD PRIMARY KEY (`transaction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shopping`
--
ALTER TABLE `shopping`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
