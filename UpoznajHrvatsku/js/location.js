var map;
var markers = [];
var myMarker = [];
var service;
var locations = new Array();
var infowindow = new google.maps.InfoWindow;
var firstSearch = false;

function setFirstSearch(variable){
    firstSearch= variable;
    search();
}

//----Pretraga svih mjesta na karti koji sadrže traženi tip lokacije
function search() {
    var mobile = document.getElementById("mobile-info").style.display;
    var windowsize = $(window).width();
    if (windowsize < 450 && mobile == 'block'){
        document.getElementById("mobile-info").style.display = 'none';
    }
    //console.log("Nakon pretrage", firstSearch);
    if(markers!=null){
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
            marker = [];
        }
    }

    if (firstSearch == true){
        var inputElements = document.getElementsByClassName('markerCheckbox');
        for(var i=0; inputElements[i]; i++){
                if(inputElements[i].checked)
                    selectedMarkers(inputElements[i].value);     
        }                    
    }

    // brisanje svih markera
    markers.splice(0,markers.length);
}

function selectedMarkers(markerType){
    var request = {
        bounds: map.getBounds(),
        type: markerType
    }; 
    service.nearbySearch(request, function(results, status){
            searchResults(results, status, markerType)
        });
}

//----Traženi objekti se prosljeđuju i parsiraju se traženi podaci svakog objekta
function searchResults(results, status, type) {
    firstSearch = 1;
    //console.log(results);
    for(var i = 0; i < results.length; i++){

        var loc = String(results[i].geometry.location);
        var latLong = loc.substring(1, loc.length-2);
        latLong=latLong.split(', ');

        var lat = parseFloat(latLong[0]);
        var lng = parseFloat(latLong[1]);

        locations[i] = [lat, lng];
        //console.log(locations[i]);

        var pocetna = document.getElementById("pocetnaVrijednost").value;
        var zavrsna = document.getElementById("zavrsnaVrijednost").value;

        if(pocetna=="")
            pocetna=1;
        if(zavrsna=="")
            zavrsna=5;

        var adresaMjesta = results[i].vicinity;
        var nazivMjesta= results[i].name;
        var tip = type;
        var podaciPretrage = {lat : lat, long: lng, pocetna : pocetna, zavrsna: zavrsna}; //post varijable

        var dodatnaPretraga = document.getElementById("pretragaPoOcjenama").checked;

        //----Ako je označena pretraga po ocjenama traži samo lokacije samo s prosječnom ocjenom, ako nije onda prikazuje sve lokacije
        if (dodatnaPretraga == true)
        {
            $.ajax({
                type: "POST",
                url: "searchParameters.php",
                data: podaciPretrage,
                async: false,
                success:function(data){
                    if(data != "0")
                        create_marker(nazivMjesta,adresaMjesta,tip,lat,lng);
                }
                                    
            });

        }else{
            create_marker(nazivMjesta,adresaMjesta,tip,lat,lng);
        }
    }
    showPlaces();
}

//----Stvaranje markera na mapi
function create_marker(nazivMjesta, adresaMjesta, tipMarkera, lat, lng){
    var ikona = {
        url: "http://localhost/UpoznajHrvatsku/Pictures/" + tipMarkera + ".png",
        size: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(35, 35)
    };

    //---stvaranje markera na karti
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        latituda: lat,
        longituda: lng,
        map: map,
        title: nazivMjesta,
        address: adresaMjesta,
        icon: ikona
    });

    markers.push(marker);
    var kategorijaMjesta;
    if(tipMarkera == 'store')
        kategorijaMjesta = 'Trgovina';
    else if(tipMarkera == 'restaurant')
        kategorijaMjesta = 'Restoran';
    else if(tipMarkera == 'museum')
        kategorijaMjesta = 'Muzej';
    else if(tipMarkera == 'lodging')
        kategorijaMjesta = 'Hotel';
    else if(tipMarkera == 'bank')
        kategorijaMjesta = 'Banka';
    else if (tipMarkera == 'church')
        kategorijaMjesta = 'Crkva';
    else if (tipMarkera == 'police')
        kategorijaMjesta = 'Policija';
    else if (tipMarkera == 'health')
        kategorijaMjesta = 'Bolnica';
                
    //---dodavanje opisa na svaki marker
    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
            var EditForm = '<div id = opis>'+
                            '<form method="POST" name="SaveMarker" id="SaveMarker"><span id="labela">Ime mjesta:  <span id="rezultat">' + nazivMjesta + '</span></span></br></br>'+
                            '<span>Adresa:  <span id="rezultat">' + adresaMjesta + '</span></span></br></br>'+
                            '<span>Tip: '+ kategorijaMjesta +'</span></br></br>'+
                            '<label for="recenzija"><span>Napišite recenziju: </br></br> <textarea id="recenzija" name="recenzija" class="save-desc" placeholder="Vaša rencenzija" maxlength="350"></textarea></label></br>' + 
                            '<label for="ocjena"><span>Ocjena: </span><select name="ocjena" id="ocjena"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>  </select></label></br></br>'+
                            '<button type="button" name="save-marker" class="save-marker" id="save-marker">Spremi recenziju</button>'+
                            '<button type="button" id="showComments" >Pregledajte recenzije</button>'+
                            '</form></div>';

            var windowsize = $(window).width();
            if (windowsize < 450){
                var div = document.getElementById('mobile-info').innerHTML ='<div class="arrow-up"></div>'+EditForm+'<button type="button" id="closeInfo">X</button>';
                document.getElementById('closeInfo').onclick = function(){
                    document.getElementById('mobile-info').style.display='none';
                };
                $('#mobile-info').css('display', 'block');
                var latit= lat-0.0009;
                var center = new google.maps.LatLng(latit,lng);
                map.setCenter(center);
                window.location.hash = '#mobile-info';

            }else{
                infowindow.setContent(EditForm);
                infowindow.open(map, marker);                                        
            }                        

                                                                    
            document.getElementById('save-marker').onclick = function(){ save_marker(nazivMjesta, adresaMjesta, lat, lng, kategorijaMjesta) };
            document.getElementById('showComments').onclick =function(){ show(lat, lng) };
        }
    })(marker));
}

