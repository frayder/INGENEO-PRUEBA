const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
 	Codigo: String,
 	Nombre: String, 
	IdUsuarioRegistro: String,
	FechaRegistro : Date,
	IdUsuarioActualizacion: String,
	FechaActualizacion: Date,
	Permisos: Array,
	id: String,
	text: String,
});

const rol = mongoose.model('roles', rolSchema);
module.exports = rol;