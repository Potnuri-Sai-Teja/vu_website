-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2022 at 08:00 AM
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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `p_id` int(11) NOT NULL,
  `p_cat_id` int(11) DEFAULT NULL,
  `p_brand_id` int(11) DEFAULT NULL,
  `p_name` varchar(256) DEFAULT NULL,
  `p_description` varchar(256) DEFAULT NULL,
  `p_price` int(11) DEFAULT NULL,
  `p_quantity` int(11) DEFAULT NULL,
  `p_images` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`p_id`, `p_cat_id`, `p_brand_id`, `p_name`, `p_description`, `p_price`, `p_quantity`, `p_images`) VALUES
(1, 1, 1, 'POCO X3', '    6 GB RAM | 64 GB ROM | Expandable Upto 512 GB\r\n    16.94 cm (6.67 inch) Full HD+ Display\r\n    64MP + 13MP + 2MP + 2MP | 20MP Front Camera\r\n    6000 mAh Lithium-ion Polymer Battery\r\n    Qualcomm Snapdragon 732G Processor', 17999, 10, 'poco_X3_1_2022723.jpeg,poco_X3_main_2022723.jpeg,poco-x3-2_2022723.jpeg,poco-x3-3_2022723.jpeg,poco-x3-4_2022723.jpeg'),
(3, 1, 1, 'POCO F4', '    6 GB RAM | 128 GB ROM\r\n    16.94 cm (6.67 inch) Full HD+ Display\r\n    64MP + 8MP + 2MP | 20MP Front Camera\r\n    4500 mAh Lithium-ion Polymer Battery\r\n    Qualcomm Snapdragon 870 Processor', 27999, 10, 'poco_F4_1_2022724.jpeg,poco_F4_2_2022724.jpeg,poco_F4_3_2022724.jpeg,poco_F4_4_2022724.jpeg,poco_F4_main_2022724.jpeg'),
(4, 1, 1, 'POCO C31', '    4 GB RAM | 64 GB ROM | Expandable Upto 512 GB\r\n    16.59 cm (6.53 inch) HD+ Display\r\n    13MP + 2MP + 2MP | 5MP Front Camera\r\n    5000 mAh Lithium-ion Polymer Battery\r\n    MediaTek Helio G35 Processor', 7999, 5, 'poco_C31_1_2022724.jpeg,poco_C31_2_2022724.jpeg,poco_C31_3_2022724.jpeg,poco_C31_4_2022724.jpeg,poco_C31_main_2022724.jpeg'),
(5, 1, 2, 'SAMSUNG Galaxy M33 5G', '    6 GB RAM | 128 GB ROM\r\n    16.76 cm (6.6 inch) Display\r\n    50MP Rear Camera\r\n    6000 mAh Battery', 16999, 10, 'samsun_galaxy_M33_1_2022724.jpeg,samsun_galaxy_M33_2_2022724.jpeg,samsun_galaxy_M33_3_2022724.jpeg,samsung_galaxy_M33_main_2022724.jpeg'),
(6, 1, 2, 'SAMSUNG Galaxy S21 FE 5G', '8 GB RAM | 128 GB ROM\r\n16.26 cm (6.4 inch) Display\r\n32MP Rear Camera\r\n4500 mAh Battery', 49999, 5, 'samsun_galax_S21_main_2022724.jpeg,samsun_galaxy_S21_3_2022724.jpeg,samsung_galaxy_S21__2022724.jpeg,samsung_galaxy_S21_2_2022724.jpeg'),
(7, 1, 4, 'Moto E4 Plus', '3 GB RAM | 32 GB ROM | Expandable Upto 128 GB\r\n13.97 cm (5.5 inch) HD Display\r\n13MP Rear Camera | 5MP Front Camera\r\n5000 mAh Li-Ion Polymer Battery\r\nMediaTek MTK6737 1.3GHz Processor', 9999, 20, 'moto_e4_plus_1_2022724.jpeg,moto_e4_plus_2_2022724.jpeg,moto_e4_plus_3_2022724.jpeg,motorola_moto_e4_plus_main_2022724.jpeg'),
(8, 1, 4, 'MOTOROLA Edge 30', '8 GB RAM | 128 GB ROM\r\n16.64 cm (6.55 inch) Full HD+ Display\r\n50MP + 50MP + 2MP | 32MP Front Camera\r\n4020 mAh Lithium Battery Qualcomm Snapdragon 778G Plus Processor', 29999, 5, 'moto_edge_30_1_2022724.jpeg,moto_edge_30_2_2022724.jpeg,moto_edge_30_3_2022724.jpeg,moto_edge_30_4_2022724.jpeg,moto_edge_30_5_2022724.jpeg,moto_edge_30_main_2022724.jpeg'),
(9, 1, 10, 'vivo V9', '4 GB RAM | 64 GB ROM | Expandable Upto 256 GB\r\n16.0 cm (6.3 inch) Full HD+ Display\r\n16MP + 5MP | 24MP Front Camera\r\n3260 mAh Li-ion Battery\r\n Qualcomm Snapdragon 626 Processor', 26000, 3, 'vivo_v9_1_2022724.jpeg,vivo_v9_2_2022724.jpeg,vivo_v9_3_2022724.jpeg,vivo_v9_4_2022724.jpeg,vivo_v9_main_2022724.jpeg'),
(10, 1, 3, 'OPPO K10 5G', '8 GB RAM | 128 GB ROM | Expandable Upto 1 TB\r\n16.66 cm (6.56 inch) HD+ Display\r\n48MP + 2MP | 8MP Front Camera\r\n5000 mAh Lithium Ion Polymer BatteryMediatek Dimensity 810 Processor', 17499, 5, 'oppo_k10_1_2022724.jpeg,oppo_k10_2_2022724.jpeg,oppo_k10_main_2022724.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`p_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
