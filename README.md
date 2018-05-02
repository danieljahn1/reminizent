# Reminizent
RCA Externship for iSouth Mortgage, a Subsidiary of OGI Mortgage Bankers. Final Project.

## About
Reminizent is designed to be a CRM for marketing individuals, built for iSouth Mortgage, a Subsidiary of OGI Mortgage Bankers in Santa Ana, CA. The major features are a "Contact submission" form to capture leads from the internet, a Dashboard feature that tracks how many people and who they are, and a notes tracking system which logs any types of interaction with a person. It can also compose emails to send to people 'selected'.

Reminizent was created using CSS, Bootstrap, JavaScript, React JS, Redux on the front end with Node.js, Express, bcrypt, JWT and SQL Server on the back end. The email component was built with MailChimp.


## Installation and Setup

#### Clone
* Clone this repo to your machine using ``` https://github.com/danieljahn1/reminizent.git  ```. You will need ``` npm ``` installed globally on your machine.

#### Setup
* Within both _frontend and _backend directories, run npm install: ``` npm install ```

* Start the server on the front end:  ``` npm start ```

* Start the server on the back end using nodemon:  ``` nodemon ```
  The database runs on ``` http://localhost:3000/ ```

* To visit the app in your browser:  ``` http://localhost:8080/ ```

* To access the SQL Server database: The SQL Server database is hosted on AWS. The .env file in the _backend directory will need to store the credentials using the following variable names:
```
RDS_HOSTNAME
RDS_PORT
RDS_DB_NAME
RDS_USERNAME
RDS_PASSWORD
PORT=3000
```


## Documentation

Visit the Wiki at https://github.com/danieljahn1/reminizent/wiki


## Team
Team ADE: https://github.com/danieljahn1/reminizent/graphs/contributors
* AmberSchatz: https://github.com/AmberSchatz
* Aanderson1986: https://github.com/Aanderson1986
* danieljahn1: https://github.com/danieljahn1
* e-masinas: https://github.com/e-masinas

