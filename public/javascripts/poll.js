

var singlePollData;
window.onload = function() {
    // Peel off the last part of the URI path to find the poll id
    let pollNumber = window.location.pathname.split("/").pop();
    var actionPath = "/polls/" + pollNumber + "/data";
    document.getElementById("pollOptionsForm").setAttribute("action", actionPath);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/polls/' + pollNumber + '/data', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
          singlePollData = JSON.parse(xhr.responseText);
        //   console.log(singlePollData);
          if (singlePollData) {
            // Insert elements to the DOM
            document.getElementById('pollTitle').innerHTML = singlePollData.title;
            singlePollData.answers.forEach(function(element) {
                // Create input for each poll option
                var inputChild = document.createElement("input");
                inputChild.setAttribute("type", "radio");
                inputChild.setAttribute("value", element.label);
                inputChild.setAttribute("id", element.label);
                inputChild.setAttribute("name", "pollOption");
                
                // Create and label for each input
                var labelChild = document.createElement("label");
                labelChild.setAttribute("for", element.label)
                labelChild.innerHTML = element.label;
                
                // Create span element to wrap each set of 
                // input and labels for flexbox layout purposes
                var spanChild = document.createElement("span");
                spanChild.setAttribute("id", element.label);
                
                // Append all these new elements to DOM
                document.getElementById("pollOptionsForm").appendChild(spanChild);
                document.getElementById(element.label).appendChild(inputChild);
                document.getElementById(element.label).appendChild(labelChild);
            });
            
            // Create and append form submit button
            var submitButton = document.createElement("input");
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("form", "pollOptionsForm");
            submitButton.setAttribute("value", "Submit Vote");
            submitButton.setAttribute("onclick", "userVoted()")
            submitButton.innerHTML = "<i class='fa fa-check'></i> Submit Vote";
            document.getElementById("pollOptionsForm").appendChild(submitButton);
            
            // Restructure Mongo document to work with ChartJS
            let chartDataObj = {
                labels: [],
                data: []
            }
           
             singlePollData.answers.forEach(function(element){
                chartDataObj.labels.push(element.label);
                chartDataObj.data.push(element.votes);
            });

            // ChartJS code
            var ctx = document.getElementById("myChart");
              var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  // FIX HERE
                  data: {
                      labels: chartDataObj.labels,
                      datasets: [{
                            data: chartDataObj.data,
                            backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]
                        }]
                  }
                }
              );
          }
          // If there is no poll with the ID from the path
          else {
              document.getElementById("mainBody").innerHTML = "No poll with that ID"
          }
        }
        // If XHR call is not successful
        else {
            alert("You done goofed: " + xhr.status);
        }
    }
    xhr.send();
}

// Function that takes user votes on /polls/:id page and sends to Express put route
function userVoted() {
    let pollNumber = window.location.pathname.split("/").pop();
    for (let i = 0; i <= document.forms[0].length - 1; i++) {
        if (document.forms[0][i].checked) {
            var userVoteIndex = i;
            singlePollData.answers[i].votes++;
            
            // Setup data object to send to Express route
            var json = JSON.stringify(singlePollData);

            var xhr = new XMLHttpRequest();
            xhr.open('PUT', 'http://localhost:3000/polls/' + pollNumber + '/data', true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // Figure out how to add poll data to mongo data
                    console.log(JSON.parse(xhr.responseText));
                }
                else {
                    console.error("you suck: poll.js page");
                }
            }
            xhr.send(json);
        }
    }
}




