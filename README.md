# Wolt Delivery Fee Calculator Frontend Assignment

## Table of Contents

- [Introduction](#introduction)
- [Built with](#built-with)
- [Running the program](#running-the-program)
- [Docker](#docker)

## Introduction

Frontend assignment for the Wolt [intership](https://github.com/woltapp/engineering-summer-intern-2023).
Delivery fee calculator app calculates a delivery fee based on user input and shows the calculated delivery fee to the user.

App parameters (delivery fees, distances, default cart, etc.) can be changed from the config.ts file in directory /src/config

Demo running at https://delivery-calculator.onrender.com/ (Running on free tier so give it minute or two to start up)


## Built with

- [React](https://reactjs.org/) with [typescript](https://www.typescriptlang.org/) and [Node.js](https://nodejs.org/en/) [v16.15.1](https://nodejs.org/tr/blog/release/v16.15.1/)
- Calculator form with [Formik](https://github.com/jaredpalmer/formik) and [Yup](https://github.com/jquense/yup) validation
- Stylized components with [MUI](https://github.com/mui/material-ui)


## Running the app

Install the necessary Node.js modules at the project root:
```
$ npm install
```

Start the app on local machine, this will expose the app to localhost port [3000](http://localhost:3000/):
```
$ npm run start
```

Create a production optimized build from the project:
```
$ npm run build
```

Tests can be run with the command:
```
$ npm run test
```


## Docker

If your local machine has different node version and issues come up during building or running the app.
You can also run the application with Docker.

To build the Docker image run command in the project root:
```
$ docker build . -t delivery-calculator
```

After image has been build you can run the container with command:
```
$ docker run -p 3000:3000 -d delivery-calculator
```

App will run in the localhost port [3000](http://localhost:3000/)
