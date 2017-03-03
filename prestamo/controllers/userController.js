var mysql= require('mysql');
var bcrypt= require('bcryptjs');

module.exports= {
	getSignUp: function(req,res,next){
		return res.render('users/signup');
	},
	postSignUp: function(req,res,next){
		var salt= bcrypt.genSaltSync(10);
		var password= bcrypt.hashSync(req.body.password,salt);
		var usuario= {
			nombre: req.body.nombre,
			password: password,
			deuda: 0,
			activo: 1
		};
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		db.query('INSERT INTO usuario SET ?', usuario, function(err,rows,fields){
			if(err){
				throw err;
			}
			db.end();
		});

		return res.redirect('/registrocorrecto');
	},
	getSignIn: function(req,res,next){
		return res.render('users/signin',{authmessage: req.flash('usermessage')});
	},
	getCorrectReg: function(req,res,next){
		return res.render('users/regcorrecto');
	},
	logout: function(req, res, next){
		req.logout();
		res.redirect('/login');
	}
};