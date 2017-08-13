


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
            // ChartJS code
            console.log(singlePollData.data.labels.length);
            document.getElementById('pollTitle').innerHTML = singlePollData.title;
            var ctx = document.getElementById("myChart");
              var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: singlePollData.data,
                  backgroundColor: ["#ff0000", "#00ff00", "#0000ff"]
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
//     {"_id":0,"title":"What is your favorite Nic Cage movie?", "data": {"labels": ["The Rock", "Ghost Rider", "Gone in 60 Seconds"], "datasets": [{"data": [5, 8, 12]}]}},
//     {"_id":1,"title":"Star Wars or Star Trek?", "data": {"labels": ["Star Wars", "Star Trek"], "datasets": [{"data": [10, 1]}]}},
//     {"_id":2,"title":"Pepsi or Coke?", "data": {"labels": ["Pepsi", "Coke"], "datasets": [{"data": [6, 3]}]}},
//     {"_id":3,"title":"What is the best type of pet?", "data": {"labels": ["Dogs", "Cats", "Cheetahs"], "datasets": [{"data": [4, 6, 8]}]}},
//     {"_id":4,"title":"East or West Coast?", "data": {"labels": ["East Coast", "West Coast"], "datasets": [{"data": [8, 6]}]}},
//     {"_id":5,"title":"What brand car do you own?", "data": {"labels": ["Ford", "Toyota", "Kia"], "datasets": [{"data": [10, 1, 4]}]}},
//     {"_id":6,"title":"Which Chingu Cohort are you a member of?", "data": {"labels": ["Red Pandas", "Raccoons", "Rhinos", "Antelopes"], "datasets": [{"data": [10, 1, 12, 4]}]}},
//     {"_id":7,"title":"If you could be any animal, what would you be?", "data": {"labels": ["Penguin", "Shark", "Lion", "Bear", "Dog"], "datasets": [{"data": [3, 1, 4, 5, 2]}]}},
//     {"_id":8,"title":"How much wood could a woodchuck chuck...", "data": {"labels": ["I'm confused", "A lot of wood", "Not much wood"], "datasets": [{"data": [6, 2, 4]}]}},
//     {"_id":9,"title":"What is the best cookie?", "data": {"labels": ["Chocolate Chip", "Oatmeal Raisin", "Sugar"], "datasets": [{"data": [6, 5, 4]}]}}
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