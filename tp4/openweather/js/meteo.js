$(function() { /*  équivaut Window onload*/
$("form").submit(function(ev) { /*on ajoute au formulaire un fonction pour l'évenement submit*/
	ev.preventDefault(); /* on enlève l'evenement pas défaut qui est un rafraichisement de page*/
	$('#resultat').html(''); /*on supprime le contenu de l'élement qui a pour id resultat en transformant son contenu html en une chaine de caractères vide*/
	var apiKey = "824124b860cfccde7a00b390636217a2"; /*il s'agit d'une clé d'identification pour récupérer les données de l'url*/
	var name = $('[name="ville"]').val(); /* on recupère la valeur de la ville qui est entré dans le champ qui a comme nom ville*/
	var url= 'http://api.openweathermap.org/data/2.5/weather?q='+name+'&units=metric&lang=fr&APPID='+apiKey; /* on préparer l'url pour la reqûete ajax*/
	$.ajax(url).then(function(data) { /* requete ajax avec l'url de la météo, on récupère des données dans la variable data , à nous de les décortiquer*/
		$('#resultat').append('<h1 class="_c-base-primary">'+name+'</h1>').append('<br>') /*ça parait dégeulasse mais c'est une autre méthode de faire au lieu de la méthode utilisé pour le premier exeo : on ajoute à chaque fois un élement html à la division qui a pour id resultat*/
		.append('<p><img src="http://openweathermap.org/img/w/'+data.weather[0].icon+'.png" /> '+data.main.temp+'°C <span class="tag-box -success">'+new Date(Date.now())+'</span></p>')
		.append('<table>')
		.append('<tr>')
		.append('<td>Temps : '+data.weather[0].description+'</td>')
		.append('</tr>')
		.append('<tr>')
		.append('<td>Temperature : '+data.main.temp+'°C</td>')
		.append('</tr>')
		.append('<tr>')
		.append('<td>Pression : '+data.main.pressure+'</td>')
		.append('</tr>')
		.append('<tr>')
		.append('<td>Humidité : '+data.main.humidity+'%</td>')
		.append('</tr>')
		.append('<tr>')
		.append('<td>Vitesse du Vent : '+data.wind.speed+'</td>')
		.append('</tr>')
		.append('<tr>')
		.append('<td>Direction du vent : '+data.wind.deg+'</td>')
		.append('</tr>')
		.append('<tr>')
		.append('<td>Lever du Soleil : '+new Date(data.sys.sunrise*1000)+'</td>') /*l'api de météo nous donne une date en secondes on la convertit donc*/
		.append('</tr>')
		.append('<tr>')
		.append('<td>Coucher du Soleil : '+new Date(data.sys.sunset*1000)+'</td>')
		.append('</tr>');
	});
	});
})
