import DemoProductos from '@fuse/core/Productos/Formulario';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import React from 'react';
import HeaderMaestro from '@fuse/core/HeaderMaestro/HeaderMaestro'
import FusePageCarded from '@fuse/core/FusePageCarded';
import TablaPrincipal from './TablaPrincipal';
import HeaderFormMaestro from '@fuse/core/HeaderMaestro/HeaderFormMaestro';
import Alerta from '@fuse/core/DemoAlerta/Alertas';
import './App.css';

class Productos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			abierto: false,
			values: '',
			EstadoForm: true,
			ListaProductos: [],
			DataTable: [],
			DataEdictar: "",
			EstadoAlerta: false
		}
	}

	async componentDidMount() {


		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let Empresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/productos/listar/' , {
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

	}

	Consultar = data => {
		let filtro = data.target.value;
		var objSesion = JSON.parse(localStorage.getItem('Usuario'));
		let sIdEmpresa = objSesion.Usuario.Empresa;

		fetch(gsUrlApi + '/productos/consultar/', {
			method: 'POST',
			body: JSON.stringify({  search: filtro }),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Accept: 'application/json'
			}
		}).then(res => res.json())
			.then(data => data)
			.then((data) => {
				this.setState(state => ({
					...state, DataTable: data.datos

				}))
			})
			.catch(err => console.log("err", err));
	}

	onClick = () => {
		this.setState({ EstadoForm: !this.state.EstadoForm });
	};



	MostrarFormulario(e) {
		if(e === "Nuevo" || e === "Cancelar"){
			this.setState(state => ({
				...state,DataEdict: ''
			}))
		this.setState({EstadoForm: !this.state.EstadoForm});	

		} else if (e === "Cargar") {
		this.setState({EstadoForm: !this.state.EstadoForm});	

			this.componentDidMount()
		} else if(e=== "Guardado"){
			this.componentDidMount()

			this.setState(state => ({
				...state,EstadoAlerta: true
			}))
		this.setState({EstadoForm: !this.state.EstadoForm});	

		} else if(e._id){
			this.setState(state => ({
				...state,DataEdict: e
			}))
		this.setState({EstadoForm: !this.state.EstadoForm});	

		}
	}



	onClickEdictar = Data => {
		if (Data) {
			this.setState({ EstadoForm: !this.state.EstadoForm });
			this.setState(state => ({
				...state, DataEdictar: Data
			}))
		}

	};

	render() {
		return (
			<div>
				{
					this.state.EstadoForm 
					? 
					<FusePageCarded
					classes={{
						content: 'flex',
						header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
					}}
					header={
					<HeaderMaestro
					Nombre={"Productos"}
					Icono={"send"}
					MostrarFormulario={data => this.MostrarFormulario(data)}
					Consultar={data => this.Consultar(data)}
					/> 						
					}
					content={
					<><TablaPrincipal
						MostrarFormulario={data => this.MostrarFormulario(data)}
						DataTable={this.state.DataTable}
						/>
							<Alerta
								DataAlerta={this.state.EstadoAlerta}
							/>
						</>
					}
					innerScroll
					/>
					:<>
					<HeaderFormMaestro
					Nombre={"Productos"}
					Icono={"send"}
					/>
					<DemoProductos
					MostrarFormulario={data => this.MostrarFormulario(data)}
					data={this.state.DataEdict}
					/>
					</>
				}
			</div>
		);
	}
}

export default Productos;
