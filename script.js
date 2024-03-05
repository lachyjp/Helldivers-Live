/* fetch('https://helldivers-2.fly.dev/api/801/planets/153/status', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'x-csrf-token': 'HDcZVRcWSzc8DlY2AyRlOSVjHDMRGGcj1qJcBGzbd60cJk-on6PreZ6O'
  }
})
.then(response => response.json())
.then(data => {
  console.log(data); // Log the data to make sure it's correct
  const planetData = data.planet;

  document.getElementById('planet-owner').textContent = planetData.initial_owner;
  document.getElementById('planet-name').textContent = planetData.name;
  document.getElementById('planet-sector').textContent = planetData.sector;
  document.getElementById('planet-health').textContent = planetData.max_health;
  document.getElementById('planet-liberation').textContent = data.liberation;
  document.getElementById('planet-regen').textContent = data.regen_per_second;
  document.getElementById('planet-players').textContent = data.players;
  document.getElementById('planet-coordinates').textContent = `X: ${planetData.position.x}, Y: ${planetData.position.y}`;
})
.catch(error => {
  console.error('Error:', error);
}); */



// ---------------- GET PLANET

fetch('json/planets.json')
.then(response => response.json())
.then(planets => {

  document.getElementById('planet-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

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
          'x-csrf-token': 'HDcZVRcWSzc8DlY2AyRlOSVjHDMRGGcj1qJcBGzbd60cJk-on6PreZ6O'
        }
      })
      .then(response => response.json())
      // After fetching and processing the planet's data
      .then(data => {
        console.log(data); // Log the data to make sure it's correct
        const planetData = data.planet;

        document.getElementById('planet-owner').textContent = planetData.initial_owner;
        document.getElementById('planet-name').textContent = planetData.name;
        document.getElementById('planet-sector').textContent = planetData.sector;
        document.getElementById('planet-health').textContent = planetData.max_health;
        document.getElementById('planet-liberation').textContent = data.liberation;
        document.getElementById('planet-regen').textContent = data.regen_per_second;
        document.getElementById('planet-players').textContent = data.players;
        document.getElementById('planet-coordinates').textContent = `X: ${planetData.position.x}, Y: ${planetData.position.y}`;
        

        // Additionally, display the message from your planets.json
        // Make sure to check if the planetId was found and planets[planetId] exists to avoid errors
        if (planetId !== null && planets[planetId]) {
          console.log(planets[planetId]);


          const planetMessage = planets[planetId].message; // Access the message property
          document.getElementById('planet-message').textContent = planetMessage; // Set the text content

        } else {
          document.getElementById('planet-message').textContent = 'Planet message not available.'; // Fallback text

        }

        
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
    }
  });
})
.catch(error => {
  console.error('Error loading the planets:', error);
});


// ---------------- GET EVENT

document.addEventListener('DOMContentLoaded', function() {
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
});

fetch('https://helldivers-2.fly.dev/api/801/planets/1/status', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'x-csrf-token': 'HDcZVRcWSzc8DlY2AyRlOSVjHDMRGGcj1qJcBGzbd60cJk-on6PreZ6O'
  }
})