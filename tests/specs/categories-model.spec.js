const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const models = require('./prepareModels');

const DB_URL = 'mongodb://localhost:27017/test';
const COLLECTION_NAME = 'posts';

let testDB = {};
let categoriesModel = {};

describe('Categories Model', () => {
    before(done => {
        MongoClient.connect(DB_URL, (err, db) => {
            testDB = db.db('test');
            categoriesModel = models().getCategoriesModel(testDB, COLLECTION_NAME);

            setTimeout(() => {
                done();
            }, 1000);
        });
    });

    it('should return all categories', async () => {
        // given
        const allCategories = ['category', 'category0', 'category1'];

        // when
        const categories = await categoriesModel.getAllCategories();

        // then
        expect(categories).to.have.members(allCategories);
    });

    after(async () => {
        await testDB.dropDatabase();
    });
});

