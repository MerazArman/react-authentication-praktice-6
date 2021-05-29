import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FcGoogle } from 'react-icons/fc';
import './EmailLogin.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));


const EmailLogin = () => {
    const classes = useStyles();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const  fbProvider = new firebase.auth.FacebookAuthProvider();
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSign: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    //---------------------------------- email form validation----------------------------------
    const handleEmailValidation = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
            //    console.log(isFormValid);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPasswordNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && isPasswordNumber;
            // console.log(isFormValid);
        }
        if (isFormValid) {
            let userInfo = { ...user }
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo)
        }
    }

    //  -----------------------------------firebase email authentication start now---------------------------------
    const handleSubmitForm = (e) => {
        if (newUser && user.email && user.password) {
            //    console.log(user.email, user.password);
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then(result => {
                    console.log(result);
                    let successShow = { ...user};
                    successShow.error = '';
                    successShow.success = true;
                    setUser(successShow)
                    updateProfileUser(user.firstName)
                     })
                     
                   .catch((error) => {
                    let errorShow = {...user};
                    errorShow.error = error.message;
                    errorShow.success = false;
                    setUser(errorShow);
                    });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                     .then(result => {
                         console.log(result);
                         let successShow = { ...user};
                         successShow.error = '';
                         successShow.success = true;
                         setUser(successShow)
                      })
                    .catch((error) => {
                        console.log(error.message);
                        let errorShow = {...user};
                        errorShow.error = error.message;
                        errorShow.success = false;
                        setUser(errorShow); 
                     });
        }

        e.preventDefault();
    }

    const updateProfileUser = (name) =>{
         const user = firebase.auth().currentUser;
         user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('update successfully profile');
        }).catch(function(error) {
          console.log(error);
        });
    }

    // ------------------------------------- google sign in button handler ---------------------------
    const googleSignInHandler = () =>{
        console.log('click');
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const users = result.user;
            setUser(users)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // -------------------------------------facebook authentication handler ---------------------------

    const fbSignInHandler = () =>{
        firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            console.log(result);
          var user = result.user;
          console.log(user);
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }

    return (
        <div>

            <form onSubmit={handleSubmitForm} className={classes.root} id="form-box" autoComplete="on">

              { newUser && <TextField onChange={handleEmailValidation}  name="firstName" id="standard-basic" label="First Name" />}
              <br />
              { newUser && <TextField onChange={handleEmailValidation} name ="lastName"  id="standard-basic" label="Last Name" />}
                <br />
                <TextField onChange={handleEmailValidation} name="email" id="standard-basic" label="Username or Email" required />
                <br />
                <TextField onChange={handleEmailValidation} name="password" id="standard-basic" label="Password" required />
                <br />
                {newUser && <TextField onChange={handleEmailValidation}  id="standard-basic" label="Confirm Password" />}
                <br/>
                <h5>{user.success ? <h4> Account {newUser ? "Created" : "Logged in" } Successfully </h4> :user.error} </h5>
                <input type="submit" value={newUser ? "sign up account" : "Login account"} className="btn-style" />
                <p><small>   {newUser ? "Already have an account ?" :  "Don't have an account ?"  }  </small>  <small> <input type="checkbox" name="" id="" onChange={() => setNewUser(!newUser)} />{newUser ? "Login" :  "Create an account"  }  </small>   </p>
                
            </form>
            <p className="or-style">or</p>
            <button className="fb-account" onClick={fbSignInHandler} > <FacebookIcon color="primary" className="fb-icon" fontSize="large" ></FacebookIcon> Continue with Facebook</button>
            <button className="google-account" onClick={googleSignInHandler} > <FcGoogle className="fb-icon" fontSize="large" ></FcGoogle> Continue with Google</button>
        </div>
    );
};

export default EmailLogin;