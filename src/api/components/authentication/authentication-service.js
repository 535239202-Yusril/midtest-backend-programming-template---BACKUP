const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');

let loginAttempts = {};
// reset timer setelah 30 menit
let resetTimer = {};

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object}
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // apakah loginAttempts ada untuk email tersebut, jika tidak, inisialisasi
  if (!loginAttempts[email]) {
    loginAttempts[email] = 0;
  }

  // Periksa apakah upaya login maksimum telah tercapai
  if (loginAttempts[email] >= 5) {
    if (!resetTimer[email]) {
      resetTimer[email] = setTimeout(
        () => {
          // Reset loginAttempts setelah 30 minutes
          loginAttempts[email] = 0;
          // reset timer
          clearTimeout(resetTimer[email]);
          delete resetTimer[email];
        },
        30 * 60 * 1000
      );
    }

    throw errorResponder(
      errorTypes.TOO_MANY_ATTEMPTS,
      `403 Forbidden: Too many failed login attempts. Tunggu 30 menit.`
    );
  }

  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  if (user && passwordChecked) {
    loginAttempts[email] = 0;

    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  }

  if (!user || !passwordChecked) {
    loginAttempts[email]++;
    let attemptNumber = loginAttempts[email];
    let remainingAttempts = 5 - attemptNumber;
    let errorMessage = `Percobaan ke ${attemptNumber}, gagal. Sisa percobaan: ${remainingAttempts}`;
    throw errorResponder(errorTypes.INVALID_CREDENTIALS, errorMessage);
  }

  return null;
}

module.exports = {
  checkLoginCredentials,
};
