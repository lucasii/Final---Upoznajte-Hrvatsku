<?php

  include 'database.php';

  $data = array();

  //----------Provjeravanje korisnika
  if(!isset($_SESSION["user_id"]) || $_SESSION["user_id"] == ''){

  		$data = array(
        'result' => false
    );


  }else if(isset($_SESSION['user_id']) && $_SESSION['user_id'] != ''){
  	
	  	$data = array(
        'result' => true,
        'name' => $_SESSION['ime']
    );
  }
  
  echo json_encode($data);