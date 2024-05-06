const joi = require('joi');

module.exports = {
  createAccount: {
    body: {
      user_id: joi.string().required().label('User ID'),
      pin: joi.string().required().label('PIN'),
      account_number: joi.string().required().label('Account Number'),
    },
  },

  deposit: {
    body: {
      account_number: joi.string().required().label('Account Number'),
      pin: joi.string().required().label('PIN'),
      amount: joi.number().min(0).required().label('Amount'),
    },
  },

  getAccountDetails: {
    body: {
      account_number: joi.string().required().label('Account Number'),
      pin: joi.string().required().label('PIN'),
    },
  },

  changePin: {
    body: {
      account_number: joi.string().required().label('Account Number'),
      old_pin: joi.string().required().label('Old PIN'),
      new_pin: joi.string().required().label('New PIN'),
    },
  },

  deleteAccount: {
    body: {
      account_number: joi.string().required().label('Account Number'),
      pin: joi.string().required().label('PIN'),
    },
  },
};
