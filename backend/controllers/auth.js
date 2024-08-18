const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(400).json({ error: 'No Token Provided' });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('auth.js:10     ',decodedToken);
        
        req.id = decodedToken.id;
        console.log('auth.js:13     ',req.id);
        
        next();
    }
    catch {
        return res.status(400).json({ error: 'Some Error Occured!' })
    }
}

module.exports = { auth }