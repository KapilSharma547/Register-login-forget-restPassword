const router = require('express').Router()
const ctrl = require('../controller/auth.controller')

router.post('/login',ctrl.login);
router.post('/register',ctrl.register)
router.post('/forget-password',ctrl.forget_password)
router.post('/email-send',ctrl.email_send)
module.exports = router