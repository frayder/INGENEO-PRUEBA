import DemoMercancias from '@fuse/core/DemoMercancias/DemoMercancias';
import React from 'react';
import { gsUrlApi } from '../../../configuracion/ConfigServer'
import HeaderMaestro from '@fuse/core/HeaderMaestro/HeaderMaestro'
import FusePageCarded from '@fuse/core/FusePageCarded';
import TableMercancias from './TableMercancias';
import Alerta from '@fuse/core/DemoAlerta/Alertas';

class Mercancias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoForm: true,
            ListaMercancias: [],
            DataEdictar: "",
            EstadoAlerta: false
        }
    }

    async componentDidMount() {

        fetch(gsUrlApi + '/mercancias/listar', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.setState(state => ({
                    ...state, ListaMercancias: data.datos

                }))
            })
            .catch(err => console.log("err", err));

    }

    onClick = () => {
        this.setState({ EstadoForm: !this.state.EstadoForm });
    }

    Consultar = data => {
        let filtro = data.target.value;
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let sIdEmpresa = objSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/mercancias/consultar/', {
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
                    ...state, ListaMercancias: data.datos

                }))
            })
            .catch(err => console.log("err", err));
    }



    
    MostrarFormulario(e) {
        if (e === "Nuevo" || e === "Cancelar") {
            this.setState(state => ({
                ...state, DataEdict: ''
            }))
            this.setState({ EstadoForm: !this.state.EstadoForm });

        } else if (e === "Cargar") {
            this.setState({ EstadoForm: !this.state.EstadoForm });

            this.componentDidMount()
        } else if (e === "Guardado") {
            this.componentDidMount()
            this.setState(state => ({
                ...state, EstadoAlerta: true
            }))
            this.setState({ EstadoForm: !this.state.EstadoForm });

        } else if (e._id) {
            this.setState(state => ({
                ...state, DataEdict: e
            }))
            this.setState({ EstadoForm: !this.state.EstadoForm });

        }
    }

    onClickEdictar = Data => {
        if (Data) {
            this.setState({ EstadoForm: !this.state.EstadoForm });
            this.setState(state => ({
                ...state, DataEdictar: Data
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
                                    Nombre={"Tipo de mercancía"}
                                    Icono={"line_style"}
                                    MostrarFormulario={data => this.MostrarFormulario(data)}
                                />
                            }
                            content={
                                <>
                                    <TableMercancias
                                        MostrarFormulario={data => this.MostrarFormulario(data)}
                                        DataTable={this.state.ListaMercancias}
                                    />
                                    <Alerta
                                        DataAlerta={this.state.EstadoAlerta}
                                    //  Mostrar={data => this.handleClick(data)}
                                    />

                                </>
                            }
                            innerScroll
                        />
                        : <>
                            <DemoMercancias
                                MostrarFormulario={data => this.MostrarFormulario(data)}
                                data={this.state.DataEdict}
                            />


                        </>
                }
            </div>
        );
    }
}

export default Mercancias;