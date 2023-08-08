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
			DataPais: [],
			DataMunicipios: [],
			DataClientes: [],
			DataOrigenes: [],
			DataDestinos: [],
			ListaRutas: [],
			DataTable: [],
			DataEdictar: '',
			EstadoRuta: false,
			ArrayDestinos: [],
			DestinoDefaul: ''
		};
	}

	async componentDidMount(e) { 
		  
 
		fetch(gsUrlApi + '/puertos/listar/', {
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
		objData.Codigo = e.codigo;
		objData.Nombre = e.nombre; 
		objData.Tipo = e.Tipo; 
		
		if (this.props.data._id) {
			objData._id = this.props.data._id;
		}
		let Action = '';
		if (objData._id) {
			Action = 'actualizar';
		} else {
			Action = 'insertar';
		}
		fetch(gsUrlApi + '/puertos/' + Action + '/', {
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
		fetch(gsUrlApi + '/puertos/eliminar/', {
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

	alertaEliminar = data =>{
        confirmAlert({
            title: "Eliminar registro",
            message: "¿Desea eliminar el registro seleccionado?",
            buttons:[
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

	render() { 
		return (
			<>
				<div className="ventana col-md-12">
					<Formsy onValidSubmit={this.insertar} className="flex flex-col justify-center w-full">
						<div className="row mb-2 paddingleft" style={{ 'padding-top': '20px','width': '100%' }}>
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
											<div className="row">
												<div className="col-md-6 pb-4 ">
													<div className="flex ">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																code
															</Icon>
														</div>
														<TextFieldFormsy
															className="mb-16"
															type="text"
															name="codigo"
															label="Codigo"
															value={this.props.data.Codigo}
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

												<div className="col-md-6 pb-4">
													<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																assignment_ind
															</Icon>
														</div>
														<TextFieldFormsy
															className="mb-16"
															type="text"
															name="nombre"
															value={this.props.data.Nombre}
															label="Nombre"
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
											<div className="col-md-12 pb-3">
													<div className="flex">
														<div className="min-w-48 fa-2x pt-10 pl-3">
															<Icon className="text-30" color="black">
																import_contacts
															</Icon>
														</div>
														<SelectFormsy
															className="fullWidth-select"
															name="Tipo"
															label="Tipo de Producto"
															value={this.props.data.Tipo}
															variant="outlined"
															required
														>
															<MenuItem value="Nacional">Nacional</MenuItem>
															<MenuItem value="Internacional">Internacional</MenuItem> 
														</SelectFormsy>
													</div>
												</div> 
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
