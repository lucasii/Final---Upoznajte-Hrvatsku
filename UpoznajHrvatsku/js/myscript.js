$(document).ready(function() {

	//-----Registracija korisnika
	$("#registerForm").submit(function(event) {

		$('.form-group').removeClass('has-error'); 
		$('.help-block').remove(); 

		var formData = {
			'name'		: $('input[name=name]').val(),
			'surname'	: $('input[name=surname]').val(),
			'email'		: $('input[name=email]').val(),
			'username' 	: $('input[name=username]').val(),
			'password' 	: $('input[name=password]').val()
		};

		$.ajax({
			type 		: 'POST', 
			url 		: 'registration.php', 
			data 		: formData, 
			dataType 	: 'json', 
			encode 		: true
		})

			.done(function(data) {

				//console.log(data); 

				//---------- pogreške
				if ( ! data.success) {

					// pogreška za ime
					if (data.errors.name) {
						$('#name-group').append('<div class="help-block">' + data.errors.name + '</div>'); // dodaje poruku pogreške ispod unosa
					}

					// pogreška za preime
					if (data.errors.surname) {
						$('#surname-group').append('<div class="help-block">' + data.errors.surname + '</div>'); // dodaje poruku pogreške ispod unosa
					}
					
					// pogreška za email
					if (data.errors.email) {
						$('#email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // dodaje poruku pogreške ispod unosa
					}

					// pogreška za korisničko ime
					if (data.errors.username) {
						$('#username-group').append('<div class="help-block">' + data.errors.username + '</div>'); // dodaje poruku pogreške ispod unosa
					}

					// pogreška za lozinku
					if (data.errors.password) {
						$('#password-group').append('<div class="help-block">' + data.errors.password + '</div>'); // add the actual error message under our input
					}

				} else {
					//bez pogreški, ide se na drugu stranicu 
					window.location = "location.html";
				}
			})

			.fail(function(data) {

				console.log(data);
			});

		event.preventDefault();
	});





	//--------Prijava korisnika

	$('#loginUsername').focus(); 
	$('#loginGumb').click(function(){ 
		var username = $('#loginUsername'); 
		var password = $('#loginPassword'); 
		var poruka = $('.poruka'); 

		//provjera da li je unos korisničkog imena prazan
		if(username.val() == ''){ 
			username.focus(); 
			poruka.html('<span class="error">Unesite korisničko ime</span>');
			return false;
		}

		//provjera da li je unos lozinke prazan
		if(password.val() == ''){
			password.focus();
			poruka.html('<span class="error">Unesite lozinku</span>');
			return false;
		}

		if(username.val() != '' && password.val() != ''){
			var UrlToPass = 'action=login&username='+username.val()+'&password='+password.val();
			$.ajax({ 
			type : 'POST',
			data : UrlToPass,
			url  : 'loginProcess.php',
			cache: false,
			success: function(responseText){
				if(responseText == 0){
					poruka.html('<span class="error">Korisničko ime ili lozinka nisu ispravni!</span>');
				}
				else if(responseText == 1){

					window.location = 'location.html';
				}
				else{
					alert('Problem with sql query');
				}
			}
			});
		}
		return false;
	});


});

function show(id){
	document.getElementById(id).style.display='block';
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}