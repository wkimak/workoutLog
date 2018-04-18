DROP DATABASE IF EXISTS workout_log;
CREATE DATABASE workout_log;

USE workout_log;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS logs;


CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL
);

CREATE TABLE logs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  exercise VARCHAR(255) NOT NULL,
  sets INT,
  reps INT,
  created_at DATE NOT NULL,
  usernameId INT,
  FOREIGN KEY (usernameId) REFERENCES users(id) 
);
