import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

# create a connection with the database
conn = psycopg2.connect(database=os.getenv('DATABASE_NAME'), user=os.getenv('DATABASE_USER'),
                        password=os.getenv('PASSWORD'), host=os.getenv('DATABASE_HOST'), port=os.getenv('DATABASE_PORT'))
  
# create a cursor
cur = conn.cursor()  
  
cur.execute(
    '''CREATE TABLE IF NOT EXISTS services (
    service_id INT PRIMARY KEY,
    service_name VARCHAR(50),
    description VARCHAR(500),
    img_link VARCHAR(300)
);''')

cur.execute(
    '''INSERT INTO services (service_id, service_name, description, img_link) VALUES 
(1, 'Contract Documents', 'Legal contracts serve as the backbone of countless business and personal transactions, providing a formal framework for defining rights, obligations, and responsibilities between parties involved. ', 'https://res.cloudinary.com/dgi53xxbd/image/upload/v1694875757/sih_legal_docs/contract_img_ync08t.jpg'), 
(2, 'Trademark & Copyright Documents', 'A trademark is a word or a visual symbol used by a business to differentiate its goods or services from those of other businesses that offer similar goods or services. A copyright is a right given to the creators of literary, musical, dramatic, artistic works, and the producers of cinematograph films and sound recordings. ', 'https://res.cloudinary.com/dgi53xxbd/image/upload/v1694875997/sih_legal_docs/tm_copyright_img_hd7o0e.jpg'), 
(3, 'Banking/Finance Documents', 'In India, the banking and finance sector operates under a comprehensive legal framework that governs various aspects of financial services, institutions, and transactions. These laws are essential to ensure the stability, transparency, and integrity of the financial system.', 'https://res.cloudinary.com/dgi53xxbd/image/upload/v1694876340/sih_legal_docs/banking_img_lcll8x.jpg'), 
(4, 'Property Documents', 'Legal property refers to the bundle of rights and interests that a person or entity has in a physical or tangible asset, typically real estate or personal property. These rights are legally recognized and protected by the government and include the right to possess, use, control, enjoy, and dispose of the property. ', 'https://res.cloudinary.com/dyxnmjtrg/image/upload/v1694691119/property_wb2bha.jpg'), 
(5, 'Bonds Documents', 'Legal bonds are financial instruments that represent a debt obligation between the issuer, typically a government or corporation, and the bondholder, who lends money to the issuer in exchange for periodic interest payments and the return of the bond''s face value at maturity. ', 'https://res.cloudinary.com/dgi53xxbd/image/upload/v1694876804/sih_legal_docs/bonds_img_falmr0.jpg'), 
(6, 'Criminal Documents', 'Legal criminal laws, also known as penal or criminal laws, form the foundation of a country''s legal system, defining the boundaries of acceptable conduct and specifying the consequences for violating those boundaries', 'https://res.cloudinary.com/dgi53xxbd/image/upload/v1694876933/sih_legal_docs/criminal_law_img_lt34dq.jpg'),
(7, 'Divorce/Family Documents', 'Legal divorce is a formal legal process that dissolves a marriage or civil partnership, allowing spouses or partners to legally separate and end their marital obligations. It is an important aspect of family law, and the specifics of divorce proceedings can vary significantly from one jurisdiction to another', 'https://res.cloudinary.com/dyxnmjtrg/image/upload/v1694753486/law_f6g4co.jpg');''')
  

cur.execute('''
    CREATE TABLE IF NOT EXISTS forms (
    form_id SERIAL PRIMARY KEY,
    service_id INT,
    form_name VARCHAR(100),
    form_link VARCHAR(300),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);
''')

