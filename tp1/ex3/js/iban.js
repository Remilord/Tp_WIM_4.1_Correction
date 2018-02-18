/*Dans mon html j'ai appelé la fonction Init de l'objet Iban à partir du chargement du body, donc je crée l'objet suivant*/
/*L'exercice est pas super intéréssant*/
var Iban = {
  blocs:[], /*Correspond à un tableau contenant tous les champs de texte de la page HTMl*/
  /*J'ai ajouté la fonction Verify (qui est une fonction appelé à chaque fois qu'une touche du clavier est tapée lorsque je suis dans un champ de texte) à tout les inputs de mon HTML,
  mais c'est pas la méthode la plus pratique, le mieux c'est de les ajouter directement à partir
  du javascript et du DOM avec une boucle (voir exemple dans la méthode INIT)*/
  Verify:function() {
          var bloc = event.srcElement || event.target; /*on récupère la cible de l'évenement keypress dans notre cas on recupère le bloc où l'utilisateur est actuellement entrain de taper*/
        if(bloc.value.length >= 3 && !this.isLast(bloc)) {  /*on regade si la taille de la chaîne de caractère contenue dans l'input est supérieur à 4 caractères ou non*/
          var index = this.blocs.indexOf(bloc); /*on récupère le numéro de l'input*/
          this.blocs[index+1].focus(); /*on donne "le focus" à l'input suivant*/
        }else if(bloc.value.length >= 3 && this.isLast(bloc)) { /*Si le bloc en question est le dernier alors on donne le focus au bouton valider*/
          document.getElementById('valider').focus();
}
  },
  /*Permet de savoir si le bloc est le dernier de la chaîne ou non*/
  isLast:function(bloc) {
      return this.blocs.indexOf(bloc) == this.blocs.length-1;
  },
  /*J'initialise le tableau de blocs avec les champs, qui ont pour TagName (leur type en gros) input*/
  /*A noter que la méthode DOM de getElementsByTagName renvoie une collection d'élément qui est relou à manipuler, on le convertit en
  tableau classique avec la méthode Array.from(...);*/
  Init:function() {
        this.blocs = Array.from(document.getElementsByTagName('input'));
        /*EXEMPLE D'AJOUT D'EVENEMENTS A TOUT LES INPUTS SANS PASSER PAR L'HTML
        this.blocs.forEach((bloc) => {
            bloc.addEventListener("keypress",() => {this.Verify()});
        });*/
  }
}
