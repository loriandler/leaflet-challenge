// Part 1: Create the Earthquake Visualization

// Visualize an earthquake dataset
let baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
});

let earthquakeLayer = L.layerGroup();

let myMap = L.map('map', {
  // Center the map at [latitude, longitude] and set zoom level
  center: [10, 0],
  zoom: 2.25,
  layers: [baseLayer, earthquakeLayer]
});

// bring in the url and json data
let baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(baseURL).then(function(response) {
  let earthquakes = response.features;

  // bring in the variables
  earthquakes.forEach(function(earthquake) {
    if (earthquake.geometry && earthquake.geometry.coordinates) {
      let magnitude = earthquake.properties.mag;
      let depth = earthquake.geometry.coordinates[2];
      let volcanoName = earthquake.properties.title;
      let location = earthquake.properties.place;

      let markerSize = magnitude * 3;
      let colorScheme = ["#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"];
      let color = getColor(depth);

      // loop through the data points
      function getColor(depth) {
        let depthThresholds = [10, 100, 300, 500];
        for (let i = 0; i < depthThresholds.length; i++) {
          if (depth <= depthThresholds[i]) {
            return colorScheme[i];
          }
        }
        return colorScheme[colorScheme.length - 1];
      }
      // create the markers for the earthquake locations
      let marker = L.circleMarker([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
        radius: markerSize,
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
      }).addTo(earthquakeLayer);

      marker.bindPopup(`<div style="font-size: 16px; font-weight: bold;"> ${volcanoName}</div><hr><div><strong>Magnitude:</strong> ${magnitude}<br><strong>Location:</strong> ${location}<br><strong>Depth:</strong> ${depth} km</div>`);
    }
  });
});
// Add layers to the map
let baseLayers = {
  "Base Map": baseLayer
};

let overlays = {
  "Earthquakes": earthquakeLayer
};

L.control.layers(baseLayers, overlays, { position: "topleft" }).addTo(myMap);

// Function to get color based on depth
function getColor(depth) {
  let maxDepth = 700; 
  let hue = (1 - depth / maxDepth) * 120;
  return 'hsl(' + hue + ', 100%, 50%)';
}

// Move the createLegend function definition
function createLegend() {
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'legend');
    let depthThresholds = [10, 100, 300, 500];
    let labels = ["< 10km", "10 - 100km","100 - 300km", "300 - 500km", "> 500km"];
    let colorScheme = ["#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"];

    for (let i = 0; i < depthThresholds.length; i++) {
      div.innerHTML +=
        '<div class="legend-item">' +
        '<div class="legend-color-box" style="background-color:' + colorScheme[i] + '"></div>' +
        labels[i] +
        '</div>';
    }
    return div;
  };

  legend.addTo(myMap);
}

// Call the createLegend function
createLegend();
