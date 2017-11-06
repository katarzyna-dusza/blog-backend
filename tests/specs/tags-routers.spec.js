const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const express = require('express');
const router = require('../../routers/tags-router');

chai.use(chaiHttp);

describe('Tags Router -> /tags', () => {
    let app;

    beforeEach(() => {
        app = express();
    });

    it('should return all tags', done => {
        const tags = ['tag', 'tag0', 'tag1'];
        const tagsStub = {getAllTags: () => Promise.resolve(tags)};
        router(app, tagsStub);

        chai.request(app)
            .get('/tags')
            .end((err, res) => {
                expect(res.body).to.have.length(3);
                expect(res.body).to.have.members(tags);
                done();
            });
    });
});

