const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files from the 'static' directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve the 'index.html' file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
