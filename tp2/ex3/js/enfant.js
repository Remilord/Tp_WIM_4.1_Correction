/*Au chargement de la page*/
window.onload= () => {
  var formulaire = document.getElementById("form"); /*On récupère le bouton valider du formulaire*/
  formulaire.addEventListener("submit",(ev) => { /*Lorsqu'on appuie sur le bouton */
    ev.preventDefault();/*on enlève l'action par défaut*/
    var divenfants = document.getElementById("listenfants"); /*On récupère la div qui contient tout les champs des enfants*/
    if(divenfants != null) { /*si ils ont été créées précédement , on les supprimes */
      document.body.removeChild(divenfants);
    }
    var listederoulante = document.getElementById("enfant"); /*on récupère la liste déroulante du HTML*/
    var div = document.createElement("div"); /*On crée un élément virtuel div*/
    for(i=1;i<=listederoulante.value;i++) {/*On récupère le nombre d'enfants sélectionné par la liste déroulante et pour chaque enfant on crée*/
      var input = document.createElement("input");/*Une balise input*/
      input.id="enfant"+i; /*Avec un id */
      var label = document.createElement("label");/*et un label (pour afficher le texte au dessus)*/
      label.htmlFor ="enfant"+i;/*le label correspond à l'id de l'input précédement créée*/
      label.textContent = "Prénom enfant " + i; /*Le texte du label */
        div.appendChild(label);/*On ajoute à la div le label*/
      div.appendChild(input);/*et l'input crée précédement, à noter que la div , le label et l'input sont virtuels pour le moment*/
      div.id="listenfants";/*on ajoute un id à la div pour la supprimer si nécéssaire*/
    }
    /*On ajoute au body la division virtuel , le body étant un vrai élément HTML , on verra donc la différence sur notre page*/
    document.body.appendChild(div);
  });
}
