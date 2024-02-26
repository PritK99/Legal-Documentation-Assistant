CREATE TABLE input_ques (
    ques_id INT PRIMARY KEY,
    ques_label VARCHAR(150),
    ques_type VARCHAR(50),
    ques_name VARCHAR(50),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES ques_categories(id)
);

INSERT INTO input_ques (ques_id, ques_label, ques_type, ques_name, category_id) VALUES 
(1, "Time", "time", "time", 3), (2, "Day", "text", "day", 3), (3, "Month", "text", "month", 3), (4, "Tenant Name", "text", "lesse", 1), 
(5, "Tenant State", "text", "lesse_state", 1), (6, "Owner Name", "text", "lessor", 1), (7, "Owner State", "text", "lessor_state", 1), 
(8, "Rental contract in years", "number", "lease_years", 2), (9, "Land Location", "text", "lease_loc", 4), 
(10, "Rental agreement starts from which month", "text", "lease_month", 2), (11, "Start year of agreement", "number", "lease_year", 2), 
(12, "Monthly Rent", "number", "rent_monthly", 2), (13, "Rate of Interest", "text", "interest_rate", 2), (14, "Tax on Land", "number", "lease_text", 2),
(15, "Payment deadline in months", "number", "payment_deadline", 2), (16, "Witness 1 Name", "text", "witness_1", 1), (17, "Witness 2 Name", "text", "witness_2", 1),
(18, "Year", "number", "year", 2), (19, "Vendor Name", "text", "vendor", 1),  (20, "Vendor's Parent Name", "text", "vendors_parent", 1),
(21, "Vendor Address", "text", "vendor_addr", 1), (22, "Purchaser's Name", "text", "purchaser", 1), (23, "Purchaser's Parent Name", "text", "purchaser_parent", 1),
(24, "Purchaser's Address", "text", "purchaser_addr", 1), (25, "House Address", "text", "house_addr", 4), (26, "House Price", "number", "house_sale_price", 2),
(27, "Advance Payment", "number", "advance_payment", 2), (28, "Advance Payment Date", "number", "advance_payment_date", 2),
(29, "Number of days after which Purchaser's Advocate should report", "number", "purchaser_report_days", 2), 
(30, "Number of days after which refund for advance payment should be given", "number", "refund_adv_days", 2),
(31, "Refund for Breach of Contract", "number", "refund_breach", 2), (32, "Name of Copyright Owner", "text", "copyright_owner", 1), 
(33, "Copyright Owner's Parent", "text", "copyright_owner_parent", 1), (34, "Copyright Owner's Address", "text", "copyright_owner_address", 1), 
(35, "License Awardee's Name", "text", "license_awardee", 1), (36, "License Payment Date", "number", "license_payment_date", 2), 
(37, "Agreement Date", "date", "agreement_date", 2), (38, "Author's Name", "text", "author", 1), (39, "Author's Address", "text", "author_addr", 1),
(40, "Publisher's Name", "text", "publisher", 1), (41, "Publisher's Address", "text", "publisher_addr", 1), (42, "Book's Name", "text", "book_name", 5),
(43, "Deadline for Publishing the Book in months", "number", "publish_deadline", 2), (44, "Royalty", "number", "royalty", 2), (45, "Lender's Address", "text", "lender_addr", 1),
(46, "Lender's Company", "text", "lender_company", 4), (47, "Borrower's Company", "text", "borrower_company", 4), (48, "Borrower's Address", "text", "borrower_addr", 1),
(49, "Amount paid as Capital", "number", "capital_paid", 2), (50, "Intercorporate loan amount", "number", "amount", 2), (51, "Days to repay the Loan", "number", "days_to_repay", 2), (52, "Penalised Rate of Interest", "number", "penalized_interest_rate", 2),
(53, "Stock exchange on which the shares are listed", "number", "stock_exchange", 2), (54, "Price of each share", "number", "rate_per_share", 2),
(55, "Number of equity shares to be given as security", "number", "no_of_share", 2), (56, "How often shall the Publisher submit a statement of sales to the Author", "number", "publish_report", 2), 
(57, "Number of free copies to be sent to the Author", "number", "no_of_copies_to_author", 2), (58, "Maximum copies to be sent to the media", "number", "media_copies_limit", 2),
(59, "Maximum number of copies to be printed", "number", "print_limit", 2), (60, "Maximum Price of Book on Sale", "number", "print_max_price", 2);