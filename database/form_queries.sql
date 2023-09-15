CREATE TABLE form_queries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT,
    form_query_id INT,
    FOREIGN KEY (form_id) REFERENCES forms(form_id),
    FOREIGN KEY (form_query_id) REFERENCES input_ques(ques_id)
);