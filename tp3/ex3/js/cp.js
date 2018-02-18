/*Version avec son propre serveur , trois types de fichiers (txt,json et xml)*/
/*L'exo est quasiment identique que le deux , vous vous connectez juste à un serveur qui vous envoie tout en JSON, il suffit de bien l'exploiter*/
window.onload = () => {
  var loupe = document.getElementById("chercher");
  loupe.addEventListener("click",(ev) => {
    ev.preventDefault();
    /*On reset les champs */
    var selectreset = document.getElementById("villes");
    selectreset.innerHTML = "";
    var departementreset = document.getElementById("departement");
    departementreset.value="";
    var valuechamp = document.getElementById("codep");
    var cpvalue = encodeURIComponent(valuechamp.value);
    var params = "&q=code_postal:"+cpvalue+"&facet=nom_reg&facet=code_dept&facet=nom_dept&facet=statut&facet=insee_com" // les paramètres sont spécifiés ainsi , et le site impose un accès avec la méthode GET
    var promesse = new Promise( (resolve,reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET","https://data.opendatasoft.com/api/records/1.0/search/?dataset=code-postal-code-insee-2015@public"+params); // on envoie les différents paramètres , dans notre cas seul le code postal est dynamique
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //le serveur attend une réponse en GET , encoder en URL
      xhr.onload = function() {
        if(xhr.status == 200 && JSON.parse(xhr.responseText)["nhits"] != 0) { // si le serveur renvoie un JSON avec nhits == 0 , alors il n'a trouvé aucun code postal correspondant
          resolve(xhr.responseText);
        }else {
          reject(xhr.responseText);
        }
      }
      xhr.onerror = function() {
        reject("Erreur reseau pouloulou");
      }
      xhr.onprogress = function() {
        document.getElementById("working").style.visibility = "visible"; // bon enfait c'est tellement rapide qu'on voit pas le petit spinner, mais c'est pour voir un icone de loading
      }
      xhr.send(null);
    });
    promesse.then(
      function(valeuretour) { /* FONCTION RESOLVE*/
        var errorcss = document.getElementById("nt");
        errorcss.style.display = "none";
        var decodevaleuretour = JSON.parse(valeuretour);
        var champs = [];
        champs[1] = decodevaleuretour["records"][0]["fields"].nom_dept; // on decode le JSON reçu , il est important de voir à quoi il ressemble pour retrouver les bons champs , pour cela afficher le dans la console par exemple
        var arraycommune = [];// Pour un même code postal , il peut il y avoir plusieurs Communes qui ont le même nom , on les supprimes à l'aide de cette méthode
        for(var i =0;i<decodevaleuretour["records"].length;i++) {
            if(arraycommune.indexOf(decodevaleuretour["records"][i]["fields"].nom_de_la_commune) == -1) {
                  arraycommune.push(decodevaleuretour["records"][i]["fields"].nom_de_la_commune);
            }
        }
        var count = arraycommune.length; // on récupère le nombre de communes
        arraycommune.forEach((element,i) => { // on rempli le select avec des options (il peut y avoir plusieurs communes pour un même code postal)
        champs[0] = element;
        var select = document.getElementById("villes");
        var option = document.createElement("option");
        option.textContent = champs[0];
        select.appendChild(option);
      });
        var departement = document.getElementById("departement");
        departement.value = champs[1];
        document.getElementById("indication").textContent = count+" Communes correspondantes";
        document.getElementById("working").style.visibility = "hidden"; // on enlève le spinner
      },
      function(erreurRetour) { /*FONCTION REJECT */
        document.getElementById("indication").textContent ="";
        var errorcss = document.getElementById("nt"); // on affiche une erreur
        errorcss.style.display = "inline-block";
        document.getElementById("working").style.visibility = "hidden";
      }
    )
  },true);
};