function markerOpen(id){
    hideSearch();
    google.maps.event.trigger(markers[id], 'click');
}

//-----Spremanje recenzija markera
function save_marker(locationName, locationAddress, latitude, longitude, kategorija){
    var recenzija  = unescape(document.getElementById("recenzija").value);
    var ocjena = escape(document.getElementById("ocjena").value); 
    var user = checkLoggedIn();
    if(user.result){
        if(recenzija ==''){
            alert("Molimo Vas unesite komentar mjesta!");
        }else{
            var myData = {name : locationName, address : locationAddress, lat : latitude, long: longitude, comment : recenzija, grade: ocjena, kategorijaMjesta: kategorija }; //post varijable
                                
            $.ajax({
                type: "POST",
                data: myData,
                url: "saveComment.php",
                success:function(data){   
                    alert("Uspješno komentirano");
                }
            });

        }
    }else{
        alert("Morate biti prijavljeni za komentiranje");
    }

}          
            
//-----Prikaz već napisanih recenzija
function show(latitude, longitude) {
    document.getElementById('tijeloRecenzije').style.display = 'block';
    var myData = { lat : latitude, long: longitude };
    $.ajax({
        type:"POST",
        url:"showComments.php",
        data: myData,
        dataType:"json",
        success:function(data){
            var recenzije=" ";
            for(var i=0; i < data.length; i++){
                recenzije+=data[i];
            }
            $('#sadrzaj').html(recenzije);
        },
        error:function(data){
            var recenzije=" ";
            $('#sadrzaj').html(recenzije);
        }
    });
}

//-----Inicijalizacija mape i lokacije korisnika
function initialise(location) {
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    myMarker.push(location.coords.latitude, location.coords.longitude);

    var mapOptions = {
        center: currentLocation,
        zoom: 16
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var mylocationIcon = {
        url: "http://localhost/UpoznajHrvatsku/Pictures/mylocation.png",
        size: new google.maps.Size(45, 45),
        scaledSize: new google.maps.Size(45, 45)
    };

    //---postavljanje trenutne lokacije
    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        icon: mylocationIcon,
        title: "Vaša trenutna lokacija!"
    });

    service = new google.maps.places.PlacesService(map);

    //---ponovna pretraga nakon promjene granica mape
    google.maps.event.addListener(map,'zoom_changed', search);
    google.maps.event.addListener(map,'dragend', search);
                
}


//-------Funkcija za provjeru da li je korisnik ulogiran
function checkLoggedIn(){
    $.ajax({
        type: 'get',
        url: "checkUser.php",
        dataType: 'html',
        async: false,
        success: function(data) {
            var user = jQuery.parseJSON(data);
            result = user;
        } 
    });
    return result;
}
            
function hide(id) {
    document.getElementById(id).style.display = 'none';
}

//----Prikaz dodatne pretrage s ocjenama
function showHideGrades(){
    if (document.getElementById("pretragaPoOcjenama").checked == true){
        document.getElementById("grades").style.display = 'block';
        document.getElementById("pretragaPoOcjenama").style.checked = 'checked';
    }else{
        document.getElementById("grades").style.display = 'none';
        document.getElementById("pretragaPoOcjenama").style.checked = 'unchecked';
    }
}

//-----Prikaz tražilice
function showParameters(){
    document.getElementById("search-menu").style.display = 'block';
    document.getElementById("toggle").style.checked = 'checked';
    document.getElementById('mobile-info').style.display='none';
}

function hideParameters(){
    document.getElementById("search-menu").style.display = 'none';
    document.getElementById("toggle").style.checked = 'unchecked';
}

