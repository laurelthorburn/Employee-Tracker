-- seeds file
USE employeetracker_db;

INSERT INTO department (name)
VALUES ("Sales"), -- 1
		("Engineering"), -- 2
        ("Finance"), -- 3
        ("Legal"); -- 4

INSERT INTO role (title, salary, department_id)
VALUES ("Audiologist", 550550, 6),
		("Tutor", 150000, 4),
        ("Baseball player", 30000, 3),
        ("Dawg", 45034, 1),
        ("Dawkta", 36899567, 2),
        ("Seannyyyyy", 92500, 5);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES ("Robert", "Parsons", 2, 1),
			("Laurel", "King", 5, 2),
            ("Sean", "Thorburn", 6, NULL);