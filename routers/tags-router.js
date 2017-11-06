const _ = require('underscore')._;

function sendData(res, data) {
    return data ? res.json(data) : res.status(404);
}

module.exports = (app, TagsModel) => {
    app.get('/tags', async (req, res) => {
        const tags = await TagsModel.getAllTags();

        return sendData(res, tags);
    });
};