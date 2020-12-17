const router = require('koa-router')();
const Auth = require('../app/controllers/auth');

router.post('/login', Auth.loginAction);
router.post('/register', Auth.registerAction);

module.exports = router;