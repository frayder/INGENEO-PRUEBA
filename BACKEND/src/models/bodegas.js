const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BodegaSchema = schema({
    Codigo: String
    ,Nombre: String
});

const bodegas = mongoose.model('bodegas', BodegaSchema);
module.exports = bodegas;