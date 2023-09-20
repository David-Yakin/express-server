# Getting Started with node server App

This is a node.js & express server

## Installation

Download or clone the project from this repo

### Download the node_modules

Enter the main-server folder by typing the following command in the terminal/CMD in the project root folder

```
cd main-server
```

Enter the following command in the cmd / terminal in the root folder of this project

```
npm i
```

Open a new terminal/CMD in the project's root folder and enter the northwind-store-server folder by typing the following command

```
cd northwind-store-server
```

Enter the following command in the cmd / terminal in the root folder of this project

```
npm i
```

### Run the typescript compiler

Run the following command in any of the terminals/CMD you opened to start the typescript compiler

```
tsc -w
```

### Run the server in development mode

Open more terminals / CMD, one inside the main-server folders and the other inside the northwind-store-server folder and run the following command

```
npm run dev
```

- Runs the app with nodemon
- The page will reload if you make edits
- You should see the following text in the cmd / terminal

#### In the northwind server terminal you should see the following print

![Alt text](./images/connectToPGServer.png)

#### In the main server terminal you should see the following print

![Alt text](./images/main-server.png)

## Available Routes

Here you can find API addresses that the server will respond to as well as what should be sent to them in the body of the HTTP request and what permissions are required to receive a response from a specific API

### Users API

#### API for Register a new user

```http
  POST /api/users
```

#### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | min | max | remark   |
| -------- | ------ | --- | --- | -------- |
| email    | string | 5   |     | required |
| password | string | 7   | 20  | required |
|          |

- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "email" must be a standard email

#### Response

Example of a response from this end point

```
{
    "email": "test@gmail.com",
    "password": "$2a$10$jhs6h3m8vqVUa2wVze7C1O98ZnKLWvTgzAzHgjsA/TjhjWDIZfHYe",
    "_id": "12ddd310-5005-11ee-98a5-6b460fe7b768"
}
```

#### API for Login a user

```http
  POST /api/users/login
```

#### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | min | max | remark   |
| -------- | ------ | --- | --- | -------- |
| email    | string | 5   |     | required |
| password | string | 7   | 20  | required |

- "email" must be a standard email
- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-

#### Response

If the user is in the database and the password sent is correct, The response will be a like the following string with status code 201

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxZTIwYWQ2MC01NjA0LTExZWUtYmM4OC01MTMzYTRmNGQyZjQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTUxMTI4NDJ9.OP1MXC4m8XyNS3zzuIeJyme8hopRRrbnlu3Qg7jNmsw
```

### ! This token must be attached as a value to the x-auth-token key in the Request.headers for all requests that require a token

#### API for Information about all the users

```http
  GET /api/users
```

#### Response

- You will need to provide a token to get an answer from this api
- You will need to be Admin type user to get an answer from this api

The response will be an array of users

#### API for Information about a user

```http
  GET /api/users/:id
```

### Request

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin type user to get an answer from this api

#### API for Updating User information

```http
  PUT /api/users/:id
```

### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | min | max | remark   |
| -------- | ------ | --- | --- | -------- |
| email    | string | 5   |     | required |
| password | string | 7   | 20  | required |
|          |

- The user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "email" must be a standard email
- You will need to provide a token to get an answer from this api
- You will need to be the registered user to get an answer from this api

#### API for deleting a user

```http
  DELETE /api/users/:id
```

### Request

- You will need to provide a token to get an answer from this api
- You will need to be the registered user or Admin type user to get an answer from this api

#### API for adding a product to a user

```http
  POST /api/users/add-product/:id?product=<<productName>>
```

### Request

- You will need to provide a token to get an answer from this api
- You will need to be an admin type user to get an answer from this api

#### Response

Example for a response
![Alt text](public/images//res.png)
