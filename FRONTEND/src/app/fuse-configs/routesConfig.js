import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils'; 
import LoginConfig from 'app/login/LoginConfig';
import RolesConfig from 'app/main/roles/RolesConfig'; 
import UsuarioConfig from 'app/main/usuarios/UsuarioConfig';
import PuertosConfig from 'app/main/puertos/PuertosConfig'; 
import ClientesConfig from 'app/main/clientes/ClientesConfig'; 
import EnvioConfig from 'app/main/envio/EnvioConfig';
import ProductosConfig from 'app/main/productos/ProductosConfig';
import BodegasConfig from 'app/main/bodegas/BodegasConfig';   

const routeConfigs = [
	LoginConfig, 
	RolesConfig, 
	UsuarioConfig,  
	BodegasConfig, 
	ClientesConfig,
	EnvioConfig,
	ProductosConfig, 
	PuertosConfig, 
];


const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	 
	{
		path: '/',
		component: () => <Redirect to="/Usuarios" />
	},
	{
		path: '/',
		component: () => <Redirect to="/roles" />
	},  
	{
		path: '/',
		component: () => <Redirect to="/Puertos" />
	},  
	
	{
		path: '/',
		component: () => <Redirect to="/Clientes" />
	}, 
	{
		path: '/',
		component: () => <Redirect to="/Bodegas" />
	},
 
	{
		path: '/',
		component: () => <Redirect to="/Envios" />
	},
	{
		path: '/',
		component: () => <Redirect to="/Productos" />
	},  
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
