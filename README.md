## Table of contents

- [Table of contents](#table-of-contents)
- [Installation](#installation)
  - [1) Configuration](#1-configuration)
  - [2) Database](#2-database)
  - [3) Nest.js API](#3-nestjs-api)
  - [4) OpenAPI Specification](#4-openapi-specification)

\

## Installation

To install this project and run it locally, please clone the project first, navigate to the root directory and run `npm i` to install the required packaged, and then follow the following instructions:

### 1) Configuration

Create a .env file in the root diectory, add the following keys, and provide values of your choice to the keys without values:

```
MYSQL_USER
MYSQL_PASSWORD
MYSQL_PORT
PORT=
MYSQL_HOST
MYSQL_DATABASE
API_PORT
```

These keys will be used throughout the project for the database connection.`MYSQL_HOST` value would be equal to `localhost`, and `MYSQL_DATABASE` is the name of the database that the project will use. The key `API_PORT` is the port on which the API will run.

### 2) Database

The database has one table called `media` and has the following structure:

| Column Name | Data Type    |
| ----------- | ------------ |
| id          | INT          |
| name        | VARCHAR(255) |
| type        | VARCHAR(255) |
| description | VARCHAR(255) |
| url         | VARCHAR(255) |
| status      | VARCHAR(255) |
| createdAt   | DATETIME     |
| updatedAt   | DATETIME     |

### 3) Nest.js API

To start the application with the server listening for HTTP requests on the specified port in the `main.ts` file, _which in this application is port 3000_, run the following command in the terminal:

```bash
 $ npm run start
```

Or to automatically watch for changes:

```bash
 $ npm run start:dev
```

The application now should be running on the port specified in the `.env` file with the key `API_PORT`.

### 4) OpenAPI Specification

This project is configured with Swagger for OpenAPI Specification. To check the Swagger UI of this application, go to:

```
 http://localhost:API_PORT/api/
```
