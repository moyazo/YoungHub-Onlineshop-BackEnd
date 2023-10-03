const { getAllUsers, createUser } = require('../controllers/users');
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

module.exports = router;

// module.exports = userRouter
