-- Drop the existing database and user
DROP DATABASE IF EXISTS tripjoin_db;
DROP USER IF EXISTS tripjoin_user;

-- Create the database and the user
CREATE USER tripjoin_user WITH CREATEDB CREATEUSER PASSWORD 'Tr1ppy';
CREATE DATABASE tripjoin_db OWNER tripjoin_user;

-- Connect to the database
\c tripjoin_db;

-- Base Tables
CREATE TABLE member (
	id SERIAL PRIMARY KEY, 
	first_name VARCHAR(25),
	last_name VARCHAR(50),
	facebook_id VARCHAR(20),
	image_url VARCHAR(150)
);

CREATE TABLE location (
	id SERIAL PRIMARY KEY,
	canonical VARCHAR(255),
	formatted VARCHAR(255),
	locality VARCHAR(255),
	city VARCHAR(100),
	county VARCHAR(100),
	region VARCHAR(100),
	country VARCHAR(100),
	coordinates POINT
);

CREATE TABLE trip (
	id SERIAL PRIMARY KEY,
	location_id INTEGER,
	month INTEGER,
	year INTEGER,
	duration INTEGER,
	budget INTEGER,
	image_url VARCHAR(150),
	description TEXT,
	FOREIGN KEY (location_id) REFERENCES location(id)
);

CREATE TABLE tag (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255)
);

-- Join Tables
CREATE TABLE member_email (
	email VARCHAR(100) PRIMARY KEY,
	member_id INTEGER,
	FOREIGN KEY (member_id) REFERENCES member(id)
);

CREATE TABLE member_login (
	id SERIAL PRIMARY KEY,
	member_id INTEGER,
	passhash VARCHAR(100),
	salt VARCHAR(32),
	FOREIGN KEY (member_id) REFERENCES member(id)
);

CREATE TABLE trip_member (
	trip_id INTEGER,
	member_id INTEGER,
	owner BOOLEAN,
	interested BOOLEAN, 
	FOREIGN KEY (trip_id) REFERENCES trip(id),
	FOREIGN KEY (member_id) REFERENCES member(id)
);

CREATE TABLE trip_tag (
	trip_id INTEGER,
	tag_id INTEGER,
	FOREIGN KEY (trip_id) REFERENCES trip(id),
	FOREIGN KEY (tag_id) REFERENCES tag(id)
);
CREATE TABLE member_friend (
	member_id INTEGER,
	facebook_id VARCHAR(20),
	FOREIGN KEY (member_id) REFERENCES member(id) 
);

CREATE TABLE member_tag (
	member_id INTEGER,
	tag_id INTEGER,
	FOREIGN KEY (member_id) REFERENCES member(id),
	FOREIGN KEY (tag_id) REFERENCES tag(id)
);

-- Hand over ownership of tables to database owner
ALTER TABLE member OWNER TO tripjoin_user;
ALTER TABLE location OWNER TO tripjoin_user;
ALTER TABLE trip OWNER TO tripjoin_user;
ALTER TABLE member OWNER TO tripjoin_user;
ALTER TABLE tag OWNER TO tripjoin_user;
ALTER TABLE member_email OWNER TO tripjoin_user;
ALTER TABLE member_login OWNER TO tripjoin_user;
ALTER TABLE trip_member OWNER TO tripjoin_user;
ALTER TABLE trip_tag OWNER TO tripjoin_user;
ALTER TABLE member_friend OWNER TO tripjoin_user;
ALTER TABLE member_tag OWNER TO tripjoin_user;