//----Prikaz i sakrivanje sortiranja lokacija
function showHideSort(){
    if(document.getElementById("sortToggle").checked == false)
    {
        document.getElementById("sortiranje").style.display = 'block';
        document.getElementById("search").style.display = 'none';
        document.getElementById("listaMjesta").style.top = '10px';
        document.getElementById("sortiranje").style.marginTop = '40px';

    }else{
        document.getElementById("sortiranje").style.display = 'none';
        document.getElementById("search").style.display = 'block';
        document.getElementById("listaMjesta").style.top = 'auto';
    }
}

//-----Skrivanje tražilice u posebnim uvijetima
function hideSearch(){
    var windowsize = $(window).width();
    if (windowsize > 900){
        showParameters();
    }else{
        document.getElementById("search-menu").style.display = 'none';
        document.getElementById("toggle").checked = false;
    }
}

//-----Prikaz liste lokacija
function showPlaces(){
    var abc = document.getElementById("sortAlpha").checked;
    var dist = document.getElementById("sortDistance").checked;
    var grd = document.getElementById("sortGrade").checked;

    if(abc == true)
        sortAbc();

    if(dist == true)
        sortDist();

    if(grd == true)
        sortGrade();

    var placesList="";
    for(i=0; i<markers.length; i++){
        if(grd == true && dist == true)
            placesList+= '<p id="listName" onclick="markerOpen('+i+')">'+ markers[i].title +'</br><span id="listAddress">'+ markers[i].address + '</br>Ocjena: '+ Math.round(markers[i].grade*100)/100 +'</br>Udaljenost: '+ Math.round(markers[i].distance*100)/100 +'</span></p>';
        else if(dist == true)
            placesList+= '<p id="listName" onclick="markerOpen('+i+')">'+ markers[i].title +'</br><span id="listAddress">'+ markers[i].address +'</br>Udaljenost: '+ Math.round(markers[i].distance*100)/100 +' km</span></p>';
        else if(grd == true)
            placesList+= '<p id="listName" onclick="markerOpen('+i+')">'+ markers[i].title +'</br><span id="listAddress">'+ markers[i].address +'</br>Ocjena: '+ Math.round(markers[i].grade*100)/100 +'</span></p>';
        else
            placesList+= '<p id="listName" onclick="markerOpen('+i+')">'+ markers[i].title +'</br><span id="listAddress">'+ markers[i].address +'</span></p>';
    }
    $('#places').html(placesList);
}

//------Sortiranje liste lokacija po abecedi
function sortAbc(){
    markers.sort(function(a, b){
        if(a.title < b.title) return -1;
        if(a.title > b.title) return 1;
        return 0;
    })
}

//----Sortiranje liste lokacija po udaljenosti
function sortDist(){
    for(var i=0; i < markers.length; i++){
        var dist = getDistance(myMarker[0], myMarker[1], markers[i].latituda, markers[i].longituda)
        markers[i]['distance'] = dist;
    }

    markers.sort(function(a, b){
        if(a.distance < b.distance) return -1;
        if(a.distance > b.distance) return 1;
        return 0;
    })
}

//------Haversine formula za izračunavanje udaljenosti
function getDistance(myLat, myLng, lat, lng){
    var R = 6371; // Radius zemlje u km

    var dLat = deg2rad(lat-myLat); 
    var dLng = deg2rad(lng-myLng); 

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(myLat)) * Math.cos(deg2rad(lat)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2); 

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Udaljenost u km
    return d;
}

//stupnjevi u radijane
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

//----Sortiranje liste lokacija po ocjeni
function sortGrade(){
    for(var i=0; i < markers.length; i++){
    var pretragaMjesta = {lat : markers[i].latituda, long: markers[i].longituda}; //post variables
        $.ajax({
            type: "POST",
            url: "average.php",
            data: pretragaMjesta,
            dataType: "text",
            async: false,
            success:function(data){
                markers[i]['grade']=data;
            }
        });

    }

    markers.sort(function(a, b){
        if(a.grade > b.grade) return -1;
        if(a.grade < b.grade) return 1;
        return 0;
    })
}

//----Promjena granica preglednika
$(window).resize(function(){
    hideSearch();
    infowindow.close();
    var windowsize = $(window).width();
    if (windowsize > 450)
        document.getElementById("mobile-info").style.display = 'none';
});
        	

$(document).ready(function() {
    var user=checkLoggedIn();
    if (user.result){
        $("div#prijava").append('Dobrodošli '+ user.name +' <a href="' + 'logout.php' + '" class="headerButton">' + 'Odjava' + '</a>' );
    }else if (!user.result){
        $("div#prijava").append('<a href="' + 'login.php' + ' "class="headerButton">' + 'Prijavite se za komentiranje' + '</a>');          
    }
                
    document.getElementById("toggle").checked = false;
    document.getElementById("pretragaPoOcjenama").checked = false;

    //-----trenutna lokacija korisnika
    navigator.geolocation.getCurrentPosition(initialise);

});