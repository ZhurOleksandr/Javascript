/**
 * @typedef {Object} UserData
 * @property {number|string} [id]
 * @property {string} name
 * @property {string} email
 * @property {string} [role='user']
 * @property {string} [createdAt]
 */

/**
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * @param {UserData} data
 * @returns {Object}
 */
function createUser(data) {
  const { id, name, email, role = 'user', createdAt = new Date().toISOString() } = data;

  if (!name || typeof name !== 'string') throw new Error('Name is required');
  if (!isValidEmail(email)) throw new Error('Invalid email');
  if (!['user', 'admin'].includes(role)) throw new Error('Invalid role');

  return {
    id,
    name,
    email,
    role,
    createdAt,
    getInfo() {
      const { id, name, email, role, createdAt } = this;
      return { id, name, email, role, createdAt };
    },
    updateProfile(updateData = {}) {
      const next = { ...this, ...updateData };

      if (updateData.name !== undefined && typeof updateData.name !== 'string') {
        throw new Error('Invalid name');
      }
      if (updateData.email !== undefined && !isValidEmail(updateData.email)) {
        throw new Error('Invalid email');
      }
      if (updateData.role !== undefined && !['user', 'admin'].includes(updateData.role)) {
        throw new Error('Invalid role');
      }

      return createUser({
        id: next.id,
        name: next.name,
        email: next.email,
        role: next.role,
        createdAt: next.createdAt
      });
    },
    isAdmin() {
      return this.role === 'admin';
    }
  };
}

function createUserManager() {
  const users = new Map();
  let lastId = 0;

  return {
    createUser(data) {
      const user = createUser({ id: ++lastId, ...data });
      users.set(user.id, user);
      return { ...user };
    },
    getUser(id) {
      const user = users.get(id);
      return user ? { ...user } : null;
    },
    updateUser(id, data) {
      const existing = users.get(id);
      if (!existing) throw new Error('User not found');
      const updated = existing.updateProfile(data);
      users.set(id, updated);
      return { ...updated };
    },
    deleteUser(id) {
      return users.delete(id);
    },
    getAllUsers() {
      return Object.values(Object.fromEntries(users));
    },
    getUsersByRole(role) {
      return this.getAllUsers().filter(user => user.role === role);
    }
  };
}

const userManager = createUserManager();
userManager.createUser({ name: 'Admin User', email: 'admin@example.com', role: 'admin' });
userManager.createUser({ name: 'Regular User', email: 'user@example.com', role: 'user' });

const output = document.getElementById('output');
const createBtn = document.getElementById('createBtn');
const loadBtn = document.getElementById('loadBtn');

function renderUsers() {
  output.textContent = JSON.stringify(userManager.getAllUsers(), null, 2);
}

createBtn.addEventListener('click', () => {
  try {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const user = userManager.createUser({ name, email, role });
    output.textContent = JSON.stringify(user, null, 2);
  } catch (error) {
    output.textContent = error.message;
  }
});

loadBtn.addEventListener('click', renderUsers);
window.userManager = userManager;
window.createUser = createUser;
window.isValidEmail = isValidEmail;
window.createUserManager = createUserManager;