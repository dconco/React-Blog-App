<?php

require('Controller/BaseController.php');

$route = new Route();

$api_dir = 'Controller/UserController.php';

// Register API's
$route->add("/api/v1/account/register", $api_dir);
$route->add("/api/v1/account/login", $api_dir);
$route->add("/api/v1/user/new/upload", $api_dir);
$route->add("/api/v1/user/{user_id}", $api_dir);