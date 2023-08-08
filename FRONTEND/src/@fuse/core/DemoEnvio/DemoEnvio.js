import React from 'react';
import { Button, ModalBody, CardBody } from 'reactstrap';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import '../DemoEnvio/App.css';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import MenuItem from '@material-ui/core/MenuItem';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import HeaderFormMaestro from '@fuse/core/HeaderMaestro/HeaderFormMaestro';
let EstateEliminar = true;
class DemoEnvio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			abierto: false,
			values: '',
			EstadoSave: false,
			DataPais: [],
			DataMercancia: [],
			DataMunicipios: [],
			fechaActual: '',
			fechaActual1: ''
		};
	}
	async componentDidMount(e) {
		this.ConsultarMercancia();
		var today = new Date();
		var month = today.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		var date = today.getDate();
		if (date < 10) {
			date = '0' + date;
		}
		var date2 = today.getFullYear() + '-' + month + '-' + date;
		var date3 = today.getFullYear() + '-' + month + '-' + (1 + date);
		this.setState(state => ({
			...state,
			fechaActual: date2
		}));
		this.setState(state => ({
			...state,
			fechaActual1: date3
		}));

		if (this.props.data.IdPais) {
			EstateEliminar = false;
			this.ConsultarMunicipio(this.props.data.IdPais);
		} else {
			EstateEliminar = true;
			this.ConsultarMunicipio('169');
		}
		fetch(gsUrlApi + '/paises', {
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
					DataPais: data.paises
				}));
			})
			.catch(err => console.log('err', err));
	}

	ConsultarMercancia = () => {


		fetch(gsUrlApi + '/mercancias/listar/', {
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
					DataMercancia: data.datos
				}));
			})
			.catch(err => console.log('err', err));
	};

	ConsultarMunicipio = data => {
		let _id = null;
		if (data.target) {
			_id = data.target.value;
		} else if (this.props.data.IdPais) {
			_id = this.props.data.IdPais;
		} else {
			_id = data;
		}
		if (data) {
			fetch(gsUrlApi + '/municipios/IdPais/' + _id + '/', {
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
						DataMunicipios: data.municipios
					}));
				})
				.catch(err => console.log('err', err));
		}
	};

	RedireccionDestino = e => {
		return <Redirect to="/Destino" />;
	};
	//CONSTRUCTOR INSERTAR
	AplicarFiltro = data => {
		let ObjEnvio = {};
		ObjEnvio.FechaInicio = data.FechaActual;
		ObjEnvio.TipoMercancia = data.TipoMercancia;
		ObjEnvio.FechaFin = data.fechaActual1;
		ObjEnvio.Estado = data.Estado;
		
		this.props.AplicarFiltro(ObjEnvio);
	};

	ElimarUsuario = e => {
		var objProductos = new Object();
		objProductos._id = this.props.data._id;
		fetch(gsUrlApi + '/envios/eliminar/', {
			method: 'POST',
			body: JSON.stringify(objProductos),
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

	FechaSelect = data => {
		let fecha = data.target.value;
		if (fecha) {
			this.setState(state => ({
				...state,
				FechaInicio: fecha,
				FechaFin: fecha
			}));
		}
	};

	FechaSelect2 = data => {
		let fecha = data.target.value;
		if (fecha) {
			this.setState(state => ({
				...state,
				FechaFin: fecha
			}));
		}
	};

	alertaEliminar = data => {
		confirmAlert({
			title: 'Eliminar registro',
			message: '¿Desea eliminar el registro seleccionado?',
			buttons: [
				{
					label: 'Si',
					onClick: data => this.ElimarUsuario(data)
				},
				{
					label: 'No',
					onClick: () => this.onClick2('Click no')
				}
			]
		});
	};

	onClick = () => {
		this.props.MostrarFormulario('Cancelar');
	};

	onClick2 = () => {};

	render() {
		return (
			<>
				<div className="ventana">
					<Formsy onValidSubmit={this.AplicarFiltro} className="flex flex-col justify-center w-full">
						<div>
							<CardBody className=" m-2">
								<form className="form1" style={{ height: '120px' }}>
									<ModalBody>
										<div className="row cardbody1 " style={{'paddingTop':'30px'}}>
											<div className="col-xs-15 col-md-12">
												<div className="row">
												<div className="col-md-3 pb-4">
														<div className="flex">
															<div className="min-w-48 fa-2x pt-10 pl-3">
																<Icon className="text-20" color="black">
																	business
																</Icon>
															</div>
															<SelectFormsy
																className="fullWidth-select"
																name="Estado"
																label="Tipo Envio"
																value={this.props.data.Estado}
																variant="outlined"
															>
																<MenuItem value="Terrestre">Terrestre</MenuItem>
																<MenuItem value="Maritimo">Maritimo</MenuItem>
															</SelectFormsy>
														</div>
													</div>
													<div className="col-md-3 pb-4">
														<div className="flex ">
															<div className="min-w-48 fa-2x pt-10 pl-3">
																<Icon className="text-20" color="black">
																	calendar_today
																</Icon>
															</div>
															<TextFieldFormsy
																type="date"
																fullWidth
																name="FechaRegistro"
																onChange={this.FechaSelect}
																label="Fecha Registro"
																variant="outlined"
																value={this.state.fechaActual}
																InputLabelProps={{
																	shrink: true
																}}
																size="small"
															/>
														</div>
													</div>
													<div className="col-md-3 pb-4">
														<div className="flex ">
															<div className="min-w-48 fa-2x pt-10 pl-3">
																<Icon className="text-20" color="black">
																	calendar_today
																</Icon>
															</div>
															<TextFieldFormsy
																type="date"
																fullWidth
																name="FechaEntrega"
																onChange={this.FechaSelect2}
																label="Fecha Entrega"
																variant="outlined"
																value={this.state.fechaActual1}
																InputLabelProps={{
																	shrink: true
																}}
																size="small"
															/>
														</div>
													</div>
													<div className="col-md-3 pb-4">
														<div className="flex">
															<div className="min-w-48 fa-2x pt-10 pl-3">
																<Icon className="text-20" color="black">
																	business
																</Icon>
															</div>
															<SelectFormsy
																	className="fullWidth-select"
																	name="tipomercancia"
																	label="Tipo Mercancia"
																	onChange={this.ConsultarMercancia}
																	variant="outlined"
																	value={this.props.TipoMercancia}
																>
																	<MenuItem value="none">
																		<em>None</em>
																	</MenuItem>
																	{this.state.DataMercancia.map((e, key) => {
																		return (
																			<MenuItem value={e.Codigo}>
																				<em>{e.Nombre}</em>
																			</MenuItem>
																		);
																	})}
																</SelectFormsy>
														</div>
													</div>
												</div>
											</div>
											<div className="col-xs-15 col-md-12">
												<div className="row">
													<div className="col-md-12 pb-4">

															<Button
																type="submit"
																color="primary"
																className="btn btnGuardar mr-3"
															>
																Filtrar
															</Button>

													</div>
												</div>
											</div>
										</div>
									</ModalBody>
								</form>
							</CardBody>
						</div>
					</Formsy>
				</div>
			</>
		);
	}
}

export default DemoEnvio;
