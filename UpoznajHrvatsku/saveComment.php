<?php
include 'database.php';


	$name = mysqli_real_escape_string($base, $_POST["name"] );
	$address = mysqli_real_escape_string($base, $_POST["address"] );
	$latitude = mysqli_real_escape_string($base, $_POST["lat"] );
	$longitude = mysqli_real_escape_string($base, $_POST["long"] );
	$comment = mysqli_real_escape_string($base, ($_POST["comment"]) );
	$grade = mysqli_real_escape_string($base, ($_POST["grade"]) );
	$kategorijaMjesta = mysqli_real_escape_string($base, ($_POST["kategorijaMjesta"]) );
	$userid = $_SESSION["user_id"];
	$date = date('Y-m-d');

	$result = mysqli_query($base, "SELECT id FROM mjesta WHERE latitudaMjesta = '$latitude' AND longitudaMjesta = '$longitude'");

	$category = mysqli_query($base, "SELECT id FROM kategorije WHERE nazivKategorije = '$kategorijaMjesta'");

	if(mysqli_num_rows($result) == null){

    	while($row  = mysqli_fetch_array($category, MYSQLI_ASSOC))
		{
			$idKategorije=$row['id'];
		}
		$sql = mysqli_query($base, "INSERT INTO mjesta VALUES('',
	                                           '$name', 
	                                           '$address', 
	                                           '$latitude',
	                                           '$longitude',
	                                           '$idKategorije'
	                                           )");

		$res = mysqli_query($base, "SELECT id FROM mjesta WHERE latitudaMjesta = '$latitude' AND longitudaMjesta = '$longitude'");
    	while($id  = mysqli_fetch_array($res, MYSQLI_ASSOC))
		{
			$idMjesta=$id['id'];
		}
		$unosOcjene = mysqli_query($base, "INSERT INTO ocjene_komentari VALUES('',
														'$idMjesta',
														'$grade',
														'$comment',
														'$date',
														'$userid'
														)");
    }else{
    	while($row  = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$idMjesta=$row['id'];
		}
		$unosOcjene = mysqli_query($base, "INSERT INTO ocjene_komentari VALUES('',
														'$idMjesta',
														'$grade',
														'$comment',
														'$date',
														'$userid'
														)");
    }

?>
	