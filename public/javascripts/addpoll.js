
function addPollAnswer() {
  let optionsLength = document.forms[0].length - 2;
  if (optionsLength < 12) {
    let index = "answer" + optionsLength;
    let optionChild = document.createElement("input");
    optionChild.setAttribute("type", "text");
    optionChild.setAttribute("placeholder", "Enter poll answer")
    optionChild.setAttribute("id", index)
    document.getElementById("answer2").after(optionChild);
  } else {
    document.getElementById("addOptionButton").disabled = true;
  }
}


// Function that takes newly created polls on addpoll.html page and sends to Express POST route
function pollCreated() {
  
  let formObj = {
    _id: "",
    title: "",
    answers: []
  }

  formObj.title = document.getElementById('pollQuestionField').value;
  document.querySelectorAll('[id^=answer]').forEach(function(element) {
    formObj.answers.push({"label": element.value, "votes": 0})
  });

  // Setup data object to send to Express route
  var json = JSON.stringify(formObj);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://votetastic-votingmachine.herokuapp.com/polls/add/data', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function() {
      if (xhr.status === 200) {
        let redirectURL = JSON.parse(xhr.responseText);
        window.location = redirectURL.redirect;
      }
      else {
          console.error("you suck: addpoll.js page");
      }
  }
  xhr.send(json);
}