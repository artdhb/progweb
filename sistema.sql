-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-03-2017 a las 02:53:06
-- Versión del servidor: 5.7.14
-- Versión de PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `realizado_el` datetime NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`id`, `usuario_id`, `monto`, `realizado_el`, `activo`) VALUES
(1, 2, 100, '2017-03-02 03:57:55', 1),
(2, 3, 500, '2017-03-02 03:59:56', 1),
(3, 3, 500, '2017-03-02 04:00:08', 1),
(4, 5, 50, '2017-03-02 05:36:43', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `realizado_el` datetime NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id`, `usuario_id`, `monto`, `realizado_el`, `activo`) VALUES
(1, 2, 1000, '2017-03-02 03:57:44', 1),
(2, 3, 5000, '2017-03-02 03:59:10', 1),
(3, 3, 2000, '2017-03-02 03:59:51', 1),
(4, 5, 100, '2017-03-02 05:36:28', 1),
(5, 4, 100, '2017-03-02 05:46:29', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deuda` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `password`, `deuda`, `activo`) VALUES
(1, 'Arturo', '$2a$10$gHTrZmFTvQrj6ry.ZA6ipuyaYbUIt/WpgdEo4./B.NGlbQT.OFXmK', 0, 1),
(2, 'prueba', '$2a$10$kxL1dUj527.SZ4j3dpwvlu6MIDtYlYesFfbdNYkDAuTvk/jokUJhS', 900, 1),
(3, 'usuario', '$2a$10$c.O9mkW5v6ziwij3S1n1ueNzs/EF7pQ4mgxQnECMErfSl3IDdrcF2', 6000, 1),
(4, 'uno', '$2a$10$7n8jx0C2HP7YPBBdp86gkuWJnSITY7oB2NtlBY9TptM9oC8KlpC7m', 100, 1),
(5, 'qwerty', '$2a$10$/CV3jFEQt7aRvJILF46yzOKV6uWbWc0B2FEf3CqGKpL04feqL8pTq', 50, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
