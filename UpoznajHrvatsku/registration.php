<?php
include 'database.php';

$errors         = array();  	
$data 			= array(); 		

$user = $_POST["username"];	
$usernameCheck = mysqli_query($base, "SELECT Korisnicko_ime FROM korisnici WHERE Korisnicko_ime='$user'");
$userchecker=mysqli_fetch_array($usernameCheck, MYSQLI_ASSOC);



//------------Postavljanje varijabli
	// Ako neka od njih nije postavljena, greška će se spremiti u niz $errors
	if (empty($_POST['name']))
		$errors['name'] = 'Potrebno je ime.';
	if (empty($_POST['surname']))
		$errors['surname'] = 'Potrebno je prezime.';
	if (empty($_POST['email'])){
		$errors['email'] = 'Potreban je email.';
	}else if(!filter_var(($_POST['email']), FILTER_VALIDATE_EMAIL)){
		$errors['email'] = 'Netočan format emaila.';	
	}

	if (empty($_POST['username'])){
		$errors['username'] = 'Potrebno je korisničko ime.';
	}else if(is_array($userchecker)){
		if($user == $userchecker['Korisnicko_ime'])
		$errors['username'] = 'Korisničko ime već  postoji.';
	}
	
	if (empty($_POST['password'])){
		$errors['password'] = 'Potrebna je lozinka.';
	}else if (strlen($_POST['password'])<5)
		$errors['password'] = 'Lozinka treba sadržavati najmanje 5 znakova.';
	

	//--------------vraća pogreške ako postoje
	if ( ! empty($errors)) {
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {
		//-----------ako nema pogreški sprema zapise
		$name = mysqli_real_escape_string($base, $_POST["name"] );
		$surname = mysqli_real_escape_string($base, $_POST["surname"] );
		$email = mysqli_real_escape_string($base, $_POST["email"] );
		$username = mysqli_real_escape_string($base, $_POST["username"] );
		$password = mysqli_real_escape_string($base, md5($_POST["password"]) );

			$_SESSION["user_name"] = $username;
			$_SESSION["email"] = $email;
			$_SESSION["ime"] = $name;
			$_SESSION["prezime"] = $surname;
			$_SESSION["lozinka"] = $password;

			$data['success'] = true;
			$data['message'] = 'Success!';
	}

		if ( ! empty($errors)) {
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {

		$sql = mysqli_query($base, "INSERT INTO korisnici VALUES('',
	                                           '{$_SESSION['ime']}', 
	                                           '{$_SESSION['prezime']}', 
	                                           '{$_SESSION['email']}',
	                                           '{$_SESSION['user_name']}',
	                                           '{$_SESSION['lozinka']}'
	                                           )");
			
		$result = mysqli_query($base, "SELECT * FROM korisnici WHERE Korisnicko_ime='{$_SESSION['user_name']}' and Lozinka = '{$_SESSION['lozinka']}'");
		$row  = mysqli_fetch_array($result, MYSQLI_ASSOC);
			
		if(is_array($row)) {
			$_SESSION["user_id"] = $row['id'];
		} else {
			echo 0;
		}

		$data['success'] = true;
		$data['message'] = 'Success!';
	}
	
	echo json_encode($data);