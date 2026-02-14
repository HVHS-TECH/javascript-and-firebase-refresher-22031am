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


import { getDatabase, ref, set, get, update, push} 
from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged }
 from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";



 /**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { 
    fb_initialise, fb_authenticate, fb_detectLogin, fb_writerecord, fb_readrecord, fb_writemessages, fb_readmessages };

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
           //  window.location.href = "select_game.html";
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


/******************************************************/
// fb_writerecord()
// Called by html write record button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_writerecord() {
    console.log('%c fb_writerecord(): ', 
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

       // Get the text typed by the user
    const userText = document.getElementById("userText").value;
    if (!userText) {
        alert("Please type something to save!");
        return;
    }

    // Create object with user info + message to get saved into the database
    const dataToSave = {
        displayName: userDetails.displayName,
        email: userDetails.email,
        photoURL: userDetails.photoURL,
        uid: userDetails.uid,
        message: userText,
    };

    //save it to firebase under the user's UID
    const dbReference= ref(FB_GAMEDB, 'userDetails/' + userDetails.uid);
    set(dbReference, dataToSave).then(() => {
        // Code for a successful write goes here
        console.log('%c fb_writerecord():successful! ', 
            'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    }).catch((error) => {
        // Code for a write error goes here
        console.log(error);
    });
}


/******************************************************/
// fb_readrecord()
// Called by html read record button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_readrecord() {
    console.log('%c fb_readrecord(): ', 
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    
    const dbReference= ref(FB_GAMEDB, 'userDetails/' + userDetails.uid);
    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
        console.log(fb_data);
        
        //making the message from firebase appear on the page
        document.getElementById("hChange").innerText = fb_data.message;
        
        // Code for a successful read goes here
        console.log('%c fb_readrecord(): successful!', 
            'color: ' + COL_C + '; background-color: ' + COL_B + ';');
            
        } else {
            //Code for no record found goes here
            console.log('no record found');
        }
    }).catch((error) => {
        // Code for a read error goes here
        console.log(error);
    });
}

/******************************************************/
// fb_writemessages()
// Saves a new message with username
/******************************************************/

function fb_writemessages() {
    console.log('%c fb_writemessages(): ', 
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        // Get the text typed by the user
    const userText = document.getElementById("userText").value;
    if (!userText) {
        alert("Please type something to save!");
        return;
    }

    //Save each message as a new entry under 'messages'
    const messagesRef = ref(FB_GAMEDB, 'messages');
    push(messagesRef, {
        displayName: userDetails.displayName,
        message: userText,
    }).then(() => {

        // Code for a successful write goes here
        console.log('%c fb_writemessages():successful! ', 
            'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    }).catch((error) => {
        // Code for a write error goes here
        console.log(error);
    });
}

/******************************************************/
// fb_readmessages()
// Displays all new messages from all users
/******************************************************/
function fb_readmessages() {
    console.log('%c fb_readmessages(): ', 
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    
    const messagesRef = ref(FB_GAMEDB, 'messages');
    get(messagesRef).then((snapshot) => {
        const allMessages = snapshot.val();
        if (allMessages != null) {
            console.log(allMessages);

            // Convert all messages into a readable string for the page
            let displayText = '';
            for (let key in allMessages) {
                const msg = allMessages[key];
                displayText += msg.displayName + ': ' + msg.message + ' ';
            }

            // Show all messages on the page
            document.getElementById("hChange").innerText = displayText;

            // Code for a successful read goes here
            console.log('%c fb_readmessages(): successful!', 
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');

        } else {
            console.log('No messages found');
            document.getElementById("hChange").innerText = "No messages found";
        }
    }).catch((error) => {
        // Code for a write error goes here
        console.log(error);
    });
}