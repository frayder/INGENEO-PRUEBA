import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';


class ProductsHeader extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			// mainTheme: '',
			// searchText: ''
		}
	}
	

	render() {
		return (
			<div className="flex flex-1 w-full items-center justify-between" 
			style={{
				background: "#192d3e"
				, padding: "15px"
				}}
			>
				<div className="flex items-center">
					<FuseAnimate className="ml-5"  animation="transition.expandIn" delay={300}>
						<Icon className="text-32 text-white">
							{this.props.Icono}
						</Icon>
					</FuseAnimate>
					<FuseAnimate className="" animation="transition.slideLeftIn" delay={300}>
						<Typography  className="hidden sm:flex mx-0 sm:mx-12 ml-3 text-white" variant="h4">
							{this.props.Nombre}
						</Typography>
					</FuseAnimate>
				</div>
			</div>
		);
	}
	
}

export default ProductsHeader