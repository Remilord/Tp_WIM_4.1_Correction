<?php 
$dir = dirname(__FILE__);
require_once "$dir/include/idiorm/idiorm.php";
require_once "$dir/include/paris/paris.php";

ORM::configure('mysql:host=localhost;dbname=');
ORM::configure('username', '');
ORM::configure('password', '');


class Contacts extends Model {
}
?>
