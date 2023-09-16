CREATE TABLE input_ques (
    ques_id INT PRIMARY KEY,
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
(15, "Payment deadline in months", "number", "payment_deadline"), (16, "Witness 1 Name", "text", "witness_1"), (17, "Witness 2 Name", "text", "witness_2"),
(18, "Year", "number", "year"), (19, "Vendor Name", "text", "vendor"),  (20, "Vendor's Parent Name", "text", "vendors_parent"),
(21, "Vendor Address", "text", "vendor_addr"), (22, "Purchaser's Name", "text", "purchaser"), (23, "Purchaser's Parent Name", "text", "purchaser_parent"),
(24, "Purchaser's Address", "text", "purchaser_addr"), (25, "House Address", "text", "house_addr"), (26, "House Price", "number", "house_sale_price"),
(27, "Advance Payment", "number", "advance_payment"), (28, "Advance Payment Date", "number", "advance_payment_date"),
(29, "Number of days after which Purchaser's Advocate should report", "number", "purchaser_report_days"), 
(30, "Number of days after which refund for advance payment should be given", "number", "refund_adv_days"),
(31, "Refund for Breach of Contract", "number", "refund_breach"), (32, "Name of Copyright Owner", "text", "copyright_owner"), 
(33, "Copyright Owner's Parent", "text", "copyright_owner_parent"), (34, "Copyright Owner's Address", "text", "copyright_owner_address"), 
(35, "License Awardee's Name", "text", "license_awardee"), (36, "License Payment Date", "number", "license_payment_date"), 
(37, "Agreement Date", "date", "agreement_date"), (38, "Author's Name", "text", "author"), (39, "Author's Address", "text", "author_addr"),
(40, "Publisher's Name", "text", "publisher"), (41, "Publisher's Address", "text", "publisher_addr"), (42, "Book's Name", "text", "book_name"),
(43, "Deadline for Publishing the Book in months", "number", "publish_deadline"), (44, "Royalty", "number", "royalty"), (45, "Lender's Address", "text", "lender_addr"),
(46, "Lender's Company", "text", "lender_company"), (47, "Borrower's Company", "text", "borrower_company"), (48, "Borrower's Address", "text", "borrower_addr"),
(49, "Amount paid as Capital", "number", "capital_paid"), (50, "Intercorporate loan amount", "number", "amount"), (51, "Days to repay the Loan", "number", "days_to_repay"), (52, "Penalised Rate of Interest", "number", "penalized_interest_rate")
(53, "Stock exchange on which the shares are listed", "number", "stock_exchange"), (54, "Price of each share", "number", "rate_per_share"),
(55, "Number of equity shares to be given as security", "number", "no_of_share"), (56, "How often shall the Publisher submit a statement of sales to the Author", "number", "publish_report"), 
(57, "Number of free copies to be sent to the Author", "number", "no_of_copies_to_author"), (58, "Maximum copies to be sent to the media", "number", "media_copies_limit"),
(59, "Maximum number of copies to be printed", "number", "print_limit"), (60, "Maximum Price of Book on Sale", "number", "print_max_price");