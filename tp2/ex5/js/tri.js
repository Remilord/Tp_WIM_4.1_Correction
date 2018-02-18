/*Fonction de denis pour obtenir un nombre aléatoire*/
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
/*Fonction au chargement de la page*/
window.onload = () => {
	var tab = new Array(); /*tableau qui va contenir chaque élément qu'on peut déplacer*/
	for(i=1;i<=10;i++) {
		tab[i] = document.getElementById("drag"+i);
	}
	tab.forEach( (element) => { /* on parcout tout le tableau*/
		element.textContent = getRandomInt(0,50); /* on change le texte de chaque élément en un nombre aléatoire*/
		element.addEventListener("dragstart",(ev)=> { /*on ajoute à chaque élément (c'est des cases) , le fait que lorsqu'on les déplaces avec la souris on déplace avec eux de la donnée en l'occurence leur id*/
			ev.dataTransfer.setData("text", ev.target.id); /*on donne le nom de la donnée transféré en nom text avec l'id de la case*/
		});
	});
	var slots = document.querySelectorAll(".slot"); /* on choppe tous les éléments qui correspondent à des emplacements où on peut mettre nos cases*/

	slots.forEach( (element,it) => { /*Pour chaque emplacement on ajoute l'évenement dragover*/
		element.addEventListener("dragover",(ev) => { /*on enlève l'action par défaut lorsqu'on déplace dessus un élement*/
			ev.preventDefault();
		});
		var divend = document.getElementById("end"); /*on récupère la div avec l'id end (voir HTML)*/
		element.addEventListener("drop",(ev) => { /*Pour chaque emplacement, on ajoute l'évenement drop , c'est à dire le fait de déplacer un objet qu'on peut déplacer sur une case*/
			ev.preventDefault(); /* on enlève l'action par défaut*/
			if(ev.target.firstChild == null || ev.target.firstChild.nodeName == "#text" ) { /* on vérifie bien que la case est vide*/
				var data = ev.dataTransfer.getData("text"); /* on récupère la donnée associée au nom "text" de l'élement qui a été déplacé sur la case, à noter que la donnée transférer est enfait une div avec un nombre contenu dedans*/
				ev.target.appendChild(document.getElementById(data)); /* on ajoute à la case vide la div qui contient un nombre*/
				var slotend = document.querySelectorAll("#end .slot"); /*on récupère tous les emplacements vide de la dernière ligne*/
				/*Le but des prochaines étapes et de voir si les nombres qui sont sur la ligne du bas sont bien triées ou non , la démarche est la suivante :
				-on récupère tous les nombres qu'on stocke dans un tableau
				-on copie ce tableau
				-on trie la copie
				-on regarde si la copie triée est égale à la copie original*/
				var tabpastrie = []; /* on initalise un tableau et une variable*/
				var i = 0;
				slotend.forEach( (element) => { /*On parcout tous les emplacements de la dernière ligne*/
					if(element.textContent != "") { /*Si chaque emplacement contient de la donnée (un nombre en gros)*/
						tabpastrie[i] = parseInt(element.textContent); /*alors on l'ajoute à un tableau*/
						i=i+1;/*on incrémente l'indice*/
					}
				});
				var vraimentrie = tabpastrie.slice(0); /* on copie le tableau qu'on a obtenu précédement*/
				vraimentrie.sort(function(a, b) { /* on trie le tableau*/
					return a - b;
				});
				if(vraimentrie.length==tabpastrie.length && vraimentrie.every(function(v,i) { return v === tabpastrie[i]})) { /* on regarde si les deux tableaux correspondent bien entre eux*/
					divend.classList.remove('good'); /*si les élements sont bien triés alors on remplace le style css par le style css vert*/
					divend.classList.remove('wrong');
					divend.classList.add('good');
				}else {
					divend.classList.remove('good'); /* si les élements sont mal triés alors on remplace le style css par le style css rouge*/
					divend.classList.add('wrong');
				}

			}
		});
	});

}
