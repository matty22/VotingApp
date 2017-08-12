


window.onload = function() {
    // Peel off the last part of the URI path to find the poll id
    const pollNumber = window.location.pathname.split("/").pop();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/polls/' + pollNumber + '/data', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
          var singlePollData = JSON.parse(xhr.responseText);
          console.log(singlePollData);
          if (singlePollData) {
            // ChartJS code
            document.getElementById('pollTitle').innerHTML = singlePollData.title;
            var ctx = document.getElementById("myChart");
              var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                      labels: ["Group 1", "Group 2", "Group 3"],
                      datasets: [{
                          data: [12, 19, 3]
                      }]
                  }
              });
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





