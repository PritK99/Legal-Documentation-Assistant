CREATE TABLE input_ques (
    ques_id INT AUTO_INCREMENT PRIMARY KEY,
    ques_label VARCHAR(50),
    ques_type VARCHAR(50),
    ques_name VARCHAR(50)
);

INSERT INTO input_ques (ques_id, ques_label, ques_type, ques_name) VALUES 
(1, "Time", "time", "time"), (2, "Day", "text", "day"), (3, "Month", "text", "month"), (4, "Tenant Name", "text", "lesse"), 
(5, "Tenant State", "text", "lesse_state"), (6, "Owner Name", "text", "lessor"), (7, "Owner State", "text", "lessor_state"), 
(8, "Rental contract in years", "number", "lease_years"), (9, "Land Location", "text", "lease_loc"), 
(10, "Rental agreement starts from which month", "text", "lease_month"), (11, "Start year of agreement", "number", "lease_year"), 
(12, "Monthly Rent", "number", "rent_monthly"), (13, "Rate of Interest", "text", "interest_rate"), (14, "Tax on Land", "number", "lease_text"),
(15, "Notice period", "number", "notice_period"), (16, "Witness 1 Name", "text", "witness_1"), (17, "Witness 2 Name", "text", "witness_2");