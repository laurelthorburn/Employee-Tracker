-- id: INT PRIMARY KEY
-- name: VARCHAR(30) to hold department name


--SALARY
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) TO HOLD ROLE TITLE
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role blongs to

-- ROLE 
-- id: INT PRIMARY KEY
-- title: VARCHAR(30) TO HOLD ROLE TITLE
-- salary: DECIMAL to hold role salary
-- department_id: INT to hold reference to department role blongs to

-- EMPLOYEE
-- id: INT PRIMARY KEY
-- first_name: VARCHAR(30) to hold employee first name
-- last_name: VARCHAR(30) to hold employee last name
-- role_id: INT to hold employee role
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)