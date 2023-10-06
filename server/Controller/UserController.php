<?php
$method = $_SERVER["REQUEST_METHOD"];
$uri = $_REQUEST["uri"];
$url = explode("?", $uri);
$req_uri = preg_replace("/(^\/)|(\/$)/", "", $url[0]);

require "Models/database.php";

header('Content-Type: Application/json', false);
switch ($req_uri) {
    case "api/v1/account/register":
        /**
         * REGISTER ENDPOINT
         */
        $response = [];

        // if Request Method is not POST
        if ($method !== "POST") {
            $response = [
                "status" => 405,
                "statusText" => "Method Not Allowed",
                "message" =>
                    "The method used in the request is not allowed for the resource.",
            ];
        } else {
            /* MAIN ENDPOINT */
            $req_data = json_decode(file_get_contents("php://input"), true);

            if ((empty($req_data["fullname"]) || empty($req_data["email"]) || empty($req_data["password"])) || 
                strlen($req_data["password"]) < 5 || !filter_var($req_data["email"], FILTER_VALIDATE_EMAIL)) {
                
                $response = [
                    "status" => 400,
                    "statusText" => "Bad Request",
                    "message" => "Invalid Request Body",
                ];
            } else {
                $user = [
                    "fullname" => htmlspecialchars($req_data["fullname"]),
                    "email" => htmlspecialchars($req_data["email"]),
                    "password" => htmlspecialchars($req_data["password"]),
                ];

                require "Auth/signup_auth.php";
            }
        }

        /* RETURN RESPONSE TEXT */
        header("HTTP/1.1 {$response["status"]} {$response["statusText"]}");

        $res = json_encode($response);
        echo $res;

        break;
    /* // END REGISTER ENDPOINT */


    case "api/v1/account/login":
        /**
         * LOGIN ENDPOINT
         */
        $response = [];

        // if Request Method is not POST
        if ($method !== "POST") {
            $response = [
                "status" => 405,
                "statusText" => "Method Not Allowed",
                "message" =>
                    "The method used in the request is not allowed for the resource.",
            ];
        } else {
            /* MAIN ENDPOINT */
            $req_data = json_decode(file_get_contents("php://input"), true);

            if (
                empty($req_data["email"]) ||
                empty($req_data["password"])
            ) {
                $response = [
                    "status" => 400,
                    "statusText" => "Bad Request",
                    "message" => "Invalid Request Body",
                ];
            } else {
                $user = [
                    "email" => htmlspecialchars($req_data["email"]),
                    "password" => htmlspecialchars($req_data["password"]),
                ];

                require "Auth/login_auth.php";
            }
        }

        /* RETURN RESPONSE TEXT */
        header("HTTP/1.1 {$response["status"]} {$response["statusText"]}");

        $res = json_encode($response);
        echo $res;

        break;
    /* // END LOGIN ENDPOINT */


    case "api/v1/user/{$req['user_id']}":
        /**
         * GET USER ENDPOINT
         */

        $response = [];

        // if Request Method is not POST
        if ($method !== "GET") {
            $response = [
                "status" => 405,
                "statusText" => "Method Not Allowed",
                "message" =>
                    "The method used in the request is not allowed for the resource.",
            ];
        } else {
            $get_id = $req["user_id"];
            include_once "Auth/get_user_auth.php";
        }

        /* RETURN RESPONSE TEXT */
        header("HTTP/1.1 {$response["status"]} {$response["statusText"]}");

        $res = json_encode($response);
        echo $res;

        break;


    /* UPLOAD ENDPOINT */
    case "api/v1/upload":
        /**
         * GET USER ENDPOINT
         */

        $response = [];

        // if Request Method is not POST
        if ($method !== "POST") {
            $response = [
                "status" => 405,
                "statusText" => "Method Not Allowed",
                "message" =>
                    "The method used in the request is not allowed for the resource.",
            ];
        } else {
            $get_id = $req["user_id"];
            $req_data = json_decode(file_get_contents("php://input"), true);
            
            include_once "Auth/upload_auth.php";
        }

        /* RETURN RESPONSE TEXT */
        header("HTTP/1.1 {$response["status"]} {$response["statusText"]}");
        
        $res = json_encode($response);
        echo $res;

        break;

    default:
        $response = [
            "status" => 404,
            "statusText" => "Not Found",
            "message" => "API Request Not Found",
        ];

        header("HTTP/1.1 404 Not Found");
        exit(json_encode($response));
}
