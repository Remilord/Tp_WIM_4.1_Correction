/*Comme c'est le premier exercice, il est "beaucoup" commenté, pour expliquer la différente syntaxe du javascript, le plus compliqué et le plus important c'est la syntaxe
des expressions fléchées de fonction ( () => {})*/

/*On créer un objet JAVASCRIPT appelé Memory qui va contenir plusieurs méthodes ainsi que plusieurs attributs (comme en java en gros), pour le coup c'est pas l'idéal
mais l'HTML nous impose de créer cet objet avec la méthode Jouer (on le voit avec le Memory.Jouer() lorsqu'on clique sur le bouton commencer) */

/*A noter que j'utilise les expressions fléchées càd la syntaxe pour certaines fonction (arg1,arg2 ...) => {} qui est très utile pour éviter des erreurs de portés de variables
c'est un peu compliqué à comprendre, mais il faut retenir que c'est cool*/

var Memory =
{
/*On dispose d'un tableau où on va stocker le statut de toutes les images , si c'est éteint ou non*/
images:[],
/*Pas obligatoire mais on dispose d'un tableau qui pour chaque lampes,decrit leur statut lors du début de jeu (si elles ont été allumées ou non lorsqu'on initialise le jeu)*/
eteintes:[],
 /*On dispose du nombre de lampes pour savoir combien de lampes ont été allumées lors du commencement de la partie (utile pour savoir la condition de victoire)*/
nb:0,
/*Méthode initalisant la partie*/
Init:function() {
  /*On recupère toutes les images du document et on le stocke dans le tableau des images*/
        this.images = Array.from(document.images);
        /*On initialise le tableau éteintes ainsi que le nombre de lampes*/
        this.eteintes = new Array();
        this.nb=0;
        /*FALSE lorsque la lampe est éteinte , TRUE lorsque elle a été allumée*/
        for(m=0;m<this.images.length;m++) {
          this.eteintes[m] = false;
        }
        /*Au début de la partie, on désactive tous les clics de la souris sur les lampes et on met toutes les lampes avec l'image de lampe éteinte , c'est utile lorsqu'on relance des parties*/
        /*Bien retenir la syntaxe du forEach (équivalent d'une boucle explorant tous les éléments) qui est une méthode qu'on utilise sur les tableaux et qui prend en argument
        une fonction avec deux arguments : l'element que je suis entrain de parcourir ainsi qu'un indice qui permet de savoir au combientième d'élément je suis (pas nécéssaire pour le coup mais peut être utile)*/
        this.images.forEach( (amp,i) => {
          amp.src = "./images/off.png";
          amp.onclick = false;
        });
        /*On cache le message de défaite et de victoire en changeant le style des élements du document qui ont pour ID (id=... en html) perdu et gagne*/
        document.getElementById("perdu").style.visibility = 'hidden';
        document.getElementById("gagne").style.visibility = 'hidden';
},
/*Méthode pour allumer toutes les lampes*/
Allumer:function() {
  /*On réutilise la méthode forEach pour changer aléatoirement (une chance sur deux) chaques images de lampes éteintes en lampes allumées, on prévient
  aussi le tableau eteintes que telle ou telle lampe a été allumée tout en incrémentant le nombre de lampe qui ont été allumées*/
    this.images
    .forEach( (amp,i) => { /*amp c'est l'élement que je suis actuellement entrain de regarder dans le tableau image et i c'est le numéro de celui-ci*/
      if( (Math.random() > 0.5 )) {
      amp.src = "./images/on.png"; /*Pour changer l'image d'une lampe on utilise son attribut src*/
      this.eteintes[i] = true;
      if(this.eteintes[i]) {
        this.nb++;
      }
    }
  });
},
/*Hop hop on éteint les lampes*/
Eteindre:function() {
  this.images.forEach( (amp,i) => {
    amp.src = "./images/off.png"; /*On met la source de chaques ampoules à l'image correspondant à une lampe éteinte*/
    amp.onclick = ( () => { /*Désormais on va pouvoir cliquer sur chaque lampe, alors on va tous leurs mettre un Listener pour qu'elles réagissent au clique de la souris (onclick) un peu comme en java */
        /*Le gestionnaire du clique se fait à l'aide d'une fonction représentée par une expression fléchée () => {} , voir les raisons dans l'en-tête pour le choix de cette notation*/
        if(this.eteintes[i]) { /*Si la lampe sur laquelle on a cliqué correspondait bien à une lampe qui a été précedement éteintes aléatoirement alors*/
          amp.src="./images/on.png"; /* -on remet la source de l'image à une image d'ampoule allumée*/
          this.nb--; /*on diminue le nombre de lampe à trouver*/
          amp.onclick  = false; /*on enlève la fonction du clique de la souris pour éviter de recliquer dessus pour faire joujou*/
          if(this.nb == 0) { /*Condition de vicoire, qu'on vérifie à chaque fois qu'on clique sur une des lampes du coup*/
            document.getElementById("gagne").style.visibility = 'visible';
          }
        }else { /*Condition de défaite*/
          document.getElementById("perdu").style.visibility = 'visible';
          alert("perdu");
        }
    });
  })
},
/*Il s'agit de la fonction motrice du jeu , elle est imposée par le html de denis avec l'appel du bouton commencer qui l'appelle lorsqu'on clique sur le bouton*/
Jouer:function() {
  this.Init();
  this.Allumer(); /*On allume les lampes*/
  setTimeout( ()=>{ return this.Eteindre();} ,1000); /*Puis on les eteint à un certain interval*/
}

};
