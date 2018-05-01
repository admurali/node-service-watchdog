# RouteMap Boiler Project
## Middlewares
* logging-express-mw -  allow routemap to log and traces functions
* routemap-express-mw - routemap will allow a user to write elegant apis with a standardized workflow of promise that is logged and easy to debug
* bookshelf-express-mw - allows ease of ORM type integration [default not used]

## Other dependencies
* body-parser - Node.js body parsing middleware.
* cors - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* swagger-express-mw - express middle using swagger routes

## Installation
* Install modules: ```npm install```
* Swagger: ```npm install -g swagger```

## Usage
* Start swagger server: ```swagger project start```
* Edit api/docs: ```swagger project edit```

## Optional
* Add following code to enable bookshelf middleware ORM if using database ```app.use(bookshelf.middleware());```
