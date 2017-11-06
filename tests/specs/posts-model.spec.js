const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const models = require('./prepareModels');

const DB_URL = 'mongodb://localhost:27017/test';
const COLLECTION_NAME = 'posts';

let testDB = {};
let postsModel = {};

describe('Posts Model', () => {
    before(done => {
        MongoClient.connect(DB_URL, (err, db) => {
            testDB = db.db('test');
            postsModel =  models().getPostsModel(testDB, COLLECTION_NAME);

            setTimeout(() => {
                done();
            }, 1000);
        });
    });

    it('should return all posts', async () => {
        //when
        const posts = await postsModel.getAllPosts();

        //then
        expect(posts).to.be.an('array').have.lengthOf(2);
    });

    it('should return one post with specific id', async () => {
        // given
        const id = '58fbaa40cf2529082e96c8ca';

        // when
        const post = await postsModel.getPostById(new ObjectId(id));

        // then
        expect(post.title).to.equal('Title0');
    });

    it('should return filtered posts by category and tag', async () => {
        // given
        const categories = ['category', 'category0'];
        const tags = ['tag0'];

        // when
        const posts = await postsModel.getPostsByCategoriesAndTags(categories, tags);

        // then
        expect(posts).to.have.lengthOf(2);
    });

    it('should return filtered posts by category', async () => {
        // given
        const categories = ['category', 'category1'];
        const tags = [];

        // when
        const posts = await postsModel.getPostsByCategoriesAndTags(categories, tags);

        // then
        expect(posts).to.have.lengthOf(2);
    });

    it('should return filtered posts by tag', async () => {
        // given
        const categories = [];
        const tags = ['tag1'];

        // when
        const posts = await postsModel.getPostsByCategoriesAndTags(categories, tags);

        // then
        expect(posts).to.have.lengthOf(1);
        expect(posts[0].title).to.equal('Title1');
    });

    it('should return favourite posts', async () => {
        // given
        const user = "NormalUser";

        // when
        const posts = await postsModel.getMyFavouritePosts(user);

        // then
        expect(posts).to.have.lengthOf(1);
        expect(posts[0].title).to.equal('Title1');
    });

    it('should return filtered posts by text', async () => {
        // given
        const text = "Content0";

        // when
        const posts = await postsModel.getPostsByText(text);

        // then
        expect(posts).to.have.lengthOf(2);
    });

    it('should dislike post', async () => {
        // given
        const id = '59d26f7d35271d909e3b0756';
        const likes = [];

        // when
        const result = await postsModel.toggleLike(new ObjectId(id), likes);

        // then
        expect(result.result.ok).to.equal(1);
    });

    it('should add new comment', async () => {
        // given
        const id = '59d26f7d35271d909e3b0756';
        const comment = {
            username: "Test User",
            text: "This is awesome"
        };

        // when
        const result = await postsModel.addNewComment(new ObjectId(id), comment);

        // then
        expect(result.result.ok).to.equal(1);
    });

    after(async () => {
        await testDB.dropDatabase();
    });
});