cur.execute('''
    INSERT INTO forms (service_id, form_name, form_link) VALUES
    (1, 'Lease Deed', 'https://res.cloudinary.com/dyyx9zotu/raw/upload/v1695195040/legal-document-assistant/dburr7rngb55f66ckoj0.docx'),
    (1, 'Agreement for sale', 'https://res.cloudinary.com/dyyx9zotu/raw/upload/v1694883763/legal-document-assistant/sifzuqowq5spchhibwa7.docx'),
    (2, 'Licence to use Copyright', 'https://res.cloudinary.com/dyyx9zotu/raw/upload/v1694883349/legal-document-assistant/epyvuqn1c4qvxgk4mg4z.docx'),
    (2, 'Agreement of License to Publish on Royalty Basis', 'https://res.cloudinary.com/dyyx9zotu/raw/upload/v1695290043/legal-document-assistant/hbym8y2ass7inj6dg9lh.docx'),
    (3, 'Loan Agreement with Security', 'https://res.cloudinary.com/dyyx9zotu/raw/upload/v1694967866/legal-document-assistant/hge05hvhdjezus5n5svd.docx');
''')

# category table queries
cur.execute('''
CREATE TABLE IF NOT EXISTS ques_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(70)
);
''')

cur.execute('''

    INSERT INTO ques_categories (id, category_name) VALUES
    (1, 'Parties'), (2, 'Terms and Payment'), (3, 'Signing Date'), (4, 'Property Details'), (5, 'Intellectual Property Details');

''')

cur.execute('''
    CREATE TABLE input_ques (
    ques_id INT PRIMARY KEY,
    ques_label VARCHAR(150),
    ques_type VARCHAR(50),
    ques_name VARCHAR(50),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES ques_categories(id)
);
''')

cur.execute('''
INSERT INTO input_ques (ques_id, ques_label, ques_type, ques_name, category_id) VALUES 
(1, 'Time', 'time', 'time', 3), (2, 'Day', 'number', 'day', 3), (3, 'Month', 'text', 'month', 3), (4, 'Tenant Name', 'text', 'lesse', 1), 
(5, 'Tenant State', 'text', 'lesse_state', 1), (6, 'Owner Name', 'text', 'lessor', 1), (7, 'Owner State', 'text', 'lessor_state', 1), 
(8, 'Rental contract in years', 'number', 'lease_years', 2), (9, 'Land Location', 'text', 'lease_loc', 4), 
(10, 'Rental agreement starts from which month', 'text', 'lease_month', 2), (11, 'Start year of agreement', 'number', 'lease_year', 2), 
(12, 'Monthly Rent', 'number', 'rent_monthly', 2), (13, 'Rate of Interest', 'text', 'interest_rate', 2), (14, 'Tax on Land', 'number', 'lease_text', 2),
(15, 'Payment deadline in months', 'number', 'payment_deadline', 2), (16, 'Witness 1 Name', 'text', 'witness_1', 1), (17, 'Witness 2 Name', 'text', 'witness_2', 1),
(18, 'Year of Signing', 'number', 'year', 3), (19, 'Vendor Name', 'text', 'vendor', 1),  (20, 'Vendor''s Parent Name', 'text', 'vendors_parent', 1),
(21, 'Vendor Address', 'text', 'vendor_addr', 1), (22, 'Purchaser''s Name', 'text', 'purchaser', 1), (23, 'Purchaser''s Parent Name', 'text', 'purchaser_parent', 1),
(24, 'Purchaser''s Address', 'text', 'purchaser_addr', 1), (25, 'House Address', 'text', 'house_addr', 4), (26, 'House Price', 'number', 'house_sale_price', 2),
(27, 'Advance Payment', 'number', 'advance_payment', 2), (28, 'Advance Payment Date', 'number', 'advance_payment_date', 2),
(29, 'Number of days after which Purchaser''s Advocate should report', 'number', 'purchaser_report_days', 2), 
(30, 'Number of days after which refund for advance payment should be given', 'number', 'refund_adv_days', 2),
(31, 'Refund for Breach of Contract', 'number', 'refund_breach', 2), (32, 'Name of Copyright Owner', 'text', 'copyright_owner', 1), 
(33, 'Copyright Owner''s Parent', 'text', 'copyright_owner_parent', 1), (34, 'Copyright Owner''s Address', 'text', 'copyright_owner_address', 1), 
(35, 'License Awardee''s Name', 'text', 'license_awardee', 1), (36, 'License Payment Date', 'date', 'license_payment_date', 2), 
(37, 'Agreement Date', 'date', 'agreement_date', 3), (38, 'Author''s Name', 'text', 'author', 1), (39, 'Author''s Address', 'text', 'author_addr', 1),
(40, 'Publisher''s Name', 'text', 'publisher', 1), (41, 'Publisher''s Address', 'text', 'publisher_addr', 1), (42, 'Book''s Name', 'text', 'book_name', 5),
(43, 'Deadline for Publishing the Book in months', 'number', 'publish_deadline', 2), (44, 'Royalty', 'number', 'royalty', 2), (45, 'Lender''s Address', 'text', 'lender_addr', 1),
(46, 'Lender''s Company', 'text', 'lender_company', 1), (47, 'Borrower''s Company', 'text', 'borrower_company', 1), (48, 'Borrower''s Address', 'text', 'borrower_addr', 1),
(49, 'Amount paid as Capital', 'number', 'capital_paid', 2), (50, 'Intercorporate loan amount', 'number', 'amount', 2), (51, 'Days to repay the Loan', 'number', 'days_to_repay', 2), (52, 'Penalised Rate of Interest', 'number', 'penalized_interest_rate', 2),
(53, 'Stock exchange on which the shares are listed', 'text', 'stock_exchange', 2), (54, 'Price of each share', 'number', 'rate_per_share', 2),
(55, 'Number of equity shares to be given as security', 'number', 'no_of_share', 2), (56, 'How often shall the Publisher submit a statement of sales to the Author', 'number', 'publish_report', 2), 
(57, 'Number of free copies to be sent to the Author', 'number', 'no_of_copies_to_author', 2), (58, 'Maximum copies to be sent to the media', 'number', 'media_copies_limit', 2),
(59, 'Maximum number of copies to be printed', 'number', 'print_limit', 2), (60, 'Maximum Price of Book on Sale', 'number', 'print_max_price', 5);
''')

