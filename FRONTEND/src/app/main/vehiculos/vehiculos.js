import React from 'react';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import HeaderMaestro from '@fuse/core/HeaderMaestro/HeaderMaestro'
import FusePageCarded from '@fuse/core/FusePageCarded';
import TableVehiculos from './TableVehiculos';
import DemoVehiculos from '@fuse/core/DemoVehiculos/DemoVehiculos';
import Alerta from '@fuse/core/DemoAlerta/Alertas';

class Vehiculos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoForm: true,
            ListaVehiculos: [],
            DataEdictar: "",
            EstadoAlerta: false
        }
    }

    async componentDidMount() {

        fetch(gsUrlApi + '/vehiculos/listar', {
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
                    ...state, ListaVehiculos: data.datos

                }))
            })
            .catch(err => console.log("err", err));

    }

    Consultar = data => {
        let filtro = data.target.value;
        var objSesion = JSON.parse(localStorage.getItem('Usuario'));
        let sIdEmpresa = objSesion.Usuario.Empresa;

        fetch(gsUrlApi + '/vehiculos/consultar/', {
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
                    ...state, ListaVehiculos: data.datos

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
            this.componentDidMount();
            this.setState(state => ({
                ...state, EstadoAlerta: true
            }));
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
                                    Nombre={"Registro de vehículos"}
                                    Icono={"local_shipping"}
                                    MostrarFormulario={data => this.MostrarFormulario(data)}
                                />
                            }
                            content={
                                <>
                                    <TableVehiculos
                                        MostrarFormulario={data => this.MostrarFormulario(data)}
                                        DataTable={this.state.ListaVehiculos}
                                    />
                                    <Alerta
                                        DataAlerta={this.state.EstadoAlerta}
                                    />
                                </>
                            }
                            innerScroll
                        />
                        : <DemoVehiculos
                            MostrarFormulario={data => this.MostrarFormulario(data)}
                            data={this.state.DataEdict}
                        />
                }
            </div>
        );
    }
}

export default Vehiculos;