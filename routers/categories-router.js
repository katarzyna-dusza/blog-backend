const _ = require('underscore')._;

function sendData(res, data) {
    return data ? res.json(data) : res.status(404);
}

module.exports = (app, CategoriesModel) => {
    app.get('/categories', async (req, res) => {
        const categories = await CategoriesModel.getAllCategories();

        return sendData(res, categories);
    });
};