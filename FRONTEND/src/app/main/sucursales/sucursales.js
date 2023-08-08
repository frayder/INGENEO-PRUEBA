import DemoSucursal from '@fuse/core/DemoSucursal/DemoSucursal';
import React from 'react';
import { gsUrlApi } from '../../../configuracion/ConfigServer'
import HeaderMaestro from '@fuse/core/HeaderMaestro/HeaderMaestro'
import FusePageCarded from '@fuse/core/FusePageCarded';
import TableSucursales from './TableSucursales';
import HeaderFormMaestro from '@fuse/core/HeaderMaestro/HeaderFormMaestro'
import Alerta from '@fuse/core/DemoAlerta/Alertas'

class Sucursales extends React.Component {
	constructor(props){
		super(props);
		this.state={
			abierto: false,
			values: '',
            EstadoForm: true,
            ListaSucursales: [],
			DataEdictar: "",
			EstadoAlerta: false
		}
    }
    
    async componentDidMount(){

        fetch(gsUrlApi + '/sucursales/listar', {
              method: 'GET',
              body: JSON.stringify(),
              headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Accept': 'application/json',
              }
             }).then(res => res.json())
                .then(data =>data)
                .then((data) =>{
                  this.setState(state => ({
                      ...state,ListaSucursales: data.datos
                   
                  }))
                })
          .catch(err => console.log("err", err));
  
      }

	onClick = () => {
        this.setState({EstadoForm: !this.state.EstadoForm});
    }

	Consultar = data => {
        let filtro = data.target.value;
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let sIdEmpresa = objSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/sucursales/consultar/', {
            method: 'POST',
            body: JSON.stringify({ IdEmpresa: sIdEmpresa, search: filtro }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.setState(state => ({
                    ...state,ListaSucursales: data.datos

                }))
            })
            .catch(err => console.log("err", err));
    }

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
            this.setState({EstadoForm: !this.state.EstadoForm});
            this.setState(state => ({
                ...state,DataEdictar: Data
            }))
        }
        
	}
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
					Nombre={"Sucursales"}
					Icono={"business"}
					MostrarFormulario={data => this.MostrarFormulario(data)}
					Consultar={data => this.Consultar(data)}
					/> 						
					}
					content={
					<><TableSucursales
						MostrarFormulario={data => this.MostrarFormulario(data)}
						DataTable={this.state.ListaSucursales}
						/>
						<Alerta 
				DataAlerta = {this.state.EstadoAlerta}
				/>
						</>
					}
					innerScroll
					/>
					:<>
					<HeaderFormMaestro
					Nombre={"Sucursales"}
					Icono={"business"}
					/>
					<DemoSucursal
					MostrarFormulario={data => this.MostrarFormulario(data)}
					data={this.state.DataEdict}
					/>
					</>
				}
			</div>
		);
	}
	
}

export default Sucursales;
