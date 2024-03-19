# Legal-Documentation-Assistant

## Table of Contents

- [Project](#legal-documentation-assistant)
  - [Table of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
  - [Tech Stack](#tech-stack)
  - [File Structure](#file-structure)
  - [Demo](#demo)
  - [Getting started](#Getting-Started)
  - [Screenshots of Website](#screenshots-of-website)
  - [Contributors](#contributors)
  - [License](#license)

## About

Legal documentation can be a complicated and time-consuming process, especially for individuals and small businesses who may not have access to legal resources. In addition, the language and jargon used in legal documents can be difficult for non-lawyers to understand, which can lead to errors and misunderstandings. 

**Objective**: The objective of this project is to develop an AI-powered solution that can simplify legal documentation for individuals and small businesses in India, by automatically drafting legal documents in plain language and using easy-to-understand terms. 

**Features**: 

1. User-friendly interface to input relevant information such as parties involved, terms of the agreement, and other necessary details. 

2. AI-powered document generation that automatically recommends legal documents based on user query. 

3. Ability to customize legal documents based on the specific needs of the user. 

4. Integration with existing legal resources and databases to ensure accuracy and completeness of the legal documents. 

5. Option for users to seek legal advice from an expert in case of complex legal issues. 

**Impact**: The proposed solution can greatly benefit individuals and small businesses in India, who often face challenges with legal documentation due to limited access to legal resources. By simplifying legal documentation, this solution can potentially save time, reduce errors, and increase access to justice. 

**Data**: We have made use of [LawRato](https://lawrato.com/legal-documents) for the dataset of legal documents.

## Demo

```
Demo video to be added soon
```

## Tech Stack

- ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

- ![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

- ![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

- ![flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

- ![mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

## File Structure
```
👨‍💻Legal-Documentation-Assistant
 ┣ 📂assets                            // Contains all the reference gifs, images
 ┣ 📂client                            // Frontend        
 ┃ ┃ ┣ 📂src                                      
 ┃ ┃ ┃ ┣ 📂components  
 ┃ ┃ ┃ ┣ 📄index.js
 ┃ ┃ ┣ 📂public 
 ┃ ┃ ┃ ┣ 📄index.html
 ┣ 📂database                          // Database Queries
 ┃ ┣ 📄forms.sql    
 ┃ ┣ 📄input_ques.sql
 ┃ ┣ 📄ques_categories.sql               
 ┃ ┣ 📄services.sql
 ┃ ┣ 📄form_queries.psql
 ┣ 📂model                             // Standalone model         
 ┃ ┣ 📄bot.py    
 ┃ ┣ 📄chat.py                         // To chat with the standalone model
 ┃ ┣ 📄model.py                
 ┃ ┣ 📄train.py                        // Training
 ┃ ┣ 📄dataset.py 
 ┃ ┣ 📄util.py   
 ┃ ┣ 📄trained_model.pth               // Weights File
 ┃ ┣ 📄intents.json                    // Dataset 
 ┣ 📂server                            // Backend 
 ┃ ┣ 📄app.py 
 ┃ ┣ 📄createdatabase.py  
 ┃ ┣ 📄requirements.txt      
 ┣ 📄README.md
``` 

## Getting Started

### Installation

Clone the project by typing the following command in your Terminal/CommandPrompt

```
git clone https://github.com/PritK99/Legal-Documentation-Assistant.git
```
Navigate to the Legal Documentation Assistant folder

```
cd Legal-Documentation-Assistant
```

#### Frontend

Open a new terminal in root folder and navigate to the client folder

```
cd client/src/
```

Install all the required dependencies

```
npm i
```

To run the frontend

```
npm run start
```

Once the above command is executed, the frontend will be running at ```localhost:5000```. You can visit http://localhost:5000/ to view the website.

#### Backend

To create a database on render and creating a environment file, follow the given steps

```
steps to be added here soon
```

Once the database is created, Open a new terminal in root folder and navigate to the server folder 

```
cd server
```

Create a virtual environment to install all the dependencies

```
python -m venv docbuddy
```

Activate the virtual environment

For Windows: ```docbuddy\Scripts\activate```

For Linux: ```source docbuddy/bin/activate```

Install all the required dependencies

```
pip install -r requirements.txt
```

To run the backend

```
python app.py
```

## Screenshots of the Website

- #### Home Page

    ![home](./assets/image.png)

- #### Documents Page

    ![forms](./assets/image-1.png)

- #### Dynamic form page (generated for the specific legal document)

    ![dynamic forms](./assets/image-2.png)

- #### Document Editor 

    ![doc_editor](./assets/image-4.png)

- #### Downloading the document

    ![download](./assets/image-3.png)

- #### Chatbot 

    ![chatbot](./assets/image-6.png)

- #### FAQ page

    ![faq](./assets/image-7.png)

- #### About Page

    ![about_page](./assets/image-5.png)

## Contributors
- [Devayani Chandane](https://github.com/devayani03)
- [Kavan Gandhi](https://github.com/KGan31)
- [Mihir Rathod](https://github.com/m-g-rathod)
- [Prit Kanadiya](https://github.com/PritK99)
- [Shardul Khade](https://github.com/shark-21)
- [Vedant Nimje](https://github.com/vrnimje)

## References
- [LawRato](https://lawrato.com/legal-documents) for the dataset of legal documents.

## License
[MIT License](https://opensource.org/licenses/MIT)