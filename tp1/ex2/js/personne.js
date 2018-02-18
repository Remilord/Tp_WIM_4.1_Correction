/*Cet exercice est utile pour savoir comment faire des objets en javascript, comme en java*/
/*Enfait un objet et plus précisement un attribut peuvent être des fonctions , c'est chelou mais bon*/
/*A noter qu'on utilise pas d'expression fléchée comme l'exercice précedent*/
/*Fonction correspondant à un objet Personne*/
function Personne(nom,prenom,mail,age,amis){
	this.nom=nom||""; /*La barre || c'est pour dire que si l'argument manque lors de la création de l'objet alors le nom prend la valeur "" (valeur après les deux barres)*/
	this.prenom=prenom||"";
	this.mail=mail||"";
	this.age=age||0;
	this.amis=amis||[];
}
/*On ajoute au prototype de l'objet Personne une fonction (ou méthode) , le prototype c'est un peu la version 2.0 de votre objet, c'est long à expliquer mais
c'est comme ça qu'on ajoute une fonction à un objet (on peut aussi le faire dans le constructeur), lorsque vous appelez une fonction d'un objet en javascript,
le javascript va regarder dans un premier temps son prototype pour rechercher la méthode*/
Personne.prototype.ajouterAmis = function(p) {
					this.amis.push(p);
}
/*constructeur d'un objet Professeur*/
function Professeur(nom,prenom,mail,age,matiere,amis) {
	Personne.call(this,nom,prenom,mail,age,amis);
	this.matiere = matiere||"";
}
/*Les deux lignes suivantes correspondent à un héritage en javascript,c'est long à expliquer*/
Professeur.prototype = Object.create(Personne.prototype);
Professeur.constructor = Professeur;
/*On instancie des objets Professeurs*/
var Denis=new Professeur("Monnerat","Denis","monnerat@u-pec.fr",44,"ASR");
var Pierre=new Professeur("Valarcher","Pierre","valarcher@u-pec.fr",49,"NSP");
var Didier=new Professeur("Diaz","Didier","diaz@u-pec.fr",53,"SQL");
var Luc=new Professeur("Hernandez","Luc","hernandez@u-pec.fr",44,"APL");
/*On créer un tableau*/
var DeptInfo = [];
/*On ajoute les profs dans ce tableau*/
DeptInfo.push(Denis,Luc,Pierre,Didier);
/*On trie le tableau avec la méthode sort , cette méthode prend en argument une fonction qui définit les règles de tris pour chaque élements a et b du tableau
on trie le tableau selon la différence de l'âge de l'élement a et de l'élement b, si la différence est inférieure à zéro alors a sera avant b , si supérieure b sera avant a
et si égale à 0 on a et b à leurs positions*/
DeptInfo.sort(function(a,b) {a.age - b.age; });
/*La fonction map permet d'appliquer une fonction qu'on définit nous même pour chacun de ses élements, là on met en majuscule le nom pour chaque élement*/
DeptInfo.map(function(a) { /*a correspond à l'élement qu'on est acutellement entrain de parcourir*/
	a.nom = a.nom.toUpperCase(); /*on met le nom en majuscule*/
	return a.nom;
});
/*la fonction reduce permet de transformer notre tableau en tableau d'une case , par exemple une moyenne des âges dans le cas ci-dessous,
pour ça la fonction reduce prend en argument une fonction spéciale (qui s'applique pour chaque élement) qui prend en argument une valeur
qui s'accumule (la somme en gros) , une valeur Courante qui correspond à l'élement qu'on est acutellement en train de parcourir, un index pour savoir
où on est et enfin le tableau qui utilise actuelement la fonction*/
var age = DeptInfo.reduce(function(accumulateur,valeurCourante,index,array) {
	return accumulateur+valeurCourante.age / array.length;
},0);
/*On ajoute des amis à Luc avec la méthode qu'on a définit plus haut*/
Luc.ajouterAmis(Didier);
Luc.ajouterAmis(Denis);
/*Fonction qui permet de formater une Personne en chaîne de caractère , dans notre cas on le transforme en différentes balises de tableau
tout en y insérant ses attributs , à noter que c'est pas ouf de faire comme ça pour afficher qqlchose sur la page web et qu'il vaut mieux
utiliser le DOM , voir TP2*/
Personne.prototype.toHtmlRow=function(){
	return "<tr>"
			+"<td>"+this.nom+"</td>"
			+"<td>"+this.prenom+"</td>"
			+"<td>"+this.mail+"</td>"
			+"<td>"+this.age+"</td>"
			+"</tr>";
}
/*Permet de savoir si une personne est ami avec la personne donnée en argument*/
Personne.prototype.estAmis = function(p) {
					if(this.amis.indexOf(p) != -1) { /*La fonction indexOf renvoie l'indice d'un élement qui est contenu dans un tableau, si la valeur renvoyée vaut -1 alors il n'est pas dans le tableau*/
						return true;
					}else {
						return false;
					}
}
/*Même cas que toHtmlRow, là c'est pour ses amis*/
Personne.prototype.toHtml = function() {
	var concattable = "<tr><td>Amis:</td></tr>";
	this.amis.forEach( (ami,i) => {
				concattable = concattable + "<tr>"
			+"<td>"+ami.prenom+"</td>"
			+"<td>"+ami.nom+"</td>"
			+"</tr>"
		}
);

return concattable;
}
/*On affiche dans la page le tableau des personnes, la fonction document writeln est pas ouf car elle recharge la page pour écrire sur le document
pour le faire sur la même page , on va chercher à utiliser du DOM */
function AfficherTable(personnes){

document.writeln("<table class='_b1'><thead><th>Nom</th><th>Prénom</th><th>Mail</th><th>Age</th></thead>");
document.writeln("<tbody>");
	personnes.forEach(function(p){
		document.writeln(p.toHtmlRow());
		if(p.amis.length > 0) {
				document.writeln(p.toHtml());
			}
	})
	document.writeln("</tbody></table>");
if(Luc.estAmis(Pierre)) {
	document.writeln("<p>Meilleurs amis du monde<p>");
}
if(Luc.estAmis(Denis)) {
	document.writeln("<p>Meilleurs amis du monde<p>");
}
document.writeln("<p>Age Moyen : "+age.toFixed(2)+"</p>");
}
