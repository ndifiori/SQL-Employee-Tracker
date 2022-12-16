
-- first let's make sure we create the only copy of the database we want
-- now we need to create our database 
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

-- use tells us what database we want to use for our table creations

  -- our database will have 3 tables 

USE employees;

-- let's create our first table
  -- unsigned will only store positive values
  -- auto increment will generate a unique number when a new record is inserted into a table
  -- not null will say this column can't accept null values

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

-- for each of our tables we will assign a primary key to uniquely identify each record 
  -- also makes retrieving the data and joining tables easier

-- TODO: make comment for how index works

-- constraints specify rules for the data in the table
  -- will prevent actions that would destroy links between tables that we will create using foreign key

-- references defines which table table and column is used in the foreign key relationship
  -- on delete cascase allows us to delete the parent key recond and its children records without having to delete all the children records first



CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);


-- TODO: EDIT THIS to describe functionality

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);