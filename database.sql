-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 12, 2021 at 12:52 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `ng-skills`
--
CREATE DATABASE IF NOT EXISTS `ng-skills` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ng-skills`;

-- --------------------------------------------------------

--
-- Table structure for table `favorite_publications`
--
-- Creation: Apr 08, 2021 at 06:35 PM
--

DROP TABLE IF EXISTS `favorite_publications`;
CREATE TABLE `favorite_publications` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `publicationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `favorite_publications`
--

INSERT INTO `favorite_publications` (`id`, `uid`, `publicationId`) VALUES
(2, 2, 1),
(3, 2, 4),
(4, 2, 3),
(35, 3, 1),
(36, 3, 2),
(38, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `favorite_users`
--
-- Creation: Apr 09, 2021 at 01:18 PM
-- Last update: Apr 12, 2021 at 12:47 PM
--

DROP TABLE IF EXISTS `favorite_users`;
CREATE TABLE `favorite_users` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `favoriteId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `favorite_users`
--

INSERT INTO `favorite_users` (`id`, `uid`, `favoriteId`) VALUES
(3, 3, 1),
(4, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--
-- Creation: Apr 08, 2021 at 11:14 AM
--

DROP TABLE IF EXISTS `publications`;
CREATE TABLE `publications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `userId`, `createAt`, `title`, `text`) VALUES
(1, 1, '2021-04-08 13:16:43', 'Publication Test 1', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at tristique purus. Nunc ut aliquet leo, eu posuere nunc. Aenean orci libero, cursus in ultrices non, lacinia eu leo. Nullam purus sem, fringilla eget lacinia sit amet, accumsan ut purus. Proin pellentesque quam dolor. Pellentesque purus mi, luctus id auctor sit amet, fermentum a tellus. Donec ac dolor in mi sollicitudin tincidunt vel hendrerit tellus. Integer ut sem et dui maximus finibus. Nullam eros ex, mollis non varius eget, porta a lectus. Ut a urna et sem pellentesque sollicitudin ac vitae nibh. Suspendisse gravida blandit porta. Curabitur nec nisi id tortor varius scelerisque.\r\n\r\nVestibulum viverra nisi id justo tincidunt dictum. Suspendisse iaculis vel elit ut gravida. Sed eros nisi, tincidunt vel nisi sed, rhoncus molestie tortor. Nulla at egestas lectus. Sed nulla felis, luctus luctus condimentum eget, convallis nec elit. Mauris laoreet neque ultrices leo varius, dictum sollicitudin sem accumsan. Vivamus nec sem accumsan tortor accumsan ornare eget ac est. Sed sit amet fermentum ipsum. Morbi urna diam, tincidunt sed malesuada sed, feugiat a diam. Cras tempor blandit ipsum in molestie. Vivamus vel gravida erat. '),
(2, 2, '2021-04-08 13:17:14', 'Publication Test 2', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at tristique purus. Nunc ut aliquet leo, eu posuere nunc. Aenean orci libero, cursus in ultrices non, lacinia eu leo. Nullam purus sem, fringilla eget lacinia sit amet, accumsan ut purus. Proin pellentesque quam dolor. Pellentesque purus mi, luctus id auctor sit amet, fermentum a tellus. Donec ac dolor in mi sollicitudin tincidunt vel hendrerit tellus. Integer ut sem et dui maximus finibus. Nullam eros ex, mollis non varius eget, porta a lectus. Ut a urna et sem pellentesque sollicitudin ac vitae nibh. Suspendisse gravida blandit porta. Curabitur nec nisi id tortor varius scelerisque.\r\n\r\nVestibulum viverra nisi id justo tincidunt dictum. Suspendisse iaculis vel elit ut gravida. Sed eros nisi, tincidunt vel nisi sed, rhoncus molestie tortor. Nulla at egestas lectus. Sed nulla felis, luctus luctus condimentum eget, convallis nec elit. Mauris laoreet neque ultrices leo varius, dictum sollicitudin sem accumsan. Vivamus nec sem accumsan tortor accumsan ornare eget ac est. Sed sit amet fermentum ipsum. Morbi urna diam, tincidunt sed malesuada sed, feugiat a diam. Cras tempor blandit ipsum in molestie. Vivamus vel gravida erat. '),
(3, 1, '2021-04-08 13:18:00', 'Publication Test 3', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at tristique purus. Nunc ut aliquet leo, eu posuere nunc. Aenean orci libero, cursus in ultrices non, lacinia eu leo. Nullam purus sem, fringilla eget lacinia sit amet, accumsan ut purus. Proin pellentesque quam dolor. Pellentesque purus mi, luctus id auctor sit amet, fermentum a tellus. Donec ac dolor in mi sollicitudin tincidunt vel hendrerit tellus. Integer ut sem et dui maximus finibus. Nullam eros ex, mollis non varius eget, porta a lectus. Ut a urna et sem pellentesque sollicitudin ac vitae nibh. Suspendisse gravida blandit porta. Curabitur nec nisi id tortor varius scelerisque.\r\n\r\nVestibulum viverra nisi id justo tincidunt dictum. Suspendisse iaculis vel elit ut gravida. Sed eros nisi, tincidunt vel nisi sed, rhoncus molestie tortor. Nulla at egestas lectus. Sed nulla felis, luctus luctus condimentum eget, convallis nec elit. Mauris laoreet neque ultrices leo varius, dictum sollicitudin sem accumsan. Vivamus nec sem accumsan tortor accumsan ornare eget ac est. Sed sit amet fermentum ipsum. Morbi urna diam, tincidunt sed malesuada sed, feugiat a diam. Cras tempor blandit ipsum in molestie. Vivamus vel gravida erat. '),
(4, 1, '2021-04-08 13:53:23', 'Publication Test 4', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at tristique purus. Nunc ut aliquet leo, eu posuere nunc. Aenean orci libero, cursus in ultrices non, lacinia eu leo. Nullam purus sem, fringilla eget lacinia sit amet, accumsan ut purus. Proin pellentesque quam dolor. Pellentesque purus mi, luctus id auctor sit amet, fermentum a tellus. Donec ac dolor in mi sollicitudin tincidunt vel hendrerit tellus. Integer ut sem et dui maximus finibus. Nullam eros ex, mollis non varius eget, porta a lectus. Ut a urna et sem pellentesque sollicitudin ac vitae nibh. Suspendisse gravida blandit porta. Curabitur nec nisi id tortor varius scelerisque.\r\n\r\nVestibulum viverra nisi id justo tincidunt dictum. Suspendisse iaculis vel elit ut gravida. Sed eros nisi, tincidunt vel nisi sed, rhoncus molestie tortor. Nulla at egestas lectus. Sed nulla felis, luctus luctus condimentum eget, convallis nec elit. Mauris laoreet neque ultrices leo varius, dictum sollicitudin sem accumsan. Vivamus nec sem accumsan tortor accumsan ornare eget ac est. Sed sit amet fermentum ipsum. Morbi urna diam, tincidunt sed malesuada sed, feugiat a diam. Cras tempor blandit ipsum in molestie. Vivamus vel gravida erat. ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Creation: Mar 31, 2021 at 01:24 PM
-- Last update: Apr 12, 2021 at 12:48 PM
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `token` varchar(250) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `createAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastConnect` datetime DEFAULT NULL,
  `isLogged` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `token`, `name`, `firstname`, `createAt`, `lastConnect`, `isLogged`) VALUES
(1, 'ali.errih@gmail.com', '$2b$10$LK7EatyUJWYgjWZSmSedF.LlhLxdNUK8dja8clQxwQE4moYafxS1W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYWxpLmVycmloQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MTcxOTI5NDd9._6IMbLX5703kvWqCHz9lgnChD8FJM2RuLRZ2hdhYk8E', 'ali', 'Errih', '2021-03-31 14:15:47', '2021-04-07 17:28:17', 0),
(2, 'v.chablaix@gmail.com', '$2b$10$kupp78KUS7oKIr.Ki.zSjutRdrJatP4vyoGGimBhQ.FT4.wpYV3RW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidi5jaGFibGFpeEBnbWFpbC5jb20ifSwiaWF0IjoxNjE3ODExMjUyfQ.K2BXJv_tLIq8sApzb0h-U-mziSE6-7typuVJuGgcrT8', 'Vincent', 'Chablaix', '2021-04-07 18:00:52', '2021-04-09 01:22:52', 0),
(3, 'tintin@gmail.com', '$2b$10$DjVxUcq0FmAFSuY7B7tuROCwXdgPrhgwNjrXmYuPOeqSp7ysATvd.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGludGluQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MTc5MjQxODd9.5VyukABMT6qj-dmnMAnQgiBp4kLgOEbkaqV4OvvUWh4', 'Tintin', 'Toto', '2021-04-09 01:23:07', '2021-04-12 14:48:33', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorite_publications`
--
ALTER TABLE `favorite_publications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_publicationId` (`publicationId`) USING BTREE,
  ADD KEY `fk_uid` (`uid`) USING BTREE;

--
-- Indexes for table `favorite_users`
--
ALTER TABLE `favorite_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_uid` (`uid`) USING BTREE,
  ADD KEY `fk_favoriteId` (`favoriteId`) USING BTREE;

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId` (`userId`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorite_publications`
--
ALTER TABLE `favorite_publications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `favorite_users`
--
ALTER TABLE `favorite_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorite_publications`
--
ALTER TABLE `favorite_publications`
  ADD CONSTRAINT `favorite_publications_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorite_publications_ibfk_2` FOREIGN KEY (`publicationId`) REFERENCES `publications` (`id`);

--
-- Constraints for table `favorite_users`
--
ALTER TABLE `favorite_users`
  ADD CONSTRAINT `favorite_users_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorite_users_ibfk_2` FOREIGN KEY (`favoriteId`) REFERENCES `users` (`id`);

--
-- Constraints for table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
