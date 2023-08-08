const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clientesSchema = schema({ 
	Identificacion: String, 
    rsocial: String, 
    Telefono: String, 
	
});

const clientes = mongoose.model('clientes', clientesSchema);
module.exports = clientes;