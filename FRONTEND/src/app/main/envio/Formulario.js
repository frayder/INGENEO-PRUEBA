import React from 'react';
import { Button, ModalBody, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Icon from '@material-ui/core/Icon';
import Formsy from 'formsy-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import MenuItem from '@material-ui/core/MenuItem';

let EstateEliminar = true;

class DemoRutas extends React.Component {
	state = {
		Codigo: '',
		Nombre: '',
		Pais: '',
		Municipio: '',
		Direccion: '',
		Estado: '',
		DataTable: []
	};
	constructor(props) {
		super(props);
		this.state = {
			abierto: false,
			values: '',
			EstadoForm: true,
			DataProducto: [],
			DataBodega: [],
			DataClientes: [],
			DataEdictar: '',
			EstadoRuta: false,
			DestinoDefaul: '',
			PrecioTemp: 0
		};
	}

	async componentDidMount(e) {
		if (this.props.data.TipoEnvio) {
			this.CargarProductos(this.props.data.TipoEnvio)
			this.setState(state => ({
				...state, TipoProducto: this.props.data.TipoEnvio
			}));
			this.state.PrecioTemp = Number(this.props.data.Precio)
			this.state.CantidadTemp = Number(this.props.data.Cantidad)
		}


		this.consultarBodega();
		this.consultarCliente();

		fetch(gsUrlApi + '/envios/listar/', {
			method: 'GET',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
				this.setState(state => ({
					...state,
					DataTable: data.datos
				}));
			})
			.catch(err => console.log('err', err));

		if (this.props.data) {
			EstateEliminar = false;
		} else {
			EstateEliminar = true;
		}
	}

	CargarProductos = filtro => {

		fetch(gsUrlApi + '/productos/consultar/', {
			method: 'POST',
			body: JSON.stringify({ search: filtro }),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
				this.setState(state => ({
					...state,
					DataProducto: data.datos
				}));
			})
			.catch(err => console.log('err', err));
	}


	CambiarSelectOrigen = data => {
		let Objdata = { value: data.value, label: data.label };
		this.setState(state => ({
			...state,
			OrigenSelect: Objdata
		}));
	};



	onClick = () => {
		this.props.MostrarFormulario('Cancelar');
	};

	insertar = e => {
		let objData = {};
		objData.FechaRegistro = e.FechaRegistro;
		objData.FechaEntrega = e.FechaEntrega
		objData.TipoEnvio = e.TipoEnvio
		objData.Producto = e.Producto
		objData.Cantidad = e.Cantidad
		objData.Bodega = e.Bodega
		objData.Precio = e.Precio
		objData.Nombre = e.nombre;
		objData.Placa = e.Placa
		objData.NumeroFlota = e.NumeroFlota
		objData.Cliente = e.Cliente;
		objData.Guia = e.Guia
		
		if (this.props.data._id) {
			objData._id = this.props.data._id;
		}
		let Action = '';
		if (objData._id) {
			Action = 'actualizar';
		} else {
			Action = 'insertar';
		}
		fetch(gsUrlApi + '/envios/' + Action + '/', {
			method: 'POST',
			body: JSON.stringify(objData),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
				this.props.MostrarFormulario('Guardado');
			})
			.catch(err => console.log('err', err));
	};


	eliminarRuta = e => {
		var ObjRuta = {};
		ObjRuta._id = this.props.data._id;
		fetch(gsUrlApi + '/envios/eliminar/', {
			method: 'POST',
			body: JSON.stringify(ObjRuta),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
				this.props.MostrarFormulario('Cargar');
			})
			.catch(err => console.log('err', err));
	};

	alertaEliminar = data => {
		confirmAlert({
			title: "Eliminar registro",
			message: "¿Desea eliminar el registro seleccionado?",
			buttons: [
				{
					label: "Si",
					onClick: (data) => this.eliminarRuta(data)
				},
				{
					label: "No",
					onClick: () => this.onClick("Click no")
				}
			]
		});
	};

	consultarProductos = data => {
		let filtro = data.target.value;
		this.setState(state => ({
			...state, TipoProducto: filtro
		}));
		fetch(gsUrlApi + '/productos/consultar/', {
			method: 'POST',
			body: JSON.stringify({ search: filtro }),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
				this.setState(state => ({
					...state,
					DataProducto: data.datos
				}));
			})
			.catch(err => console.log('err', err));
	}

	consultarBodega = () => {

		fetch(gsUrlApi + '/bodega/listar/', {
			method: 'GET',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
				this.setState(state => ({
					...state,
					DataBodega: data.datos
				}));
			})
			.catch(err => console.log('err', err));
	}

	consultarCliente = () => {

		fetch(gsUrlApi + '/clientes/listar/', {
			method: 'GET',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
				this.setState(state => ({
					...state,
					DataClientes: data.datos
				}));
			})
			.catch(err => console.log('err', err));
	}

	obtenerPrecio = (data) => {
		this.state.PrecioTemp = data.target.value
		this.setState(state => ({}));
	}
	obtenerCantida = (data) => {
		this.state.CantidadTemp = data.target.value
		this.setState(state => ({}));
	}
	render() {
		return (
			<>
				<div className="ventana col-md-12">
					<Formsy onValidSubmit={this.insertar} className="flex flex-col justify-center w-full">
						<div className="row mb-2 paddingleft" style={{ 'padding-top': '20px', 'width': '100%' }}>
							<div className=" d-flex ml-auto">
								<Button type="submit" color="primary" className="btn btnGuardar float-right mr-3">
									Guardar
								</Button>
								{EstateEliminar ? (
									''
								) : (
									<Button id="boton" className="btnEliminar mr-3" onClick={this.alertaEliminar}>
										Eliminar
									</Button>
								)}
								<Button
									outline
									color="primary"
									className="btn btnCancelar float-left mr-3"
									onClick={this.onClick}
								>
									Cancelar
								</Button>
							</div>
						</div>
						<div>
							<CardBody className=" m-2">
								<ModalBody>
									<div className="row cardbody1 " style={{ 'padding-bottom': '20px' }}>
										<div className="col-xs-15 col-md-12">
											<div className='row'>
											<div className="col-md-12 pb-3">
												<div className="flex">
													<div className="min-w-48 fa-2x pt-10 pl-3">
														<Icon className="text-30" color="black">
															import_contacts
														</Icon>
													</div>
													<SelectFormsy
														className="fullWidth-select"
														name="Cliente"
														label="Clientes"
														value={this.props.data.Cliente}
														variant="outlined"
														required
													>
														{this.state.DataClientes.map((e, key) => {
															return (
																<MenuItem value={e._id}>
																	<em>{e.rsocial}</em>
																</MenuItem>
															);
														})}
													</SelectFormsy>
												</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-4 pb-4 ">
													<div className="flex ">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																code
															</Icon>
														</div>
														<TextFieldFormsy
															className="mb-16"
															type="Date"
															name="FechaRegistro"
															label="Fecha Registro"
															value={this.props.data.FechaRegistro?.substr(0, 10)}
															validations={{
																minLength: 1
															}}
															validationErrors={{
																minLength: 'Min character length is 1'
															}}
															InputLabelProps={{
																shrink: true
															}}
															variant="outlined"
															fullWidth
															required
														/>
													</div>
												</div>
												<div className="col-md-4 pb-4 ">
													<div className="flex ">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																code
															</Icon>
														</div>
														<TextFieldFormsy
															className="mb-16"
															type="Date"
															name="FechaEntrega"
															label="Fecha Entrega"
															value={this.props.data.FechaEntrega?.substr(0, 10)}
															validations={{
																minLength: 1
															}}
															InputLabelProps={{
																shrink: true
															}}
															validationErrors={{
																minLength: 'Min character length is 1'
															}}
															variant="outlined"
															fullWidth
															required
														/>
													</div>
												</div>
												<div className="col-md-4 pb-3">
													<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																import_contacts
															</Icon>
														</div>
														<SelectFormsy
															className="fullWidth-select"
															name="TipoEnvio"
															label="Tipo de Envio"
															value={this.props.data.TipoEnvio}
															onChange={this.consultarProductos}
															variant="outlined"
															required
														>
															<MenuItem value="Terrestre">Terrestre</MenuItem>
															<MenuItem value="Marritimo">Marritimo</MenuItem>
														</SelectFormsy>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-4 pb-3">
													<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																import_contacts
															</Icon>
														</div>
														<SelectFormsy
															className="fullWidth-select"
															name="Producto"
															label="Producto"
															value={this.props.data.Producto}
															variant="outlined"
															required
														>
															{this.state.DataProducto.map((e, key) => {
																return (
																	<MenuItem value={e._id}>
																		<em>{e.Nombre}</em>
																	</MenuItem>
																);
															})}
														</SelectFormsy>
													</div>
												</div>
												<div className="col-md-4 pb-4 ">
													<div className="flex ">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																code
															</Icon>
														</div>
														<TextFieldFormsy
															className="mb-16"
															type="number"
															name="Cantidad"
															label="Cantidad"
															value={this.props.data.Cantidad}
															onChange={this.obtenerCantida}
															validations={{
																minLength: 1
															}}
															validationErrors={{
																minLength: 'Min character length is 1'
															}}
															variant="outlined"
															fullWidth
															required
														/>
													</div>
												</div>
												<div className="col-md-4 pb-3">
													<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																import_contacts
															</Icon>
														</div>
														<SelectFormsy
															className="fullWidth-select"
															name="Bodega"
															label="Bodegas"
															value={this.props.data.Bodega}
															variant="outlined"
															required
														>
															{this.state.DataBodega.map((e, key) => {
																return (
																	<MenuItem value={e._id}>
																		<em>{e.Nombre}</em>
																	</MenuItem>
																);
															})}
														</SelectFormsy>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-4 pb-3">
													<div className="flex ">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																code
															</Icon>
														</div>
														<TextFieldFormsy
															className="mb-16"
															type="number"
															name="Precio"
															label="Precio"
															value={this.props.data.Precio}
															onChange={this.obtenerPrecio}
															validations={{
																minLength: 1
															}}
															validationErrors={{
																minLength: 'Min character length is 1'
															}}
															variant="outlined"
															fullWidth
															required
														/>
													</div>
												</div>
												{this.state.TipoProducto == "Terrestre"
													? <div className="col-md-4 pb-4 ">
														<div className="flex ">
															<div className="min-w-48 fa-2x pt-10 pl-3">
																<Icon className="text-30" color="black">
																	code
																</Icon>
															</div>
															<TextFieldFormsy
																className="mb-16"
																type="text"
																name="Placa"
																label="placa del vehiculo"
																value={this.props.data.Placa}
																validations={{
																	minLength: 1
																}}
																validationErrors={{
																	minLength: 'Min character length is 1'
																}}
																variant="outlined"
																fullWidth
																required
															/>
														</div>
													</div> : ""}
												{this.state.TipoProducto == "Marritimo"
													? <div className="col-md-4 pb-4 ">
														<div className="flex ">
															<div className="min-w-48 fa-2x pt-10 pl-3">
																<Icon className="text-30" color="black">
																	code
																</Icon>
															</div>
															<TextFieldFormsy
																className="mb-16"
																type="text"
																name="NumeroFlota"
																label="Numero de Flota"
																value={this.props.data.NumeroFlota}
																validations={{
																	minLength: 1
																}}
																validationErrors={{
																	minLength: 'Min character length is 1'
																}}
																variant="outlined"
																fullWidth
																required
															/>
														</div>
													</div> : ""}
												<div className="col-md-4 pb-3">
													<div className="flex ">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																code
															</Icon>
														</div>
														<TextFieldFormsy
															className="mb-16"
															type="text"
															name="Guia"
															label="Guia"
															value={this.props.data.Guia}
															validations={{
																minLength: 1
															}}
															validationErrors={{
																minLength: 'Min character length is 1'
															}}
															variant="outlined"
															fullWidth
															required
														/>
													</div>
												</div>
											</div>
											{this.state.TipoProducto == "Terrestre"
												? <div>
													<h1>{'Nota:'}</h1>
													<h1>{'Precio Total:  ' + (this.state.PrecioTemp * this.state.CantidadTemp)}</h1>
													<h1>{'Descuento 5%: ' + (this.state.PrecioTemp * this.state.CantidadTemp) * 0.05}</h1>
													<h1>{'Precio Total Envio: ' + ((this.state.PrecioTemp * this.state.CantidadTemp) - ((this.state.PrecioTemp * this.state.CantidadTemp) * 0.05))}</h1>
												</div> : ""}
											{this.state.TipoProducto == "Marritimo"
												? <div>
													<h1>{'Nota:'}</h1>
													<h1>{'Precio Total:  ' + (this.state.PrecioTemp * this.state.CantidadTemp)}</h1>
													<h1>{'Descuento 5%: ' + (this.state.PrecioTemp * this.state.CantidadTemp) * 0.03}</h1>
													<h1>{'Precio Total Envio: ' + ((this.state.PrecioTemp * this.state.CantidadTemp) - ((this.state.PrecioTemp * this.state.CantidadTemp) * 0.03))}</h1>
												</div> : ""}
										</div>
									</div>
								</ModalBody>
							</CardBody>
						</div>
					</Formsy>
				</div>
				);
			</>
		);
	}
}

export default DemoRutas;
