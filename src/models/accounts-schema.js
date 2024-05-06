const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountNumber: {
    //norek
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: String,
    required: true,
  },
  balance: {
    //saldo
    type: Number,
    default: 0,
  },
});

module.exports = accountsSchema;
