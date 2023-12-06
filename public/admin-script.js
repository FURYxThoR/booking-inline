document.addEventListener('DOMContentLoaded', function () {
  const userList = document.getElementById('userList');

  // Load user list on page load
  loadUserList();

  // Periodically update the user list (every 5 seconds in this example)
  setInterval(loadUserList, 5000);

  function loadUserList() {
    fetch('/users')
      .then((response) => response.json())
      .then((users) => {
        userList.innerHTML = ''; // Clear previous list
        users.forEach((user, index) => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.innerHTML = `
            <span class="badge bg-primary">${index + 1}</span>
            ${user.fullname}
            <div class="btn-group float-end">
              <button class="btn btn-success" onclick="acceptUser(${user.id}, ${index})">Accept</button>
              <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </div>`;
          userList.appendChild(listItem);

          // Check if the user has been accepted with a green background
          if (user.accepted) {
            listItem.style.backgroundColor = 'green';
          }
        });
      })
      .catch((error) => console.error('Error:', error));
  }

  // Admin actions
  window.acceptUser = function (userId, index) {
    fetch(`/accept/${userId}`, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Set background color to green for accepted user
          const listItem = userList.children[index];
          listItem.style.backgroundColor = 'green';
          // Reload user list after acceptance
          setTimeout(() => {
            loadUserList();
          }, 5 * 60 * 1000); // Remove user after 5 minutes
        } else {
          alert('Acceptance failed. Please try again.');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  window.deleteUser = function (userId) {
    fetch(`/reject/${userId}`, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Reload user list after deletion
          loadUserList();
        } else {
          alert('Deletion failed. Please try again.');
        }
      })
      .catch((error) => console.error('Error:', error));
  };
});
