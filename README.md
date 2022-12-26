# PRM - Pizza Restaurant Management

![prm logic](https://github.com/vladgthb/prm/blob/master/images/logic.png?raw=true)

## Description

The restaurant receives array of orders, while each order is for one Pizza that contains an array of
toppings.
##### INPUT: The dough-to-pizza pipeline is:
- Dough chef -> Topping chef -> Oven -> Serving

When a certain station within the pipeline is completed, the Pizza moves to the next one. There are no
dependencies between the orders in the arrays - when an order is ready to be served, it is being
deployed to the customer.
<br />
<br />
##### LOGIC/CRITERIA: The restaurant personnel are:
- 2 dough chefs - each chef can handle single dough at a time. It takes 7 seconds per single dough.
- 3 topping chefs - each chef can handle 2 toppings at a time. It takes 4 seconds to put each
topping on the Pizza.
- 1 oven that takes one pizza each time and cook it for 10 seconds.
- 2 waiters that serve the pizza to the customers. From the kitchen to the table it takes 5 seconds.
##### REPORT:
Each process should print logs (start and end time).
In the end, when all the orders had been served, you need to print a report about the complete set of
orders. The report should contain:
- The preparation time from start to end.
- The preparation time for each order.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting started](#starting-the-application-with-docker-compose)
- [Manual Installation](#manual-installation)
- [Running the app](#running-the-app)
- [Logic Description](#logic-description)

## Prerequisites
- Before starting app, you need to install docker and docker-compose on your machine.

## Starting the application with docker-compose
```bash
# Start the api app
npm run docker:start
# Stop the api app
npm run docker:stop
# Make docker clean
npm run docker:clean:all
```
This command will execute the app on Docker container.
##### API access
The API is listening 3000 port
http://localhost:3000/api/v1
##### Swagger
http://localhost:3000/api/v1/swagger
##### MySQL DB
The database can be accessed through 3008 port. You can use following credentials to connect to DB
```bash
MYSQL_HOST: localhost
MYSQL_PORT: 3008
MYSQL_ROOT_PASSWORD: root
MYSQL_DATABASE: prm
MYSQL_PASSWORD: root
```

### Status check:
To check the container status you can execute this command or use Docker UI
```bash
docker container ls
```
After that you can see following containers run on your machine
![docker](https://github.com/vladgthb/prm/blob/master/images/terminal.png?raw=true)
Or use the Docker desktop
![docker](https://github.com/vladgthb/prm/blob/master/images/docker.png?raw=true)


## Manual Installation

```bash
$ npm install
```

#### Running the app manually

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

## Running the app
In order to test the api, you can use either the Swagger of the API or create a collection in the Postman
<br/>
#### How to create and process the orders
Endpoint of the orders POST is
http://localhost:3000/api/v1/orders

```bash
curl -X POST https://reqbin.com/echo/post/json
   -H 'Content-Type: application/json'
   -d '<Your orders json input see below example>'
```

Here is the example of input to create orders
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

## Logic Description

- #### Initialization of the environment
    Whenever the docker container starts on first time we are initializing the DB and creating personnel. This logic 
    archived by simply defining the sql script and link it to the MySQL docker's container <br />
    https://github.com/vladgthb/prm/blob/master/scripts/mysql/init.sql

    The employees have availability prop in the DB status, which shows their availability to take a process. So 
    whenever there is a new process, we can check the status and execute the step only if the employee is available.
    If not available then wait 1 second to check the status again.
- #### API process
    Whenever we are pass
