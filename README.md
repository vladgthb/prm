# PRM - Pizza Restaurant Management

![prm logic](https://github.com/vladgthb/prm/blob/master/images/logic.png?raw=true)

## Description

The restaurant receives array of orders, while each order is for one Pizza that contains an array of
toppings.
The dough-to-pizza pipeline is:
Dough chef -> Topping chef -> Oven -> Serving
When a certain station within the pipeline is completed, the Pizza moves to the next one. There are no
dependencies between the orders in the arrays - when an order is ready to be served, it is being
deployed to the customer.
The restaurant personnel are:
 2 dough chefs - each chef can handle single dough at a time. It takes 7 seconds per single dough.
 3 topping chefs - each chef can handle 2 toppings at a time. It takes 4 seconds to put each
topping on the Pizza.
 1 oven that takes one pizza each time and cook it for 10 seconds.
 2 waiters that serve the pizza to the customers. From the kitchen to the table it takes 5 seconds.
Each process should print logs (start and end time).
In the end, when all the orders had been served, you need to print a report about the complete set of
orders. The report should contain:
 The preparation time from start to end.
 The preparation time for each order.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting started](#starting-the-application-with-docker-compose)
- [Manual Installation](#manual-installation)
- [Logic](#logic)

## Prerequisites
- Before starting app, you need to install docker and docker-compose on your machine.

## Starting the application with docker-compose
```bash
npm run docker:start
```
This command will execute the app on Docker container.
The API is listening 3000 port.
http://localhost:3000/api/v1/swagger

## Manual Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Logic

```bash
[
  {
    "table_number": 1,
    "pizza_name": "my custom pizza 1",
    "toppings": [
      { "name": "onion" },
      { "name": "paprika" }
    ]
  },
  {
    "table_number": 12,
    "pizza_name": "my custom pizza 3",
    "toppings": [
      { "name": "onion" },
      { "name": "paprika" }
    ]
  },
  {
    "table_number": 4,
    "pizza_name": "my custom pizza 5",
    "toppings": [
      { "name": "onion" },
      { "name": "paprika" }
    ]
  },
  {
    "table_number": 2,
    "pizza_name": "my custom pizza 2",
    "toppings": [
      { "name": "onion" },
      { "name": "paprika" }
    ]
  }
]
```
