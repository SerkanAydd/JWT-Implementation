const express = require('express');
const app = express();
const { login } = require('./controller.js');
const authMiddleware = require('./authMiddleware.js');

app.use(express.json());

// Route for handling authenticated data requests
app.use("/data", authMiddleware, require('./route.js'));

// Route for user login
app.post('/login', (req, res) => {
    const user = login(req.body.username, req.body.password);
    if (!user) {
        return res.status(422).json({ error: "Incorrect email or password." });
    }
    res.json(user); // Use res.json() for consistency
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000...");
});
