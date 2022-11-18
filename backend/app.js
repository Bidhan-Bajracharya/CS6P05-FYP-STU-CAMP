const express = require('express');
const app = express();
const users = require('./routes/users')

// middleware
// we need to do this, inorder to get the data from 'req.body'
app.use(express.json());

// routes
app.use('/api/v1/users', users);

app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen('5000', () => {
    console.log('Server is listening on port 5000...');
})