$(document).ready( function() {

// =============================
// ========== LEAFLET ==========
// =============================

// initialize the map on the "map" div with a given center and zoom
map = L.map('mapid', {
  contextmenu: true,
  contextmenuWidth: 140,
  contextmenuItems: [{
      text: 'Show Coordinates',
      callback: showCoordinates
  }]
}).setView([-25.729792, 28.445576], 16);

// load a tile layer
var OpenStreetMap =L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: 'Map data <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 20,
      minZoom: 11
    });
//OpenStreetMap.addTo(map)

var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 20,
        attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
   maxZoom: 20,
     attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
Esri_WorldImagery.addTo(map)

var Social = L.geoJson();



//Load Social GeoJson from Geoserver
var geoJsonUrl ="http://41.185.27.219:8080/geoserver/dev1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dev1:registered_items&outputFormat=text/javascript&format_options=callback:registered_items";

$.ajax({
    jsonp : false,
    url: geoJsonUrl,
    dataType: 'jsonp',
success: handleJson,
    jsonpCallback: 'registered_items',

});

function handleJson(data) {

    L.geoJson(data, {
        onEachFeature: function (feature, my_Layer) {
                my_Layer.bindPopup('<b><center>INFORMATION</b>'+ '<center> Coordinates: ' +feature.geometry.coordinates + '<center> Type: ' +feature.properties.type + '<center> Date: ' + feature.properties.date+ '<center> Time: ' + feature.properties.time + '<center> Description: ' + feature.properties.description + '<center> Picture: ' + feature.properties.picture);
        },
        pointToLayer: function (feature, latlng) {

       return L.circleMarker(latlng, {radius: 5,
                fillColor: "#33DAFF",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 1}
      );
        return L.marker(latlng);
    }
    }).addTo(Social);
}





Social.addTo(map);



map.on('zoomend', function() {
if (map.getZoom() > 15 && map.hasLayer(Social) == false) {

map.addLayer(Social);

}
if (map.getZoom() < 15 && map.hasLayer(Social)) {

map.removeLayer(Social);

}
});

var basemaps = {
    "Street Map" : OpenStreetMap,
    "Grayscale" : OpenStreetMap_BlackAndWhite,
    "Terrain Map" : OpenTopoMap,
    "Satellite Imagery": Esri_WorldImagery
};
var overlaymaps = {

    "Social" : Social,
};

L.control.layers(basemaps, overlaymaps).addTo(map);

L.closePopupOnClick = true;

//This is another backup search function
var searchControl = new L.Control.Search({
    layer: Social,
    propertyName: 'type',
circleLocation: true,
zoom: 19,
textPlaceholder: 'Search by type    ',
    });

    searchControl.on('search_locationfound', function (e) {

        e.layer.setStyle({
        fillColor: '#3f0',
        color: '#0f0'
        });
    if (e.layer._popup) e.layer.openPopup();

    }).on('search_collapsed', function (e) {

        statesLayer.eachLayer(function (layer) { //restore feature color
        statesLayer.resetStyle(layer);
            });
        });

map.addControl(searchControl);





function showCoordinates(e) {
    alert(e.latlng);
}

});
