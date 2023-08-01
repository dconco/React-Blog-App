<?php
require './index.php';
$route = new Route();

$api_dir = __DIR__ . '/api/';
$route->add("/upload", $api_dir . "uploads/upload.php");