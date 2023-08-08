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
import { TextFieldFormsy } from '@fuse/core/formsy';
import Switch from '@material-ui/core/Switch';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

let EstateEliminar = true;

class DemoVehiculos extends React.Component {
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
                ...state, Marca: this.props.data.Marca,
                ...state, Modelo: this.props.data.Modelo,
                ...state, Color: this.props.data.Color,
                ...state, Placa: this.props.data.Placa,
                ...state, Descripcion: this.props.data.Descripcion,
                ...state, EstadoVehiculo: this.props.data.Estado
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
        var objVehiculo = {};
        objVehiculo._id = this.props.data._id;
        fetch(gsUrlApi + '/vehiculos/eliminar/', {
            method: 'POST',
            body: JSON.stringify(objVehiculo),
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
        let ObjVehiculo = {};
        ObjVehiculo.Marca = e.Marca;
        ObjVehiculo.Modelo = e.Modelo;
        ObjVehiculo.Placa = e.Placa;
        ObjVehiculo.Estado = this.state.EstadoVehiculo;
        if (this.props.data._id) {
            ObjVehiculo._id = this.props.data._id;
        }
        let Action = ""
        if (ObjVehiculo._id) {
            Action = "actualizar"
        } else {
            Action = "insertar"
        }
        fetch(gsUrlApi + '/vehiculos/' + Action, {
            method: 'POST',
            body: JSON.stringify(ObjVehiculo),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(data => data)
            .then((data) => {
                this.props.MostrarFormulario("Guardado")
                console.log("datos", ObjVehiculo);
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
                                Vehículo
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
                                    name="Marca"
                                    label="Marca"
                                    value={this.state.Marca}
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
                                    name="Modelo"
                                    label="Modelo"
                                    value={this.state.Modelo}
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
                                    name="Placa"
                                    label="Placa"
                                    value={this.state.Placa}
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
                            <div className="text-right">
                                <h4 for="formSwitch">Activo</h4>
                                <Switch
                                    className="mb-16"
                                    checked={this.state.EstadoVehiculo}
                                    onChange={() => this.CheckedEstado()}
                                    aria-label="Custom Scrollbars"
                                    name="estado"
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

export default DemoVehiculos;