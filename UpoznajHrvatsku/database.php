<?php
	session_start();

	$base=mysqli_connect("localhost", "root", "root","upoznajhrvatsku") or die ("Error"); 
	mysqli_set_charset($base, "utf8");
?>