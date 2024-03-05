
//----------------------------------------------------
// ---------------- searchForPlanet() ------------
//---------------------------------------------------

// This function encapsulates the logic for searching a planet
function searchForPlanet() {
  fetch('json/planets.json')
    .then(response => response.json())
    .then(planets => {
      const planetName = document.getElementById('input-planet-name').value.trim(); // Get the planet name from the input
      let planetId = null;

      // Search through the planets to find the one that matches the entered name
      for (const [key, value] of Object.entries(planets)) {
        if (value.name.toLowerCase() === planetName.toLowerCase()) {
          planetId = key;
          break;
        }
      }

      if (planetId !== null) {
        // Use the planet ID in the fetch URL
        fetch(`https://helldivers-2.fly.dev/api/801/planets/${planetId}/status`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'x-csrf-token': 'Your-Token-Here'
          }
        })
          .then(response => response.json())
          .then(data => {
            // Process and display the data...
            console.log(data);
            displayPlanetData(data, planets[planetId]);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error loading the planets:', error);
    });
}

//----------------------------------------------------
// ---------------- displayPlanetData() ------------
//---------------------------------------------------

function displayPlanetData(data, planetInfo) {
  // Accessing planet-specific data
  const planetData = data.planet;

  // Displaying basic planet data
  document.getElementById('planet-name').textContent = planetData.name || 'Name not available';

  const planetOwnerElement = document.getElementById('planet-owner');
  document.getElementById('planet-owner').textContent = data.owner || 'Owner not available';

   // Set color based on owner
   switch (data.owner.toLowerCase()) {
    case 'terminid':
      planetOwnerElement.style.color = 'orange';
      break;
    case 'automaton':
      planetOwnerElement.style.color = 'red';
      break;
    case 'human':
      planetOwnerElement.style.color = 'blue';
      break;
    default:
      planetOwnerElement.style.color = 'black'; // Default color
  }

  // Displaying additional planet details based on your object structure
  document.getElementById('planet-health').textContent = data.health || 'Health not available';
  document.getElementById('planet-liberation').textContent = data.liberation.toFixed(3) || 'Liberation not available'; // Using toFixed(3) for formatting
  document.getElementById('planet-players').textContent = data.players || 'Players not available';
  document.getElementById('planet-regen').textContent = data.regen_per_second || 'Regeneration per second not available';
  document.getElementById('planet-sector').textContent = planetData.sector || 'Sector not available';

  // Assuming `planet` contains coordinates or similar details you wish to display
  if (planetData.position) {
    document.getElementById('planet-coordinates').textContent = `X: ${planetData.position.x}, Y: ${planetData.position.y}` || 'Coordinates not available';
  } else {
    document.getElementById('planet-coordinates').textContent = 'Coordinates not available';
  }

  // Handling additional information from `planetInfo` (e.g., message and image)
  if (planetInfo) {
    document.getElementById('planet-message').textContent = planetInfo.message || 'Message not available';
    document.getElementById('planet-image').src = planetInfo.image || ''; // Consider providing a default image or handling absence
  } else {
    document.getElementById('planet-message').textContent = 'Planet message not available.';
    document.getElementById('planet-image').src = ''; // Or set to a default image
  }
}

// Ensure this function is called after the document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Attach the searchForPlanet function to the form submit event
  document.getElementById('planet-search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    searchForPlanet();
  });
});




//----------------------------------------------------
// ---------------- getEventData() ------------
//---------------------------------------------------


function getEventData() {
  fetch('https://helldivers-2.fly.dev/api/801/events/latest', {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'x-csrf-token': 'MGBEOTxmJyEnEnMJAQYsLTcpFFAaCgtCCYwpW4rSJBE1g1MfyeGcx3lq'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      document.getElementById('event-message').textContent = data.message.en;
      document.getElementById('event-race').textContent = data.race;
      document.getElementById('event-title').textContent = data.title;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};

// Attach the event listener to the button
document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('fetchEventButton');
  button.addEventListener('click', getEventData);
});