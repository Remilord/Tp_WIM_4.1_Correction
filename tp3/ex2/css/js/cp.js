/*Version avec son propre serveur , trois types de fichiers (txt,json et xml)*/
/*Au chargement de la page*/
window.onload = () => {
    console.log("wtf");
        var loupe = document.getElementById("chercher");
        console.log(loupe);
        loupe.addEventListener("click",(ev) => {
          ev.preventDefault();
              var valuechamp = document.getElementById("codep");
              console.log(valuechamp);
        },true);
};
