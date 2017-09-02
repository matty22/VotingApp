// Function that creates new User object and sends it to Mongo
function userCreated() {
  
  let userObj = {};

  userObj.email = document.getElementById('email').value;
  userObj.password = document.getElementById('password').value;
  userObj.pollsVoted = [null]; 

  if (userObj.email && userObj.password) {
    // Setup data object to send to Express route
    var json = JSON.stringify(userObj);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://votetastic-votingmachine.herokuapp.com/users/signup/data', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function() {
        if (xhr.status === 200) {
          document.cookie = 'name=validLogin; path=/'
          let redirectURL = JSON.parse(xhr.responseText);
          window.location = redirectURL.redirect;
        }
        else {
            console.error("you suck: signup.js page");
        }
    }
    xhr.send(json);
  } else {
    document.getElementById('invalidLogin').style.display = 'inline-block';
  }


  
}