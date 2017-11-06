module.exports.Categories = (db, collectionName) => {
    return {
        getAllCategories: () => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).distinct("categories", (err, categories) => {
                    if (categories) {
                        return resolve(categories);
                    }

                    return reject(err);
                });
            });
        }
    }
};