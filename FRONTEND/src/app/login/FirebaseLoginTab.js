import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { gsUrlApi } from '../../configuracion/ConfigServer';
import { Redirect } from 'react-router-dom';


const FirebaseLoginTab = () => {
	const login = useSelector(({ auth }) => auth.login);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [ValidacionUser, setValidacionUser] = useState(false);

	const formRef = useRef(null);

	useEffect(() => {
		if (login.error && (login.error.username || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {

		fetch(gsUrlApi + '/usuarios/validarIngreso', {
			method: 'POST',
			body: JSON.stringify({Login: model.username, Clave: model.password }),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': 'application/json',
			}
		}) . then(res => res.json())
			.then(data =>data)
			.then(function Validar(data) {
				if (data.usuarios.length > 0) {
					var objSesion = {};
					objSesion.Usuario = data.usuarios[0];
					localStorage.setItem('Usuario', JSON.stringify(objSesion))
					setValidacionUser(!ValidacionUser)
				}
			})
		.catch(err => console.log("err", err));
		
	}

if (ValidacionUser == true) {
	return(
		<Redirect to='/SolicitudInsumos'  />
	)
	
} else {
	localStorage.removeItem('Usuario')
	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="username"
					label="Email"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						className: 'pr-2',
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									<Icon className="text-20" color="action">
										{showPassword ? 'visibility' : 'visibility_off'}
									</Icon>
								</IconButton>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto normal-case mt-16"
					aria-label="LOG IN"
					disabled={!isFormValid}
					value="firebase"
				>
					Iniciar Sesión
				</Button>
				{/* {showPassword ? 'visibility' : 'visibility_off'} */}

				

			</Formsy>
		</div>
	);
}
	
}


// export default Radium(FirebaseLoginTab);
export default FirebaseLoginTab;
