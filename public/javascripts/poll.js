


window.onload = function() {
    const pollNumber = window.location.pathname.split("/").pop();
    console.log(pollNumber);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/polls/' + pollNumber + '/data', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
          var singlePollData = JSON.parse(xhr.responseText);
          console.log(singlePollData);
          if (singlePollData) {
            document.getElementById("mainBody").innerHTML = JSON.stringify(singlePollData);
          }
          else {
              document.getElementById("mainBody").innerHTML = "No poll with that ID"
          }
        }
        else {
            alert("You done goofed: " + xhr.status);
        }
    }
    xhr.send();
}