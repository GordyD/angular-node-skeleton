DROP DATABASE IF EXISTS `tripjoin_db`;

DROP USER IF EXISTS `tripjoin_user`;

CREATE USER `tripjoin_user` CREATEDB CREATEUSER `Tr1ppy`;

CREATE DATABASE `tripjoin_db` OWNER `tripjoin_user`;

\CONNECT `tripjoin_db`;

# Base Tables
CREATE TABLE `user` (
	`id` SERIAL PRIMARY KEY, 
	`first_name` VARCHAR(25),
	`last_name` VARCHAR(50),
	`facebook_id` VARCHAR(20),
	`image_url` VARCHAR(150)
);

CREATE TABLE `location` (
	`id` SERIAL PRIMARY KEY,
	`canonical` VARCHAR(255),
	`city` VARCHAR(100),
	`region` VARCHAR(100),
	`country` VARCHAR(100),
	`coordinates` POINT
);

CREATE TABLE `trip` (
	`id` SERIAL PRIMARY KEY,
	`location_id` INTEGER,
	`month` INTEGER,
	`year` INTEGER,
	`duration` INTEGER,
	`budget` INTEGER,
	`image_url` VARCHAR(150),
	`description` TEXT,
	FOREIGN KEY (`location_id`) REFERENCES `location` (`id`)
);

CREATE TABLE `tag` (
	`id` SERIAL PRIMARY KEY,
	`name` VARCHAR(255)
);

# Join Tables
CREATE TABLE `trip_user` (
	`trip_id` INTEGER,
	`user_id` INTEGER,
	`owner` BOOLEAN,
	`interested` BOOLEAN, 
	FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

CREATE TABLE `trip_tag` (
	`trip_id` INTEGER,
	`tag_id` INTEGER,
	FOREIGN KEY (`trip_id`) REFERENCES `trip` (`id`),
	FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
);
CREATE TABLE `user_friend` (
	`user_id` INTEGER,
	`facebook_id` VARCHAR(20),
	FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) 
);

CREATE TABLE `user_tag` (
	`user_id` INTEGER,
	`tag_id` INTEGER,
	FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
	FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
);

ALTER TABLE `user` OWNER TO `tripjoin_user`;
ALTER TABLE `location` OWNER TO `tripjoin_user`;
ALTER TABLE `trip` OWNER TO `tripjoin_user`;
ALTER TABLE `user` OWNER TO `tripjoin_user`;
ALTER TABLE `tag` OWNER TO `tripjoin_user`;
ALTER TABLE `trip_user` OWNER TO `tripjoin_user`;
ALTER TABLE `trip_tag` OWNER TO `tripjoin_user`;
ALTER TABLE `user_friend` OWNER TO `tripjoin_user`;
ALTER TABLE `user_tag` OWNER TO `tripjoin_user`;