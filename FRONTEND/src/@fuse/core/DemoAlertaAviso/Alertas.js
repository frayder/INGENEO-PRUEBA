import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

class DemoAlertas extends React.Component {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };
constructor(props) {
    super(props);
    this.state={
        open: false 
    }
} 

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     setOpen(false);
//   };
componentDidMount () {
    if (this.props.DataAlerta == true){
        this.setState(state => ({
            ...state,open: this.props.DataAlerta
         
        }))
      } 
}
handleClose = () => {
    this.setState(state => ({
        ...state,open: false
    }))
}
  
render(){
    return (
        <div >
        
          <Snackbar open={this.state.open} autoHideDuration={2200} onClose={() => this.handleClose()}>
            <Alert onClose={() => this.handleClose()} severity="warning">
              Evite guardar
            </Alert>
          </Snackbar>
          {/* <Alert severity="error">This is an error message!</Alert>
          <Alert severity="warning">This is a warning message!</Alert>
          <Alert severity="info">This is an information message!</Alert>
          <Alert severity="success">This is a success message!</Alert> */}
        </div>
      );
}
 
}

export default DemoAlertas;