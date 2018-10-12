// test-clients.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Client = require('../models/client');

const sampleClient =     {
    "title": "Super Sweet Client",
    "description": "A great client with a lovely goal.",
}

chai.use(chaiHttp);

// tell mocha you want to test Clients (this string is taco)
describe('Clients', ()  => {

    after(() => {
        Client.deleteMany({title: 'Super Sweet Client'}).exec((err, clients) => {
            clients.remove();
        })
    });

  // make taco name for the test
  it('should index ALL clients on / GET', (done) => {
    // use chai-http to make a request to your server
    chai.request(app)
        // send a GET request to root route
        .get('/')
        // wait for response
        .end((err, res) => {
          // check that the response status is = 200 (success)
          res.should.have.status(200);
          // check that the response is a type html
          res.should.be.html;
          // end this test and move onto the next.
          done();
        });
  });

  // TEST NEW
  it('should display new form on /clients/new GET', (done) => {
    chai.request(app)
      .get(`/clients/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });

  // TEST EDIT
  it('should edit a SINGLE client on /clients/<id>/edit GET', (done) => {
      var client = new Client(sampleClient);
      client.save((err, data) => {
          chai.request(app)
          .get(`/clients/${data._id}/edit`)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html
              done();
          });
      });
  });

  // TEST CREATE
 it('should create a SINGLE client on /clients POST', (done) => {
   chai.request(app)
       .post('/clients')
       .send(sampleClient)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
 });

 // TEST SHOW
 it('should show a SINGLE client on /clients/<id> GET', (done) => {
   var client = new Client(sampleClient);
   client.save((err, data) => {
     chai.request(app)
       .get(`/clients/${data._id}`)
       .end((err, res) => {
         res.should.have.status(200);
         res.should.be.html
         done();
       });
   });
 });

 // TEST DELETE
 it('should delete a SINGLE client on /clients/<id> DELETE', (done) => {
   var client = new Client(sampleClient);
   client.save((err, data)  => {
    chai.request(app)
     .delete(`/clients/${data._id}?_method=DELETE`)
     .end((err, res) => {
       res.should.have.status(200);
       res.should.be.html
       done();
     });
   });
 });
});
