DROP DATABASE IF EXISTS workout_log;
CREATE DATABASE workout_log;

USE workout_log;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS logs;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
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


CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME NOT NULL,
  message VARCHAR(255),
  usernameId INT,
  FOREIGN KEY (usernameId) REFERENCES users(id)
);

CREATE TABLE messageRelation (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  messageId INT,
  fromId INT,
  toId INT,
  FOREIGN KEY (messageId) REFERENCES messages(id),
  FOREIGN KEY (fromId) REFERENCES users(id),
  FOREIGN KEY (toId) REFERENCES users(id)
);






