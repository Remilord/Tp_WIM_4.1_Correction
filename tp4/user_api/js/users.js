/*PREMIER TP AVEC JQUERY,JQUERY EST UNE AUTRE FACON DE SELECTIONNER DES ELEMENTS D'UNE PAGE HTML DIFFERENT DU DOM AVEC LES NOEUDS*/
/*NE PAS OUBLIER DIMPORTER LE PLUGIN JQUERY DANS LE INDEX HTML*/
/*Avec JQUERY on sélectionne les élements du html comme en css , # pour les ids , . pour les class etc ...*/
/*Jquery a une syntaxe particulière*/
	$(function(){ /* Cette expression équivaut à faire une fonction onload sur une window, en gros au démarrage de la page*/

		var urlApi = "https://randomuser.me/api";
		for(var i = 0;i<= 6;i++) { /*boucle de 6 car il nous faut 6 utilisateur*/
			$.ajax(urlApi).then(function(data) { /*fonction simplifié d'AJAX , ajax prend un url en paramètre puis dans le then on recupère la fonction avec le résultat de la requête sur la page, data*/
				$('#content').append(user2html(data.results[0])); /*avec Jquery on sélectionne la div qui a l'id content et on lui ajouter du html avec la fonction user2html, voir plus bas*/
			})
		}
		function user2html(u){ /*Fonction pour convertir l'objet récupérer par l'url de la requête ajax en HTML*/
			return '<div class=divuser>'+'<img src="'+u.picture.large+'" /><br><h4>'+u.name.first+" "+u.name.last+"</h4><br><h4 class=location>"+u.location.street+"</h4><br><h4 class=location>"+u.location.postcode+" "+u.location.state+"</h4><a href="+u.email+'</a>'+u.email+'</div>';
		} /*c'est du html "brut"*/


	})
