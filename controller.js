const data = require('./data.js');
const jwt = require('jsonwebtoken');

const getAllData = () => {
    return data
};

const login = (username, password) => {
    const user = data.find(user => user.username === username);
    if (!user || password !== user.password) {
        return null;
    }
    const token = jwt.sign({ username }, "cCc");
    
    return {
        username,
        token
    };
};

const getUser = (username) => data.find(user => user.username === username);

module.exports = { getAllData, login, getUser };
