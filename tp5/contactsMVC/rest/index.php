<?php

// include 

require 'Slim-2.6.0/Slim/Slim.php';
require './models/model.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->get('/contacts(/:id)', 'getContacts');
$app->post('/contacts', 'addContact');
//$app->delete('/contacts/:id','deleteContact');
//$app->put('/contacts/:id','updateContact');

$app->run();

function updateContact($id){
// A Completer
	}
function deleteContact($id){
//A Completer
	}

function addContact(){

	$response= \Slim\Slim::getInstance()->response();
	$request = \Slim\Slim::getInstance()->request();

	$contact_assoc = json_decode($request->getBody(),true);
	$contact = Contacts::create($contact_assoc);
	$contact->save();
	$id=$contact->id();
	$response -> setStatus(201);
	$response -> headers->set('Location','/contacts/'.$id);
}

function getContacts($id=null) {


	$response=\Slim\Slim::getInstance()->response();
	$response->headers->set("Access-Control-Allow-Origin","*");
	$response->headers->set('Content-Type', 'application/json');
	if (!isset($id)){
		$response->setStatus(200);
		echo '{"contacts":'.json_encode(Contacts::find_array())."}";
	}
	else
	{
		if ($contact = Contacts::find_one($id))
		{
			$response->setStatus(200);
			echo json_encode($contact->as_array());
		}
		else
			$response->setStatus(404);
	}
}
?>
