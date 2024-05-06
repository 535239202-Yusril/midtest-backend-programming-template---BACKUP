const express = require('express');
const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const accountControllers = require('./account-controller');
const accountValidators = require('./account-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/accounts', route);

  // Create account
  route.post(
    '/create',
    authenticationMiddleware,
    celebrate(accountValidators.createAccount),
    accountControllers.createAccount
  );

  // Deposit
  route.post(
    '/deposit',
    authenticationMiddleware,
    celebrate(accountValidators.deposit),
    accountControllers.deposit
  );

  //  account details
  route.get(
    '/:accountNumber',
    authenticationMiddleware,
    celebrate(accountValidators.getAccountDetails),
    accountControllers.getAccountDetails
  );

  // Change PIN
  route.put(
    '/:accountNumber/pin',
    authenticationMiddleware,
    celebrate(accountValidators.changePin),
    accountControllers.changePin
  );

  // Delete account
  route.delete(
    '/:accountNumber',
    authenticationMiddleware,
    celebrate(accountValidators.deleteAccount),
    accountControllers.deleteAccount
  );
};
