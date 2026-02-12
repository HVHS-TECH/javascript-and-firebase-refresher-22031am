/**************************************************************/
// main.mjs
// Main entry for index.html in 13COMP
// Written by Aditi Modi, Term 1 2026 
/**************************************************************/

const COL_C = 'white';	   	
const COL_B = '#CD7F32';	
console.log('%c main.mjs', 
    'color: blue; background-color: white;');


/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module

import {fb_initialise, fb_authenticate, fb_detectLogin, fb_writerecord } from './fb_io.mjs';

/**************************************************************/
// Initialise Firebase
/**************************************************************/
fb_initialise();

/**************************************************************/
// Expose the  Firebase functions to the HTML buttons
/**************************************************************/
window.fb_authenticate = fb_authenticate;
window.fb_detectLogin  = fb_detectLogin;
window.fb_writerecord = fb_writerecord;

/**************************************************************/
// JavaScript button function
// Changes the heading to whatever the user types in the text box
/**************************************************************/
window.pressBtn = function() {
    console.log("pressBtn clicked");

    const text = document.getElementById("userText").value;

    document.getElementById("hChange").innerText = text;
};

/**************************************************************/
//   END OF CODE
/**************************************************************/
