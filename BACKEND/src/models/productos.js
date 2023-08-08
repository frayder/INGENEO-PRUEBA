const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productosSchema = schema({
    Codigo: String,
    Nombre: String,
    Tipo: String
});

const productos = mongoose.model('productos', productosSchema);

module.exports = productos;