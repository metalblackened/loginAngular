var xml2js = require('xml2js');
var util = require('util');
var fs = require('fs');

exports.readXml = function (filename,doneXml){
	var parser = new xml2js.Parser();
	 	fs.readFile('./xmls/' + filename, function (err,data){
	 		console.log(data);
	 		parser.parseString(data, function (err, result){
	 			console.log(util.inspect(result,false,null));
	 			doneXml(result["cfdi:Comprobante"]["cfdi:Emisor"][0]['$']['rfc']);
	 		});
	 	});
};