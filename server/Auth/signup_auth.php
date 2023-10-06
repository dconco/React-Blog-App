<?php
$db = new DB();

$user_id = "";
for ($i = 0; $i < 2; $i++) {
    $id = rand(time(), 99999999);
    $user_id .= $id;
}

$user_data = [
    "user_id" => $user_id,
    "fullname" => $user["fullname"],
    "email" => $user["email"],
    "password" => password_hash($user["password"], PASSWORD_DEFAULT),
];

$send = $db->POST("users", $user_data);
$response = $send;