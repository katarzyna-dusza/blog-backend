const ObjectId = require('mongodb').ObjectId;
const readPosts = require('../mocks/posts.json');
const PostsModel = require('../../models/posts-model');
const CategoriesModel = require('../../models/categories-model');
const TagsModel = require('../../models/tags-model');

function mapPosts() {
    readPosts.forEach(post => {
       post._id = new ObjectId(post._id);
    });

    return readPosts;
}

function insertData(db, collectionName) {
    const posts = mapPosts();
    db.collection(collectionName).insertMany(posts);
    db.collection(collectionName).createIndex({title: "text", content: "text"});
}

module.exports = () => {
    return {
        getPostsModel: (db, collectionName) => {
            insertData(db, collectionName);

            return PostsModel.Posts(db, collectionName);
        },
        getCategoriesModel: (db, collectionName) => {
            insertData(db, collectionName);

            return CategoriesModel.Categories(db, collectionName);
        },
        getTagsModel: (db, collectionName) => {
            insertData(db, collectionName);

            return TagsModel.Tags(db, collectionName);
        }
    }
};