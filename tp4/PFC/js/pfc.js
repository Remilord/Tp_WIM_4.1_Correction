/*Dans cet exo on essaie de séparer le js (en utilisant du jquery toujours) en modèle vue controleur un peu comme code igniter*/
﻿function PFC() {
	var self = this; /* cette affectation est utile pour avoir accès partout à l'objet PFC*/
	this.coupJoueur = null; /*coups qu'on met à null au début*/
	this.coupOrdinateur = null;
	this.parties = 0; /*nb parties*/
	this.partiesG = 0; /*nb parties gagnées*/
	this.jouerCoup = function(){ /*fonction motrice du jeu*/
		var resultat = '<h2 class="message">Perdu</h2>'; /*on prépare une chaîne de caractère pour le résultat*/
		this.parties ++;
		if (this.coupJoueur == this.coupOrdinateur) resultat = '<h2 class="message">Egalité</h2>'; /*si le coup joueur / ia est le meme égalité*/
		if ( /*cas où on gagne*/
			(this.coupJoueur == "pierre" && this.coupOrdinateur =="ciseaux") ||
			(this.coupJoueur == "feuille" && this.coupOrdinateur =="pierre") ||
			(this.coupJoueur == "ciseaux" && this.coupOrdinateur =="feuille")
			){
	resultat = '<h2 class="message">Gagné</h2>';
	this.partiesG ++;
}
/*On se sert de la vue pour l'affichage du message et mettre à jour les parties*/
this.view.setMessage(resultat);
this.view.updateParties();
	};
	/*Partie du programme correspondant à la vue , la vue doit être dépendant du html MAIS le controleur et le modèle ne doit pas s'adapter à la vue , en gros dans le cas où je change l'html , j'ai juste besoin de changer cette partie de code relatif à la vue*/
	this.view={
	working:true, /* pour le spinner de chargement*/
	iconeJoueur:$('#joueur img').first(), /*on récupère la première l'image de la division qui a comme id joueur */
	iconeOrdinateur:$('#ordinateur img').first(),/*on récupère la première l'image de la division qui a comme id ordinateur */
	message : $('#message'), /*on recupère la div qui a comme id message*/
	setMessage:function(m){/* fonction qui change le message de fin de partie*/
		this.message.html(m);
	},
	spinner:$('#working'), /* l'icone de spinner (chargement)*/
	setIconeJoueur:function(img){ /* on change l'image du coup du joeur*/
		this.iconeJoueur.attr('src','./images/'+img+'.png') /*la fonction jquery attr, permet de changer les attributs d'un objet html, comme sa src, sa classe, son id etc..*/
	},
updateParties:function() { /* on met à jour les textes des parties jouées*/
	$('#partie h5').text("Parties : "+self.parties);
	$('#gagne h5').text("Gagnées : "+self.partiesG);
},
setIconeOrdinateur:function(img){
		this.iconeOrdinateur.attr('src','./images/'+img+'.png');
		},
		toogleWorking:function(){ /* fonction relative au spinner qui tourne ou non (seulement esthétique)*/
			if (this.working) this.spinner.hide(); /*on cache le spinner*/
			else
				this.spinner.show(); /*on le montre*/
			working = !working;
		}
	};

$('#coups img').on('mouseenter mouseleave', function(){ /*on ajoute un listener lorsque la souris sort ou entre dans une image de coup (div avec id coups) on change le style (le background dans ce cas présent)*/
	$(this).toggleClass('_bg-red-lighter');
});

$('#coups img').on('click',function(){ /* on ajoute un lister sur le click sur une image de coup*/
	self.coupJoueur = this.id; /*le coup du joueur correspond à l'id de la sélection*/
	self.view.setIconeJoueur(self.coupJoueur); /* on change l'image du coup du joueur*/
	self.getCoupOrdi(); /* on recupère le coup du joueur adverse (voir fonction ajax plus bas)*/
});
$('#new').on('click',function() { /* on ajoute un listener au bouton recommencer qui va mettre à zéro le nombre de parties jouées et gagner*/
	self.partiesG = 0;
	self.parties = 0;
self.view.updateParties();
});
this.getCoupOrdi = function(){ /* fonction ajax*/
	self.view.toogleWorking(); /* on active le spinner*/
	$.getJSON('http://localhost/PFC/serveur/coup.php', function(rep){ /* fonction avec requête ajax , le serveur est dans le dossier serveur si vous voulez tester , le serveur renvoie un coup aléatoirement*/
		self.coupOrdinateur = rep.coup; /* on recupère le coup de l'ordinateur*/
		self.view.setIconeOrdinateur(rep.coup); /* on change l'image du coup de l'ordinateur*/
		self.view.toogleWorking(); /* on désactive le spinner car c'est la fin du chargement de la requete*/
		self.jouerCoup(); /* on lance la fonction qui permet de déterminer le gagnant*/
	});

};
this.view.toogleWorking(); /*on active le spinner*/

};


$(function() { /*window on load*/
	var pfc = new PFC(); /*on créer l'objet relatif au jeu (on pourrait tout faire dans la fonction)*/
});
