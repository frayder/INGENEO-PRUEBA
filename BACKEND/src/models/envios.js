const mongoose = require('mongoose');
const schema = mongoose.Schema;

const envioSchema = schema({
    FechaRegistro: Date,
    FechaEntrega: Date,
    TipoEnvio: String,
    Cantidad: String,
    Precio: String,
    Nombre: String,
    Placa: String,
    NumeroFlota: String,
    Guia: String,
    Producto: { type: schema.Types.ObjectId, ref: 'productos' }, 
    Bodega: { type: schema.Types.ObjectId, ref: 'bodegas' },
    Cliente: { type: schema.Types.ObjectId, ref: 'clientes' },
});

const envio = mongoose.model('envios', envioSchema);
module.exports = envio;