cur.execute('''
CREATE TABLE IF NOT EXISTS form_queries (
    id SERIAL PRIMARY KEY,
    form_id INT,
    form_query_id INT,
    FOREIGN KEY (form_id) REFERENCES forms(form_id),
    FOREIGN KEY (form_query_id) REFERENCES input_ques(ques_id)
);
''')

cur.execute('''
    INSERT INTO form_queries (form_id, form_query_id) VALUES 

    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9),
    (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18),

    (2, 1), (2, 2), (2, 3), (2, 13), (2, 15), (2, 16), (2, 17), (2, 18), (2, 19), (2, 20), (2, 21),
    (2, 22), (2, 23), (2, 24), (2, 25), (2, 26), (2, 27), (2, 28), (2, 29), (2, 30), (2, 31),

    (3, 32), (3, 33), (3, 34), (3, 35), (3, 36), (3, 37),

    (4, 1), (4, 2), (4, 3), (4, 16), (4, 17), (4, 18), (4, 38), (4, 39), (4, 40), (4, 41), (4, 42), 
    (4, 43), (4, 44), (4, 56), (4, 57), (4, 58), (4, 59), (4, 60),

    (5, 1), (5, 2), (5, 3), (5, 13), (5, 18), (5, 45), (5, 46), (5, 47), (5, 48), (5, 49), (5, 50), 
    (5, 51), (5, 52), (5, 53), (5, 54), (5, 55);

''')

# data = cur.fetchall()
# print(data)

# commit the changes
conn.commit()
  
# close the cursor and connection
cur.close()
conn.close()
print("Database created successfully!!")