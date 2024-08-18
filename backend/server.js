const express = require('express');
const User = require('./User');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { auth } = require('./auth');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res)=> {
    res.send('Server is running...');
})


app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        return res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        return res.status(400).json({ error: 'User already exists' });
    }
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User does not exist' });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(400).json({ error: 'Password Incorrect' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
})


app.get('/api/dashboard', auth, async (req, res) => {
    const id = req.id;
    const user = await User.findOne({ _id: id });

    res.json({
        username: user.username,
        counter: user.counter
    });
})


app.put('/api/savecount', auth, async (req, res) => {
    const id = req.id;
    const counter = req.body.counter;
    
    try {
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).json({ error: 'User not found' });

        user.counter = counter;
        await user.save();
    }
    catch (error) {
        return res.status(400).json({ error: 'Could not update counter' });
    }
    res.send({ msg: 'Counter Updated Successfully' });  
})




app.listen(3000, () => {
    console.log('Listening to port 3000')
});