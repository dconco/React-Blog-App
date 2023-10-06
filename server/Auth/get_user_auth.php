<?php
$db = new DB();
$get_req = $db->GET_USERS("WHERE user_id = '{$get_id}'");

$data = [];
$response = [];

if (array_key_exists("query", $get_req)) {
    if ($get_req["query"]->num_rows > 0) {
        $res = $get_req["query"]->fetch_assoc();

        $data = [
            "status" => 200,
            "statusText" => "OK",
            "data" => $res,
            "message" => "Get User Request Successfull.",
        ];
    } else {
        $res = "No User Found as $get_id";

        $data = [
            "status" => 404,
            "statusText" => "Not Found",
            "message" => $res,
        ];
    }

    $response = $data;
} else {
    $response = $get_req;
}
