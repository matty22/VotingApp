// Function that creates new User object and sends it to Mongo
function userCreated() {
  
  let userObj = {};

  userObj.email = document.getElementById('email').value;
  userObj.password = document.getElementById('password').value;
  userObj.pollsCreated = [null]; 
  console.log(userObj);


  // Setup data object to send to Express route
  var json = JSON.stringify(userObj);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/users/signup/data', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function() {
      if (xhr.status === 200) {
        let redirectURL = JSON.parse(xhr.responseText);
        window.location = redirectURL.redirect;
      }
      else {
          console.error("you suck: signup.js page");
      }
  }
  xhr.send(json);
}