// Example data set for Mongo
// [
    // {"_id":0,"title":"What is your favorite Nic Cage movie?", "data": {"labels": ["The Rock", "Ghost Rider", "Gone in 60 Seconds", "Con-Air", "The Weatherman", "National Treasure", "National Treasure 2", "Bad Lieutenant"], "datasets": [{"data": [5, 8, 12, 14, 2, 1, 7, 15], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":1,"title":"Star Wars or Star Trek?", "data": {"labels": ["Star Wars", "Star Trek"], "datasets": [{"data": [10, 1], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":2,"title":"Pepsi or Coke?", "data": {"labels": ["Pepsi", "Coke"], "datasets": [{"data": [6, 3], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":3,"title":"What is the best type of pet?", "data": {"labels": ["Dogs", "Cats", "Cheetahs"], "datasets": [{"data": [4, 6, 8], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":4,"title":"East or West Coast?", "data": {"labels": ["East Coast", "West Coast"], "datasets": [{"data": [8, 6], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":5,"title":"What brand car do you own?", "data": {"labels": ["Ford", "Toyota", "Kia"], "datasets": [{"data": [10, 1, 4], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":6,"title":"Which Chingu Cohort are you a member of?", "data": {"labels": ["Red Pandas", "Raccoons", "Rhinos", "Antelopes"], "datasets": [{"data": [10, 1, 12, 4], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":7,"title":"If you could be any animal, what would you be?", "data": {"labels": ["Penguin", "Shark", "Lion", "Bear", "Dog"], "datasets": [{"data": [3, 1, 4, 5, 2], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":8,"title":"How much wood could a woodchuck chuck...", "data": {"labels": ["I'm confused", "A lot of wood", "Not much wood"], "datasets": [{"data": [6, 2, 4], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}},
    // {"_id":9,"title":"What is the best cookie?", "data": {"labels": ["Chocolate Chip", "Oatmeal Raisin", "Sugar"], "datasets": [{"data": [6, 5, 4], backgroundColor: ["#9c27b0", "#ff5722", "#795548", "#2196f3", "#e91e63", "#607d8b", "#4caf50", "#f44336", "#cddc39", "#ffeb3b", "#00bcd4", "#9e9e9e"]}]}}
// ]

// Example flatten data object for Mongo
// {"_id":0, "title":"What is your favourite Nic Cage movie?","answers":[{"label":"The Rock","votes": 5},{"label":"Ghost Rider","votes": 8},{"label":"Con-Air","votes": 14},{"label":"Gone in 60 Seconds","votes": 12},{"label":"The Weatherman","votes": 3},{"label":"National Treasure","votes": 19},{"label":"National Treasure 2","votes": 7},{"label":"Bad Lieutenant","votes": 2}]},
// {"_id":1, "title":"Star Wars or Star Trek?", "answers": [{"label": "Star Wars", "votes": 10}, {"label": "Star Trek", "votes": 1}]},
// {"_id":2, "title":"Pepsi or Coke?", "answers": [{"label": "Pepsi", "votes": 6}, {"label": "Coke", "votes": 3}]},
// {"_id":3, "title":"What is the best type of pet?", "answers": [{"label": "Dogs", "votes": 4}, {"label": "Cats", "votes": 6}, {"label": "Cheetahs", "votes": 8}]},
// {"_id":4, "title":"East or West Coast?", "answers": [{"label": "East Coast", "votes": 8}, {"label": "West Coast", "votes": 6}]},
// {"_id":5, "title":"What brand car do you own?", "answers": [{"label": "Ford", "votes": 10}, {"label": "Toyota", "votes": 1}, {"label": "Kia", "votes": 4}]},
// {"_id":6, "title":"Which Chingu Cohort are you a member of?", "answers": [{"label": "Red Pandas", "votes": 10}, {"label": "Raccoons", "votes": 1}, {"label": "Rhinos", "votes": 12}, {"label": "Antelopes", "votes": 4}]},
// {"_id":7, "title":"If you could be any animal, what would you be?", "answers": [{"label": "Penguin", "votes": 3}, {"label": "Shark", "votes": 1}, {"label": "Lion", "votes": 4}, {"label": "Bear", "votes": 5}, {"label": "Dog", "votes": 2}]},
// {"_id":8, "title":"How much wood could a woodchuck chuck...", "answers": [{"label": "I'm confused", "votes": 6}, {"label": "A lot of wood", "votes": 2}, {"label": "Not much wood", "votes": 4}]},
// {"_id":9, "title":"What is the best cookie?", "answers": [{"label": "Chocolate Chip", "votes": 6}, {"label": "Oatmeal Raisin", "votes": 5}, {"label": "Sugar", "votes": 4}]}