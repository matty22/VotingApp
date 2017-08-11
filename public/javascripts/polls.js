

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/polls/data', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
          var pollsData = JSON.parse(xhr.responseText);
          pollsData.forEach(function(element) {
            var cardChild = document.createElement("div");
            cardChild.innerHTML = "<h4>" + element.title + "</h4>" + "<a href='/polls/" + element.id + "'><i class='fa fa-check'></i> Vote</a>";
            document.getElementById("mainBody").appendChild(cardChild);
          });
        }
        else {
            alert("You done goofed: " + xhr.status);
        }
    }
    xhr.send();
}