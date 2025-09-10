document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const addUserForm = document.getElementById('addUserForm');
  const usersTableBody = document.querySelector('#usersTable tbody');
  const logoutBtn = document.getElementById('logoutBtn');
  const errorDiv = document.getElementById('error');

  // Admin credentials (hardcoded for demo)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  // Check if on login page
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        window.location.href = 'admin.html';
      } else {
        if (errorDiv) {
          errorDiv.style.display = 'block';
          errorDiv.textContent = 'Usuário ou senha incorretos.';
        }
      }
    });
  }

  // Check if on admin page
  if (addUserForm) {
    // Redirect to login if not logged in
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
      window.location.href = 'login.html';
      return;
    }

    // Load users from localStorage
    function loadUsers() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      usersTableBody.innerHTML = '';
      users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
        usersTableBody.appendChild(tr);
      });
    }

    loadUsers();

    addUserForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) return;

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ name, email });
      localStorage.setItem('users', JSON.stringify(users));

      addUserForm.reset();
      loadUsers();
    });

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAdminLoggedIn');
        window.location.href = 'login.html';
      });
    }
  }
});
