const express = require('express');
const router = express.Router();

module.exports = () => {
    //index
    const indexRouter = express.Router();
    indexRouter.get('/', (req, res) => {
        res.status(200).json({ response: 'Mongo API is working properly.' });
    });

    const requestsRouter = express.Router();  
    const usuariosController = require('./controllers/usuarios');
    const rolesController = require('./controllers/roles');
    const interfacesController = require('./controllers/interfaces');
    const puertosController = require('./controllers/puertos'); 
    const clientesController = require('./controllers/clientes'); 
    const bodegaController = require('./controllers/bodega'); 
    const enviosController = require('./controllers/envios');
    const productosController = require('./controllers/productos'); 
 

    //envios
    requestsRouter.get('/envios/listar/', enviosController.listar);
    requestsRouter.get('/envios/:key/:value', enviosController.buscar);
    requestsRouter.post('/envios/insertar', enviosController.insertar);
    requestsRouter.post('/envios/eliminar', enviosController.eliminar);
    requestsRouter.post('/envios/actualizar', enviosController.actualizar);
    requestsRouter.post('/envios/consultar', enviosController.consultar); 

    //productos
    requestsRouter.get('/productos/listar/', productosController.listar);
    requestsRouter.get('/productos/:key/:value', productosController.buscar);
    requestsRouter.post('/productos/insertar', productosController.insertar);
    requestsRouter.post('/productos/eliminar', productosController.eliminar);
    requestsRouter.post('/productos/actualizar', productosController.actualizar);
    requestsRouter.post('/productos/consultar', productosController.consultar);


    //usuarios
    requestsRouter.get('/usuarios/listar/', usuariosController.listar);
    requestsRouter.get('/usuarios/:key/:value', usuariosController.buscar);
    requestsRouter.post('/usuarios/insertar', usuariosController.insertar);
    requestsRouter.post('/usuarios/eliminar', usuariosController.eliminar);
    requestsRouter.post('/usuarios/actualizar', usuariosController.actualizar);
    requestsRouter.post('/usuarios/validarIngreso', usuariosController.validarIngreso);
    requestsRouter.get('/usuarios/listarPorIdentificacion/:value/:key', usuariosController.listarPorIdentificacion);
    requestsRouter.post('/usuarios/consultar', usuariosController.consultar);

    //roles
    requestsRouter.get('/roles/listar/', rolesController.listar);
    requestsRouter.get('/roles/:key/:value', rolesController.buscar);
    requestsRouter.post('/roles/insertar', rolesController.insertar);
    requestsRouter.post('/roles/eliminar', rolesController.eliminar);
    requestsRouter.post('/roles/actualizar', rolesController.actualizar);
    requestsRouter.post('/roles/consultar', rolesController.consultar);


    //interfaces
    requestsRouter.get('/interfaces/', interfacesController.buscar);

    //puertos
    requestsRouter.get('/puertos/listar', puertosController.listar);
    requestsRouter.post('/puertos/insertar', puertosController.insertar);
    requestsRouter.post('/puertos/eliminar', puertosController.eliminar);
    requestsRouter.post('/puertos/actualizar', puertosController.actualizar);
    requestsRouter.post('/puertos/consultar', puertosController.consultar);
   
    //clientes
    requestsRouter.get('/clientes/listar/', clientesController.listar);
    requestsRouter.get('/clientes/:key/:value', clientesController.buscar);
    requestsRouter.post('/clientes/insertar', clientesController.insertar);
    requestsRouter.post('/clientes/eliminar', clientesController.eliminar);
    requestsRouter.post('/clientes/actualizar', clientesController.actualizar);
    requestsRouter.get('/clientes/listarPorIdentificacion/:value/:key', clientesController.listarPorIdentificacion);
    requestsRouter.post('/clientes/consultar', clientesController.consultar);
 
    //Bodega
    requestsRouter.get('/bodega/listar/', bodegaController.listar);
    requestsRouter.get('/bodega/:key/:value', bodegaController.buscar);
    requestsRouter.post('/bodega/insertar', bodegaController.insertar);
    requestsRouter.post('/bodega/eliminar', bodegaController.eliminar);
    requestsRouter.post('/bodega/actualizar', bodegaController.actualizar);
    requestsRouter.get('/bodega/listarAll', bodegaController.listarAll);
    requestsRouter.post('/bodega/consultar', bodegaController.consultar);
    requestsRouter.post('/bodega/filtro', bodegaController.filtro);


    //request
    router.use('/', indexRouter);
    router.use('/', requestsRouter);






    return router;
};