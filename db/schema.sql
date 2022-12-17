
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
  name VARCHAR(30) UNIQUE NOT NULL
);

-- for each of our tables we will assign a primary key to uniquely identify each record 
  -- also makes retrieving the data and joining tables easier

-- index can't be seen by the user but they help retrieve data quicker
  -- it does this BY setting up the column data of our search conditions to be in a sorted order
  -- we are going to create an index of our department_id

-- constraints specify rules for the data in the table
  -- will prevent actions that would destroy links between tables that we will create using foreign key
  -- constraints will also limit the type of data that can go into the table

-- foreign key
  -- the table with the foreign key is the child table 
  -- the table with the primary key is the parent table
  -- so here how we will link this
    -- foreign key () -> creates a foreign key (deparment_id) which is REFERENCED from the department table specifically the id column 

  -- on delete cascase allows us to delete the parent key recond and its children records without having to delete all the children records first

  -- this is an example of a one to many relation
    -- ROLE table is our junction table to allow many to many relations between our department table and emmployee table

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- this is an example of a many to many relationship 

-- so our tables go like this 
  -- DEPARTMENT (id = PK) --> ROLE (id = PK)(department_id = FK) -> EMPLOYEE (id = PK)(role_ id = FK)(manager_id = FK)

    -- our DEPARTMENT table has our column with the department id 

    -- in our ROLE table each department can have multiple roles 

    -- THEN our EMPLOYEE table each role could have multiple employees

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);