// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;

// Create the createMap function.

let queryUrl = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";


d3.json(queryUrl).then(function createMarkers (response) {

  // Create stations variable and hold the station data
  let stations = response.data.stations;

  //bikeMarkers array

  let bikeMarkers = [];

  for(let i=0; i<stations.length; i++) {
      let station = stations[i];
      // For each station create a marker
      let bikeMarker = L.marker([station.lat,station.lon]).bindPopup("<h3>"+station.name+"<h3><h3>"+station.capacity+"</h3>");
      //console.log(bikeMarker);
      bikeMarkers.push(bikeMarker);
  };
    
  let createMap = L.layerGroup(bikeMarkers);

//   // Create the tile layer that will be the background of our map.

//   function createMap(bikeStations) {
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  


// //   // Create a baseMaps object to hold the lightmap layer.

  let baseMaps = {
      "Street map": streetmap,
  };


// //   // Create an overlayMaps object to hold the bikeStations layer.

  let overlayMaps = {
      "bikeStation":createMap,
  };


// //   // Create the map object with options.

  let myMap = L.map("map-id", {
    center: [
      40.73, -74.0059
    ],
    zoom: 12,
    layers: [streetmap, createMap],
  });

  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});

  

