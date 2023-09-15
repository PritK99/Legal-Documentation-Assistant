CREATE TABLE forms (
    form_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT,
    form_name VARCHAR(100),
    form_link VARCHAR(300),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

INSERT INTO forms (service_id, form_name, form_link) VALUES
(1, "Lease Deed", "https://res.cloudinary.com/dgi53xxbd/raw/upload/v1694706486/sih_legal_docs/Lease-Deed-_for-a-term-of-years_-Rent-Agreement-LawRato3_hbdkzy.docx"),
(1, "Agreement for sale", "https://res.cloudinary.com/dgi53xxbd/raw/upload/v1694706472/sih_legal_docs/Agreement-for-Sale-of-a-House-_Sale-Agreement_-LawRato2_w5eaxy.docx"),
(2, "Licence to use Copyright", "https://res.cloudinary.com/dgi53xxbd/raw/upload/v1694706462/sih_legal_docs/Licence-to-use-Copyright-LawRato2_va9mkc.docx"),
(2, "Agreement of License to Publish on Royalty Basis", "https://res.cloudinary.com/dgi53xxbd/raw/upload/v1694706438/sih_legal_docs/Agreement-of-License-to-Publish-on-Royalty-Basis-LawRato2_fgccyy.docx"),
(3, "Loan Agreement with Security", "https://res.cloudinary.com/dgi53xxbd/raw/upload/v1694706319/sih_legal_docs/Loan-Agreement-with-Security-LawRato2_vc8ush.docx");
