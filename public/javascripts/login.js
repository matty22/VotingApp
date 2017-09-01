// Function that creates new User object and sends it to Mongo
function login() {
  let userObj = {};

  userObj.email = document.getElementById('email').value;
  userObj.password = document.getElementById('password').value;
  userObj.pollsVoted = [null];


  // Setup data object to send to Express route
  var json = JSON.stringify(userObj);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/users/login/data');
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function() {
      if (xhr.status === 200) {
        document.cookie = 'name=validLogin; path=/'
        console.log(xhr.responseText);
        sessionStorage.setItem('user', xhr.responseText)
        // let redirectURL = JSON.parse(xhr.responseText);
        // window.location = redirectURL.redirect;
        window.location = '/polls';
      }
      else {
        document.getElementById('invalidLogin').style.display = 'inline-block';
      }
  }
  xhr.send(json);
}