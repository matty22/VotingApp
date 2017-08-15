


window.onload = function() {
    // Peel off the last part of the URI path to find the poll id
    const pollNumber = window.location.pathname.split("/").pop();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/polls/' + pollNumber + '/data', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
          var singlePollData = JSON.parse(xhr.responseText);
        //   console.log(singlePollData);
          if (singlePollData) {
            // Insert elements to the DOM
            document.getElementById('pollTitle').innerHTML = singlePollData.title;
            // NEXT JOB - ADD <OPTION> ELEMENTS TO FORM IN HTML PAGE USING .FOREACH
            // ChartJS code
            var ctx = document.getElementById("myChart");
              var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: singlePollData.data,
                //   backgroundColor: ["#ff0000", "#00ff00", "#0000ff"]
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

// generateColors(singlePollData.data.labels.length)
function generateColors(dataLength) {
    let colorSet = ["#ff0000", "#0000ff", "#00ff00", "#f0f0f0"];
    let selectedColors = [];
    for (let i = 0; i < dataLength; i++) {
        selectedColors.push(colorSet[i]);
    }
    return selectedColors;
}