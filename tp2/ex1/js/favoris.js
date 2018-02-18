/*Objet tableau de liens et de noms crée par DENIS*/
var liens= [
	{
	nom:"Google"  ,
	url:"www.google.fr",
	img:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png"
},
	{
		nom:"Le Monde",
		url:"www.google.fr",
		img:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lemonde_fr_2005_logo.svg/200px-Lemonde_fr_2005_logo.svg.png?uselang=fr"

	},
	{
		nom:"L'Equipe",
		url:"www.lequipe.fr",
		img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/L%27%C3%89quipe_wordmark.svg/200px-L%27%C3%89quipe_wordmark.svg.png"
	}
];
/*Important par la suite /!\ : lorsque dans l'HTML il y a juste le javascript importé dans l'URL et que aucun élément HTML n'appelle une fonction javascript
alors on ajoute automatiquement , lorsque le js est chargé , une fonction onload sur la fenêtre (ou le body mais la fenêtre c'est mieux) dans le script javascript
comme ça au chargement de la page on execute la fonction suivante*/
window.onload = () =>  {
var ul = document.createElement("ul"); /*On crée un élement ul comme si en html on créait une balise <ul> MAIS cet élément n'a pas été encore ajouté à notre HTML,il est crée virtuelement*/
liens.forEach(function(element) { /*On parcourt le tableau qu'a créée Denis*/
			var li = document.createElement("li"); /*On crée un élement li*/
			var a = document.createElement("a"); /*On crée un élement a*/
			a.href= "http://" + element.url; /*On change les attributs de l'élément a, en lui ajoutant lorsqu'on clique dessus (href) une redirection vers le liens du tableau de Denis*/
			a.textContent = element.nom; /*On change le contenu du href avec le nom du lien*/
			var img = document.createElement("img"); /*On crée un élement img*/
			img.src=element.img; /*On lui met la source de l'image qu'il doit afficher*/
			/* /!\ IMPORTANT : on a crée virtuelement les élements ul,li et a , désormais il va falloir créer l'arborescence , pour ça on va ajouter qui est "au dessus" de qui en html*/
			li.appendChild(a);/*On ajoute au li l'élément a*/
			li.appendChild(img);/*On ajoute au li l'élément de l'img*/
			ul.appendChild(li);/*On ajoute au ul l'élément du li*/
			/*On crée une certaines arborescence HTML de cette façon là càd <ul> <li> <a><img/> </a> </li> ... mais cette arborescence est toujours "virtuelle" car tous les élements n'ont pas encore été ajouté
			à un vrai élement de notre page HTML*/

});
/*On va donc ajouter l'élement <ul> à notre body du document HTML qui lui est un élement non virtuel de notre page ,là il y aura du changement sur la page*/
document.body.appendChild(ul);
}
