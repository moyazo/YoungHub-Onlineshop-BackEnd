const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const router = require('express').Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        users
            ? res.status(200).json(users)
            : res.status(502).json('No hay users');
    } catch (error) {
        res.status(500).json(
            'Error al traer todos los usuarios' + error.message
        );
    }
});

// Create user
router.post('/create', async (req, res) => {
    try {
        const newUserData = req.body;
        if (!newUserData) {
            res.status(403).json('No hay datos para crear el user.');
        }
        const created = await createUser(newUserData);
        created
            ? res.status(200).json(created)
            : res.status(502).json('No se creó ningún usuario');
    } catch (error) {
        res.status(500).json('Error al crear el usuario:' + error);
    }
});

// Update user
router.put('/update', async (req, res) => {
    try {
        //TODO: Cuando crees el auth debes poner el token para pasar el id del user
        const newUserData = req.body;
        newUserData.email = "test@test.com";
        if (!newUserData) {
            res.status(403).json('No hay datos para modificar el user.');
        }
        const updated = await updateUser(newUserData);
        updated
            ? res.status(200).json(updated)
            : res.status(502).json('No se creó ningún usuario');
    } catch (error) {
        res.status(500).json('Error al modificar el usuario:' + error);
    }
});


// Update user
router.delete('/remove', async (req, res) => {
    try {
        //TODO: Cuando crees el auth debes poner el token para pasar el id del user
        const deleted = await deleteUser("test@test.com");
        deleted
            ? res.status(200).json(deleted)
            : res.status(502).json('No se eliminó ningún usuario');
    } catch (error) {
        res.status(500).json('Error al eliminar el usuario:' + error);
    }
});

module.exports = router;
