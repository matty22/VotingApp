// Function that creates new User object and sends it to Mongo
function login() {
  
  let userObj = {};

  userObj.email = document.getElementById('email').value;
  userObj.password = document.getElementById('password').value;
  userObj.pollsCreated = [null];


  // Setup data object to send to Express route
  var json = JSON.stringify(userObj);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/users/login/data', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function() {
      if (xhr.status === 200) {
        // let redirectURL = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
      }
      else {
          console.error("you suck: login.js page");
      }
  }
  xhr.send(json);
}