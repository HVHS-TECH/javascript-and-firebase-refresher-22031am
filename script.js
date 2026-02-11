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
    var input = document.getElementById("userText").value; //get the user input
    heading.innerHTML = input; //updates the heading with the typed text 
}