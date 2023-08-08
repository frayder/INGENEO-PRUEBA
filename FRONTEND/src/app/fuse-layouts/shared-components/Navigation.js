import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { gsUrlApi } from '../../../configuracion/ConfigServer';

let gObjSesion = null;
let gLstinterfaces = null;
// let glstPermisos = null;
let lstInterfaces = null;
let resultado = [];
let navigationConfig = [];

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SidebarData: []
		}
	}
	componentDidMount() {
		fetch(gsUrlApi + '/interfaces/', {
			method: 'GET',
			body: JSON.stringify(),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': 'application/json',
			}
		}).then(res => res.json())
			.then(data => data)
			.then((data) => {
				if (data.interfaces.length > 0) {
					var lstData = [];
					lstData = data.interfaces;

					let ObjSesion = JSON.parse(localStorage.getItem('Usuario'))
					let glstPermisos = ObjSesion.Usuario.Rol.Permisos;
					let lstDataAux = [];
					for (let j = 0; j < glstPermisos.length; j++) {

						lstData.filter(obj => {
							if (obj.id === glstPermisos[j]) {
								lstDataAux.push(obj)
							}
						});
					}
					lstData = lstDataAux;

					var array = []
					gLstinterfaces = lstData;
					lstInterfaces = lstData;
					var lstMenus = lstInterfaces.filter(obj => {
						return obj.parent === "#";
					});

					for (var i = 0; i < lstMenus.length; i++) {
						var objMenu = lstMenus[i];

						var objDataMenu = {};
						var objDataSub = {};


						var lstSubMenu = lstInterfaces.filter(obj => {
							return obj.parent === lstMenus[i].id;
						});

						if (lstSubMenu.length > 0) {

							objDataMenu.id = lstMenus[i].id;
							objDataMenu.title = lstMenus[i].text;
							objDataMenu.translate = lstMenus[i].text;
							objDataMenu.type = lstMenus[i].Type;
							objDataMenu.icon = lstMenus[i].icon;
							array.push(objDataMenu)
							var ArrayChild = []
							for (let j = 0; j < lstSubMenu.length; j++) {
								var objDataSub = {};
								objDataSub.id = lstSubMenu[j].id;
								objDataSub.title = lstSubMenu[j].text;
								objDataSub.translate = lstSubMenu[j].text;
								objDataSub.type = lstSubMenu[j].Type;
								objDataSub.icon = lstSubMenu[j].icon;
								objDataSub.url = lstSubMenu[j].Url;
								ArrayChild.push(objDataSub)
							}
							array[i].children = ArrayChild;
						} else {
							objDataMenu.id = lstMenus[i].id;
							objDataMenu.title = lstMenus[i].text;
							objDataMenu.translate = lstMenus[i].text;
							objDataMenu.type = lstMenus[i].Type;
							objDataMenu.icon = lstMenus[i].icon;
							array.push(objDataMenu)
						}

					}
				}


				this.setState(state => ({
					...state, SidebarData: array
				}))
			})
			.catch(err => console.log("err", err));

	}
	render() {
		return (
			<FuseNavigation
				className={clsx('navigation', this.props.className)}
				navigation={this.state.SidebarData}
				layout={this.props.layout}
				dense={this.props.dense}
				active={this.props.active}
			/>
		);
	}

}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
