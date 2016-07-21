DROP DATABASE divvy;
CREATE DATABASE divvy;

USE divvy;

CREATE TABLE users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fb_id INT,
  fname VARCHAR(100) NOT NULL,
  lname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(50) NOT NULL,
  img_file VARCHAR(255),
  active BOOLEAN,
  gender VARCHAR(50),
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  first_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expense_pools (
  epool_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  entered_by_id INT NOT NULL,
  closed BOOLEAN,

  FOREIGN KEY (entered_by_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE expenses (
  expense_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  amount DECIMAL(6, 2) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_by_id INT NOT NULL,
  entered_by_id INT NOT NULL,
  epool_id INT NOT NULL,

  FOREIGN KEY (paid_by_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (entered_by_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (epool_id) REFERENCES expense_pools(epool_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE expense_pools_users (
  epools_users_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  epool_id INT NOT NULL,
  user_id INT NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (epool_id) REFERENCES expense_pools(epool_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE users_expenses (
  users_expenses_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  paid TIMESTAMP,
  percent DECIMAL(3,2),
  expense_id INT NOT NULL,
  user_id INT NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (expense_id) REFERENCES expenses(expense_id) ON UPDATE CASCADE ON DELETE CASCADE

);

-- Test Data:
INSERT INTO users (fname, lname, email, password)
VALUES ('Hannah', 'Henderson', 'hh@gmail.com', 'abc'),
       ('Dennis', 'Ting', 'dt@gmail.com', '1234'),
       ('James', 'Ramadan', 'jr@gmail.com', '1234'),
       ('Wayne', 'Adams', 'wa@gmail.com', '1234');

INSERT INTO expense_pools (name, description, entered_by_id)
VALUES ('Roadtrip', 'Expedition into the wild', 4),
       ('Roman Holiday', 'Cultured, so very cultured', 1),
       ('Roommate Life', 'This always happens', 3);

INSERT INTO expenses (name, description, amount, paid_by_id, entered_by_id, epool_id)
VALUES ('car rental', 'three days', 300, 1, 2, 1),
       ('gas', 'holy gas guzzler 50g!', 50, 3, 1, 1),
       ('snacks', 'road snacks', 20.4, 4, 1, 1),
       ('beer', 'camp time', 40, 3, 1, 1),
       ('gas', '', 53, 2, 1, 1),
       ('tolls', '', 25, 1, 1, 1);

INSERT INTO users_expenses (expense_id, user_id) 
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (2, 1),
       (2, 2),
       (2, 3),
       (2, 4),
       (3, 1),
       (3, 2),
       (3, 3),
       (3, 4),
       (4, 1),
       (4, 2),
       (4, 3),
       (4, 4),
       (5, 1),
       (5, 2),
       (5, 3),
       (5, 4),
       (6, 1),
       (6, 2),
       (6, 3),
       (6, 4);

INSERT INTO expense_pools_users (epool_id, user_id) 
VALUES (1, 1),
       (1, 2), 
       (1, 3), 
       (1, 4), 
       (2, 4), 
       (2, 3), 
       (3, 1), 
       (3, 4); 


