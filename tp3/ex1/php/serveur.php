<?php
header('content-Type : x-www-form-urlencoded');
usleep(mt_rand(100000,500000));
echo file_get_contents("php://input");
?>
