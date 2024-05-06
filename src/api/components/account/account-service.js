const accountRepository = require('./account-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Buat akun baru
 * @param {string} userId - User ID
 * @param {string} pin - PIN
 * @returns {object}
 */
async function createAccount(userId, pin) {
  // Cek account sudah pernah buat account atau belum?
  const existingAccount = await accountRepository.getAccountByUserId(userId);
  if (existingAccount) {
    throw errorResponder(
      errorTypes.INVALID_OPERATION,
      'User already has an account'
    );
  }

  return accountRepository.createAccount(userId, pin);
}

/**
 * Deposit
 * @param {string} accountNumber - Account number ( Rekening )
 * @param {string} pin - PIN
 * @param {number} amount - Amount to deposit ( Jumlah deposit )
 * @returns {object} Deposit transaction details ( Detail transaksi )
 */
async function deposit(accountNumber, pin, amount) {
  // Cek account sudah pernah di buat belum
  const account =
    await accountRepository.getAccountByAccountNumber(accountNumber);
  if (!account) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Account not found');
  }

  // Check PIN
  if (account.pin !== pin) {
    throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Incorrect PIN');
  }

  // Deposit
  account.balance += amount;
  await account.save();

  return {
    accountNumber: account.accountNumber,
    amount,
    balance: account.balance,
    transactionType: 'deposit',
  };
}

/**
 * GET account details
 * @param {string} accountNumber - Account number
 * @param {string} pin - PIN
 * @returns {object} Account details
 */
async function getAccountDetails(accountNumber, pin) {
  const account =
    await accountRepository.getAccountByAccountNumber(accountNumber);

  if (!account) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Account not found');
  }

  if (account.pin !== pin) {
    throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Incorrect PIN');
  }

  return {
    accountNumber: account.accountNumber,
    balance: account.balance,
    userId: account.userId,
  };
}

/**
 * Change PIN of an account
 * @param {string} accountNumber - Account number
 * @param {string} oldPin - Old PIN
 * @param {string} newPin - New PIN
 * @returns {object} Success message
 */
async function changePin(accountNumber, oldPin, newPin) {
  const account =
    await accountRepository.getAccountByAccountNumber(accountNumber);

  if (!account) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Account not found');
  }

  if (account.pin !== oldPin) {
    throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Incorrect PIN');
  }

  await accountRepository.updatePin(accountNumber, newPin);

  return { message: 'PIN changed successfully' };
}

/**
 * Delete an account
 * @param {string} accountNumber - Account number
 * @param {string} pin - PIN
 * @returns {object} Success message
 */
async function deleteAccount(accountNumber, pin) {
  const account =
    await accountRepository.getAccountByAccountNumber(accountNumber);

  if (!account) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Account not found');
  }

  if (account.pin !== pin) {
    throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Incorrect PIN');
  }

  await accountRepository.deleteAccountByAccountNumber(accountNumber);

  return { message: 'Account deleted successfully' };
}

module.exports = {
  createAccount,
  deposit,
  getAccountDetails,
  changePin,
  deleteAccount,
};
