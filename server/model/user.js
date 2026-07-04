const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  phone: true,
  address: true,
  isVerified: true,
  createdAt: true,
  updatedAt: true,
};

const userWithPasswordSelect = {
  ...publicUserSelect,
  passwordHash: true,
  refreshToken: true,
};

module.exports = {
  publicUserSelect,
  userWithPasswordSelect,
};
