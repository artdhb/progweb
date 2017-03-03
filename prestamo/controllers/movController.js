var mysql= require('mysql');
var dateFormat= require('dateformat');

module.exports= {
	getEstados: function(req,res,next){
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		var estados= null;

		db.query('SELECT * FROM usuario', function(err,rows,fields){
			if(err){
				throw err;
			}
			estados= rows;
			db.end();
			res.render('estado/estados', {estados: estados, isAuthenticated: req.isAuthenticated(), user: req.user});
		});
	},
	getCorrectPrest: function(req,res,next){
		return res.render('estado/pcorrecto',{isAuthenticated: req.isAuthenticated(), user: req.user});
	},
	postNuevoPrestamo: function(req,res,next){
		var fechaActual= new Date();
		var fecha= dateFormat(fechaActual, 'yyyy-mm-dd h:MM:ss');
		var nMonto= parseInt(req.body.monto);
		var prestamo= {
			usuario_id: req.user.id,
			monto: nMonto,
			realizado_el: fecha,
			activo: 1
		};
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();

		/* Transacción */
		db.beginTransaction(function(err){
			if(err){
				throw err;
			}
			db.query('INSERT INTO prestamo SET ?', prestamo, function(err, result) {
				if(err){ 
		      		db.rollback(function() {
		        		throw err;
		      		});
		    	}
		    	db.query('SELECT deuda FROM usuario WHERE id=?',req.user.id, function(err,result){
					if(err){
						db.rollback(function() {
		        			throw err;
		      			});
					}
        			var string=JSON.stringify(result);
        			var json =  JSON.parse(string);
        			var deuda= json[0].deuda;
        			var nDeuda= deuda+ nMonto;

		    		var sql= 'UPDATE usuario SET deuda=' + nDeuda + ' WHERE id=' + req.user.id;
			    	db.query(sql, function(err, result) {
			   			if (err) { 
			        		db.rollback(function() {
			          			throw err;
			        		});
			      		}
			      		db.commit(function(err) {
			        		if (err) { 
			          			db.rollback(function() {
			            			throw err;
			          			});
			        		}
			        		console.log('Transacción completa.');
			        		db.end();
			      		});
			    	});
				});
			});  
		});
		/**/
		return res.redirect('/prestamorealizado');
	},
	getCorrectPago: function(req,res,next){
		return res.render('estado/pagocorrecto',{isAuthenticated: req.isAuthenticated(), user: req.user});
	},
	postNuevoPago: function(req,res,next){
		var fechaActual= new Date();
		var fecha= dateFormat(fechaActual, 'yyyy-mm-dd h:MM:ss');
		var pMonto= parseInt(req.body.montopago);
		var vdeuda=null;
		var pago= {
			usuario_id: req.user.id,
			monto: pMonto,
			realizado_el: fecha,
			activo: 1
		};
		console.log(pago);
		console.log(req.user);
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();

		/* Transacción */
		db.beginTransaction(function(err){
			if(err){
				throw err;
			}
		    db.query('SELECT deuda FROM usuario WHERE id=?',req.user.id, function(err,result){
				if(err){
					db.rollback(function() {
		        		throw err;
		      		});
				}
        		var string=JSON.stringify(result);
        		var json =  JSON.parse(string);
        		var deuda= json[0].deuda;
        		var nDeuda= deuda - pMonto;
        		vdeuda= nDeuda;

        		if(nDeuda < 0){
        			console.log("no");
        				db.rollback(function() {
   							req.flash('pincorrecto','El pago no se realizó porque el monto es mayor a la deuda.');
							return res.redirect('/');
		      			});
		      		return;
        		}
				db.query('INSERT INTO pago SET ?', pago, function(err, result) {
					if(err){ 
		      			db.rollback(function() {
		        			throw err;
		      			});
		    		}

		    		var sql= 'UPDATE usuario SET deuda=' + nDeuda + ' WHERE id=' + req.user.id;
			    	db.query(sql, function(err, result) {
			   			if (err) { 
			        		db.rollback(function() {
			          			throw err;
			        		});
			      		}
			      		db.commit(function(err) {
			        		if (err) { 
			          			db.rollback(function() {
			            			throw err;
			          			});

			        		}
			        		
			        		console.log('Transacción completa.');
			        		db.end();
			        		return res.redirect('/prestamorealizado');
			      		});
			    	});
				});
			});  
		});

		//if(pMonto > req.user.deuda){
		//	req.flash('pincorrecto','El pago no se realizó porque el monto es mayor a la deuda.');
		//	return res.redirect('/');
		//}
		/**/
		//return res.redirect('/pagorealizado');
	},
	getMovimientos: function(req,res,next){
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		var prestamos= null;
		var pagos= null;
		var usuario= req.user.id;

		db.query('SELECT * FROM prestamo WHERE usuario_id=?',usuario, function(err,rows,fields){
			if(err){
				throw err;
			}
			prestamos= rows;
			db.query('SELECT * FROM pago WHERE usuario_id=?',usuario, function(err,rows,fields){
				if(err){
					throw err;
				}
				pagos= rows;

				db.end();
				return res.render('estado/movimientos', {prestamos: prestamos, pagos: pagos, isAuthenticated: req.isAuthenticated(), user: req.user});
			});
		});
	},
	getListaMov: function(req,res,next){
		var config= require('.././database/config');
		var db= mysql.createConnection(config);
		db.connect();
		var usuarios= null;

		db.query('SELECT * FROM usuario', function(err,rows,fields){
			if(err){
				throw err;
			}
			usuarios= rows;
			db.end();
			return res.render('estado/listamov', {usuarios: usuarios, isAuthenticated: req.isAuthenticated(), user: req.user});

		});
	},
	getJSONMov: function(req, res, next){
		var usuario_id= parseInt(req.params[0]);
		if (isNaN(usuario_id)) {
    		return res.redirect('/');
		}
		else{
			var config= require('.././database/config');
			var db= mysql.createConnection(config);
			db.connect();

			db.query('SELECT * FROM usuario WHERE id=?', usuario_id, function(err,rows,fields){
				if(err){
					throw err;
				}
				if( rows.length !== 0 ){
					var prestamos= null;
					var pagos= null;	

					db.query('SELECT * FROM prestamo WHERE usuario_id=?',usuario_id, function(err,rows,fields){
						if(err){
							throw err;
						}
						prestamos= rows;
						db.query('SELECT * FROM pago WHERE usuario_id=?',usuario_id, function(err,rows,fields){
							if(err){
								throw err;
							}
							pagos= rows;

							db.end();

							var mov = prestamos.concat(pagos);
							//var movjs = JSON.stringify(mov);
							//var movpr = JSON.parse(movjs);
							return res.json(mov);
						});
					});				
				}
				else{
					db.end();
					return res.redirect('/');
				}

			});
		}
	}
}