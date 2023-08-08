import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

class ProductsHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// mainTheme: '',
			// searchText: ''
		};
	}

	NuevoRol = () => {
		this.props.MostrarFormulario('Nuevo');
	};
	render() {
		return (
				<div className="flex flex-1 items-center justify-center px-12">
					<ThemeProvider>
						<FuseAnimate animation="transition.slideDownIn" delay={300}>
							<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
								<Icon color="action">search</Icon>

								<Input
									placeholder="Buscar"
									className="flex flex-1 mx-8"
									disableUnderline
									fullWidth
									value={this.state.searchText}
									inputProps={{
										'aria-label': 'Search'
									}}
									onChange={ev => this.props.Consultar(ev)}
								/>
							</Paper>
						</FuseAnimate>
					</ThemeProvider>
				</div>
		
		);
	}
}

export default ProductsHeader;
