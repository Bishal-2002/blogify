const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/logout').post(userController.logout)
router.route('/profile').get(userController.profile)

module.exports = router