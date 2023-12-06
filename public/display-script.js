document.addEventListener('DOMContentLoaded', function () {
    const userList = document.getElementById('userList');
  
    // Load user list on page load
    loadUserList();
  
    // Periodically update the user list (every 5 seconds in this example)
    setInterval(loadUserList, 500);
  
    function loadUserList() {
      fetch('/users')
        .then((response) => response.json())
        .then((users) => {
          userList.innerHTML = ''; // Clear previous list
          users.forEach((user, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            
            // Check if the user has been accepted with a green background
            if (user.accepted) {
              listItem.style.backgroundColor = 'green';
              // Remove the green color after 30 seconds
              setTimeout(() => {
                listItem.style.backgroundColor = '';
              }, 30 * 1000);
            }
            
            listItem.innerHTML = `
              <span class="badge bg-primary">${index + 1}</span>
              ${user.fullname}`;
            userList.appendChild(listItem);
          });
        })
        .catch((error) => console.error('Error:', error));
    }
  });
  