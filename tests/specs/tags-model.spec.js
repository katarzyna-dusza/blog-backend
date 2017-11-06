const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const models = require('./prepareModels');

const DB_URL = 'mongodb://localhost:27017/test';
const COLLECTION_NAME = 'posts';

let testDB = {};
let tagsModel = {};

describe('Tags Model', () => {
    before(done => {
        MongoClient.connect(DB_URL, (err, db) => {
            testDB = db.db('test');
            tagsModel = models(testDB, COLLECTION_NAME).getTagsModel(testDB, COLLECTION_NAME);

            setTimeout(() => {
                done();
            }, 1000);
        });
    });

    it('should return all tags', async () => {
        // given
        const allTags = ['tag', 'tag0', 'tag1'];

        // when
        const tags = await tagsModel.getAllTags();

        // then
        expect(tags).to.have.members(allTags);
    });

    after(async () => {
        await testDB.dropDatabase();
    });
});

