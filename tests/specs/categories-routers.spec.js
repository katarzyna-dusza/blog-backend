const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const express = require('express');
const router = require('../../routers/categories-router');

chai.use(chaiHttp);

describe('Categories Router -> /categories', () => {
    let app;

    beforeEach(() => {
        app = express();
    });

    it('should return all categories', done => {
        const categories = ['category', 'category0', 'category1'];
        const categoriesStub = {getAllCategories: () => Promise.resolve(categories)};
        router(app, categoriesStub);

        chai.request(app)
            .get('/categories')
            .end((err, res) => {
                expect(res.body).to.have.length(3);
                expect(res.body).to.have.members(categories);
                done();
            });
    });
});

