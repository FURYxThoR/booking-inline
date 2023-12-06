const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data store
let users = [];
let userIdCounter = 1;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const { fullname, mobile } = req.body;
  const user = {
    id: userIdCounter++,
    fullname,
    mobile,
  };
  users.push(user);
  res.json({ success: true });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/accept/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);
  if (user) {
    // Perform acceptance logic
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

app.post('/reject/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    // Perform rejection logic
    users.splice(userIndex, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
