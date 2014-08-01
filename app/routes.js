var bodyParser = require('body-parser');
var fs = require('fs');
var busboy = require('connect-busboy');
var rxml = require('./controllers/readfiles.js');
var xml2js = require('xml2js');

module.exports= function(app,passport){
	app.use(bodyParser());
	app.use(busboy());


//Ruta para verificar si esta autenticado
	app.get('/loggedin', function(req, res) { 
		//Si esta autenticado devuelve el usuario
		res.send(req.isAuthenticated() ? req.user : '0'); 
	}); 

//Cierra la sesion actual del usuario
	app.get('/logout', function (req, res){
	  req.logout();
	  res.redirect('/');
	});
	
//
	app.post('/signup',function(req,res,next){
		console.log(req.body.username);
		console.log(req.body.password);
		passport.authenticate('local-signup',function(err, user, info) {
			console.log(user);
			res.json(user);
  		})(req, res, next);
	});

	app.post('/login',function(req,res,next){
		passport.authenticate('local-login',function(err, user, info) {

			

			if(user != false){
				req.login(user,function(err){
					if (err) { return next(err); }
				});
				console.log(user.local.role);
				res.json(user);
			}else{
				console.log(info);
				res.json(info);
			}
			
  		})(req, res, next);
	});

	app.post('/uploadxml', function (req, res){
		var fstream;
		req.pipe(req.busboy);
		req.busboy.on('file',function (fieldname,file,filename){
			console.log('Uploading: ' + filename);
			fstream = fs.createWriteStream('./xmls/'+filename);
			file.pipe(fstream);
			fstream.on('close',function(){
				console.log(filename);
				rxml.readXml(filename,function (doneXml){
					res.json(doneXml);
					console.log('ok' + doneXml);
				});
				
			});
		});
	});

	app.get('/getXml',function (req,res){
		var rfc = "zzxcasd";
		

		var builder = new xml2js.Builder();
		

		var stream = fs.createWriteStream("./xmls/my_file.xml");
		stream.on('open', function(fd) {
		  console.log("hola")
		  stream.write('<?xml version="1.0" encoding="utf-8"?>\n');
		  stream.write('<cfdi:comprobante rfc="'+ rfc + '" >\n');
		  stream.end();
		  
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	
};