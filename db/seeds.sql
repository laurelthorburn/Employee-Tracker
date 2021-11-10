-- seeds file
USE employeetracker_db;

INSERT INTO department (name)
VALUES ("Sales"), -- 1
		("Engineering"), -- 2
        ("Finance"), -- 3
        ("Legal"); -- 4

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 150000, 1),
("Salesperson", 50000, 1),
("Lead Engineer", 250000, 2),
("Software Engineer", 100000, 2),
("Account Manager", 120000, 3),
("Accountant", 180000, 3),
("Legal Team Lead", 350000, 4),
("Lawyer", 150000, 4);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES ("Robert", "Parsons", 2, 1),
			("Laurel", "King", 5, 2),
            ("Sean", "Thorburn", 6, NULL);