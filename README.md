# MyWallet

## Description
A basic finance management application.
+ Allows for account creation and authentication
+ Create, update or delete incomes and outcomes.

## Routes
```
POST: /sign-up
Body:{"email": "user email", "password": "userPassword", "name": "User name"}

POST: /sign-in
Body:{"email": "user email", "password": "userPassword"}

POST: /transactions
Headers:{Authorization: Bearer Token}
Body:{"description":"small description", "value": 10.00, "type": "in"|"out"}

GET: /transactions
Headers:{Authorization: Bearer Token}

PUT: /transactions/:id
Headers:{Authorization: Bearer Token}
Body:{"description":"small description", "value": 10.00, "type": "in"|"out"}

DELETE: /transactions/:id
Headers:{Authorization: Bearer Token}
```


## Installation

```bash
$ git clone https://github.com/lucasnerism/mywallet-api
$ cd mywallet-api
$ npm install
```

## Create a Database
Create a PostgreSQL database with whatever name you want


## Setup the ENVs
Configure the `.env` in the root of your application using the `.env.example` file as a basis.


## Running the app

```bash
# production
$ npm run start

# development
$ npm run dev

```

## Test

```bash
# e2e tests
$ npm run test:e2e
```
