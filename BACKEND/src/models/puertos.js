const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sucursalesSchema = schema({
  Codigo: String,
  Nombre: String,
  Tipo: String, 
});

const sucursales = mongoose.model('sucursales', sucursalesSchema);
module.exports = sucursales;