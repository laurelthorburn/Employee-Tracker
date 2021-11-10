-- seeds file
USE employeetracker_db;

INSERT INTO department (name)
VALUES ("Sales"), -- 1
		("Engineering"), -- 2
        ("Finance"), -- 3
        ("Legal"), -- 4
        ("Boss"); -- 5

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 150000, 1), -- 1
("Salesperson", 50000, 1), -- 2
("Lead Engineer", 250000, 2), -- 3
("Software Engineer", 100000, 2), -- 4
("Account Manager", 120000, 3), -- 5
("Accountant", 180000, 3), -- 6
("Legal Team Lead", 350000, 4), -- 7
("Lawyer", 150000, 4), -- 8
("CEO", 999999, 5); -- 9
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES ("Pei", "Wen", 3, NULL), -- 1
	("Daniel", "Soledad", 1, NULL), -- 2
	("Samuel", "Fox", 7, NULL), -- 3
    ("Ryan", "Paragas", 4, 1),
    ("Siddharth", "Desai", 6, 2),
    ("Ryan", "Mcculloch", 8, 3),
    ("Laurel", "Thorburn", 9, NULL);