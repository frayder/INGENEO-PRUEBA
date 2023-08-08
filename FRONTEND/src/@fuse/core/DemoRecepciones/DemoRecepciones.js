import React from 'react';
import { Button, ModalBody, ModalFooter, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../DemoManifiesto/AppManifiesto.css';
import Icon from '@material-ui/core/Icon';
import *  as XLSX from 'xlsx'
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import MenuItem from '@material-ui/core/MenuItem';
import TableManifiestos from './TableRecepciones';
import NumberFormat from 'react-number-format';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


let EstateEliminar = true;

// var currentdate = new Date();
// var newdate = currentdate.getDate() + "/" + parseInt(currentdate.getMonth() + 1)   + "/" + currentdate.getFullYear();



class DemoManifiesto extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			abierto: false,
			values: '',
			EstadoSave: false,
			DataPais: [],
			DataClientes: [],
			DataOrigenes: [],
			DataConductores: [],
			DataVehiculos: [],
			DataDestinos: [],
			ArrayRecepciones: [],
			NombreDestino: "",
			Municipio: "",
			NumeroDocumento: "",
			TipoMercancia: "",
			NumeroGuia: "",
			EstateForm: true,
			DataTipoMercancias: [],
			EstadoCargue: false,
			fechaActual: "",
			NumPiezas: "",
			EstadoRecogida: false
		};
	}
	async componentDidMount(e) {
		this.ConsultarConductores();
		this.ConsultarVehiculos();
		this.ConsultarClientes();
		this.ConsultarOrigen();
		this.ConsultarDestinos();
		this.ConsultarTipoMercancias();
		this.setState(state => ({
			...state, EstadoRecogida: false,
		}));
		var today = new Date();
		var month = today.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		var date = today.getDate();
		if (date < 10) {
			date = "0" + date;
		}
		var date2 = today.getFullYear() + '-' + (month) + '-' + date;
		this.setState(state => ({
			...state, fechaActual: date2,
		}));
		if (this.props.data._id) {
			var today = this.props.data.FechaRecibido
			let formatoInput = today.substring(0, 10)
			this.setState(state => ({
				...state, fechaActual: formatoInput,
			}));
			if (this.props.data.IdDestino) {
				let Objdata = { value: this.props.data.IdDestino, label: this.props.data.Destino }
				this.setState(state => ({
					...state, DestinoSelect: Objdata,
				}));
			}
			let ObjdataO = { value: this.props.data.IdOrigen, label: this.props.data.Origen }
			this.setState(state => ({
				...state, OrigenSelect: ObjdataO,
			}));

			this.setState(state => ({
				...state, EstadoRecogida: this.props.data.EstadoRecogida,
			}));
			let Objdata = { value: this.props.data.IdConductor, label: this.props.data.Conductor }
			this.setState(state => ({
				...state, ConductorSelect: Objdata,
			}));
			let ObjdataV = { value: this.props.data.IdVehiculo, label: this.props.data.Vehiculo }
			this.setState(state => ({
				...state, VehiculoSelect: ObjdataV,
			}));
			EstateEliminar = false;
			this.setState(state => ({
				...state, ArrayRecepciones: this.props.data.ArrayMercancias,
			}));
			this.setState(state => ({
				...state, ValorManifiesto: this.props.data.ValorManifiesto
			}));
		} else {
			EstateEliminar = true;

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
	MostrarModal = data => {
		this.setState({ EstadoCargue: !this.state.EstadoCargue });
	}

	ConsultarClientes = () => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/clientes/listar/' + Empresa + '/', {
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
	};

	ConsultarOrigen = () => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/origenes/listar/', {
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
				let array = [];
				for (let i = 0; i < data.datos.length; i++) {
					let element = {};
					element.value = data.datos[i]._id
					element.label = data.datos[i].Nombre + " - " + data.datos[i].Municipio
					array.push(element)
				}
				this.setState(state => ({
					...state,
					DataOrigenes: array
				}));
			})
			.catch(err => console.log('err', err));
	};

	ConsultarConductores = () => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/conductores/listar/', {
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
				let array = [];
				for (let i = 0; i < data.datos.length; i++) {
					let element = {};
					element.value = data.datos[i]._id
					element.label = data.datos[i].Nombre
					array.push(element)
				}
				this.setState(state => ({
					...state,
					DataConductores: array
				}));
			})
			.catch(err => console.log('err', err));
	};

	ConsultarVehiculos = () => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/vehiculos/listar/', {
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
				let array = [];
				for (let i = 0; i < data.datos.length; i++) {
					let element = {};
					element.value = data.datos[i]._id
					element.label = data.datos[i].Marca + " - " + data.datos[i].Placa
					array.push(element)
				}
				this.setState(state => ({
					...state,
					DataVehiculos: array
				}));
			})
			.catch(err => console.log('err', err));
	};
	MostrarForm = data => {
		this.setState({ EstateForm: !this.state.EstateForm });
	}

	CheckedEstado = () => {
		this.setState({ EstadoRecogida: !this.state.EstadoRecogida });

	}
	ConsultarTipoMercancias = () => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

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
				for (let i = 0; i < data.datos.length; i++) {
					if (data.datos[i].Nombre == "CARGA SECA") {
						this.setState(state => ({
							...state, TipoMercancia: data.datos[i]._id
						}));
					}

				}
				this.setState(state => ({
					...state,
					DataTipoMercancias: data.datos
				}));
			})
			.catch(err => console.log('err', err));
	};

	ConsultarDestinos = () => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/destinos/listar/', {
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
				let array = [];
				for (let i = 0; i < data.datos.length; i++) {
					let element = {};
					element.value = data.datos[i]._id
					element.label = data.datos[i].Nombre + " - " + data.datos[i].Municipio
					array.push(element)
				}
				this.setState(state => ({
					...state,
					DataDestinos: array
				}));
			})
			.catch(err => console.log('err', err));
	};


	AgregarEnvio = e => {
		let EstadoID = false;
		let textTipoMercancia = '';
		let ArrayTipoMercancias = this.state.DataTipoMercancias;
		let ObjManifiesto = {};
		if (this.state.ArrayRecepciones.length > 0) {
			for (let i = 0; i < this.state.ArrayRecepciones.length; i++) {
				if (this.state.ArrayRecepciones[i].NoGuia == e.numeroguia) {
					EstadoID = true;
					this.alertaAviso();
				}
			}
		} else {
			EstadoID = true;
			for (let k = 0; k < ArrayTipoMercancias.length; k++) {
				if (ArrayTipoMercancias[k]._id === e.tipoMercancia) {
					textTipoMercancia = ArrayTipoMercancias[k].Nombre;
					break;
				}
			}


			if (this.state.DestinoSelect) {
				ObjManifiesto.IdDestino = this.state.DestinoSelect.value;
				ObjManifiesto.Destino = this.state.DestinoSelect.label;
			}
			ObjManifiesto.NumeroPiezas = e.numeropiezas;
			ObjManifiesto.Observacion = e.Observacion;
			ObjManifiesto.TipoMercancia = textTipoMercancia;
			ObjManifiesto.IdTipoMercancia = e.tipoMercancia;
			ObjManifiesto.NoGuia = e.numeroguia
			ObjManifiesto.Estado = "Bodega"
			ObjManifiesto.FechaRecibido = this.state.fechaActual;
			ObjManifiesto.NumeroDocumento = e.numerodocumento
			this.state.ArrayRecepciones.push(ObjManifiesto)
			this.limpiar()
			this.setState(state => ({
				...state,
				ArrayRecepciones: this.state.ArrayRecepciones
			}));
			
		}
		if (EstadoID == false) {
			for (let k = 0; k < ArrayTipoMercancias.length; k++) {
				if (ArrayTipoMercancias[k]._id === e.tipoMercancia) {
					textTipoMercancia = ArrayTipoMercancias[k].Nombre;
					break;
				}
			}
			if (this.state.DestinoSelect) {
				ObjManifiesto.IdDestino = this.state.DestinoSelect.value;
				ObjManifiesto.Destino = this.state.DestinoSelect.label;
			}
			ObjManifiesto.NumeroPiezas = e.numeropiezas;
			ObjManifiesto.Observacion = e.Observacion;
			ObjManifiesto.TipoMercancia = textTipoMercancia;
			ObjManifiesto.IdTipoMercancia = e.tipoMercancia;
			ObjManifiesto.NoGuia = e.numeroguia
			ObjManifiesto.Estado = "Bodega"
			ObjManifiesto.NumeroDocumento = e.numerodocumento
			this.state.ArrayRecepciones.push(ObjManifiesto)
			this.limpiar()
			this.setState(state => ({
				...state,
				ArrayRecepciones: this.state.ArrayRecepciones
			}));
		}
	};

	alertaAviso = data => {
		confirmAlert({
			title: '¡Aviso!',
			message: 'Se esta agregando un registro que ya se encuentra',
			buttons: [
				{
					label: 'Aceptar',
					// onClick: data => this.eliminarManifiesto(data)
					onClick: () => this.onClick2('Click no')
				}
			]
		});
	};



	GuardarRecepciones = dataForm => {

		let ObjRecepciones = {};


		ObjRecepciones.FechaRecibido = dataForm.fecharecibido
		if (this.state.VehiculoSelect != undefined) {
			ObjRecepciones.Vehiculo = this.state.VehiculoSelect.label
			ObjRecepciones.IdVehiculo = this.state.VehiculoSelect.value
		} else {
			ObjRecepciones.Vehiculo = ""
			ObjRecepciones.IdVehiculo = ""
		}
		if (this.state.ConductorSelect != undefined) {
			ObjRecepciones.Conductor = this.state.ConductorSelect.label
			ObjRecepciones.IdConductor = this.state.ConductorSelect.value
		} else {
			ObjRecepciones.Conductor = ""
			ObjRecepciones.IdConductor = ""
		}
		if (this.state.OrigenSelect != undefined) {
			ObjRecepciones.Origen = this.state.OrigenSelect.label
			ObjRecepciones.IdOrigen = this.state.OrigenSelect.value
		} else {
			ObjRecepciones.Origen = ""
			ObjRecepciones.IdOrigen = ""
		}
		ObjRecepciones.EstadoRecogida = this.state.EstadoRecogida
		if (this.state.EstadoRecogida == true) {
			ObjRecepciones.Sita = dataForm.Sita;
			ObjRecepciones.Contacto = dataForm.Contacto;
			ObjRecepciones.NumeroUnidades = dataForm.numeroUnidades;
			ObjRecepciones.NumeroCajas = dataForm.NumeroCajas;
			ObjRecepciones.ValorDeclarado = dataForm.ValorDeclarado;
			ObjRecepciones.Empresa = dataForm.Empresa
			ObjRecepciones.Email = dataForm.Email
			ObjRecepciones.Direccion = dataForm.Direccion
			ObjRecepciones.ContactoOrigen = dataForm.ContactoOrigen
			ObjRecepciones.TipoMercanciaR = dataForm.TipoMercanciaR
			ObjRecepciones.TelefonoOrigen = dataForm.TelefonoOrigen
			ObjRecepciones.NumeroUnidades = dataForm.NumeroUnidades
			ObjRecepciones.NumeroCajas = dataForm.NumeroCajas
			ObjRecepciones.ValorDeclarado = dataForm.ValorDeclarado
			ObjRecepciones.ContactoDestino = dataForm.ContactoDestino
			ObjRecepciones.TelefonoDestino = dataForm.TelefonoDestino
			ObjRecepciones.Autorizado = dataForm.Autorizado
			ObjRecepciones.DireccionOrigen = dataForm.DireccionOrigen
			ObjRecepciones.DireccionDestino = dataForm.DireccionDestino
			if (this.state.DestinoSelect != undefined) {
				ObjRecepciones.Destino = this.state.DestinoSelect.label
				ObjRecepciones.IdDestino = this.state.DestinoSelect.value
			} else {
				ObjRecepciones.Destino = ""
				ObjRecepciones.IdDestino = ""
			}

		}
		ObjRecepciones.ArrayMercancias = this.state.ArrayRecepciones
		let Action = '';
		if (this.props.data._id) {
			Action = 'actualizar';
			ObjRecepciones._id = this.props.data._id;
		} else {
			Action = 'insertar';
		}
		if (this.state.EstadoRecogida == false) {
			this.GuardarBodega(this.state.ArrayRecepciones)

		}
		fetch(gsUrlApi + '/recepciones/' + Action + '/', {
			method: 'POST',
			body: JSON.stringify(ObjRecepciones),
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
	}

	GuardarBodega = data => {
		fetch(gsUrlApi + '/bodega/insertar/', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => data)
			.then(data => {
			})
			.catch(err => console.log('err', err));
	}

	FormatearNumero(number) {
		return new Intl.NumberFormat().format(number)
	}

	eliminarRecepciones = e => {
		var ObjRecepciones = new Object();
		ObjRecepciones._id = this.props.data._id;
		fetch(gsUrlApi + '/recepciones/eliminar/', {
			method: 'POST',
			body: JSON.stringify(ObjRecepciones),
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
					onClick: (data) => this.eliminarRecepciones(data)
				},
				{
					label: "No",
					onClick: () => this.onClick2("Click no")
				}
			]
		});
	};

	CancelarRecepciones = e => {
		this.props.MostrarFormulario("Cancelar")
	}

	onClick2 = () => {

	}

	CambiarSelectVehiculos = data => {
		let Objdata = { value: data.value, label: data.label }
		this.setState(state => ({
			...state, VehiculoSelect: Objdata,
		}));
	}

	CambiarSelectConductor = data => {
		let Objdata = { value: data.value, label: data.label };
		this.setState(state => ({
			...state,
			ConductorSelect: Objdata
		}));
	};
	CambiarSelectOrigen = data => {
		let Objdata = { value: data.value, label: data.label };
		this.setState(state => ({
			...state,
			OrigenSelect: Objdata
		}));
	};
	CambiarSelectDestino = data => {
		let Objdata = { value: data.value, label: data.label };
		this.setState(state => ({
			...state,
			DestinoSelect: Objdata
		}));
	};

	QuitarMercancia = data => {

		for (let i = 0; i < this.state.ArrayRecepciones.length; i++) {
			if (this.state.ArrayRecepciones[i].NoGuia == data) {
				this.state.ArrayRecepciones.splice(i, 1);
			}
		}
		this.setState(state => ({
			...state,
			ArrayRecepciones: this.state.ArrayRecepciones
		}));
	};

	limpiar = () => {
		this.setState({ EstateForm: !this.state.EstateForm });

		this.setState(state => ({
			...state, NumPiezas: null,
		}));
		if (this.state.NumeroDocumento == null) {
			this.setState(state => ({
				...state, NumeroDocumento: "",
			}));
		} else {
			this.setState(state => ({
				...state, NumeroDocumento: null,
			}));
		}
		if (this.state.NumeroGuia == null) {
			this.setState(state => ({
				...state, NumeroGuia: "",
			}));
		} else {
			this.setState(state => ({
				...state, NumeroGuia: null,
			}));
		}
		// this.setState({ NumeroGuia : "" })
		
		// this.setState({ EstadoIngreso: !this.state.EstadoIngreso });
		this.setState({ EstateForm: false });

	}
	

	CambiarObservacion = data => {
		this.state.ArrayRecepciones[data.index]['Observacion'] = data.Observacion
	}

	SelectCampo = data => {
		if (data.target) {
			let Data = data.target.value
			if (Data.length >= 8) {
				let Carater1 = Data.substring(0, 2)
				if(Carater1 == "ST"){
					if (!this.state.NumeroGuia && !this.state.NumeroDocumento) {
						this.setState(state => ({
							...state, NumeroGuia: null,
						}));
					}
					console.log("Data.substring(4)", Data.substring(4));
					this.setState(state => ({
						...state, NumeroDocumento: Data.substring(4),
					}));
				} else {
					let Carater = Data.substring(7, 8)
					if (Carater == "X") {
						if (Data.length > 8) {
							if (!this.state.NumeroGuia && !this.state.NumeroDocumento) {
								this.setState(state => ({
									...state, NumeroDocumento: "",
								}));
							}
							this.setState(state => ({
								...state, NumeroGuia: Data,
							}));
							this.setState(state => ({
								...state, NumPiezas: Data.substring(8),
							}));
						
						}
					} 
				}
				
			}
		}
	}

	
	render() {
		return (
			<>
				<div className="ventana">
					<>

						{this.state.EstadoRecogida
							? <div>
								<CardBody className=" m-2">
									<ModalBody>
										<Formsy onValidSubmit={this.GuardarRecepciones} className="flex flex-col justify-center w-full">
											<div className="mb-3 d-flex justify-content-end">
												<Button type="submit" color="primary" className="btn btnGuardar mr-3">
													Guardar
										</Button>
												{EstateEliminar
													? ""
													: <Button id="boton" className="btnEliminar mr-3" onClick={this.alertaEliminar}>Eliminar</Button>}
												<Button type="button" color="primary" onClick={() => this.CancelarRecepciones()} className="btn btnCancelar mr-3">
													Cancelar
										</Button>
											</div>
											<div className="paddingleft">
												<div className="cardbody1 ">
													<div className="col-xs-15 col-md-12 text-center  mb-5 border">
														<div className="row">
															<div className="ml-2">
																<FormControlLabel
																	control={
																		<Checkbox
																			checked={this.state.EstadoRecogida}
																			onChange={() => this.CheckedEstado()}
																			color="primary"
																		/>
																	} label="Recogida"
																/>
															</div>
															<div className="mx-auto">
																<h1 className="py-2 mr-5">ORDEN DE RECOGIDA</h1>

															</div>
														</div>

													</div>
													<div className="col-xs-15 col-md-12 row">
														<div className="col-md-3 pb-4">
															<div className="flex ">
																<div className="min-w-48 fa-2x pt-10 pl-3">
																	<Icon className="text-20" color="black">
																		calendar_today
																</Icon>
																</div>
																<TextFieldFormsy
																	type="Date"
																	id="date"
																	fullWidth
																	name="fecharecibido"
																	label="Fecha Recibido" variant="outlined"
																	value={this.state.fechaActual}
																	InputLabelProps={{
																		shrink: true
																	}}
																	size="small"
																/>

															</div>
														</div>
														<div className="col-md-5 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 pl-3">
																	<Icon className="text-20" color="black">
																		person
																		</Icon>
																</div>
																<FuseChipSelect
																	className="w-full mb-3"
																	value={this.state.ConductorSelect}
																	placeholder="Conductor"
																	onChange={this.CambiarSelectConductor}
																	textFieldProps={{
																		label: 'Conductores',
																		InputLabelProps: {
																			shrink: true
																		},
																		variant: 'standard'
																	}}
																	options={this.state.DataConductores}

																/>
															</div>
														</div>

														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 pl-3">
																	<Icon className="text-20" color="black">
																		local_shipping
																</Icon>
																</div>
																<FuseChipSelect
																	className="w-full mb-3"
																	value={this.state.VehiculoSelect}
																	placeholder="Vehiculo"
																	onChange={this.CambiarSelectVehiculos}
																	textFieldProps={{
																		label: 'Vehiculos',
																		InputLabelProps: {
																			shrink: true
																		},
																		variant: 'standard'
																	}}
																	options={this.state.DataVehiculos}

																/>
															</div>
														</div>
													</div>
													<div className="col-xs-15 col-md-12 row">

														<div className="col-md-3 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		insert_drive_file
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="Empresa"
																	value={this.props.data.Empresa}
																	ref="someName"
																	type="text"
																	label="Empresa transporte"
																	variant="outlined"
																	required
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-5 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		insert_drive_file
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="Email"
																	value={this.props.data.Email}
																	ref="someName"
																	type="text"
																	label="Email"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 pl-3">
																	<Icon className="text-20" color="black">
																		insert_drive_file
															</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="Sita"
																	value={this.props.data.Sita}
																	type="text"
																	label="Sita"
																	variant="outlined"
																	required
																></TextFieldFormsy>
															</div>
														</div>
													</div>

													<div className="col-xs-15 col-md-12 text-center mb-5 border">
														<h1 className="py-2">FAVOR ORDENAR LA SIGUIENTE RECOGIDA</h1>
													</div>
													<div className="col-xs-15 col-md-12 text-center mb-5 border" style={{ background: "#cdcdcd" }}>
														<h1 className="py-2">ORIGEN</h1>
													</div>
													<div className="col-xs-15 col-md-12 row">
														<div className="col-md-8 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10">
																	<Icon className="text-20" color="black">
																		place
																</Icon>
																</div>
																<FuseChipSelect
																	className="w-full mb-3"
																	value={this.state.OrigenSelect}
																	placeholder="Origen"
																	onChange={this.CambiarSelectOrigen}
																	textFieldProps={{
																		label: 'Origen',
																		InputLabelProps: {
																			shrink: true
																		},
																		variant: 'standard'
																	}}
																	options={this.state.DataOrigenes}
																/>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		insert_drive_file
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="DireccionOrigen"
																	value={this.props.data.DireccionOrigen}
																	ref="someName"
																	type="text"
																	label="Direccion"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>

													</div>
													<div className="col-xs-15 col-md-12 row">
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		person
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="ContactoOrigen"
																	value={this.props.data.ContactoOrigen}
																	ref="someName"
																	type="text"
																	label="Contacto"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		insert_drive_file
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="TipoMercanciaR"
																	value={this.props.data.TipoMercanciaR}
																	ref="someName"
																	type="text"
																	label="Tipo de mercancia"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		settings_cell
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="TelefonoOrigen"
																	value={this.props.data.TelefonoOrigen}
																	ref="someName"
																	type="number"
																	label="Telefono"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>

													</div>

													<div className="col-xs-15 col-md-12 row">
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		insert_drive_file
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="NumeroUnidades"
																	value={this.props.data.NumeroUnidades}
																	ref="someName"
																	type="number"
																	label="Numero unidades"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		insert_drive_file
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="NumeroCajas"
																	value={this.props.data.NumeroCajas}
																	ref="someName"
																	type="number"
																	label="Numero cajas"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		attach_money
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="ValorDeclarado"
																	value={this.props.data.ValorDeclarado}
																	ref="someName"
																	type="number"
																	label="Valor Declarado"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>

													</div>

													<div className="col-xs-15 col-md-12 text-center mb-5 border" style={{ background: "#cdcdcd" }}>
														<h1 className="py-2">DESTINO</h1>
													</div>
													<div className="col-xs-15 col-md-12 row">
														<div className="col-md-8 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10">
																	<Icon className="text-20" color="black">
																		place
																</Icon>
																</div>
																<FuseChipSelect
																	className="w-full mb-3"
																	value={this.state.DestinoSelect}
																	placeholder="Destino"
																	onChange={this.CambiarSelectDestino}
																	textFieldProps={{
																		label: 'Destino',
																		InputLabelProps: {
																			shrink: true
																		},
																		variant: 'standard'
																	}}
																	options={this.state.DataDestinos}
																/>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		person
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="ContactoDestino"
																	value={this.props.data.ContactoDestino}
																	ref="someName"
																	type="text"
																	label="Contacto"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>


													</div>
													<div className="col-xs-15 col-md-12 row">
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		insert_drive_file
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="DireccionDestino"
																	value={this.props.data.DireccionDestino}
																	ref="someName"
																	type="text"
																	label="Direccion"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		settings_cell
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="TelefonoDestino"
																	value={this.props.data.TelefonoDestino}
																	ref="someName"
																	type="number"
																	label="Telefono"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>
														<div className="col-md-4 pb-4">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 ">
																	<Icon className="text-20" color="black">
																		person
																</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	fullWidth
																	name="Autorizado"
																	value={this.props.data.Autorizado}
																	ref="someName"
																	type="text"
																	label="Autorizado Por"
																	variant="outlined"
																></TextFieldFormsy>
															</div>
														</div>

													</div>


												</div>
											</div>
										</Formsy>

									</ModalBody>
								</CardBody>
							</div>
							: <div>
								<CardBody className=" m-2">
									<ModalBody>
										<Formsy onValidSubmit={this.GuardarRecepciones} className="flex flex-col justify-center w-full">
											<div className="mb-3 d-flex justify-content-end">
												<Button type="submit" color="primary" className="btn btnGuardar mr-3">
													Guardar
										</Button>
												{EstateEliminar
													? ""
													: <Button id="boton" className="btnEliminar mr-3" onClick={this.alertaEliminar}>Eliminar</Button>}
												<Button type="button" color="primary" onClick={() => this.CancelarRecepciones()} className="btn btnCancelar mr-3">
													Cancelar
										</Button>
											</div>
											<div className="paddingleft">
												<div className="cardbody1 ">
													<div className="col-xs-15 col-md-12 ">
														<div className="row">
															<div className="col-md-3 pb-4">
																<div className="flex ">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			calendar_today
																</Icon>
																	</div>
																	<TextFieldFormsy
																		type="Date"
																		id="date"
																		fullWidth
																		name="fecharecibido"
																		label="Fecha Recibido" variant="outlined"
																		value={this.state.fechaActual}
																		InputLabelProps={{
																			shrink: true
																		}}
																		size="small"
																	/>

																</div>
															</div>
															<div className="col-md-5 pb-4">
																<div className="flex">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			person
																</Icon>
																	</div>
																	<FuseChipSelect
																		className="w-full mb-3"
																		value={this.state.ConductorSelect}
																		placeholder="Conductor"
																		onChange={this.CambiarSelectConductor}
																		textFieldProps={{
																			label: 'Conductores',
																			InputLabelProps: {
																				shrink: true
																			},
																			variant: 'standard'
																		}}
																		options={this.state.DataConductores}

																	/>
																</div>
															</div>
															<div className="col-md-4 pb-4">
																<div className="flex">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			local_shipping
																</Icon>
																	</div>
																	<FuseChipSelect
																		className="w-full mb-3"
																		value={this.state.VehiculoSelect}
																		placeholder="Vehiculo"
																		onChange={this.CambiarSelectVehiculos}
																		textFieldProps={{
																			label: 'Vehiculos',
																			InputLabelProps: {
																				shrink: true
																			},
																			variant: 'standard'
																		}}
																		options={this.state.DataVehiculos}

																	/>
																</div>
															</div>
														</div>
														<div className="row">
															<div className="col-md-3 pt-2 ml-3">
																<FormControlLabel
																	control={
																		<Checkbox
																			checked={this.state.EstadoRecogida}
																			onChange={() => this.CheckedEstado()}
																			color="primary"
																		/>
																	} label="Recogida"
																/>
															</div>
															<div className="col-md-5 pb-4">
																<div className="flex">
																	<div className="min-w-48 fa-2x pt-10">
																		<Icon className="text-20" color="black">
																			place
																</Icon>
																	</div>
																	<FuseChipSelect
																		className="w-full mb-3"
																		value={this.state.OrigenSelect}
																		placeholder="Origen"
																		onChange={this.CambiarSelectOrigen}
																		textFieldProps={{
																			label: 'Origen',
																			InputLabelProps: {
																				shrink: true
																			},
																			variant: 'standard'
																		}}
																		options={this.state.DataOrigenes}
																	/>
																</div>
															</div>
														</div>

													</div>
												</div>
											</div>
										</Formsy>

									</ModalBody>
								</CardBody>
								{this.state.EstateForm
									? <div className="row d-flex justify-content-between" style={{ width: "100%" }}>
										<div className="row ml-1">

										</div>

										<div className="">
											<Button type="button" color="primary" onClick={() => this.MostrarForm()} className="btn btnAdjuntar mr-3">
												Mostrar Formulario
									</Button>
										</div>
									</div>
									: <CardBody className="">
										<Formsy onValidSubmit={this.AgregarEnvio} className="flex flex-col justify-center">
											<div className="paddingleft">
												<div className="cardbody1">
													{/* <Alerta
												DataAlerta={this.state.EstadoAlerta} 
											/> */}
													<div className="col-xs-15 col-md-12 ">
														<div className="row">
															<div className="col-md-6 pb-4">
																<div className="flex ">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			flag
															</Icon>
																	</div>
																	<FuseChipSelect
																		className="w-full mb-3"
																		value={this.state.DestinoSelect}
																		placeholder="Opciones.."
																		onChange={this.CambiarSelectDestino}
																		textFieldProps={{
																			label: 'Destinos',
																			InputLabelProps: {
																				shrink: true
																			},
																			variant: 'standard'
																		}}
																		options={this.state.DataDestinos}
																	/>
																</div>
															</div>
															<div className="col-md-6 pb-4">
																<div className="flex">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			insert_drive_file
															</Icon>
																	</div>
																	<TextFieldFormsy
																		className=""
																		fullWidth
																		name="numerodocumento"
																		value={this.state.NumeroDocumento}
																		onChange={this.SelectCampo}
																		type="text"
																		label="No. de Documento"
																		variant="outlined"
																		required
																	></TextFieldFormsy>
																</div>
															</div>



														</div>
													</div>

													<div className="col-xs-15 col-md-12">
														<div className="row">

															<div className="col-md-6 pb-4">
																<div className="flex">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			insert_drive_file
															</Icon>
																	</div>
																	<TextFieldFormsy
																		className=""
																		fullWidth
																		name="numeroguia"
																		value={this.state.NumeroGuia}
																		onChange={this.SelectCampo}
																		type="text"
																		label="No. de Guia"
																		variant="outlined"
																		required
																	></TextFieldFormsy>
																</div>
															</div>
															<div className="col-md-3 pb-4">
																<div className="flex">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			list_alt
															</Icon>
																	</div>
																	<SelectFormsy
																		className="fullWidth-select"
																		value={this.state.TipoMercancia}
																		name="tipoMercancia"
																		label="Tipo de Mercancia"
																		variant="outlined"
																		required
																	>
																		<MenuItem value="">Elegir...</MenuItem>
																		{this.state.DataTipoMercancias.map((e, key) => {
																			return (
																				<MenuItem value={e._id} key={e.Nombre}>
																					<em>{e.Nombre}</em>
																				</MenuItem>
																			);
																		})}
																	</SelectFormsy>
																</div>
															</div>
															<div className="col-md-3 pb-4">
																<div className="flex">
																	<div className="min-w-48 fa-2x pt-10 pl-3">
																		<Icon className="text-20" color="black">
																			insert_drive_file
															</Icon>
																	</div>
																	<TextFieldFormsy
																		className=""
																		name="numeropiezas"
																		value={this.state.NumPiezas}
																		type="number"
																		label="No. de Piezas"
																		variant="outlined"
																		fullWidth
																		required
																	></TextFieldFormsy>
																</div>
															</div>


														</div>
													</div>

													<div className="col-xs-15 col-md-12">

														<div className="row  d-flex justify-content-between">
															<div className="ml-4">
																<Button type="button" color="primary" onClick={() => this.MostrarForm()} className="btn btnEliminar mr-3">
																	Ocultar
												</Button>
															</div>
															<div className="">
																<Button type="submit" color="primary" className="btn btnGuardar mr-3">
																	Agregar
												</Button>
															</div>
														</div>
													</div>

												</div>


											</div>

										</Formsy>


									</CardBody>}
								<br></br>
								<br></br>


								<TableManifiestos
									style={{ "margin": "2px" }}
									DataTable={this.state.ArrayRecepciones}
									QuitarMercancia={data => this.QuitarMercancia(data)}
									CambiarObservacion={data => this.CambiarObservacion(data)}

								/>
							</div>
						}


					</>
				</div>


			</>
		);
	}
}

export default DemoManifiesto;
