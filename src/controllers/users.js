const db = require('../models');
const User = db.User;
// TODO: Comments

// Users
const getAllUsers = async () => {
    return User.findAll();
};

// User by email
const getUserByEmail = async (email) => {
    let message = '';
    let search = {};

    if (!email) {
        return (message = 'Sin email no hay user que bucar :D');
    } else {
        let user = await User.findOne({ where: { email } });
        user
            ? (message = 'Usuario encontrado')
            : (message = 'No existe ningún usuario con este email');
        search = {
            data: user,
            message,
        };
    }

    return search;
};

// Create User
const createUser = async (newUserData) => {
    const userFound = await getUserByEmail(newUserData.email);

    if (typeof userFound != typeof 'string' && userFound.user != undefined) {
        return 'Ya existe este usuario';
    } else if (
        typeof userFound != typeof 'string' &&
        userFound.user == undefined
    ) {
        return User.create(newUserData);
    } else {
        return userFound;
    }
};

// Update user
const updateUser = async (newUserData) => {
    return User.update(newUserData, {
        where: {
            email: newUserData.email,
        },
    });
};

const deleteUser = async (email) => {
    return User.destroy({
        where: {
            email,
        },
    });
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
};
