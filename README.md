# CPF App

Basic REST-like API for CPFs.

## How to run app
1 - Make sure you have Node.js installed and clone the project

2 - Run `npm install` in the project folder

3 - You'll need to have a MongoDB running and set it's address to the start script - defaults are `MONGO_HOST=localhost:27017 MONGO_DB_NAME=cpf`
    - Custom mongo address example: `MONGO_HOST=localhost:27017 MONGO_DB_NAME=cpf node server.js`
    
4 - Default application port is 3000, if you want to change it, just set the enviroment variable PORT to the start script in `package.json`
    - For instance: `PORT=8000 node server.js`
    
5 - Run `npm start`

## Running tests
1 - If your Mongo configs aren't covered by the defaults, set the enviroment variables to the test script in `package.json` as shown above for the start script.

2 - Run `npm test`

## TODO
- implement same features for CNPJ

- implement status route (server uptime and number of requests processed since last restart)

- config docker
