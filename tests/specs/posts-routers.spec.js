const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const express = require('express');
const router = require('../../routers/posts-router');
const readPosts = require('../mocks/posts.json');

chai.use(chaiHttp);

describe('Posts Router -> /posts', () => {
    let app;

    beforeEach(() => {
        app = express();
    });

    it('should return all posts', done => {
        const postsStub = {getAllPosts: () => Promise.resolve(readPosts)};
        router(app, postsStub);

            chai.request(app)
                .get('/posts')
                .end((err, res) => {
                    expect(res.body).to.have.length(2);
                    done();
                });
    });

    it('should return one post by id', done => {
        const postStub = {getPostById: (id) => Promise.resolve(readPosts[0])};
        router(app, postStub);

        chai.request(app)
            .get('/posts/58fbaa40cf2529082e96c8ca')
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.title).to.equal('Title0');
                done();
            });
    });

    it('should return filtered posts by category and tag', done => {
        const postStub = {getPostsByCategoriesAndTags: (categories, tags) => Promise.resolve(readPosts)};
        router(app, postStub);

        chai.request(app)
            .get('/posts?categories=category1&tags=tag0,tag1')
            .end((err, res) => {
                expect(res.body).to.have.length(2);
                done();
            });
    });


    it('should return filtered posts by category', done => {
        const postStub = {getPostsByCategoriesAndTags: (categories, tags) => Promise.resolve([readPosts[0]])};
        router(app, postStub);

        chai.request(app)
            .get('/posts?categories=category0')
            .end((err, res) => {
                expect(res.body).to.have.length(1);
                expect(res.body[0].title).to.equal('Title0');
                done();
            });
    });

    it('should return filtered posts by tag', done => {
        const postStub = {getPostsByCategoriesAndTags: (categories, tags) => Promise.resolve([readPosts[1]])};
        router(app, postStub);

        chai.request(app)
            .get('/posts?tags=tag1')
            .end((err, res) => {
                expect(res.body).to.have.length(1);
                expect(res.body[0].title).to.equal('Title1');
                done();
            });
    });

    it('should return favourite posts', done => {
        const postStub = {getMyFavouritePosts: (user) => Promise.resolve([readPosts[1]])};
        router(app, postStub);

        chai.request(app)
            .get('/posts?userName=NormalUser')
            .end((err, res) => {
                expect(res.body).to.have.length(1);
                done();
            });
    });

    it('should return filtered posts by text', done => {
        const postStub = {getPostsByText: (text) => Promise.resolve(readPosts)};
        router(app, postStub);

        chai.request(app)
            .get('/posts?text=Content0')
            .end((err, res) => {
                expect(res.body).to.have.length(2);
                done();
            });
    });

    it('should like post', done => {
        const postStub = {toggleLike: (id, likes) => Promise.resolve({})};
        router(app, postStub);

        chai.request(app)
            .put('/posts/58fbaa40cf2529082e96c8ca/likes')
            .send({ likes: [{username: 'NormalUser'}]})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(err).to.be.null;
                done();
            });
    });

    it('should add new comment', done => {
        const postStub = {addNewComment: (id, likes) => Promise.resolve({})};
        router(app, postStub);

        chai.request(app)
            .put('/posts/58fbaa40cf2529082e96c8ca/comments')
            .send([
                {
                    username: 'NormalUser',
                    text: 'Text1'
                },
                {
                    username: 'NormalUser',
                    text: "This is awesome"
                }
            ])
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(err).to.be.null;
                done();
            });
    });
});

