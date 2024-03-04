fetch('https://helldivers-2.fly.dev/api/801/planets/1/status', {
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
});

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
        document.getElementById('event-message').textContent = data.message;
        document.getElementById('event-race').textContent = data.race;
        document.getElementById('event-title').textContent = data.title;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});
