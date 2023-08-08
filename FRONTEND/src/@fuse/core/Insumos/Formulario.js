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
            EstadoVehiculo: false
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
        fetch(gsUrlApi + '/insumos/eliminar/', {
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
        let ObjInsumo = {};
        ObjInsumo.Codigo = e.Codigo;
        ObjInsumo.Nombre = e.Nombre;
        ObjInsumo.Descripcion = e.Descripcion;
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
        fetch(gsUrlApi + '/insumos/' + Action, {
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
                console.log("datos", ObjInsumo);
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
                                Insumo
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Formsy onValidSubmit={this.guardarVehiculo} className="flex flex-col md:overflow-hidden">
                        <DialogContent classes={{ root: 'p-24' }}>
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">code</Icon>
                                </div>
                                <TextFieldFormsy
                                    className="mb-24"
                                    name="Codigo"
                                    label="Código"
                                    value={this.state.Codigo}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">info</Icon>
                                </div>
                                <TextFieldFormsy
                                    className="mb-24"
                                    name="Nombre"
                                    label="Nombre"
                                    value={this.state.Nombre}
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

                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">call_to_action</Icon>
                                </div>
                                <TextFieldFormsy
                                    className="mb-24"
                                    name="Descripcion"
                                    label="Descripción"
                                    value={this.state.Descripcion}
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
                            <div className="flex">
                                <div className="min-w-48 fa-2x pt-10 pl-3">
                                    <Icon className="text-30" color="black">
                                        import_contacts
                                    </Icon>
                                </div>
                                <SelectFormsy
                                    className="fullWidth-select"
                                    name="Tipo"
                                    label="Tipo de Proucto"
                                    value={this.state.Tipo}
                                    variant="outlined"
                                    required
                                >
                                    <MenuItem value="INSUMO">Insumo</MenuItem>
                                    <MenuItem value="DOTACION">Dotación</MenuItem>
                                </SelectFormsy>
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