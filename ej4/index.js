const apiUrl = 'http://localhost:3000/users'; 

// Renderizar los usuarios al cargar la página
async function renderUsers() {
  const response = await fetch(apiUrl);
  const users = await response.json();

  const usersList = document.getElementById('users');
  usersList.innerHTML = ''; 

  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
      ${user.name} / ${user.role} / ${user.email}
      <button class="promote-btn">${user.role === 'Admin' ? 'Demote' : 'Promote'}</button>
      <button class="delete-btn">Delete</button>
    `;

    const promoteButton = userItem.querySelector('.promote-btn');
    promoteButton.addEventListener('click', () => updateRole(user.id, user.role === 'Admin' ? 'Editor' : 'Admin'));

    const deleteButton = userItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => deleteUser(user.id));

    usersList.appendChild(userItem);
  });
}

// Crear un nuevo usuario
async function addUser() {
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const role = document.querySelector('select[name="role"]').value;

  if (!name || !email || !role) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const newUser = { name, email, role };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  if (response.ok) {
    renderUsers();
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="email"]').value = '';
    document.querySelector('select[name="role"]').value = 'Admin';
  } else {
    alert('Error al agregar el usuario.');
  }
}

// Actualizar el rol de un usuario
async function updateRole(userId, newRole) {
  const response = await fetch(`${apiUrl}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: newRole }),
  });

  if (response.ok) {
    renderUsers();
  } else {
    alert('Error al actualizar el rol.');
  }
}

// Eliminar un usuario
async function deleteUser(userId) {
  const response = await fetch(`${apiUrl}/${userId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    renderUsers();
  } else {
    alert('Error al eliminar el usuario.');
  }
}
document.getElementById('add').addEventListener('click', addUser);
renderUsers();