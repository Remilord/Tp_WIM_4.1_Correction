<?php
$rand = rand(1,3);
$data = array();
header('Content-Type: application/json');
if($rand == 1) {
$data['coup'] = "pierre";
}else if($rand == 2) {
$data['coup'] = "feuille";
}else if($rand == 3) {
$data['coup'] = "ciseaux";
}
echo json_encode($data);
 ?>
