CREATE DATABASE lifehack;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--User table
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN 
);

--School table
CREATE TABLE schools (
  school_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_name VARCHAR(100) NOT NULL
);

CREATE TABLE school_relations (
  school_id UUID REFERENCES schools(school_id) NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL
);

INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Anderson Serangoon Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Anglo-Chinese Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Anglo-Chinese IB Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Catholic Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Dunman High School');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Eunoia Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Hwa Chong Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Jurong Pioneer Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Nanyang Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'National Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Raffles Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'River Valley Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, "Saint Andrew's Junior College");
INSERT INTO schools (id, school_name) VALUES (DEFAULT, "St. Joseph's Junior College");
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Tampines Meridian Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Temasek Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Victoria Junior College');
INSERT INTO schools (id, school_name) VALUES (DEFAULT, 'Yishun Innova Junior College');

--Check in question 1, 2, 3, 4, 5 
CREATE TABLE question1 (
  user_id UUID REFERENCES users(user_id) NOT NULL,
  date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  score INTEGER NOT NULL
);



