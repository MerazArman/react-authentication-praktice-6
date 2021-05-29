import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FcGoogle } from 'react-icons/fc';
import './LoginForm.css';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
  }));

const LoginForm = () => {
    const classes = useStyles();

    //  -----------------------------------firebase authentication start now---------------------------------



    return (
        <div>
            
            <form className={classes.root} id="form-box" noValidate autoComplete="off">
              
                <TextField id="standard-basic" label="First Name" />
                <br />
                <TextField id="standard-basic" label="Last Name" />
                <br />
                <TextField id="standard-basic" label="Username or Email" />
                <br />
                <TextField id="standard-basic" label="Password" />
                <br />
                <TextField id="standard-basic" label="Confirm Password" />
                <br />
                {/* <button>Create an account</button> */}
                <input type="submit" value="Create an account" className="btn-style" />
                <p><small> already have an account ? </small> <a href=""> Login</a> </p>
             </form>
                    <p className="or-style">or</p>
                <button className="fb-account"> <FacebookIcon color="primary" className="fb-icon" fontSize="large" ></FacebookIcon> Continue with Facebook</button>
                <button className="google-account"> <FcGoogle className="fb-icon" fontSize="large" ></FcGoogle> Continue with Google</button>
        </div>
    );
};

export default LoginForm;