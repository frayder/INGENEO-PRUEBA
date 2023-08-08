import React from "react";
import Button from '@material-ui/core/Button';
import { gsUrlApi } from "../../../configuracion/ConfigServer";
import Icon from '@material-ui/core/Icon';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdAddBox,
  MdIndeterminateCheckBox,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile
} from "react-icons/md";


let gLstinterfaces = null;
let glstPermisos = null;
class FormRoles extends React.Component {
    
    handleSubmit = e => {
        // let { values, isValid, handleSubmit } = this.props;

        if (this.props.isValid) {
            this.props.handleFormSubmit(this.props.values);
        } else {
            this.props.handleFormSubmit(this.props.values);
        }
    };


    constructor(props){
        super(props);
        this.state = {
        handleChange: '',
        handleBlur: '',
        errors: '',
        touched: '',
        values: '',
        submitCount: '',
        checked: [],
        expanded: [],
        nodes: [],
        isValid: '',
        hidden_IdRol: null,
        EstadoForm: false,
        Nuevo: true,
        Code: "",
        Name: ""
        }
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
          error: error,
          errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
      }

    async componentDidMount() {

      if (this.props.data._id) {
          this.setState({Nuevo: !this.state.Nuevo});	
      }
        
        fetch(gsUrlApi + '/interfaces/', {
           method: 'GET',
           body: JSON.stringify(),
           headers: {
               'Content-Type': 'application/json; charset=UTF-8',
               'Accept': 'application/json',
           }
         }) . then(res => res.json())
             .then(data =>data)
             .then((data) =>{
                if (data.interfaces.length > 0) {
                    var lstData =[] ;
                    lstData = data.interfaces;
                   
                    
                    var array = []

                    gLstinterfaces = lstData;
                    let lstInterfaces = lstData;
                    var lstMenus = lstInterfaces.filter(obj => {
                      return obj.parent === "#";
                    });
                    let LstExpanded = [];
                    LstExpanded.push("Permisos")
                    for (var i = 0; i < lstMenus.length; i++) {
                      
                      var objDataMenu = {};
                      var objDataSub = {};          
                    
                      var lstSubMenu = lstInterfaces.filter(obj => {
                          return obj.parent === lstMenus[i].id;
                      });
                      LstExpanded.push(lstMenus[i].id)
                      if (lstSubMenu.length > 0) {
          
                        objDataMenu.label = lstMenus[i].text;
                        objDataMenu.value = lstMenus[i].id
                        array.push(objDataMenu)
                        var ArrayChild = []
                        for (let j = 0; j < lstSubMenu.length; j++) {
                          var objDataSub = {};
                          objDataSub.label = lstSubMenu[j].text;
                          objDataSub.value = lstSubMenu[j].id;
                          ArrayChild.push(objDataSub)
                        }
                        array[i].children = ArrayChild;
                      } else {
                        objDataMenu.label = lstMenus[i].text;
                        objDataMenu.value = lstMenus[i].id;
                        array.push(objDataMenu)
                      }
          
                    }
                    let objSuper = {};
                    let arraySuper = [];
                    objSuper.label = "Permisos";
                    objSuper.value = "Permisos";
                    objSuper.children = array
                    arraySuper.push(objSuper)
                    console.log(objSuper);
                    glstPermisos = this.props.data.Permisos
                    if (glstPermisos !== null && glstPermisos !== undefined) {
                      var arrayPermisos = [];
                      for (let i = 0; i < lstData.length; i++) {
                          if (glstPermisos.indexOf(lstData[i].id) !== -1) {
                              arrayPermisos.push(lstData[i].id)
                          }    
                      }
                      this.setState(state => ({
                          ...state,checked: arrayPermisos
                      }))
                    } 
                    this.setState(state => ({
                      ...state,expanded: LstExpanded
                  }))
                  if (this.props.data) {

                    this.setState(state => ({
                      ...state,checked: this.props.data.Permisos,
                      ...state,Code: this.props.data.code,
                      ...state,Name: this.props.data.name
                    }))
                  }
                  this.setState(state => ({
                    ...state,nodes: arraySuper
                  }))
                }
                
               
             })
         .catch(err => console.log("err", err));
         
    }

    OcultarFormulario = () => {
        this.props.MostrarFormulario();
    }

