# course-management-api


##  Descripción
Course Management API allows you to explore and manage courses. This API provides functionality to know and modify the available courses, as well as to track the progress of users in these courses. It is designed to expose information so that any frontend can easily consume it.

The project is based on the development of an API using Node.js and Express to create a web server that allows exploring and managing courses. Express is used as the Node.js web framework, providing an organized and simplified structure for handling HTTP routes, requests, and responses. Sequelize is used as an ORM (Object-Relational Mapping) to interact with the MySQL database. In addition, other complementary technologies can be used to develop additional functionalities, thus ensuring the efficiency and scalability of the system.

## Contenido

1. [Access to the Application](#access-to-the-application)
2. [Installation](#installation)
3. [How to Use](#how-to-use)
4. [Project Structure](#project-structure)
5. [Project Architecture](#project-architecture)
6. [Authors and Contact](#authors-and-contact)


## Access to the Application

You can access the deployed application through the following link: [Course Management API - Access to the Application](http://localhost:3001/api/v1/docs/)

In addition, interactive API documentation is available at:

- [Swagger UI](http://localhost:3001/api/v1/docs/): Swagger's interactive user interface.

## Installation

Follow the instructions in the README.md file to install and run the project locally. API documentation will be available at http://localhost:3001/api/v1/docs/ after execution.

1. **Clone the Repository:**

```bash
git clone https://github.com/danielcinome/course-management-api.git
cd course-management-api
```

2. **Installation of dependencies:**

```bash
npm install
```

4. **Environment Variables Configuration:**

```
PORT
DB_USER
DB_PASSWORD
DB_NAME
DB_HOST
SECRET_KEY                 # Use case -> HS256
```

* To generate the SECRET_KEY you can use:
    ```bash
    openssl rand -hex 32
    ```

5. **Initialize the Database:**


```bash
npm run migrate
```

6. **(Optinal):**

If you want to make use of docker, run the following command

```bash
docker-compose up --build
```

## How to Use

To execute the project use the command:

```bash
# Example of command
npm run dev
```

If you do not have your own user, you must generate a registration from `/api/v1/auth/register`.

## Project Structure

The current structure of the project is organized as follows:

- **Authorization:**
    - **POST** `/api/v1/auth/register`
    - **POST** `/api/v1/auth/login`
- **Course:**
    - **GET**  `/api/v1/courses/`
    - **POST** `/api/v1/courses/create`
    - **PATCH** `/api/v1/courses/update/:id`
    - **POST** `/api/v1/courses/add-lesson/:id`
    - **DELETE** `/api/v1/courses/delete/:id`
- **Lesson:**
    - **DELETE** `/api/v1/lessons/delete/:id`
- **Course Progress:**
    - **POST** `/api/v1/courseProgress`
- **Lesson Progress:**
    - **POST** `/api/v1/lessonsProgress`

## Project Architecture

The project architecture is based on a backend application developed in node using the express framework. The authentication is done through JSON Web Tokens (JWT). The design is oriented to provide a REST API that allows the management of courses elements  and users.
    

## Authors and Contact
- Daniel Chinome
- Contact: danielchinomedev@gmail.com
- [LinkedIn](https://www.linkedin.com/in/danielchinome/)