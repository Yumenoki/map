// @ts-ignore

const destination = {
  lat: 50.861894,  // ← replace this with your target latitude 
  lon: 8.630635  // ← and this with your target longitude
};

let map;
let userMarker;
let distanceLabel;

// Start watching user position
navigator.geolocation.watchPosition((pos) => {
  const userLat = pos.coords.latitude;
  const userLon = pos.coords.longitude;

  // Initialize map once
  if (!map) {
    map = L.map('map').setView([userLat, userLon], 16);

    // Right-click to get coordinates (for development only)
  map.on('contextmenu', function (e) {
  const latlng = e.latlng;
  const coordString = `Lat: ${latlng.lat.toFixed(6)}, Lng: ${latlng.lng.toFixed(6)}`;
  
  // Show a popup at the clicked point
  L.popup()
    .setLatLng(latlng)
    .setContent(coordString + "<br>(Copied to clipboard)")
    .openOn(map);

  // Copy to clipboard
  navigator.clipboard.writeText(`${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`);
});


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add destination marker
    L.marker([destination.lat, destination.lon])
      .addTo(map).bindPopup("Ihr Stellplatz (S15)")
      .openPopup();

    // Polygon Stellplatz
    var polygon = L.polygon([
      [50.861871, 8.630721],
      [50.861932, 8.630624],
      [50.861861, 8.630576]
  ]).addTo(map); 

  // Eigenes Bild als Karte
  var imageUrl = 'https://www.campingplatz-auenland.de/assets/lageplan.jpg',
    imageBounds = [[50.861387, 8.627014], [50.863973, 8.632207]];
L.imageOverlay(imageUrl, imageBounds, {opacity: 0.9}).addTo(map);

   /*  // Add distance display
    distanceLabel = L.control({ position: 'topright' });
    distanceLabel.onAdd = function () {
      this._div = L.DomUtil.create('div', 'distance-label');
      return this._div;
    };
    distanceLabel.addTo(map); */
  }

  // Add/update user marker
  if (userMarker) {
    userMarker.setLatLng([userLat, userLon]);
  } else {
    userMarker = L.marker([userLat, userLon])
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();
  }

  // Center the map on user every time the user's position is updated
  map.setView([userLat, userLon]);

  // Calculate distance to destination
  const distance = map.distance([userLat, userLon], [destination.lat, destination.lon]);

  // Update distance label
  if (distanceLabel && distanceLabel._div) {
    distanceLabel._div.innerHTML = `<strong>Distance:</strong> ${distance.toFixed(1)} meters`;
  }

}, (err) => {
  alert("Geolocation failed. Allow location access and refresh.");
});