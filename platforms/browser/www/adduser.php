<?php
	session_start();
	$host        = "host=41.185.27.219";
	$port        = "port=5432";
	$dbname      = "dbname=devgroup1";
	$credentials = "user=devgroup1 password=F48WcegVb8c5aVf6";
	$db = pg_connect("$host $port $dbname $credentials");

	echo db;

	if($db){
	$firstname = pg_escape_string($_POST['firstname']);
	$lastname = pg_escape_string($_POST['lastname']);
	$studentnumber = pg_escape_string($_POST['studentnumber']);
	$passwordregister = pg_escape_string($_POST['passwordregister']);

	/*IF (@type = 'Other') then @type = '$other' else '$type'

	$query1 = "INSERT INTO registered_items(type, date, time, username, description, picture, geom)
	Select case when @type = 'Other' then @type = '$other' else '$type' , '$date', '$time', '$username', '$description', '$picture', ST_GeomFromText('POINT($varlat $varlng)', 4326)";
*/


	$query1 = "INSERT INTO users(firstname, lastname, studentnumber, password) VALUES ('$firstname', '$lastname', '$studentnumber', '$passwordregister')";
	//$query1 = "INSERT INTO registered_items(type, date, time, username, description, picture, geom)VALUES ('type', 'test3', 'test2', 'test2', 'test2', 'test2', ST_GeomFromText('POINT(20 20)',4326))";
	$result = pg_query($query1);}
	echo $query1;
  if (!$result) {
  		$errormessage = pg_last_error();
		echo $errormessage;
      //echo $query1;

      exit();
  }
  printf ("This user was registered into the database");
  pg_close();
	header("Location: index.html");
	exit;
?>
