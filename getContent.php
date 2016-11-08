<?php
	include("dbConfig.php");

	$result = mysql_query("SELECT * FROM $tableName");
  	$array = mysql_fetch_row($result);

?>