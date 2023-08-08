import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import FirebaseLoginTab from './FirebaseLoginTab';
import React  from 'react';
const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));


const Login = props => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0')}>
			<div className="flex flex-col col-md-9 flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
				<div className="mx-auto">
					
					{/* <img className="w-128 mb-32" src="assets/images/LogoEmp.jpeg" alt="" /> */}
				</div>
				<div className="mx-auto">
					<FuseAnimate animation="transition.slideUpIn" delay={300}>
					<Typography variant="h1" color="inherit" className="font-light">
						Logística
					</Typography>
				</FuseAnimate>
				</div>
			</div>

			<FuseAnimate animation={{ translateX: [0, '100%'] }}>
				<Card className="w-full max-w-400 col-md-3 m-16 md:m-0" square>
					<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-123">
						<Typography variant="h6" className="text-center md:w-full mb-20">
							<img className="" src="assets/images/car.png" alt="" />
							LOGIN
						</Typography>
						<FirebaseLoginTab />
					</CardContent>
				</Card>
			</FuseAnimate>
		</div>
	);
}

export default Login;
