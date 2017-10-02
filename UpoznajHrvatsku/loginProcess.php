<?php

	include 'database.php';

	if(isset($_POST['action']) && $_POST['action']=='login') {
		$username 		= mysqli_real_escape_string($base, $_POST['username']); 
		$password 		= mysqli_real_escape_string($base, md5($_POST['password']));
		
		$result = mysqli_query($base,"SELECT * FROM korisnici WHERE Korisnicko_ime='$username' and Lozinka = '$password'");
		$row  = mysqli_fetch_array($result, MYSQLI_ASSOC);
		
		if(is_array($row)) {
			if($row['Korisnicko_ime'] == 'admin'){
				$_SESSION['administration'] = true;
			}

			$_SESSION["user_id"] = $row['id'];
			$_SESSION["ime"] = $row['Ime'];
			$_SESSION["prezime"] = $row['Prezime'];
			$_SESSION["email"] = $row['Email'];
			$_SESSION["user_name"] = $row['Korisnicko_ime'];
		} else {
			echo 0;
		}
	}
	
	if(isset($_SESSION["user_id"])) {
		echo 1;
	}
?>