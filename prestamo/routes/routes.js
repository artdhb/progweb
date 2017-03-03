var express = require('express');
var router = express.Router();
var passport= require('passport');
var controllers= require('.././controllers');
var authMiddleware= require('.././middleware/auth');

router.get('/',controllers.homeController.index);
router.get('/registrarse',controllers.userController.getSignUp);
router.post('/registrarse',controllers.userController.postSignUp);
router.get('/login',controllers.userController.getSignIn);
router.get('/registrocorrecto',controllers.userController.getCorrectReg);
router.post('/login',passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));
router.get('/logout',authMiddleware.isLogged,controllers.userController.logout);
router.get('/estados',controllers.movController.getEstados);
router.post('/nuevoprestamo',authMiddleware.isLogged,controllers.movController.postNuevoPrestamo);
router.get('/prestamorealizado',authMiddleware.isLogged,controllers.movController.getCorrectPrest);
router.post('/nuevopago',authMiddleware.isLogged,controllers.movController.postNuevoPago);
router.get('/pagorealizado',authMiddleware.isLogged,controllers.movController.getCorrectPago);
router.get('/movimientos',authMiddleware.isLogged,controllers.movController.getMovimientos);
router.get(/^\/movimientos\/([^\\/]+?)(?:\/(?=$))?$/i,controllers.movController.getJSONMov);
router.get('/listamovimientos',controllers.movController.getListaMov);

module.exports = router;