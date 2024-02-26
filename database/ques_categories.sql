CREATE TABLE ques_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(70)
);

INSERT INTO ques_categories (id, category_name) VALUES
(1, 'Parties'), (2, 'Terms and Payment'), (3, 'Signing Date'), (4, 'Property Details'), (5, 'Intellectual Property Details')
