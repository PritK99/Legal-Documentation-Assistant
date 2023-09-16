CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(50)
);

INSERT INTO services (service_name) VALUES ("Contracts"), ("Trademark & Copyright"), ("Banking/Finance"), 
("Property"), ("Bonds"), ("Criminal"), ("Divorce/Family Laws");