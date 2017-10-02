<?php
include 'database.php';

$delete = $_GET['id'];

$sql = mysqli_query($base, "DELETE FROM mjesta WHERE id=$delete");

header ('Location: location.html');

?>