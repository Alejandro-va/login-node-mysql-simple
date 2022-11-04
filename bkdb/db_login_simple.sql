-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2022 a las 21:14:14
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_login_simple`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `name`, `rol`, `pass`) VALUES
(21, 'Alejandro', 'Alejandro Hernandez', 'admin', '$2a$08$cOjMNXiD0fAsjzkTMtpEXuu7VeR4UlcsNgAlgJr3hIIrzWlUjwxTe'),
(22, 'admin', 'admin jesus', 'admin', '$2a$08$vk/OVpMn2oZnskbpYgWXbOudeIyv531oj1TGrw2g6kqqCdSc.tSte'),
(23, 'josea', 'admin', 'admin', '$2a$08$pQx.tySfDgqtWSTfMIpgdOegI23jYktftw74GgPcLSmCGUY1L25Ri'),
(24, 'Franco', 'Franco di sicca', 'admin', '$2a$08$qH8HUaoldnRtcOAUzIuI2uBkecuav6LjH7PBdfaT0lt7R1O3Gjp8e'),
(25, 'Jose', 'Alejandro Hernandez', 'admin', '$2a$08$KbGJjd7XhVeJ9mv4BrT7jO6yCkz30.5yk5OkmIL0niG2SZ0nUqd/S');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
