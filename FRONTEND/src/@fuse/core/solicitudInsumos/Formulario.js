import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { gsUrlApi } from '../../../configuracion/ConfigServer';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Button } from 'reactstrap';
import Formsy from 'formsy-react';
/* import TextField from '@material-ui/core/TextField'; */
import { TextFieldFormsy, SelectFormsy } from '@fuse/core/formsy';
import Switch from '@material-ui/core/Switch';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import MenuItem from '@material-ui/core/MenuItem';
let EstateEliminar = true;

class Demoinsumos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abierto: false,
            values: '',
            EstadoForm: true,
            EstadoVehiculo: false,
            ListaVehiculos: []
        }
    }

    async componentDidMount(e) {
        if (this.props.data) {
            this.setState(state => ({
                ...state, Nombre: this.props.data.Nombre,
                ...state, Codigo: this.props.data.Codigo,
                ...state, Tipo: this.props.data.Tipo,
                ...state, Descripcion: this.props.data.Descripcion
            }));
            EstateEliminar = false
        } else {
            EstateEliminar = true
        }
        fetch(gsUrlApi + '/insumos/listar', {
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

    onClick = () => {
        this.props.MostrarFormulario("Cancelar")
    }
    onClick2 = () => {

    };

    CheckedEstado = () => {
        this.setState({ EstadoVehiculo: !this.state.EstadoVehiculo });

    }

    alertaEliminar = data => {
        this.props.MostrarFormulario("Cancelar");
        confirmAlert({
            title: "Eliminar registro",
            message: "¿Desea eliminar el registro seleccionado?",
            buttons: [
                {
                    label: "Si",
                    onClick: (data) => this.eliminarVehiculo(data)
                },
                {
                    label: "No",
                    onClick: () => this.onClick2("Click no")
                }
            ]
        });
    };

    eliminarVehiculo = e => {
        var ObjInsumo = {};
        ObjInsumo._id = this.props.data._id;
        fetch(gsUrlApi + '/solicitudInsumos/eliminar/', {
            method: 'POST',
            body: JSON.stringify(ObjInsumo),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.props.MostrarFormulario("Cargar");
                this.props.MostrarFormulario("Cancelar");
            })
            .catch(err => console.log("err", err));
    }

    guardarVehiculo = e => { 
        var ObjSesion = JSON.parse(localStorage.getItem('Usuario')); 

        let ObjInsumo = {};
        ObjInsumo.IdProducto = e.IdProducto; 
        ObjInsumo.Cantidad = e.Cantidad;
        ObjInsumo.Estado = "SOLICITADO";
        ObjInsumo.Usuario = ObjSesion.Usuario.rsocial;
        ObjInsumo.IdUsuario = ObjSesion.Usuario._id;
        ObjInsumo.Tipo = e.Tipo;
        if (this.props.data._id) {
            ObjInsumo._id = this.props.data._id;
        }
        let Action = ""
        if (ObjInsumo._id) {
            Action = "actualizar"
        } else {
            Action = "insertar"
        }
        fetch(gsUrlApi + '/solicitudInsumos/' + Action, {
            method: 'POST',
            body: JSON.stringify(ObjInsumo),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.props.MostrarFormulario("Guardado") 
            })
            .catch(err => console.log("err", err));
    };

    render() {
        return (
            <div>
                <Dialog
                    classes={{
                        paper: 'm-24'
                    }}
                    fullWidth
                    maxWidth="xs"
                    open={true}
                >
                    <AppBar position="static" elevation={1}>
                        <Toolbar className="flex w-full">
                            <div className="min-w-48 pt-20">
                                <Icon color="inherit">local_shipping</Icon>
                            </div>
                            <Typography variant="subtitle1" color="inherit">
                                Insumos y Dotaciones
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Formsy onValidSubmit={this.guardarVehiculo} className="flex flex-col md:overflow-hidden">
                        <DialogContent classes={{ root: 'p-24' }}> 
                            <div className="flex mb-5">
                                <div className="min-w-48  pt-10 pl-3">
                                    <Icon className="text-30" color="black">
                                    widgets
                                    </Icon>
                                </div>
                                <SelectFormsy
                                    className="fullWidth-select"
                                    name="IdProducto"
                                    label="Producto" 
                                    variant="outlined"
                                    required
                                    value={this.props.data.Rol}
                                >
                                    <MenuItem value="none">Elegir...</MenuItem>
                                    {this.state.ListaVehiculos.map((e, key) => {
                                        return (
                                            <MenuItem value={e._id} key={e.Nombre}>
                                                <em>{e.Nombre}</em>
                                            </MenuItem>
                                        );
                                    })}
                                </SelectFormsy>
                            </div>

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">call_to_action</Icon>
                                </div>
                                <TextFieldFormsy
                                    className="mb-24"
                                    name="Cantidad"
                                    label="Cantidad"
                                    value={this.state.Cantidad}
                                    validations={{
                                        minLength: 1
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </div> 
                        </DialogContent>
                        <DialogActions>
                            <DialogActions>
                                <div className=" d-flex ml-auto">
                                    <Button type="submit" color="primary" className="btn btnGuardar float-right mr-3">Guardar</Button>
                                    {EstateEliminar
                                        ? ""
                                        : <Button id="boton" className="btnEliminar mr-3" onClick={this.alertaEliminar}>Eliminar</Button>}
                                    <Button outline color="primary" className="btn btnCancelar float-left mr-3" onClick={this.onClick}>Cancelar</Button>
                                </div>
                            </DialogActions>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        );
    }
}

export default Demoinsumos;