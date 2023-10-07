const { signup, login } = require('../controllers/auth');
const router = require('express').Router();

/**
 * *SIGN UP ENDPOINT*
 * *localhost:8000/auth/signup*
 * @param {Request} request
 * @param {Response} response
 * @returns {String}
 */
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, username } = req.body;
        if (!email || !password) {
            res.status(400).json('Email o Password necesarios');
        }
        const authToken = await signup({ email, password, name, username });
        res.status(200).json(authToken);
    } catch (error) {
        res.status(500).json('Error al registrarse' + error.message);
    }
});
/**
 * *LOGIN UP ENDPOINT*
 * *localhost:8000/auth/login*
 * @param {Request} request
 * @param {Response} response
 * @returns {String}
 */
router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            response.status(400).json('Incorrect data');
        }
        const token = await login({ email, password });
        response.status(200).json(token);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

module.exports = router;
