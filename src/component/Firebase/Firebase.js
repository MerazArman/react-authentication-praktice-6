import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import FacebookIcon from '@material-ui/icons/Facebook';
import './Firebase.css'

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()



const Firebase = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const  fbProvider = new firebase.auth.FacebookAuthProvider();
    const [user, setUser] = useState({});

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
            <button className="google" onClick={googleSignInHandler}>  <FcGoogle className="" fontSize="large" ></FcGoogle> Sign in with Google</button>
            <h4>Name: {user.displayName} </h4>

            <button className="google" onClick={fbSignInHandler}> <FacebookIcon color="primary" fontSize="large" ></FacebookIcon> Sign in with Facebook</button>
            
        </div>
    );
};

export default Firebase;