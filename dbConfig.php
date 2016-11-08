<?php
	$db_username = 'evo2host_stairs';
	$db_password = '123456$';
	$db_name = 'evo2host_stairs';
	$db_host = 'localhost';
	$item_per_page = 12;

	$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

	print_r($mysqli);
	if ($mysqli->connect_error) {
	    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
	}else {
		$result = mysql_query('SELECT * FROM stairs');
  		//$array = mysql_fetch_row($result);
  		print_r($array);
  		var_dump($array); 
	}

	# db configuration 
	// define('DB_HOST', 'localhost');
	// define('DB_USER', 'evo2host_stairs');
	// define('DB_PASS', '123456$');
	// define('DB_NAME', 'evo2host_stairs');

	/*$limit = 12; #item per page
	$table = 'stairs';
	# db connect
	$link = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die('Could not connect to MySQL DB ') . mysql_error();
	$db = mysql_select_db(DB_NAME, $link);
	print_r($db);*/

	// Create connection
	// $conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
	// // Check connection
	// if ($conn->connect_error) {
	//     die("Connection failed: " . $conn->connect_error);
	// } 

	// $sql = 'SELECT * FROM stairs';
	// mysql_select_db('stairs');
 //   	$retval = mysql_query( $sql, $conn );
	// print_r($retval);
	// var_dump($retval); 
?>