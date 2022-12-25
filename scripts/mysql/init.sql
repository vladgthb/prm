-- DB Initialization
CREATE DATABASE IF NOT EXISTS prm;
CREATE TABLE IF NOT EXISTS prm.personnel_availability (
    id INT,
    `name` VARCHAR (50) NOT NULL,
    `available` BIT DEFAULT true NOT NULL,
    `type` VARCHAR (50) NOT NULL,
     PRIMARY KEY (id)
);
-- Dough Chefs
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (1, 'dough chefs 1', true, 'dough');
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (2, 'dough chefs 2', true, 'dough');
-- Topping Chefs
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (3, 'topping chefs 1', true, 'topping');
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (4, 'topping chefs 2', true, 'topping');
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (5, 'topping chefs 3', true, 'topping');
-- Oven Chefs
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (6, 'oven chefs 3', true, 'oven');
-- Waiters
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (7, 'waiter 1', true, 'waiter');
INSERT INTO personnel_availability (`id`, `name`, `available` , `type`) VALUES (8, 'waiter 2', true, 'waiter');
-- Orders
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'n/a',
  `table_number` int(11) NOT NULL DEFAULT 0,
  `processed` bit(1) NOT NULL DEFAULT b'0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- Toppings
CREATE TABLE `toppings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'n/a',
  `processed` bit(1) NOT NULL DEFAULT b'0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `orderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b6d1c13c657b14f365af6eef378` (`orderId`),
  CONSTRAINT `FK_b6d1c13c657b14f365af6eef378` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
