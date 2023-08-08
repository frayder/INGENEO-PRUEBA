import React from 'react';
import { Button, ModalBody, ModalFooter, CardBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../DemoUsuario/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAddressCard,
	faUserPlus,
	faMapMarkerAlt,
	faAt,
	faDesktop
} from '@fortawesome/free-solid-svg-icons';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Formsy from 'formsy-react';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

let EstateEliminar = true;
class DemoUsuario extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			abierto: false,
			values: '',
			EstadoSave: false,
			DataRoles: [],
			EstadoUsuario: false
		};
	}
	async componentDidMount(e) {
		this.ConsultarRoles();
		if (this.props.data.IdPais) {
			EstateEliminar = false;
			this.setState(state => ({
				...state,
				EstadoUsuario: this.props.data.Estado
			}));
		} else {
			EstateEliminar = true;
		}
		
	}

	CheckedEstado = () => {
		this.setState({ EstadoUsuario: !this.state.EstadoUsuario });
	};


	//CONSTRUCTOR INSERTAR
	insertarusuario = e => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		let ObjUsuario = {};
		ObjUsuario.IdUsuario = e.IdUsuario;
		ObjUsuario.TipoIdentificacion = e.tipodoc;
		ObjUsuario.Identificacion = e.identificacion;
		ObjUsuario.Dv = e.Dv;
		ObjUsuario.rsocial = e.rsocial;
		ObjUsuario.regimen = e.regimen;
		ObjUsuario.Celular = e.celular;
		ObjUsuario.Empresa = Empresa;
		ObjUsuario.Estado = this.state.EstadoUsuario;
		ObjUsuario.Rol = e.Rol;
		ObjUsuario.Usuario = e.Usuario;
		ObjUsuario.Clave = e.Clave;

		let Action = null;
		if (this.props.data._id) {
			ObjUsuario._id = this.props.data._id;
			Action = 'actualizar';
		} else {
			Action = 'insertar';
		}

		fetch(gsUrlApi + '/usuarios/' + Action + '/', {
			method: 'POST',
			body: JSON.stringify(ObjUsuario),
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

	ConsultarRoles = () => {
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/roles/listar/' + Empresa + '/', {
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
					DataRoles: data.datos
				}));
			})
			.catch(err => console.log('err', err));
	};

	ElimarUsuario = e => {
		var ObjUsuarios = new Object();
		ObjUsuarios._id = this.props.data._id;
		fetch(gsUrlApi + '/usuarios/eliminar/', {
			method: 'POST',
			body: JSON.stringify(ObjUsuarios),
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

	onClick = () => {
		this.props.MostrarFormulario('Cancelar');
	};

	onClick2 = () => {
		
	};

	alertaEliminar = data =>{
        confirmAlert({
            title: "Eliminar registro",
            message: "¿Desea eliminar el registro seleccionado?",
            buttons:[
                {
                    label: "Si",
                    onClick: (data) => this.ElimarUsuario(data)
                },
                {
                    label: "No",
                    onClick: () => this.onClick2("Click no")
                }
            ]
        });
    };

	render() {
		return (
			<>
				<div className="ventana">
					<Formsy onValidSubmit={this.insertarusuario} className="flex flex-col justify-center w-full">
						<div>
							<CardBody className="cardbody my-5 mx-4">
								<form>
									<ModalBody>
										<div className="borde">
											<div className="row ">
												<div className="col-xs-12 col-md-3 mx-auto">
													<div className="" style={{ fontSize: '50px', color: '#01325B '}}>
														<div /* className="fa-3x" */>
														  <img src="assets/images/empleados.png" width="190" height="190" className="float-right"/>
														</div>
													</div>
												</div>
												<div className="col-xs-12 col-md-9">
													<div className="row">
														<div className="col-md-5 pb-3">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 pl-3">
																	<Icon className="text-30" color="black">
																		import_contacts
																	</Icon>
																</div>
																<SelectFormsy
																	className="fullWidth-select"
																	name="tipodoc"
																	label="Tipo de Documento"
																	value={this.props.data.TipoIdentificacion}
																	variant="outlined"
																	required
																>
																	<MenuItem value="CC">CC</MenuItem>
																	<MenuItem value="NIT">NIT</MenuItem>
																</SelectFormsy>
															</div>
														</div>
														<div className="col-md-5 pb-3">
															<TextFieldFormsy
																className=""
																type="Number"
																name="identificacion"
																label="Numero de Identificacion"
																value={this.props.data.Identificacion}
																fullWidth
																validations={{
																	minLength: 1
																}}
																validationErrors={{
																	minLength:
																		'El numero de caracteres minimos es de: 1'
																}}
																variant="outlined"
																required
															/>
														</div>
														<div className="col-md-2 pb-3">
															<TextFieldFormsy
																className=""
																type="Number"
																name="Dv"
																fullWidth
																value={this.props.data.Dv}
																label="Dv"
																variant="outlined"
																validations={{
																	minLength: 1
																}}
																validationErrors={{
																	minLength:
																		'El numero de caracteres minimos es de: 1'
																}} 
																required
															/>
														</div>
													</div>

													<div className="row pt-2 pb-3">
														<div className="col-md-12">
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
																	validations={{
																		minLength: 1
																	}}
																	validationErrors={{
																		minLength:
																			'El numero de caracteres minimos es de: 1'
																	}}  
																/>
															</div>
														</div>
													</div>

													<div className="row pt-2">
														<div className="col-md-6 pb-3">
															<div className="flex">
																<div className="min-w-48 fa-2x pt-10 pl-3">
																	<FontAwesomeIcon icon={faAddressCard}>
																		{' '}
																	</FontAwesomeIcon>
																</div>
																<SelectFormsy
																	className="fullWidth-select"
																	name="regimen"
																	label="Regimen"
																	value={this.props.data.regimen}
																	variant="outlined"
																>
																	<MenuItem value="comun">Comun</MenuItem>
																	<MenuItem value="regimen 2">Regimen 2</MenuItem>
																</SelectFormsy>
															</div>
														</div>
														<div className="col-md-6 pb-3">
														<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																local_phone
															</Icon>
														</div>
														<TextFieldFormsy
															className=""
															type="number"
															name="celular"
															fullWidth
															value={this.props.data.Celular}
															label="Celular"
															variant="outlined"
															validations={{
																minLength: 1
															}}
															validationErrors={{
																minLength:
																	'El numero de caracteres minimos es de: 1'
															}} 
														/>
													</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row pt-2">
												<div className="col-md-3 pb-3">
													<div className="flex">
														<div className="min-w-48  pt-10 pl-3">
															<Icon className="text-30" color="black">
																security
															</Icon>
														</div>
														<SelectFormsy
															className="fullWidth-select"
															name="Rol"
															label="Rol"
															onChange={this.ConsultarMunicipio}
															variant="outlined"
															required
															value={this.props.data.Rol}
														>
															<MenuItem value="none">Elegir...</MenuItem>
															{this.state.DataRoles.map((e, key) => {
																return (
																	<MenuItem value={e._id} key={e.Nombre}>
																		<em>{e.Nombre}</em>
																	</MenuItem>
																);
															})}
														</SelectFormsy>
													</div>
												</div>
												<div className="col-md-3 pb-3">
													<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																perm_identity
															</Icon>
														</div>
														<TextFieldFormsy
															className=""
															type="text"
															fullWidth
															name="Usuario"
															label="Usuario"
															value={this.props.data.Usuario}
															validations={{
																minLength: 2
															}}
															validationErrors={{
																minLength: 'El numero de caracteres minimos es de 2'
															}}
															style={{ 'borde-color': 'blue' }}
															variant="outlined"
															required
														/>
													</div>
												</div>
												<div className="col-md-3 pb-3">
													<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																vpn_key
															</Icon>
														</div>
														<TextFieldFormsy
															className=""
															type="text"
															fullWidth
															name="Clave"
															label="Password"
															value={this.props.data.Clave}
															validations={{
																minLength: 4
															}}
															validationErrors={{
																minLength: 'El numero de caracteres minimos es de 4'
															}}
															variant="outlined"
															required
														/>
													</div>
												</div>
												<div className="col-md-3 pb-3 text-center">
													<h4 for="formSwitch">Activo</h4>
													<Switch
														checked={this.state.EstadoUsuario}
														onChange={() => this.CheckedEstado()}
														aria-label="Custom Scrollbars"
														name="estado"
													/>
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
													onClick={this.alertaEliminar}
												>
													Eliminar
												</Button>
											)}
											<Button id="boton" className="btnCancelar " onClick={this.onClick}>
												Cancelar
											</Button>
										</div> 
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

export default DemoUsuario;
