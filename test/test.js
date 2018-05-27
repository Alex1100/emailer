let Sequelize = require('sequelize');
let bcrypt = require('bcrypt') || require('bcrypt-nodejs');
let crypto = require('crypto');
const saltRounds = 10;
let User = require('../models/user').User;
let mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_SANDBOX_DOMAIN });
let axios  = require('axios');
let btoa = require('btoa');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../app');
chai.use(chaiHttp);
let assert = require('assert');

generateUserToken = (email, fullName, password) => {
  let prehashString = (email + password + fullName);
  let BufferInitializer = process.env.DATABASE_URL + process.env.DATABASE_PASSWORD
  let key = Buffer(BufferInitializer, 'base64');
  let hmac = crypto.createHmac('sha256', key);
  let signature = hmac.update(prehashString).digest('base64');
  return signature;
}

describe('RUNNING TEST SUITE FOR USERS CONTROLLER', () => {
  describe('Login Function', () => {
    it('should login user', (done) => {
      let body = {
        email: 'alex1100.software@gmail.com',
        fullName: 'Alexander Aleksanyan',
        password: 'coolman10'
      };

      let request = {
        params: {
          user: btoa(JSON.stringify({email: 'alex1100.software@gmail.com',password: 'coolman10'}))
        }
      };

      chai.request(server)
        .post('/signup')
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.request._data.should.have.property('email').eql('alex1100.software@gmail.com');
          res.request._data.should.have.property('fullName').eql('Alexander Aleksanyan');
          res.request._data.should.have.property('password').eql('coolman10');
          done();
        });

      chai.request(server)
        .get(`/login/${request}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('fullName').eql('Alexander Aleksanyan');
          res.body.should.have.property('email').eql('alex1100.software@gmail.com');
          res.body.should.have.property('user_token').eql('PGmbb6yXmViKUTirl+edzb2cK3x8NiGjVvsl/Qqvnyc=');
          done();
        })
    });
  });


  describe('SignUp Function', () => {
    it('should signup User', (done) => {
      let body = {
        email: 'Westo@gmail.com',
        fullName: 'West Ohanson',
        password: 'westtime21'
      };

      chai.request(server)
        .post('/signup')
        .send(body)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.request._data.should.be.a('object');
          res.request._data.should.have.property('email').eql('Westo@gmail.com');
          res.request._data.should.have.property('fullName').eql('West Ohanson');
          res.request._data.should.have.property('password').eql('westtime21');
          done();
        });

        let request = {
          params: {
            user: btoa(JSON.stringify({email: 'Westo@gmail.com',password: 'westtime21'}))
          }
        }

      chai.request(server)
      .get(`/login/${request}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.should.have.property('email').eql('Westo@gmail.com');
        res.body.should.have.property('fullName').eql('West Ohanson');
        res.body.should.have.property('user_token').eql('GpY2AIuoj7behBhzB/L8aBcT7JUaAlr+NI4NkdiRZNM=');
        done();
      })
    })
  })
})

