const ObjectId = require('mongodb').ObjectId;
const _ = require('underscore')._;

function sendData(res, data) {
    return data ? res.json(data) : res.status(404);
}

module.exports = (app, PostsModel) => {
    app.get('/posts', async (req, res) => {
        let posts = [];

        if (req.query) {
            const {categories, tags, userName, text} = req.query;
            let categoriesArray, tagsArray = [];

            if (categories || tags) {
                if (!_.isUndefined(categories)) {
                    categoriesArray = categories.split(',');
                }

                if (!_.isUndefined(tags)) {
                    tagsArray = tags.split(',');
                }

                posts = await PostsModel.getPostsByCategoriesAndTags(categoriesArray, tagsArray);

                return sendData(res, posts);
            }
            else if (userName) {
                posts = await PostsModel.getMyFavouritePosts(userName);

                return sendData(res, posts);
            }
            else if (text) {
                posts = await PostsModel.getPostsByText(text);

                return sendData(res, posts);
            }
        }

        posts = await PostsModel.getAllPosts();

        return sendData(res, posts);
    });

    app.get('/posts/:id', async (req, res) => {
        const id = req.param('id');
        const mongoObjectId = new ObjectId(id);

        const post = await PostsModel.getPostById(mongoObjectId);

        return sendData(res, post);
    });

    app.put("/posts/:id/likes", async (req, res) => {
        const likes = req.body;
        const id = req.param('id');
        const mongoObjectId = new ObjectId(id);

        const data = await PostsModel.toggleLike(mongoObjectId, likes);

        return sendData(res, data);
    });

    app.put("/posts/:id/comments", async (req, res) => {
        const comments = req.body;
        const id = req.param('id');
        const mongoObjectId = new ObjectId(id);

        const data = await PostsModel.addNewComment(mongoObjectId, comments);

        return sendData(res, data);
    });
};