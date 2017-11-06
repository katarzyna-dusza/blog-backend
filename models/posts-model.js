module.exports.Posts = (db, collectionName) => {
    return {
        getAllPosts: () => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).find().toArray((err, posts) => {
                    if (posts) {
                        return resolve(posts);
                    }

                    return reject(err);
                });
            });
        },
        getPostById: (id) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).findOne({_id: id}, (err, post) => {
                    if (post) {
                        return resolve(post);
                    }

                    return reject(err);
                });
            });
        },
        getPostsByCategoriesAndTags: (categories, tags) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).find({
                    $or: [
                        {"tags": {$in: tags}},
                        {"categories": {$in: categories}}
                    ]
                }).toArray((err, posts) => {
                    if (posts) {
                        return resolve(posts);
                    }

                    return reject(err);
                });
            });
        },
        getMyFavouritePosts: (user) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).find({"likes": {$elemMatch: {"username": user}}}).toArray((err, posts) => {
                    if (posts) {
                        return resolve(posts);
                    }

                    return reject(err);
                });
            });
        },
        getPostsByText: (text) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).find({$text: {$search: text}}).toArray((err, posts) => {
                    if (posts) {
                        return resolve(posts);
                    }

                    return reject(err);
                });
            });
        },
        toggleLike: (id, likes) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).update({"_id": id}, {$set: {likes: likes}}, (err, succ) => {
                    if (succ) {
                        return resolve(succ);
                    }

                    return reject(err);
                });
            });
        },
        addNewComment: (id, comment) => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).update({"_id": id}, {$set: {comments: comment}}, (err, succ) => {
                    if (succ) {
                        return resolve(succ);
                    }

                    return reject(err);
                });
            });
        }
    }
};