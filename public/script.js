document.addEventListener('DOMContentLoaded', function () {
  const userForm = document.getElementById('userForm');
  const userList = document.getElementById('userList');

  // Event listener for form submission
  userForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(userForm);
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Reset the form after successful submission
          userForm.reset();
          // Reload user list after submission
          loadUserList();
        } else {
          alert('Submission failed. Please try again.');
        }
      })
      .catch((error) => console.error('Error:', error));
  });

  // Load user list on page load
  loadUserList();

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
            ${user.fullname}`;
          userList.appendChild(listItem);
        });
      })
      .catch((error) => console.error('Error:', error));
  }
});
