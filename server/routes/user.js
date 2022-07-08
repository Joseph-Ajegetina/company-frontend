const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



// routes
router.get('/', userController.viewall);
router.post('/', userController.find);

router.post('/sort', userController.sort);

router.get('/adduser', userController.form);
router.post('/adduser', userController.create);

router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);

router.get('/viewuser/:id', userController.view);
router.get('/:id',userController.delete);






module.exports = router;