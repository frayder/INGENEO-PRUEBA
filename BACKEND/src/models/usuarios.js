const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuarioSchema = schema({
	IdUsuario: String,
	TipoIdentificacion: String,
	Identificacion: String,
    Dv: String,
    rsocial: String,
    regimen: String,
    Celular: String,
    Empresa: String,
    Estado: Boolean,
	Rol: { type: schema.Types.ObjectId, ref: 'roles' },
    Usuario: String,
    Clave: String
	
});

const usuarios = mongoose.model('usuarios', usuarioSchema);
module.exports = usuarios;