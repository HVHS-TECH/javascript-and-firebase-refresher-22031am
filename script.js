var messageSpace = document.getElementById("welcomeMessage");
messageSpace.innerHTML = "You've connected to the JavaScript!";

/**************************
 Main Code
 *************************/

/**********************
 Functions
**********************/

// Function for the "Press me!" button
function pressBtn() {
    var heading = document.getElementById("hChange");
    heading.innerHTML = "You pressed the button!";
}