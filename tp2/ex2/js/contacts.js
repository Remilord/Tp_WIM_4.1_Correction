/*Au chargement de la page */
/*A noter que l'énoncé nous demande de stocker les lignes qui ont été ajoutées , pour les retrouver au retour sur la page*/
/*A noter que lorsqu'on sauvegarde un objet d'une telle manière on utilise un format très spécifique appelé le JSON*/
window.onload = () => {
	var input  = new Array(); /*Tableau qui va contenir tous les inputs du html*/
	var champs = new Array(); /*Tableau correspondant un à une ligne du tableau , que l'on va remplir*/
	var champsforsave = new Array(); /*Tableau correspondant aux précedentes lignes , c'est à dire celle qui ont été sauvegardé lorsqu'on rafraichit la page,voir plus loin*/
	if(localStorage.getItem("champs") != null) { /*On regarde si des lignes ont étés stockés dans "la mémoire du navigateur" , un peu comme des cookies*/
	champsforsave = JSON.parse(localStorage.getItem("champs")); /*Si oui , alors on reconvertit ce qui a été stocké en tableau (JSON en tableau javascript)*/
	champsforsave.forEach((el) => { /*On parcourt tableau et on ajoute les champs, les détails sont plus bas , car je fais la même méthode lorsqu'on appuie sur le bouton ajouter, l'idéal serait de faire une fonction javascript*/
		var tbody = document.getElementsByTagName("tbody")[0];
		var tr = document.createElement("tr");
		var nom = document.createElement("td");
		var prenom = document.createElement("td");
		var email = document.createElement("td");
		nom.textContent = el[0];
		prenom.textContent = el[1];
		email.textContent = el[2];
		tr.appendChild(nom);
		tr.appendChild(prenom);
		tr.appendChild(email);
		tbody.appendChild(tr);
	});
}
	input = Array.from(document.getElementsByTagName("input")); /*On récupère tous les inputs de la page*/
	var valider = document.getElementById("ajouter");/*On récupère le bouton valider de la page*/
	valider.addEventListener("click",(ev) => { /*On ajoute un événement du clic sur le bouton valider*/
		ev.preventDefault(); /*/!\ IMPORTANT : on annule par défaut l'action du onclick du bouton, faut utiliser ça lorsque vous avez des comportements non voulu par l'événement du clic (ex: rafraichissement de la page),dans le doute mettez le tout le temps*/
		input.forEach( (el) => { /*Pour chaque inputs */
			champs.push(el.value); /*Je range la valeur de l'input dans mon tableau champs*/
		});
		var tbody = document.getElementsByTagName("tbody")[0]; /*Je récupère le tbody de ma page html*/
		var tr = document.createElement("tr"); /*Je crée différents élements nécéssaire à un tableau : tr,td,td,td etc ...*/
		var nom = document.createElement("td");
		var prenom = document.createElement("td");
		var email = document.createElement("td"); /*Les élements sont encore "virtuels", ils ne sont pas encore ajoutés à un réel élement de page HTML*/
		/*On initalise le contenu du texte des différents élements td*/
		nom.textContent = champs[0];
		prenom.textContent = champs[1];
		email.textContent = champs[2];
		/*On ajoute au tr , qui est virtuel, les différents td pour avoir l'arboresence HTML suivante : <tr> <td>nom</td> <td>prenom</td> <td>email</td> </tr>*/
		tr.appendChild(nom);
		tr.appendChild(prenom);
		tr.appendChild(email);
		/*On ajoute au tbody de notre html (qui est pas virtuel) , une ligne c'est à dire un <tr>*/
		tbody.appendChild(tr);
		/*on garde en mémoire la lignes qu'on vient d'ajouter au cas où on est besoin de la sauvegarder*/
		champsforsave.push(champs);
		/*On réinitialise tout les champs et les inputs*/
		champs = [];
		input.forEach( (el) => {
			el.value ="";
		});
	},true);
	/*On ajoute au tbody un événement au clique de la souris, càd une suppression d'une ligne*/
	var tbodyl = document.getElementsByTagName("tbody")[0];
	tbodyl.addEventListener("click",(ev) => { /*ev correspond à un MouseEvent , genre un objet qui représente l'événement et qui a plein de fonctions comme la position , l'élément qui a été cliqué etc...*/
		var tr = ev.target.parentElement; /*Lorsqu'on clique, on pourrait croire que la cible du clique bah c'est le tbody puisque c'est lui qui a l'événement du clique mais on peut récupérer
		exactement l'élément qui a été ciblé par le clique avec target OR l'élement sur lequel on clique va être forcément une case td contenu dans un tr et nous il faut qu'on supprime le tr pas le td (à moins que vous voulez supprimer une case du Tableau)
		ainsi on récupère l'élement parent dans le HTML du td qui est donc un tr (il faut utiliser l'attribut parentElement)*/
		tbodyl.removeChild(tr); /*On supprime donc le tr du tbody*/
	});
	var sauver = document.getElementById("sauver"); /*On récupère le bouton sauver et on lui ajoute un gestionnaire d'événement au clique de la souris*/
	sauver.addEventListener("click",(ev) =>{
			localStorage.setItem("champs",JSON.stringify(champsforsave)); /*on stocke dans la mémoire du navigateur les champs qu'on a précédemment crée , pour stocker de cette façon il faut le convertir au format JSON*/
	});

};
