import React from 'react';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import FormRoles from './FormRoles'
import HeaderMaestro from '@fuse/core/HeaderMaestro/HeaderMaestro'
import FusePageCarded from '@fuse/core/FusePageCarded';
import RolesTable from './TableRoles';
import HeaderFormMaestro from '@fuse/core/HeaderMaestro/HeaderFormMaestro'



class TableRoles extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			ListRoles: [],
			EstadoForm: false,
			DataRol: [],
			Action: "",

		}
	  }

    componentDidMount(){
 
		fetch(gsUrlApi + '/roles/listar/', {
			method: 'GET',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': 'application/json',
			}
		  }) . then(res => res.json())
			  .then(data => data)
			  .then((data) =>{
				  var arrayRoles= [];
				  var lstDatos =  data.datos;
				  for (let i = 0; i < lstDatos.length; i++) {
					  let objRoles = {};
					  objRoles._id = lstDatos[i]._id
					  objRoles.id = lstDatos[i].id
					  objRoles.code = lstDatos[i].Codigo
					  objRoles.name = lstDatos[i].Nombre
					  objRoles.Permisos = lstDatos[i].Permisos
					  arrayRoles.push(objRoles)
				  }
				  this.setState(state => ({
					  ...state,ListRoles: arrayRoles
				  }))
				
			  })
		  .catch(err => console.log("err", err));
		  
	}

	Consultar = data => {
        let filtro = data.target.value; 
        fetch(gsUrlApi + '/roles/consultar/', {
            method: 'POST',
            body: JSON.stringify({   search: filtro }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Accept: 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.setState(state => ({
                    ...state,ListRoles: data.datos

                }))
            })
            .catch(err => console.log("err", err));
    }

	MostrarFormulario(e) {
		this.setState({EstadoForm: !this.state.EstadoForm});	
		if(e === "Nuevo"){
			this.setState(state => ({
				...state,editedContent: []
			}))
		} else if (e === "Cargar") {
			this.componentDidMount()
		} else if(e=== "Guardado"){
			this.componentDidMount()
		} else if(e._id){
			this.setState(state => ({
				...state,editedContent: e
			}))
		}
	}

    render(){
		return (
			<>
			
			<div>
				{
					this.state.EstadoForm 
					?<>
					<HeaderFormMaestro
					Nombre={"Roles"}
					Icono={"security"}
					/>
					<div className="mx-20"> 
						 <FormRoles 
						data={this.state.editedContent}
						MostrarFormulario={() => this.MostrarFormulario("Cargar")}/>
					</div>
					</>
					:
					<>
					<FusePageCarded
						classes={{
							content: 'flex',
							header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
						}}
						header={
						<HeaderMaestro
						Nombre={"Roles"}
						Icono={"security"}
						MostrarFormulario={data => this.MostrarFormulario(data)}
						Consultar={data => this.Consultar(data)}
						/> 						
						}
						content={<RolesTable
							MostrarFormulario={data => this.MostrarFormulario(data)}
							DataTable={this.state.ListRoles}
						/>
						}
						innerScroll
					/>					
				</>
				}
			</div>
			</>
        );
    }
}

export default TableRoles