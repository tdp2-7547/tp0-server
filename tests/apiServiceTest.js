
process.env.NODE_ENV = 'test';

//dev dependences
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../service/server');
let expect = chai.expect;
let assert = chai.assert;
let should = chai.should;

let allbooks = "/books/java/0";
let singlebook = "/api/books/";
let titleThatExists = "java by example"
let titleThatNotExists = "how to do thing"



chai.use(chaiHttp);

describe("get all books",()=>{
    it("should get all books sucessfully", (done)=>{
        chai.request(server)
            .get(allbooks)
            .end(function(err,res){
                expect(res).to.have.status(200);
                done();
            });
    })
});
