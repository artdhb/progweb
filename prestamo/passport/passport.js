var LocalStrategy= require('passport-local').Strategy;
var mysql= require('mysql');
var bcrypt= require('bcryptjs');

module.exports= function(passport){
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback: true
	}, function(req, nombre, password, done){

		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		db.query('SELECT * FROM usuario WHERE nombre=?', nombre, function(err,rows,fields){
			if(err){	
				throw err;	
			}
			db.end();

			if(rows.length > 0){
				var usuario= rows[0];
				if(bcrypt.compareSync(password, usuario.password)){
					return done(null, usuario);
				}
			}
			return done(null, false, req.flash('usermessage','Usuario o contraseña incorrectos.'));
		});


		return;	
	}
	));
};