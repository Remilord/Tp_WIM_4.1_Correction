/*Première méthode non approuvé par Denis, du coup je la commente pas mais vous pouvez toujours regarder*/
/*A noter que l'exercice est pas spécialement intéressant et il est un peu relou*/
/*Il est aussi fortement conseillé de lire l'énoncé de l'exo du TP plusieurs fois pour bien comprendre l'énoncé*/
/*window.onload = () => {
      var tooltipmans = document.querySelectorAll('[data-tooltip]');
      tooltipmans.forEach( (element) => {
          var span = document.createElement("span");
          span.setAttribute('class',"tooltip");
          span.textContent = element.getAttribute("data-tooltip");
          if(element.nodeName == "IMG"){
              var div = document.createElement("div");
              var img =element.cloneNode(true);
              img.addEventListener("mouseover",(el) => {
                    span.style.display ="inline-block";
              });
              img.addEventListener("mouseout",(el) => {
                      span.style.display ="none";
              });
              div.appendChild(img);
              div.appendChild(span);
              document.body.replaceChild(div,element);
          }else {
            element.addEventListener("mouseover",(el) => {
                  span.style.display ="inline-block";
            });
            element.addEventListener("mouseout",(el) => {
                    span.style.display ="none";
            });
          element.appendChild(span);
        }
      }
    );
}*/
/*Au chargement de la page*/
window.onload = () => {
          var span = document.createElement("span"); /*On crée un élement span*/
          span.setAttribute('class',"tooltip");/*Qui a comme classe CSS , la classe tooltip définie par Denis dans l'HTML (en HTML ça donne <span class="tooltip"></span>)*/
          document.body.appendChild(span); /*On ajoute au body le span*/
          document.body.addEventListener( "mousemove",(ev) => { /*Au body on ajoute un événement de souris qui bouge*/
             /* on repositionne le span par rapport au position de la souris dans le body du document HTML, en changeant dans son style sa position left et top*/
                  span.style.top = ev.clientY; /*position y de la souris*/
                  span.style.left = ev.clientX; /*position x de la souris*/
          },true);
          document.body.addEventListener("mouseleave",(ev) => { /* Au body on ajoute un événement lorsque la souris quitte un élement de la page HTML*/
                          span.style.display ="none"; /*Lorsqu'on quitte un élement HTML du body , alors on désactive l'affichage de notre span*/
          },true);
          document.body.addEventListener("mouseenter",(ev) => { /*Au body on ajoute un événement lorsque la souris entre dans un élement de la page HTML*/
                if(ev.target.getAttribute('data-tooltip') != null ) { /*Si l'élement auquel on entre possède l'attribut "data-tooltip" (voir HTML) alors le span va s'adapter*/
                  span.style.display ="inline"; /* on affiche donc le span*/
                  span.textContent = ev.target.getAttribute('data-tooltip'); /* et le text du span va correspondre à la valeur de l'attribut data-tooltip (voir HTML et énoncé du TP)*/
                }
          },true);
          /*IMPORTANT : lorsque vous ajouter un listener à un élement de votre HTML avec la méthode addEventListener , la fonction prend deux arguments , une fonction qui s'active à
          chaque fois que l'événement est réalisé et un booléen, qui permet de dire si votre événement réagit à chaque élements contenu dans l'élément cible , dans le doute mettez toujours true*/
          /*Il est possible de zapper cet argument, mais mettez true c'est mieux*/
};
