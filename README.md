# Backend for a blog application

## Overview
This repo contains the whole backend for the blog application. 
Frontend can be found [here](https://github.com/katarzyna-dusza/blog-frontend).

It's still in progress (see _Roadmap_ section).

## Technologies
- **Node.js v8**
- **Express.js**
- **MongoDB**

## MongoDB
Keep in mind that this application uses MongoDB, which should be installed on your local machine.
Run the following command to import sample data:
```shell
 mongoimport --db test-database --collection posts --file mongo-import.json
```

where _test-database_ is a name of the database and _posts_ is a collection name.

To make text search (by title or post's content) available, you have to create text indexes.
1. Run Mongo shell

```shell
mongo
```

2. Select a proper database
```shell
use test-database
```

3. Create text index on posts collection

```shell
db.posts.createIndex({title: "text", content: "text"})
```

## Run server
1. Go to the project directory

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
npm testx
```

## Roadmap
There is a couple of things, which need to be improved:
* posts collection: creating, deleting and updating posts
* users collection: the whole CRUD of users
* tests for above points