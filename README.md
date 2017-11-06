# Backend for a blog application

## Overview
This repo contains the whole backend for the blog application. 
Frontend can be found [here](https://github.com/katarzyna-dusza/blog-frontend).
It's still in progress.

## Technologies
- **NodeJS v8**
- **ExpressJS**
- **MongoDB**

## MongoDB
Keep in mind that this application uses MongoDB, which should be installed on your local machine.
Run the following command to import sample data:
```shell
 mongoimport --db test-database --collection posts --file mongo-import.json
```

where _test-database_ is a name of the database and _posts_ is a collection name.

## Run server
1. Go to project directory

1. Install all dependencies
    ```shell
    npm install
    ```

1. Run server
    ```shell
    node server.js
    ```
Server should log that it's listening on localhost and specific port (5000 by default).

## Run tests
From your project directory run only one command:
```shell
npm test
```