-- id: INT PRIMARY KEY
-- name: VARCHAR(30) to hold department name


-- SALARY
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) TO HOLD ROLE TITLE
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role blongs to

-- ROLE 
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) TO HOLD ROLE TITLE
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role belongs to

-- EMPLOYEE
-- id: INT PRIMARY KEY
-- first_name: VARCHAR(30) to hold employee first name
-- last_name: VARCHAR(30) to hold employee last name
-- role_id: INT to hold employee role
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
	manager_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,
	FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
