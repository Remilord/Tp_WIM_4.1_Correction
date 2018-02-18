<?php
/*On met un header php pour spécifié le type de données qu'on va recevoir , dans notre cas le js va envoyer un code postal encodé en URI*/
    header('content-Type : x-www-form-urlencoded');
    /*On recupère les données qu'on a reçu*/
    $input = file_get_contents("php://input");
    /*On recupère la valeur de l'argument du code postal en séparant la chaine*/
    $cp = explode("=",$input);
    /*On decode la valeur qu'on a reçu encodé en URI*/
    $cp[1] = urldecode($cp[1]);
    /*URL TXT METHODE*/
    /*if(file_exists("cp-".$cp[1].".txt")) {
    echo file_get_contents("cp-".$cp[1].".txt");
  }else {
    echo "not exists";
  }*/
  /*XML METHODE*/
  /*if(file_exists("cp-".$cp[1].".xml")) {
  echo file_get_contents("cp-".$cp[1].".xml");
}else {
  echo "not exists";
}*/
/*JSON METHODE*/
/*On regarde si le fichier existe*/
if(file_exists("cp-".$cp[1].".js")) {
echo file_get_contents("cp-".$cp[1].".js");
}else {
echo "not exists";
}
 ?>
