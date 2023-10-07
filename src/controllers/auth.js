const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { getUserByEmail } = require('./users');
const saltRounds = 10;

// Sing up
const signup = async ({ email, password, name, username }) => {
    const existedUser = await getUserByEmail(email);

    if (existedUser.message == "Usuario encontrado") {
        throw new Error(existedUser.message);
    }
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        email,
        password: hashedPassword,
        name,
        username,
        salt,
    });

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET);
};

const login = async ({ email, password }) => {
    const user = await getUserByEmail(email);

    if (user.message == "No existe ningún usuario con este email") {
        throw new Error(user.message);
    }

    const match = await bcrypt.compare(password, user.data.password);

    if (!match) {
        throw new Error('Wrong password');
    }

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET);
};

module.exports = {
    signup,
    login,
};
