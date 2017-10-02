<?php
	include 'database.php';
	
	session_destroy();
	unset($_SESSION['user_id']);
	unset($_SESSION['ime']);
	unset($_SESSION['prezime']);
	unset($_SESSION['email']);
	unset($_SESSION['user_name']);
	unset($_SESSION['administraion']);
	echo '<script type="text/javascript">window.location = "location.html"; </script>';
?>