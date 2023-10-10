# leaflet-challenge
Module 15 Challenge for UM Bootcamp

## Part 1: Create the Earthquake Visualization
In Part 1: I got the data from the USGS GeoJSON Feed (http://earthquake.usgs.gov/earthquakes.feed/v1.0/geojson.php) and pulled it into my JavaScript file for visualization.

I used Leaflet to create a map that plotted all of the earthquake dataset from the "All Day" data based on their longitude and latitude.  The markers were st up to reflect the magnitude of the earthquake by their size and the depth of the earthquake.  Earthquakes with with greater depths are displayed in a darker shade of red.  There are alos popups that provide the Earthquake Name, Magnitude, Location and Depth of the earthquake when clicked on.

![Earthquake Popup Image](static/Popup.png)