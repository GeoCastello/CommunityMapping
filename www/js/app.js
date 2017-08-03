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

<<<<<<< HEAD
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });
googleSat.addTo(map)
=======
var Esri_WorldImagery = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
Esri_WorldImagery.addTo(map)
>>>>>>> 201c569d8035cd7464010f57201a6cb55cdfe571

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

//****************************** INDEX PAGE *****************************************************/
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};

app.initialize();


function yesnoCheck(that) {
  if (that.value == "Other") {
    document.getElementById("other").style.display = "block";
    document.getElementById("OtherLabel").style.display = "block";
  } else {
    document.getElementById("other").style.display = "none";
    document.getElementById("OtherLabel").style.display = "none";
  }
}

function cameraTakePicture() {
  document.getElementById("submit_bttn").style.display = "none";
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
   });

   function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
      document.getElementById("myImage").style.display = "block";
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
}

//****************************** START PAGE *****************************************************/
function sign_in() {
  var $login_form=$('#login_form').addClass('display');
  setTimeout(function() {
    $login_form.addClass('show');
  });

  document.getElementById('button_div').style.display='none';
};

function log_in() {
  user=document.getElementById('username').value;
  password=document.getElementById('password').value;
  if (user!="" && password!="") {
    document.getElementById('start_section').style.display='none';
    document.getElementById('map_section').style.display='block';
  }
  map._onResize();
}

function register() {
  document.getElementById('start_section').style.display='none';
  document.getElementById('regiter_section').style.display='block';
  document.getElementById('firstname').value="";
  document.getElementById('lastname').value="";
  document.getElementById('studentnumber').value="";
  document.getElementById('passwordregister').value="";
}

function register_done() {
  first_name=document.getElementById('firstname').value;
  second_name=document.getElementById('lastname').value;
  student_number=document.getElementById('studentnumber').value;
  password=document.getElementById('passwordregister').value;
  if (first_name!="" && second_name!="" && student_number!="" && password!="") {
    document.getElementById('regiter_section').style.display='none';
    document.getElementById('start_section').style.display='block';
  }
}

function back_bttn() {
  document.getElementById('regiter_section').style.display='none';
  document.getElementById('start_section').style.display='block';
}

function submit_element() {
  type_element=document.getElementById('typeelement').value;
  if (type_element!="") {
    document.getElementById('map_section').style.display='block';

    map.removeLayer(marker);
  }
  x=0;
}


