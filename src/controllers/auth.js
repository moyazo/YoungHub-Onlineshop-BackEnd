const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { getUserByEmail } = require('./users');
const saltRounds = 10;

// Sing up
const signup = async ({ email, password, name, username }) => {
    // Buscamos si hay user registrado y lanzamos error si existe.
    const existedUser = await getUserByEmail(email);

    if (existedUser) {
        return 'Este email ya tiene usuario...';
    }
    // Generamos la password hasheada y creamos el user
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        email,
        password: hashedPassword,
        name,
        username,
        salt,
    });
    // Finalmente devolvemos el token que contiene la info del user
    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET);
};

const login = async ({ email, password }) => {
    // Buscamos si hay user registrado y lanzamos error si no existe.
    const existedUser = await getUserByEmail(email);

    if (!existedUser) {
        return 'Usuario no encontrado...';
    }

    const match = await bcrypt.compare(password, existedUser.user.password);

    if (!match) {
        return 'Contraseña erronea';
    }

    return jsonwebtoken.sign({ email: existedUser.email }, process.env.TOKEN_SECRET);
};

module.exports = {
    signup,
    login,
};
