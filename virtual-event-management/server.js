const express = require('express');
const app = express();
const port = 3000;
const {registerUser, loginUser,authenticateUser}= require('./auth');
const { createEvent, updateEvent, deleteEvent, registerForEvent } = require('./events');


app.use(express.json());

app.get('/', (req,res) => {
    res.send('Virtual Event Management Api');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//user registration route
app.post('/register', registerUser);

// user login route
app.post('/login', loginUser);

//create an event
app.post('/events', authenticateUser, createEvent);

// Update an event
app.put('/events/:id', authenticateUser, updateEvent);

// Delete an event
app.delete('/events/:id', authenticateUser, deleteEvent);

// Register for an event
app.post('/events/:id/register',authenticateUser,registerForEvent);
module.exports = app; 