//****************************** LOCATION SELECTION *********************************************/
x = 0;
 function select_location(){
  	var popup = document.createElement('div');
    popup.className = 'locationsetting';
    popup.id = 'locationsetting';

    var message1 = document.createElement('div');
    message1.innerHTML = "GPS";
    message1.className = 'GPS';
    message1.id = 'GPS';
    message1.onclick = function GPScoordinates(){
                var longitude_pre;
                var latitude_pre;
                var accuracy_pre;

                var accuracy_div = document.createElement('div');
                accuracy_div.className = 'locationsetting';
                accuracy_div.id = 'acc_div';
                var accuracy_p = document.createElement('div');
                accuracy_p.className = 'acc_p';
                accuracy_p.id = 'acc_p';

                var accuracy_button = document.createElement('div');
                accuracy_button.className = 'acc_bttn';
                accuracy_button.id = 'acc_bttn';
                accuracy_button.innerHTML = "CAPTURE";
                accuracy_button.onclick = function confirmCoordinates(){
                  var today=new Date();
                  var dd=today.getDate();
                  var mm=today.getMonth()+1;
                  var yyyy=today.getFullYear();
                  var hh=today.getHours();
                  var min=today.getMinutes();
                  if(dd<10) {
                    dd='0'+dd;
                  };
                  if(mm<10) {
                    mm='0'+mm;
                  };
                  if(hh<10) {
                    hh='0'+hh;
                  };
                  if(min<10) {
                    min='0'+min;
                  };
                  var today_date=dd+'/'+mm+'/'+yyyy;
                  var today_time=hh+':'+min;
                  document.getElementById('date').value=today_date;
                  document.getElementById('time').value=today_time;
                  document.getElementById('usernamecapture').value=user;
                  longitude=longitude_pre;
                  latitude=latitude_pre;
                  document.getElementById('map_section').style.display='none';
                  document.getElementById('capturing_section').style.display='block';
                  popup.parentNode.removeChild(accuracy_div);
                };

                document.getElementById('map_section').appendChild(accuracy_div);
                document.getElementById('acc_div').appendChild(accuracy_p);
                document.getElementById('acc_div').appendChild(accuracy_button);
                document.getElementById('acc_bttn').style.display='none';
                document.getElementById('capturing_section').style.display='block';

                document.getElementById('acc_p').innerHTML='Wait for accuracy';

                function watchPosition() {
                  var options = {
                    enableHighAccuracy: true,
                    maximumAge: 3600000,
                    enableHighAccuracy: true,
                  };

                  var watchID=navigator.geolocation.watchPosition(geolocation, onError, options);

                  function geolocation(position) {
                    longitude_pre=position.coords.longitude;
                    latitude_pre=position.coords.latitude;
                    accuracy_pre=position.coords.accuracy;
                    setMarker(latitude_pre, longitude_pre);
                    document.getElementById('acc_p').innerHTML='Accuracy: '+accuracy_pre+' m'
                    document.getElementById('acc_bttn').style.display='block';
                  };

                  function onError(error) {
                    alert('code: '+error.code+'\n'+'message: '+error.message+'\n');
                  }
                };



                var geolocate=setInterval(watchPosition, 5000);

                if (accuracy_pre<=5){
                  clearInterval(geolocate);
                  longitude=longitude_pre;
                  latitude=latitude_pre;
                  setMarker(latitude,longitude);
                };
								popup.parentNode.removeChild(popup);
						};

    var message2 = document.createElement('div');
    message2.innerHTML = "Manual Selection";
    message2.className = 'manual';
    message2.id = 'manual';
   	message2.onclick = function manualSelection(){
								//alert("I am an alert box!");
								map.on('click', onMapClick);
								popup.parentNode.removeChild(popup);
                var today=new Date();
                var dd=today.getDate();
                var mm=today.getMonth()+1;
                var yyyy=today.getFullYear();
                var hh=today.getHours();
                var min=today.getMinutes();
                if(dd<10) {
                  dd='0'+dd;
                };
                if(mm<10) {
                  mm='0'+mm;
                };
                if(hh<10) {
                  hh='0'+hh;
                };
                if(min<10) {
                  min='0'+min;
                };
                var today_date=dd+'/'+mm+'/'+yyyy;
                var today_time=hh+':'+min;
                document.getElementById('date').value=today_date;
                document.getElementById('time').value=today_time;
                document.getElementById('usernamecapture').value=user;
						};

    popup.appendChild(message1);
    popup.appendChild(message2);
    document.body.appendChild(popup);
}

function onMapClick(e) {
  document.getElementById('myImage').style.display="none";
  latitude= e.latlng.lat;
  longitude= e.latlng.lng;
  x++;
  if (x <=1) {
    myIcon = L.icon({
  	iconUrl: 'img/capturewhite.svg',
  	iconSize: [20, 20]
  });

  var popup = document.createElement('div');
  popup.className = 'locationsetting';
  popup.id = 'digitalizeoptions';

  var message1 = document.createElement('div');
  message1.innerHTML = "SUBMIT";
  message1.className = 'GPS';
  message1.id = 'GPS';
  message1.onclick = function showCapturingForm(){
              document.getElementById('map_section').style.display='none';
              document.getElementById('capturing_section').style.display='block';
              popup.parentNode.removeChild(popup);
              x++;
          };

  var message2 = document.createElement('div');
  message2.innerHTML = "DELETE";
  message2.className = 'manual';
  message2.id = 'manual';
  message2.onclick = function removeMarker(){
              //alert("I am an alert box!");
              map.removeLayer(marker);
              popup.parentNode.removeChild(popup);
              x=0;
          };

  popup.appendChild(message1);
  popup.appendChild(message2);
  document.body.appendChild(popup);

  marker=L.marker([latitude, longitude],{icon: myIcon}).bindPopup(popup).addTo(map);
  }
}

function setMarker(latitude_input, longitude_input) {
	latitude= latitude_input;
	longitude= longitude_input;

	myIcon = L.icon({
		iconUrl: 'img/capturewhite.svg',
		iconSize: [20, 20]
	});


	marker=L.marker([latitude, longitude],{icon: myIcon}).addTo(map);

  map.setView([latitude, longitude], 19);
}

//************************************ SIDE MENU ***********************************/
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "230px";
    //document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}
