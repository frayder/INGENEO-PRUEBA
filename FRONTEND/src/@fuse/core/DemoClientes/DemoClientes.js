import React from 'react';
import { Button, ModalBody, ModalFooter, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../DemoUsuario/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faUserPlus, faMobile, faAt, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));
let EstateEliminar = true;
class DemoClientes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			abierto: false,
			values: '',
			EstadoSave: false,
			DataPais: [],
			DataMunicipios: [],
			estadoimprimido: true
		};
	}

	async componentDidMount(e) {
		if (this.props.data.IdPais) {
			EstateEliminar = false; 
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
 
	//CONSTRUCTOR INSERTAR
	insertarusuario = e => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		let ObjProducto = {}; 
		ObjProducto.Identificacion = e.identificacion; 
		ObjProducto.rsocial = e.rsocial; 
		ObjProducto.Telefono = e.telefono;  

		let Action = null;
		if (this.props.data._id) {
			ObjProducto._id = this.props.data._id;
			Action = 'actualizar';
		} else {
			Action = 'insertar';
		}

		fetch(gsUrlApi + '/clientes/' + Action + '/', {
			method: 'POST',
			body: JSON.stringify(ObjProducto),
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

	submit = data => {
		confirmAlert({
		  title: 'Eliminar Registro',
		  message: '¿Desea eliminar el registro seleccionado?.',
		  buttons: [
			{
			  label: 'Si',
			  onClick: (data) => this.ElimarUsuario(data)
			},
			{
			  label: 'No',
			  onClick: () => this.onClick1('Click No')
			}
		  ]
		});
	  };

	ElimarUsuario = e => { 

		var objProductos = new Object();
		objProductos._id = this.props.data._id;
		fetch(gsUrlApi + '/clientes/eliminar/', {
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

	onClick1 = () => {
		// this.props.MostrarFormulario('Cancelar');
	};

	onClick2 = () => {
		this.props.MostrarFormulario('Cancelar');
	};

	MostarAlerta = () => {};


	render() {
		return (
			<>
				<div className="ventana">
					{}

					<hr></hr>

					<Formsy onValidSubmit={this.insertarusuario} className="flex flex-col justify-center w-full">
						<div>
							<CardBody className="cardbody mt-5 ml-4">
								<form>
									<ModalBody>
										<div className="borde">
											<div className="row" style={{ width: '100%' }}>
												<div className="col-xs-12 col-md-3 mx-auto">
													<div className="" style={{ fontSize: '50px', color: '#01325B ' }}>
														<div className="fa-3x">
															<img src="assets/images/objetivo.png" />
														</div>
													</div>
												</div>
												<div className="col-xs-12 col-md-9">
													<div className="row"> 
														<div className="col-md-6 pb-3">
															<TextFieldFormsy
																className=""
																type="Number"
																name="identificacion"
																label="Numero de Identificacion"
																value={this.props.data.Identificacion}
																fullWidth
																validations={{
																	minLength: 6
																}}
																validationErrors={{
																	minLength:
																		'El numero de caracteres minimos es de: 6'
																}}
																variant="outlined"
																required
															/>
														</div>
														<div className="col-md-6 pb-3">
														<div className="flex">
																<div className="min-w-48 fa-2x pt-10 pl-3">
																	<Icon className="text-30" color="black">
																		supervised_user_circle
																	</Icon>
																</div>
																<TextFieldFormsy
																	className=""
																	type="text"
																	name="rsocial"
																	value={this.props.data.rsocial}
																	label="Razon Social"
																	fullWidth
																	variant="outlined"
																	required
																/>
															</div>
															
														</div>
														 
													</div>

													<div className="row pt-2 pb-3">
														<div className="col-md-12">
														<TextFieldFormsy
																className=""
																type="Number"
																name="Telefono"
																label="Telefono"
																value={this.props.data.Telefono}
																fullWidth
																validations={{
																	minLength: 6
																}}
																validationErrors={{
																	minLength:
																		'El numero de caracteres minimos es de: 6'
																}}
																variant="outlined"
																required
															/>
														</div>
													</div>

													 
												</div>
											</div> 
										</div>
									</ModalBody>
									<ModalFooter>
										<div className="row">
											<Button className="btnGuardar mr-3" type="submit">
												Guardar
											</Button>
											{EstateEliminar ? (
												''
											) : (
												<Button
													id="boton"
													className="btnEliminar mr-3"
													onClick={this.submit}
												>
													Eliminar
												</Button>
											)}
											<Button id="boton" className="btnCancelar " onClick={this.onClick2}>
												Cancelar
											</Button>
										</div>
										{/* <div className="text-left pb-5">
										<Button id="boton" className="btnCancelar" onClick={this.onClick}>Cancelar</Button>
									</div> */}
									</ModalFooter>
								</form>
							</CardBody>
						</div>
					</Formsy>
				</div>
			</>
		);
	}
}

export default DemoClientes;
