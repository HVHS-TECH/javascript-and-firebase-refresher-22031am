//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by <Your Name Here>, Term 1 2026?
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/

const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
    'color: blue; background-color: white;');

var FB_GAMEDB;
var FB_GAMEAUTH;

// Object to store the logged-in user details
let userDetails = {
    displayName: 'n/a',
    email: 'n/a',
    photoURL: 'n/a',
    uid: 'n/a'
};

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getDatabase, ref, set, get, update } 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

 /**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { 
    fb_initialise, fb_authenticate, fb_detectLogin };

 /******************************************************/
// fb_initialise()
// Called by html initialise button
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ',
                 'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const FB_CONFIG = {
        apiKey: "AIzaSyCmGAc29LiIjN52Sc12aj9cC941yiHcltw",
        authDomain: "aditi-modi-13comp.firebaseapp.com",
        databaseURL: "https://aditi-modi-13comp-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "aditi-modi-13comp",
        storageBucket: "aditi-modi-13comp.firebasestorage.app",
        messagingSenderId: "79496635064",
        appId: "1:79496635064:web:baca19d8822221d61dca4d",
        measurementId: "G-JY6B8L60XL"
    };

    const FB_APP = initializeApp(FB_CONFIG);
    FB_GAMEDB = getDatabase(FB_APP);
    FB_GAMEAUTH = getAuth(FB_APP);

    console.log('Firebase initialised:', FB_GAMEDB); //DIAG
}

/******************************************************/
// fb_login()
// Called by html authenticate button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_authenticate() {
    console.log('%c fb_authenticate(): ', 
       'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();

    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        // Code for a successful authentication goes here
        console.log('%c fb_authenticate():successful! ', 
            'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        userDetails.displayName = result.user.displayName;
        userDetails.email = result.user.email;
        userDetails.photoURL = result.user.photoURL;
        userDetails.uid = result.user.uid;

        console.log(userDetails);
            console.table(userDetails);
        // redirect if needed
             window.location.href = "select_game.html";
        })
        .catch((error) => {
            console.log(error);
        });
    }

/******************************************************/
// fb_detectLogin()
// Called by html detect login change button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/

function fb_detectLogin() {
    console.log('%c fb_detectLogin(): ', 
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    let fb_loginStatus = 'n/a';

    const AUTH = getAuth();
    onAuthStateChanged(AUTH, (user) => {
    if (user) {
    // Code for user logged in goes here
    console.log('%c fb_detectLogin(): logged in', 
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    } else {

    // Code for user logged out goes here
    console.log('%c fb_detectLogin(): logged out', 
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    }
    }, (error) => {
    // Code for an onAuthStateChanged error goes here
    console.log(error);
    });
}