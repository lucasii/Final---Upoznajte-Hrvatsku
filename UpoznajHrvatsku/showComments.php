<?php
include 'database.php';


$latitude = mysqli_real_escape_string($base, $_POST["lat"] );
$longitude = mysqli_real_escape_string($base, $_POST["long"] );



$sql1 = mysqli_query($base, "SELECT id FROM mjesta WHERE latitudaMjesta = '$latitude' AND longitudaMjesta = '$longitude'");
while($id  = mysqli_fetch_array($sql1, MYSQLI_ASSOC))
{
	$red=$id['id'];
}

$sql = mysqli_query($base, "SELECT korisnici.Ime, korisnici.Prezime, ocjene_komentari.id, ocjene_komentari.ocjena, ocjene_komentari.komentar, DATE_FORMAT(ocjene_komentari.datumKomentiranja, '%d.%m.%Y') AS datum
							FROM korisnici
							INNER JOIN ocjene_komentari
							ON korisnici.id=ocjene_komentari.idKorisnika WHERE ocjene_komentari.idMjesta = '$red' ORDER BY ocjene_komentari.id ASC");

$i=0;

while($row  = mysqli_fetch_array($sql, MYSQLI_ASSOC))
{
	$idKomentara=$row['id'];
	$ime=$row['Ime'];
	$prezime=$row['Prezime'];
	$ocjena=$row['ocjena'];
	$komentar=$row['komentar'];
	$datum=$row['datum'];


	switch ($ocjena) {
    case 1:
		$slika="Pictures/oneStar.png";
        break;
    case 2:
		$slika="Pictures/twoStars.png";
        break;
    case 3:
		$slika="Pictures/threeStars.png";
        break;
    case 4:
		$slika="Pictures/fourStars.png";
        break;
    case 5:
		$slika="Pictures/fiveStars.png";
        break;
	}
	if(!isset($_SESSION["administration"]) || $_SESSION["administration"] == ''){

			$result[$i]='<span id="recenzijaKorisnik">'. $ime . ' ' . $prezime . '</span><span id="datumKomentiranja">'. $datum .'</span></br> <img src='.$slika.' id="ocjenaKorisnika"></br><span id="komentarKorisnika">' . $komentar . '</span><hr>';


	  }else if(isset($_SESSION['administration']) && $_SESSION['administration'] != ''){
	  	
			$result[$i]='<span id="recenzijaKorisnik">'. $ime . ' ' . $prezime . '</span><span id="datumKomentiranja">'. $datum .'</span></br> <img src='.$slika.' id="ocjenaKorisnika"></br><span id="komentarKorisnika">' . $komentar . '</span><a href="delete.php?id=' . $row['id'] . '">Obriši komentar</a><hr>';
	    
	  }



	$i++;
}
echo json_encode($result, JSON_UNESCAPED_UNICODE);