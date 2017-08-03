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

	//var popup = L.popup()
	//	.setContent('<div class="submit" href= "capturing_form.html">Submit</div><br><div type="button" class="marker-delete-button">Delete</div>') //fix the link


	marker=L.marker([latitude, longitude],{icon: myIcon}).bindPopup(popup).addTo(map);
}

else if (x > 1) {
	//alert ("Warning! You can only drop one pin at a time.");

}
}

function setMarker(latitude_input, longitude_input) {
	latitude= latitude_input;
	longitude= longitude_input;

	myIcon = L.icon({
		iconUrl: 'img/capturewhite.svg',
		iconSize: [20, 20]
	});

	//var popup = L.popup()
	//	.setContent('<div class="submit" href= "capturing_form.html">Submit</div><br><div type="button" class="marker-delete-button">Delete</div>') //fix the link


	marker=L.marker([latitude, longitude],{icon: myIcon}).addTo(map);

  map.setView([latitude, longitude], 19);

}
