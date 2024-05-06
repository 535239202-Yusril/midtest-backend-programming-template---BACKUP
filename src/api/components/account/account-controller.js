const { errorResponder, errorTypes } = require('../../../core/errors');
const accountService = require('./account-service');

/**
 * Handle account creation request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createAccount(request, response, next) {
  const { user_id, pin } = request.body;

  try {
    const account = await accountService.createAccount(user_id, pin);

    return response.status(201).json(account);
  } catch (error) {
    return next(error);
  }
}

/**
 * Untuk deposit
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deposit(request, response, next) {
  const { account_number, pin, amount } = request.body;

  try {
    const depositResult = await accountService.deposit(
      account_number,
      pin,
      amount
    );

    return response.status(200).json(depositResult);
  } catch (error) {
    return next(error);
  }
}

/**
 * Check dposit
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getAccountDetails(request, response, next) {
  const { account_number, pin } = request.body;

  try {
    const accountDetails = await accountService.getAccountDetails(
      account_number,
      pin
    );

    return response.status(200).json(accountDetails);
  } catch (error) {
    return next(error);
  }
}

/**
 * Mengganti pin
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function changePin(request, response, next) {
  const { account_number, old_pin, new_pin } = request.body;

  try {
    const pinChanged = await accountService.changePin(
      account_number,
      old_pin,
      new_pin
    );

    return response.status(200).json({ message: 'Pin changed successfully' });
  } catch (error) {
    return next(error);
  }
}

/**
 * Untuk men delete account
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteAccount(request, response, next) {
  const { account_number, pin } = request.body;

  try {
    const accountDeleted = await accountService.deleteAccount(
      account_number,
      pin
    );

    return response
      .status(200)
      .json({ message: 'Account deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createAccount,
  deposit,
  getAccountDetails,
  changePin,
  deleteAccount,
};
