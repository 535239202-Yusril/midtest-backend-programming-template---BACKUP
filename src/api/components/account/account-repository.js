const { Account } = require('../../../models');

/**
 * Mencari account berdasarkan nomor rekening (accountNumber)
 * @param {string} accountNumber - Nomor rekening
 * @returns {Promise}
 */
async function getAccountByAccountNumber(accountNumber) {
  return Account.findOne({ accountNumber });
}

/**
 * Mencari account berdasarkan ID pengguna (userId)
 * @param {string} userId - ID pengguna
 * @returns {Promise}
 */
async function getAccountByUserId(userId) {
  return Account.findOne({ userId });
}

/**
 * Membuat account baru
 * @param {string} userId - ID pengguna
 * @param {string} pin - PIN
 * @returns {Promise}
 */
async function createAccount(userId, pin) {
  return Account.create({
    userId,
    pin,
  });
}

/**
 * Mengganti PIN dari account
 * @param {string} accountNumber - Nomor rekening
 * @param {string} newPin - PIN baru
 * @returns {Promise}
 */
async function updatePin(accountNumber, newPin) {
  return Account.updateOne({ accountNumber }, { $set: { pin: newPin } });
}

/**
 * Menghapus account berdasarkan nomor rekening
 * @param {string} accountNumber - Nomor rekening
 * @returns {Promise}
 */
async function deleteAccountByAccountNumber(accountNumber) {
  return Account.deleteOne({ accountNumber });
}

module.exports = {
  getAccountByAccountNumber,
  getAccountByUserId,
  createAccount,
  updatePin,
  deleteAccountByAccountNumber,
};