    GuardarRol = data => {

      let objRol = new Object();
      let Accion = null;
      if (!this.props.data._id) {
        Accion = "insertar";
      } else {
        Accion = "actualizar";
        objRol._id = this.props.data._id;
      }
      
        objRol.Codigo = data.Codigo;
        objRol.Nombre = data.Nombre;
        objRol.text = "interfaces";
        objRol.FechaActualizacion = new Date();
        objRol.IdEmpresa = "1";
        objRol.Empresa = "5cac12055d717e661ea7b95b";
        objRol.Permisos = this.state.checked;
        for (let i = 0; i < gLstinterfaces.length; i++) {
          if (!objRol.Permisos.includes(gLstinterfaces[i].parent)) {
            objRol.Permisos.push(gLstinterfaces[i].parent)
          }          
        }

        fetch(gsUrlApi + '/roles/'+ Accion +"/", {
          method: 'POST',
          body: JSON.stringify(objRol),
          headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
          }
        }) . then(res => res.json())
            .then(data => data)
            .then((data) =>{
              this.setState(state => ({
                  ...state,hidden_IdRol: null
              }))
              this.props.MostrarFormulario();
            })
        .catch(err => console.log("err", err));
    }

    EliminarRol = () => {
      let objRol = null
      if (this.props.data) {
        objRol = this.props.data
      } else {
        return true;
      }
      fetch(gsUrlApi + '/roles/eliminar/', {
        method: 'POST',
        body: JSON.stringify(objRol),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        }
      }) . then(res => res.json())
          .then(data => data)
          .then((data) =>{
            this.props.MostrarFormulario();         
          })
      .catch(err => console.log("err", err));
    }

    onClick2 = () => {
		
    };
  
    alertaEliminar = data =>{
          confirmAlert({
              title: "Eliminar registro",
              message: "¿Desea eliminar el registro seleccionado?",
              buttons:[
                  {
                      label: "Si",
                      onClick: (data) => this.EliminarRol(data)
                  },
                  {
                      label: "No",
                      onClick: () => this.onClick2("Click no")
                  }
              ]
          });
      };

    EdcitChecked = () => {
        
      // this.props.values.Permisos = this.state.checked
    }

    render(){
        const icons = {
          check: <MdCheckBox className="rct-icon rct-icon-check" />,
          uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
          halfCheck: (
            <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
          ),
          expandClose: (
            <MdChevronRight className="rct-icon rct-icon-expand-close" />
          ),
          expandOpen: (
            <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
          ),
          expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
          collapseAll: (
            <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
          ),
          parentClose: <MdFolder className="rct-icon rct-icon-parent-close" />,
          parentOpen: <MdFolderOpen className="rct-icon rct-icon-parent-open" />,
          leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
        };

          return (
            <Formsy
              onValidSubmit={this.GuardarRol}
              // onValid={enableButton}
              // onInvalid={disableButton}
              // ref={formRef}
              className=""
            >
              
              <div className="row  my-5 ">
                <div className="col-md-5">
                  <div className="flex">
                    <div className="min-w-48 pt-10 pl-3">
                      <Icon className="text-40" color="black">
                      code
                      </Icon>
                    </div>
                    <TextFieldFormsy
                      className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                      type="text"
                      name="Codigo"
                      value={this.props.data.code}
                      label="Codigo"
                      fullWidth
                      validations={{
                        minLength: 4
                      }}
                      validationErrors={{
                        minLength: 'Min character length is 4'
                      }}
                      variant="outlined"
                      required
                    />
                  </div>
                </div>
                
                <div className="col-md-7">
                  <div className="flex">
                    <div className="min-w-48 pt-10 pl-3">
                      <Icon className="text-40" color="black">
                        assignment_ind
                      </Icon>
                    </div>
                    <TextFieldFormsy
                      className="flex w-full  mx-16"
                      type="text"
                      name="Nombre"
                      label="Nombre"
                      fullWidth
                      value={this.props.data.name}
                      validations={{
                        minLength: 4
                      }}
                      validationErrors={{
                        minLength: 'Min character length is 4'
                      }}
                      variant="outlined"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <CheckboxTree
                    nodes={this.state.nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    IsExpanded={true}
                    onCheck={checked => this.setState({ checked })}
                    // onClick={this.EdcitChecked()}
                    onExpand={expanded => this.setState({ expanded })}
                    icons={icons}
                />
              </div>
              <div className="row">
                <div className=" d-flex ml-auto">
                  <Button type="submit" color="primary"className="btn btnGuardar float-right mr-3">Guardar</Button> 
                  {this.state.Nuevo 
                  ?"" 
                  :<Button id="boton" className="btnEliminar mr-3" onClick={this.alertaEliminar}>Eliminar</Button>}
                  <Button  outline color="primary" className="btn btnGuardar float-left mr-3" onClick={this.OcultarFormulario}>Cancelar</Button>
                </div>
              </div>
              {/* {showPassword ? 'visibility' : 'visibility_off'} */}
            </Formsy>
      );
      
        
    }
}

export default (FormRoles);
