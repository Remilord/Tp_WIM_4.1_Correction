/*LE TP 3 PEUT SE FAIRE UNIQUEMENT A L'AIDE D'UN SERVEUR COMME WAMP OU LORSQUE VOUS METTEZ VOS FICHIER DANS VOTRE PUBLIC_HTML ( seul les fichiers relatifs au serveur (fichier php) doivent être sur un serveur)*/
/*CET EXERCICE CE DECOMPOSE EN TROIS METHODES DIFFERENTES : UNE EN JSON (donné par Denis) , UNE EN JSON MAIS AVEC DES PROMESSES (pas spécialement utile, les promesses sont utilse lorsqu'on doit faire plusieurs requetes) ET UNE EN HTML ENCODE*/
/*LA VERSION LA PLUS PRATIQUE EST LA VERSION AVEC LES JSON AVEC PROMESSE*/
/* version JSON  (Sans promesse)*/
/*Au chargement de la page*/
/*
window.addEventListener("load",function(){
	document // on ajoute au bouton submit un évenement
		.getElementById("form")
		.addEventListener(
			"submit",
			function(ev){
				ev.preventDefault(); // on enlève l'action par défaut du submit
				var message = {"message":this.message.value}; // on récupère la valeur de l'input
				var ajax=new XMLHttpRequest(); // on crée une connexion avec un serveur
				var t=Date.now(); // on récupère la date actuelle
				var that=this; // on récupère le formulaire
				ajax.open("POST","./php/serveur.php"); // on ouvre la connexion avec le serveur PHP
				ajax.setRequestHeader("Content-type", "application/json"); // on spécifie le type , dans notre cas c'est du JSON
				ajax.send(JSON.stringify(message)); // on transforme notre objet au format JSON et on l'envoie au serveur
				document.getElementById('spinner').style.visibility = "visible"; // on rend visible l'effet de chargement
				ajax.onreadystatechange=function(){ //IMPORTANT: il s'agit de la fonction principale , la fonction est appelé à chaque changement d'état de la requête
				// pour voir quels sont les différents états il faut se référer à la doc mais l'état le plus intéréssant est l'état DONE c'est à dire l'état ou la requête est terminée
					if (
						this.readyState == this.DONE
							&&	this.status == 200
					){ //Si la requête est terminée et que la réponse du serveur est positive (code 200)
						var li = document.createElement("li"); //on crée un élément virtuel li
						var ul = document.getElementById("listeMessages"); // on récupère la liste des messages , il s'agit d'un ul dans le document HTML
						ul.insertBefore(li,ul.firstChild); // on insère le li dans le ul juste avant le premier li du ul (en gros le met en premier dans la liste)
						li.innerHTML=JSON.parse(this.responseText).message
							+ " <span class='tag-box -success'>"
							+(Date.now()-t)+" ms</span>"; // le li aura le conenu html suivant : la réponse du serveur responseText qui est sous format JSON et que l'on met en String pour mieux le lire (fonction JSON.parse)
							//ainsi que divers élément de style comme le temps
						document.getElementById('spinner').style.visibility = "hidden"; // on cache l'effet du chargement
						that.reset(); // on reinitialise le formulaire (la zone de texte)
					}
				}
			})
})*/
/* version JSON  (Avec promesse)*/
/*Au chargement de la page*/
/*
window.addEventListener("load",function(){
	document // on ajoute au bouton submit un évenement
		.getElementById("form")
		.addEventListener(
			"submit",
			function(ev){
				ev.preventDefault(); // on enlève l'action par défaut du submit
				var message = {"message":this.message.value}; // on récupère la valeur de l'input
				var t=Date.now(); // on récupère la date actuelle
				var that=this; // on récupère le formulaire
				var promesse = new Promise(function(resolve,reject) { //on crée une promesse où on va effectuer la requête au serveur php
				var xhr = new XMLHttpRequest();
				xhr.open('POST',"./php/serveur.php");
				xhr.setRequestHeader("Content-type", "application/json");
				xhr.onload = function() { //lorsque la requête est finie (équivalent à state = DONE)
					if(xhr.status == 200) { // si la requête s'est correctement déroulé
						resolve(xhr.responseText); // on utilise la fonction resolve(xhr.responseText) pour renvoyer la réponse du serveur à la fonction de succès voir plus bas
					}else {
						reject(xhr.statusText); // on utilise la fonction reject(xhr.statusText) pour renvoyer la réponse du serveur à la fonction d'échec
					}
				};
				xhr.onerror = function() { //lorsque la requête s'est pas bien déroulé
					reject("Erreur reseau");
				};
				xhr.send(JSON.stringify(message)); // on envoie au serveur notre message
			});
			promesse.then( // on active la promesse, elle est composée de deux fonctions : une fonction de réussite qui prend en argument la réponse du serveur et une fonction d'échec qui prend en argument le texte associé à l'échec
				function(valrequest) { //FONCTION DE REUSSITE DE LA REQUETE
				var li = document.createElement("li"); //on crée un élément virtuel li
				var ul = document.getElementById("listeMessages"); // on récupère la liste des messages , il s'agit d'un ul dans le document HTML
				ul.insertBefore(li,ul.firstChild); // on insère le li dans le ul juste avant le premier li du ul (en gros le met en premier dans la liste)
				li.innerHTML=JSON.parse(valrequest).message
					+ " <span class='tag-box -success'>"
					+(Date.now()-t)+" ms</span>"; // le li aura le conenu html suivant : la réponse du serveur responseText qui est sous format JSON et que l'on met en String pour mieux le lire (fonction JSON.parse)
					//ainsi que divers élément de style comme le temps
				document.getElementById('spinner').style.visibility = "hidden"; // on cache l'effet du chargement
				that.reset(); // on reinitialise le formulaire (la zone de texte)
		},
		function(error) { // FONCTION D'ECHEC DE LA REQUETE
			console.log(error);
		}
	);
				});
});*/
/*version HTML ENCODE*/
/*Au chargement de la page*/
/* La version n'est pas spécialement intéréssante en soit car l'encode sous format URL est relou*/
window.addEventListener("load",function(){
	document // on ajoute au bouton submit un évenement
		.getElementById("form")
		.addEventListener(
			"submit",
			function(ev){
				ev.preventDefault(); // on enlève l'action par défaut du submit
				var message = encodeURIComponent(this.message.value);
				var params = "message="+message; // on récupère la valeur de l'input
				var ajax=new XMLHttpRequest(); // on crée une connexion avec un serveur
				var t=Date.now(); // on récupère la date actuelle
				var that=this; // on récupère le formulaire
				ajax.open("POST","./php/serveur.php"); // on ouvre la connexion avec le serveur PHP
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // on spécifie le type , dans notre cas c'est de l'html encoder
				ajax.send(params); // on encode notre objet en format HTML et on l'envoie au serveur
				document.getElementById('spinner').style.visibility = "visible"; // on rend visible l'effet de chargement
				ajax.onreadystatechange=function(){ //IMPORTANT: il s'agit de la fonction principale , la fonction est appelé à chaque changement d'état de la requête
				// pour voir quels sont les différents états il faut se référer à la doc mais l'état le plus intéréssant est l'état DONE c'est à dire l'état où la requête est terminée
					if (
						this.readyState == this.DONE
							&&	this.status == 200
					){ //Si la requête est terminée et que la réponse du serveur est positive (code 200)
						var li = document.createElement("li"); //on crée un élément virtuel li
						var ul = document.getElementById("listeMessages"); // on récupère la liste des messages , il s'agit d'un ul dans le document HTML
						ul.insertBefore(li,ul.firstChild); // on insère le li dans le ul juste avant le premier li du ul (en gros le met en premier dans la liste)
						var valmessage = this.responseText.split("=")[1];
						li.innerHTML=decodeURIComponent(valmessage)
							+ " <span class='tag-box -success'>"
							+(Date.now()-t)+" ms</span>"; // le li aura le conenu html suivant : la réponse du serveur responseText qui est encodé au format HTML et que l'on decode puis qu'on décompose pour récupérer juste la valeur qui nous intérésse
							//ainsi que divers élément de style comme le temps
						document.getElementById('spinner').style.visibility = "hidden"; // on cache l'effet du chargement
						that.reset(); // on reinitialise le formulaire (la zone de texte)
					}
				}
			})
})
