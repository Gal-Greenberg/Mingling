const userController = require("../controllers/userController");

module.exports = (router) => {
    router.post('/register', userController.register);
    router.post('/login', userController.login);
    // router.patch('/users/update', authMiddleware, userController.updateUser);
}