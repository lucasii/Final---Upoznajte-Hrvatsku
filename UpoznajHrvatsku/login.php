<!DOCTYPE html>
<html>
	<head>
		<title>Upoznajte Hrvatsku</title>
		<link href="https://fonts.googleapis.com/css?family=Domine:400,700" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="Style/style.css">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    	<meta name="viewport" content="height=device-height, initial-scale=1">

		<script src="//code.jquery.com/jquery-1.9.1.js"></script>
	    <script src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
	    <script src="js/myscript.js"></script>

	</head>
	<body>

		<div class="row" id="sredina">
	      <a href="#">
	        <div id="registrationButton" onclick="show('tijeloRegistracija')">
	          <p>Registrirajte se</p>
	        </div>
	      </a>

	      <a href="#">
	        <div id="loginButton" onclick="show('tijeloLogin')">
	          <p>Prijavite se</p>
	        </div>
	      </a>


	    <!-- Registracija korisnika -->

		<div id="tijeloRegistracija">
	      	<div id="registracija">
	        	<button id="iks" onclick="hide('tijeloRegistracija')">X</button>
	        	<div class="registracija">
	            	<form action="registration.php" method="POST" id="registerForm" novalidate="novalidate">

	              	<!-- IME -->
	            	<div id="name-group" class="form-group">
	                	<label for="name">Ime:</label>
	                	<input type="text" class="form-control" name="name" placeholder="Marko">
	                	<div class="help-block"></div>
	              	</div>   

	              	<!-- PREZIME -->
	              	<div id="surname-group" class="form-group">
	                	<label for="surname">Prezime:</label>
	                	<input type="text" class="form-control" name="surname" placeholder="Marić">
	                	<div class="help-block"></div>
	              	</div>

	              	<!-- EMAIL -->
	              	<div id="email-group" class="form-group">
	                	<label for="email">Email:</label>
	                	<input type="text" class="form-control" name="email" placeholder="marko@maric.com">
	                	<div class="help-block"></div>
	              	</div>

	              	<!-- KORISNIČKO IME -->
	              	<div id="username-group" class="form-group">
		                <label for="username">Korisničko ime: </label>
		                <input type="text" class="form-control" name="username" placeholder="mmaric">
		                <div class="help-block"></div>
		            </div>

	              <!-- LOZINKA -->
		            <div id="password-group" class="form-group">
		                <label for="password">Lozinka: </label>
		                <input type="password" class="form-control" name="password" placeholder="******">
		                <div class="help-block"></div>
		            </div>

	              	<button type="submit" id="gumb">Registrirajte se</button>

	            	</form>
	        	</div>
	      	</div>
	    </div>


	    <!-- Prijava korisnika -->

	    <div id="tijeloLogin">
	      	<div id="login">
	        	<button id="iks" onclick="hide('tijeloLogin')">X</button>
	        	<div class="podaci">
		          	<form id="loginForm">
		            	<label>Korisničko ime: </label><input type="text" name="loginUsername" id="loginUsername" class="login-form"/><br><br>
		            	<label>Lozinka: </label><input type="password" name="loginPassword" id="loginPassword" class="login-form"/><br><br>
		            	<div class="poruka" id="poruka"></div><br>
		            	<input name="loginGumb" id="loginGumb" type='submit' value='Prijavite se'/>
		          	</form>
	        	</div>
	      	</div>
	    </div>

</div>
	</body>
	<footer>
	    Copyright&copy by Luka Putrić
	</footer>
</html>