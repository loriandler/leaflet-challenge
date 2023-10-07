// Part 1: Create the Earthquake Visualization

// Visualize an earthquake dataset

let myMap = L.map('map', {
  // Center the map at [latitude, longitude] and set zoom level
  center: [0, 0],
  zoom: 2
  });


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

let baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(baseURL).then(function(response) {
  let earthquakes = response.features;

  earthquakes.forEach(function(earthquake) {
    if (earthquake.geometry && earthquake.geometry.coordinates) {
      let magnitude = earthquake.properties.mag;
      let depth = earthquake.geometry.coordinates[2];
      let volcanoName = earthquake.properties.title;
      let location = earthquake.properties.place;

      let markerSize = magnitude * 3;
      let colorScheme = ["#fdae61", "#fee08b", "#d73027"];

      function getColor(depth) {
        let deptThresholds = [100, 300, 500];
        for (let i = 0; i < deptThresholds.length; i++) {
          if (depth <= deptThresholds[i]) {
            return colorScheme[i];
          }
        }
        return colorScheme[colorScheme.length - 1];
      }
      

      let marker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
        radius: markerSize,
        color: getColor(depth),
        fillColor: getColor(depth),
        fillOpacity: 0.8,
      }).addTo(myMap);
   
    marker.bindPopup(`<div style="font-size: 16px; font-weight: bold;">${volcanoName}</div><hr><div>${location}</div>`);
    }
  });
});

// Function to get color based on depth
function getColor(depth) {
  let maxDepth = 700; // Maximum depth for color scale
  let hue = (1 - depth / maxDepth) * 120;
  return 'hsl(' + hue + ', 100%, 50%)';
}

function createLegend() {
  let legend = L.control({ position: "bottomright"});

  legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'legend');
    let deptThresholds = [100, 300, 500];
    let labels = ["< 100km", "100 - 300km", "300 - 500km", "> 500km"];
    let colorScheme = ["#fdae61", "#fee08b", "#d73027"];

  for (let i = 0; i < deptThresholds.length; i++) {
    div.innerHTML +=
    '<div class="legend-item">' + 
    '<div class = "legend-color-box" style="background-color:' + colorScheme[i] + '"></div>' +
    labels[i] +
    '</div>';
  }
  return div;
};

legend.addTo(myMap);
}

createLegend();