const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then(() => console.log('User.js:6     ','Connected to MongoDB'))
    .catch(err => console.error('User.js:7     ','MongoDB connection error:', err));

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        default: 500
    },
}, {
    collection: 'User',
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    console.log('User.js:28     ','user saved');

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;