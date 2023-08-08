import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

class ProductsHeader extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}
	
	NuevoRol = () => {
		this.props.MostrarFormulario("Nuevo")
	}
	render() {
		return (
			<div className="flex flex-1 w-full items-center justify-between">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">
							{this.props.Icono}
						</Icon>
					</FuseAnimate>
					<FuseAnimate className="" animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12 ml-3" variant="h4">
							{this.props.Nombre}
						</Typography>
					</FuseAnimate>
				</div>
	
				<div className="flex flex-1 items-center justify-center px-12">
					<ThemeProvider >
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
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						// component={Link}
						onClick={this.NuevoRol}
						// to="/apps/e-commerce/products/new"
						// className="whitespace-no-wrap normal-case"
						variant="contained"
						color="secondary"
					>
						<span   className="hidden sm:flex">Nuevo</span>
						<span className="flex sm:hidden">New</span>
					</Button>
				</FuseAnimate>
			</div>
		);
	}
	
}

export default ProductsHeader