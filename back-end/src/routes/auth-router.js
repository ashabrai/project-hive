'use strict';

const superagent = require('superagent');
const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');


const Account = require('../model/auth-account-schema');
const logger = require('../lib/logger');
const basicAuthMiddleWare = require('../lib/basic-auth-middleware');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

const CLIENT_URL = 'http://localhost:3000';
const GOOGLE_BACKEND = 'https://www.googleapis.com/oauth2/v4/token';
const API_URL = 'http://localhost:3000/oauth/google';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

require('dotenv').config();


router.post('/user/signup', jsonParser, (request, response, next) => {
  console.log(jsonParser);
  if (!request.body.password || !request.body.username || !request.body.accesscode || !request.body.email) { // eslint-disable-line
    return next(new HttpError(400, 'missing parameters'));
  }
  return Account.create(request.body.username, request.body.email,
    request.body.password, request.body.accesscode) // 1. Hash password
    .then((createdAccount) => {
      delete request.body.password;
      delete request.body.accesscode;
      logger.log(logger.INFO, 'AUTH - creating Token');
      return createdAccount.pCreateToken(); // 2. Create and save token
    })
    .then((token) => {
      logger.log(logger.INFO, 'Responding with 200 status code and a token.');
      return response.json({ token }); // 3. Return a token
    })
    .catch(next);
});

router.get('/user/auth/login', basicAuthMiddleWare, (request, response, next) => {
  // development note: this won't directly handle the authentication logic
  if (!request.account) {
    return next(new HttpError(400, 'Bad Request'));
  }
  // development note: here is assumed middleware did what it was suppose to
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'Res 200 Status & Token');
      return response.json({ token });
    })
    .catch(next);
});

router.get('/oauth/google', (request, response) => {
  if (!request.query.code) {
    response.redirect(CLIENT_URL);
  } else {
    return superagent.post(GOOGLE_BACKEND)
      .type('form')
      .send({
        code: request.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: API_URL,
      })
      .then((tokenResponse) => {
        if (!tokenResponse.body.access_token) {
          response.redirect(CLIENT_URL);
        }

        const googleToken = tokenResponse.body.access_token;

        return superagent.get(OPEN_ID_URL)
          .set('Authorization', `Bearer ${googleToken}`);
      })
      .then((openIdResponse) => {
        console.log(openIdResponse.body);
        return Account.create(openIdResponse.name, openIdResponse.email,
          request.body.accesscode) // 1. Hash password
          .then((createdAccount) => {
            delete request.body.accesscode;
            logger.log(logger.INFO, 'AUTH - creating Token');
            return createdAccount.pCreateToken(); // 2. Create and save token
          })
          .then((token) => {
            logger.log(logger.INFO, 'Responding with 200 status code and a token.');
            return response.json({ token }); // 3. Return a token
          });
        response.cookie('oauthfrontend', 'You have been prescribed this token');
        response.redirect(CLIENT_URL);
      })
      .catch((error) => {
        console.error(error);
        response.redirect(CLIENT_URL);
      });
  }
});
