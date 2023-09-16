CREATE TABLE form_queries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT,
    form_query_id INT,
    FOREIGN KEY (form_id) REFERENCES forms(form_id),
    FOREIGN KEY (form_query_id) REFERENCES input_ques(ques_id)
);

INSERT INTO form_queries (form_id, form_query_id) VALUES 
-- form_id 1: Lease Deed Rent Agreement
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9),
(1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18),
-- form_id 2: Agreement for Sale of House
(2, 1), (2, 2), (2, 3), (2, 13), (2, 15), (2, 16), (2, 17), (2, 18), (2, 19), (2, 20), (2, 21),
(2, 22), (2, 23), (2, 24), (2, 25), (2, 26), (2, 27), (2, 28), (2, 29), (2, 30), (2, 31),
-- form_id 3: License to Use Copyright Agreement
(3, 32), (3, 33), (3, 34), (3, 35), (3, 36), (3, 37),
-- form_id 4: Licence for royalty basis
(4, 1), (4, 2), (4, 3), (4, 16), (4, 17), (4, 18), (4, 38), (4, 39), (4, 40), (4, 41), (4, 42), 
(4, 43), (4, 44), (4, 56), (4, 57), (4, 58), (4, 59), (4, 60),
-- form_id 5: Loan Agreement with Security
(5, 1), (5, 2), (5, 3), (5, 13), (5, 18), (5, 45), (5, 46), (5, 47), (5, 48), (5, 49), (5, 50), 
(5, 51), (5, 52), (5, 53), (5, 54), (5, 55);