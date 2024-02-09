const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

// Serve static files from the 'static' directory
app.use('/static', express.static(path.join(__dirname, 'static')));


// Serve the 'index.html' file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// use cookieParser to ensure that /dashboard is accessible only to authenticated user
app.use(cookieParser());

// Middleware to check session cookie
const authenticateSession = (req, res, next) => {
    const sessionCookie = req.cookies.jwt;

    if (!sessionCookie) {
        // Redirect to login if session cookie is not present
        return res.redirect('/');
    }

    next();
};

app.get('/dashboard', authenticateSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});