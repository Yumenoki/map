// @ts-ignore
const DEBUG = true;
/* const destination = {
  lat: 50.861894,  // ← replace this with your target latitude 
  lon: 8.630635  // ← and this with your target longitude
}; */


let map;
let userMarker;
let distanceLabel;

// Start watching user position 
navigator.geolocation.watchPosition((pos) => {
  const userLat = pos.coords.latitude;
  const userLon = pos.coords.longitude;
  const imageBounds = [[50.861387, 8.627014], [50.863973, 8.632207]];


  // Initialize map once
  if (!map) {
    map = L.map('map').setView([userLat, userLon], 18);

  // Map Settings
    const expandedBounds = [
      [imageBounds[0][0] - 0.001, imageBounds[0][1] - 0.001],
      [imageBounds[1][0] + 0.001, imageBounds[1][1] + 0.001]
    ];
    map.setMaxBounds(expandedBounds);
    map.options.maxBoundsViscosity = 1.0; // snap back when user drags outside

    // DEBUG: Right-click to get coordinates
    if (DEBUG){
  map.on('contextmenu', function (e) {
  const latlng = e.latlng;
  const coordString = `Lat: ${latlng.lat.toFixed(6)}, Lng: ${latlng.lng.toFixed(6)}`;
  //50.862474, 8.629954
  
  // Show a popup at the clicked point
  L.popup()
    .setLatLng(latlng)
    .setContent(coordString + "<br>(Copied to clipboard)")
    .openOn(map);

  // Copy to clipboard
  navigator.clipboard.writeText(`${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`);
});
  }

  { // Custom URLs 
    // zB http://127.0.0.1:5500/index.html?destLat=50.861894&destLng=8.630635&label=S15
    // Helper: Parse URL params
  function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
    }
  
    // Read destination info from URL
    const destLat = parseFloat(getUrlParam('destLat'));
    const destLng = parseFloat(getUrlParam('destLng'));
    const label = getUrlParam('label') || 'Destination';
  
    if (!isNaN(destLat) && !isNaN(destLng)) {
    const destinationMarker = L.marker([destLat, destLng]).addTo(map);
    destinationMarker.bindPopup(decodeURIComponent(label)).openPopup();
    
    // Optional: zoom to destination
    //map.setView([destLat, destLng], 18);
  }}
  
    // TILE LAYER (leer, BG weiß)
    L.tileLayer(''
       , {bounds: imageBounds, noWrap: true, minZoom: 16, maxZoom: 22 }
    ).addTo(map);
    
    // "Ihr Stellplatz" Marker
    /* L.marker([destination.lat, destination.lon])
      .addTo(map).bindPopup("Ihr Stellplatz (S15)")
      .openPopup(); */

  // ALLE STELLPLÄTZE (Gruppiert)
  const slotsZone = L.featureGroup();
{// Polygons: Stellplätze
  
  var s1 = L.polygon([
    [50.862161, 8.629875],
    [50.862132, 8.630013],
    [50.862079, 8.629986],
    [50.862104, 8.629851]
  ]).addTo(slotsZone);

  var s2 = L.polygon([
    [50.862100, 8.629848],
    [50.862074, 8.629983],
    [50.861987, 8.629938],
    [50.862013, 8.629809]
  ]).addTo(slotsZone);

  var s3 = L.polygon([
    [50.862007, 8.629805],
    [50.861981, 8.629936],
    [50.861901, 8.629899],
    [50.861927, 8.629773]
  ]).addTo(slotsZone);

  var s4 = L.polygon([
    [50.862265, 8.629747],
    [50.862243, 8.629813],
    [50.862175, 8.629838],
    [50.862198, 8.629717]
  ]).addTo(slotsZone);

  var s5 = L.polygon([
    [50.862309, 8.629624],
    [50.862269, 8.629738],
    [50.862200, 8.629710],
    [50.862225, 8.629577]
  ]).addTo(slotsZone);

  var s6 = L.polygon([
    [50.862153, 8.630026],
    [50.862130, 8.630088],
    [50.862056, 8.630109],
    [50.862078, 8.629990]
  ]).addTo(slotsZone);

  var s7 = L.polygon([
    [50.862088, 8.630234],
    [50.862055, 8.630358],
    [50.862011, 8.630323],
    [50.862023, 8.630209]
  ]).addTo(slotsZone);

  var s8 = L.polygon([
    [50.862071, 8.629989],  
    [50.862050, 8.630107],
    [50.861964, 8.630071],
    [50.861985, 8.629949]
  ]).addTo(slotsZone);

  var s9 = L.polygon([
    [50.861979, 8.629945],  
    [50.861956, 8.630067],
    [50.861877, 8.630029],
    [50.861900, 8.629906]
  ]).addTo(slotsZone);

  var s10 = L.polygon([
    [50.861920, 8.629774],  
    [50.861872, 8.630026],
    [50.861840, 8.629965],
    [50.861839, 8.629869],
    [50.861870, 8.629797]
  ], {smoothFactor : 1.5}).addTo(slotsZone);

  var s11 = L.rectangle([
    [50.861826, 8.630099],  
    [50.861751, 8.630236]   
  ]).addTo(slotsZone);

  var s12 = L.rectangle([
    [50.861822, 8.630245],  
    [50.861754, 8.630382]   
  ]).addTo(slotsZone);

  var s13 = L.rectangle([
    [50.861821, 8.630387],   
    [50.861754, 8.630536]
  ]).addTo(slotsZone);

  var s14 = L.rectangle([
    [50.861821, 8.630543],   
    [50.861755, 8.630693]
  ]).addTo(slotsZone);

  var s15 = L.polygon([
    [50.861871, 8.630721],
    [50.861932, 8.630624],
    [50.861861, 8.630576]
  ]).addTo(slotsZone);

  var s16 = L.polygon([
    [50.861988, 8.630274],
    [50.861972, 8.630417],
    [50.861908, 8.630398],
    [50.861924, 8.630259]
  ]).addTo(slotsZone);}

  // Stellplätze Style ( + zur Map adden)
  slotsZone.setStyle({
    color: 'yellow',
    fillColor: 'yellow',
    fillOpacity: 0.2,
    weight: 1
  }).addTo(map);

  // FACILITIES (Gruppiert)
  const facilityZone = L.layerGroup();
  {// Polygons: Facilities
    var sani = L.polygon([
      [50.862877, 8.628757],
      [50.862855, 8.628851],
      [50.862867, 8.628859],
      [50.862842, 8.628968],
      [50.862832, 8.628964],
      [50.862811, 8.629053],
      [50.862801, 8.629050],
      [50.862796, 8.629070],
      [50.862761, 8.629054],
      [50.862766, 8.629033],
      [50.862742, 8.629018],
      [50.862763, 8.628921],
      [50.862748, 8.628911],
      [50.862774, 8.628806],
      [50.862788, 8.628813],
      [50.862810, 8.628720]
    ]).setStyle({
      color: '#8B0000',
      fillColor: '#8B0000',
      fillOpacity: 0.2,
      weight: 2
    }).addTo(facilityZone);

    var rezi = L.polygon([
      [50.863002, 8.628017],
      [50.862993, 8.628286],
      [50.862897, 8.628279],
      [50.862903, 8.628119],
      [50.862958, 8.628123],
      [50.862963, 8.628018]
    ]).setStyle({
      color: '#FFDB58', 
      fillColor: '#FFDB58', 
      fillOpacity: 0.2,
      weight: 2
    }).addTo(facilityZone);

    rezi.bindPopup(`
      <div style="max-width: 400px; font-family: 'Great Vibes', cursive;">
      <h3 style="font-size: 24px;"><b>Rezeption</b></h3></div>
      <div>
      <p><b>Öffnungszeiten:</b> 9 - 12 Uhr & 15 - 20 Uhr <br> <b>April & Oktober:</b> 9 - 12 Uhr & 15 - 18 Uhr </p>
      <img src="https://www.campingplatz-auenland.de/assets/campingplatz-bilder/zugang-rezeption.jpg" alt="Zugang Rezeption" style="width: 100%; border-radius: 8px;" loading="lazy" />
      </div>
    `);

    sani.bindPopup(`
      <div style="max-width: 400px; font-family: 'Great Vibes', cursive;">
      <h3 style="font-size: 24px;"><b>Sanitärgebäude</b></h3></div>
      <div>
      <p>Moderne Sanitäranlagen, rund um die Uhr geöffnet.<br>Hier können Sie gratis duschen, Chemietoiletten entleeren sowie Waschmaschine/Trockner nutzen (3,50 € je 2h).<br> Schlüssel zum barrierefreien Familien-Sanitärraum in der Rezeption erhältlich.</p>
      <img src="https://www.campingplatz-auenland.de/assets/campingplatz-bilder/anlage.jpg" alt="Sanitäranlage" style="width: 100%; border-radius: 8px;" loading="lazy" />
      </div>
    `);

    // Add Google Font dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    var bistro = L.polygon([
      [50.863015, 8.627712],
      [50.863003, 8.628013],
      [50.862963, 8.628014],
      [50.862966, 8.627952],
      [50.862928, 8.627949],
      [50.862931, 8.627821],
      [50.862943, 8.627822],
      [50.862947, 8.627662],
      [50.862985, 8.627663],
      [50.862985, 8.627710]
    ]).setStyle({
      color: 'green', 
      fillColor: 'green', 
      fillOpacity: 0.2,
      weight: 2
    }).addTo(facilityZone);
  }
  facilityZone.addTo(map);

  // Eigenes Bild als Karte
  var imageUrl = 'https://www.campingplatz-auenland.de/assets/lageplan.jpg';
  L.imageOverlay(imageUrl, imageBounds, {opacity: 0.5}).addTo(map);

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

  // !DEBUG: Center the map on user every time the user's position is updated
  if (!DEBUG) {
  map.setView([userLat, userLon]);
  }

  // Calculate distance to destination
  const distance = map.distance([userLat, userLon], [destination.lat, destination.lon]);

  // Update distance label
  if (distanceLabel && distanceLabel._div) {
    distanceLabel._div.innerHTML = `<strong>Distance:</strong> ${distance.toFixed(1)} meters`;
  }

}, (err) => {
  alert("Geolocation failed. Allow location access and refresh.");
});