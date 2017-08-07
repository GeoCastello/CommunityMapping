<?php
	session_start();
	$host        = "host=41.185.27.219";
	$port        = "port=5432";
	$dbname      = "dbname=devgroup1";
	$credentials = "user=devgroup1 password=F48WcegVb8c5aVf6";
	$db = pg_connect("$host $port $dbname $credentials");

	echo db;

	if($db){
	$varlat = pg_escape_string($_POST['latitude']);
	$varlng = pg_escape_string($_POST['longitude']);
	$type = pg_escape_string($_POST['typeelement']);
	$date = pg_escape_string($_POST['date']);
	$time = pg_escape_string($_POST['time']);
	$other = pg_escape_string($_POST['other']);
	$username = pg_escape_string($_POST['username']);
	$description = pg_escape_string($_POST['description']);

	/*IF (@type = 'Other') then @type = '$other' else '$type'

	$query1 = "INSERT INTO registered_items(type, date, time, username, description, picture, geom)
	Select case when @type = 'Other' then @type = '$other' else '$type' , '$date', '$time', '$username', '$description', '$picture', ST_GeomFromText('POINT($varlat $varlng)', 4326)";
*/


	$query1 = "INSERT INTO registered_items(type, date, time, username, description, geom) VALUES ('$type', '$date', '$time', '$username', '$description', ST_GeomFromText('POINT($varlng $varlat)', 4326))";
	//$query1 = "INSERT INTO registered_items(type, date, time, username, description, picture, geom)VALUES ('type', 'test3', 'test2', 'test2', 'test2', 'test2', ST_GeomFromText('POINT(20 20)',4326))";
	$result = pg_query($query1);}
	echo $query1;
  if (!$result) {
  		$errormessage = pg_last_error();
		echo $errormessage;
      //echo $query1;

      exit();
  }
  printf ("This point was inserted into the database");
  pg_close();
	header("Location: index.html");
	exit;
?>
