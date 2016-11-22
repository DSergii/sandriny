<?php

	# db configuration 
	define('DB_HOST', 'localhost');
	define('DB_USER', 'evo2host_stairs');
	define('DB_PASS', '123456$');
	define('DB_NAME', 'evo2host_stairs');
	// print_r($_POST);
	
	
	$limit = 12; #item per page
	$table = 'stairs';
	# db connect
	$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die('Could not connect to MySQL DB ') . mysql_error();
	mysql_select_db(DB_NAME);
	
	$query = "SELECT * FROM stairs limit ".$_POST['start'].",".$_POST['limit']."";
	$res = mysql_query($query) or die('Error querying database.');


	while ($row = mysql_fetch_object($res)) {
	    $data[] = $row;
	}
	echo json_encode($data);

	mysql_close();

?>
