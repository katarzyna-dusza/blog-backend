const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const Posts = require('./models/posts-model').Posts;
const Categories = require('./models/categories-model').Categories;
const Tags = require('./models/tags-model').Tags;

const app = express();
const postsRouter = require('./routers/posts-router');
const categoriesRouter = require('./routers/categories-router');
const tagsRouter = require('./routers/tags-router');

const DB_URL = 'mongodb://localhost:27017/test-database';
const POSTS_COLLECTION_NAME = 'posts';
const HOSTNAME = 'localhost';
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

MongoClient.connect(DB_URL, (err, db) => {
    if (err) {
        console.log('Unable to connect to Mongo.');
        return process.exit(1);
    }

    postsRouter(app, Posts(db, POSTS_COLLECTION_NAME));
    categoriesRouter(app, Categories(db, POSTS_COLLECTION_NAME));
    tagsRouter(app, Tags(db, POSTS_COLLECTION_NAME));

    app.listen(PORT, HOSTNAME, () => {
        console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
});

module.exports = app;