const { User } = require('../../../models');

/**
 * Get a list of users
 * @param {object} params
 * @param {number} params.pageNumber
 * @param {number} params.pageSize
 * @param {string} params.sort
 * @param {string} params.search
 * @param {number} offset
 * @returns {Promise<Array>}
 */

async function getUsers(pageSize, offset, sort, search) {
  // Membuat objek query kosong
  let query = {};

  // Menambahkan filter pencarian jika diberikan
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } }, // pencarian berdasarkan nama
        { email: { $regex: search, $options: 'i' } }, // pencarian berdasarkan email
      ],
    };
  }

  // Menambahkan pengurutan jika diberikan
  let sortField = 'email';
  let sortOrder = 1;
  if (sort) {
    const [field, order] = sort.split(':');
    sortField = field === 'name' ? field : 'email'; // Jika field tidak valid, default ke email
    sortOrder = order === 'desc' ? -1 : 1;
  }

  // Mengambil data pengguna dengan pagination dan filter
  return await User.find(query)
    .sort({ [sortField]: sortOrder })
    .skip(offset)
    .limit(pageSize);
}

async function getUserCount(search) {
  // Mencari jumlah total pengguna dengan filter pencarian
  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };
  }
  return await User.countDocuments(query);
}

// Implementasi fungsi createUser, getUser, updateUser, deleteUser, getUserByEmail, dan changePassword seperti sebelumnya

module.exports = {
  getUsers,
  getUserCount,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUserCount,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
