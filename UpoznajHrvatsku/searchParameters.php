<?php
include 'database.php';

$latitude = mysqli_real_escape_string($base, $_POST["lat"] );
$longitude = mysqli_real_escape_string($base, $_POST["long"] );
$pocetnaVrijednost = mysqli_real_escape_string($base, $_POST["pocetna"] );
$zavrsnaVrijednost = mysqli_real_escape_string($base, $_POST["zavrsna"] );



$result = mysqli_query($base, "SELECT id FROM mjesta WHERE latitudaMjesta = '$latitude' AND longitudaMjesta = '$longitude'");

if(mysqli_num_rows($result) != null){

	while($row  = mysqli_fetch_array($result, MYSQLI_ASSOC))
	{
		$idMjesta=$row['id'];
	}


	$prosjecnaVrijednost = mysqli_query($base,"SELECT AVG(ocjena) FROM ocjene_komentari WHERE idMjesta = '$idMjesta'");


	while($row  = mysqli_fetch_array($prosjecnaVrijednost, MYSQLI_ASSOC))
	{
		$prosjek=$row['AVG(ocjena)'];
	}
	if($prosjek >= $pocetnaVrijednost && $prosjek <= $zavrsnaVrijednost)
		echo "1";
	else
		echo "0";
}else{
	echo "0";
}


