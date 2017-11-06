module.exports.Tags = (db, collectionName) => {
    return {
        getAllTags: () => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).distinct("tags", (err, tags) => {
                    if (tags) {
                        return resolve(tags);
                    }

                    return reject(err);
                });
            });
        },
    }
};