# Smart Search Algorithm

## Introduction
This project implements a smart search algorithm designed to extract entities such as cities, brands, dish types, and diets from a given search term. It is built using Node.js, Express, and MySQL with Sequelize for database management.

## Setup
### Prerequisites
Ensure you have the following installed:

- Node.js
- MySQL
- Installation
- Clone the repository:

```bash
git clone https://github.com/yourusername/smart-search.git
cd smart-search
```

### Install dependencies:

```bash
npm install
```

### Configure the database:
Update the config/config.json file with your database credentials for development and test environments:

```bash
{
  "development": {
    "username": "dba",
    "password": "password",
    "database": "smart_search_dba",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": "dba",
    "password": "password",
    "database": "smart_search_dba",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
}
```
### Run database migrations:

```bash
npx sequelize-cli db:migrate
```

### Seed the database:

```bash
npx sequelize-cli db:seed:all
```

### Test the server:
```bash
npm test
```

### Start the server:
Running the Server
```bash
npm start
```
The server will run at http://localhost:3000.

### API Usage
Search Endpoint
Endpoint: /search
Method: GET
Query Parameter: searchTerm


### Improving the Algorithm
To enhance the functionality of the smart search algorithm, consider the following improvements:

- Implement advanced natural language processing (NLP) techniques.
- Utilize caching for frequently searched terms to improve performance.
- Optimize database queries to handle large datasets efficiently.


### Summary
This project sets up a Node.js application with Sequelize for managing database interactions. It includes creating models and migrations, reading data from Excel files, seeding the database, and implementing a smart search algorithm. Follow the instructions in this README.md file to set up and run the project.