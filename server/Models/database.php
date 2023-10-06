<?php
/**
 * DATABASE ENDPOINT
 */
class DB
{
    /**
     * CONNECTION TO DATABASE
     **/

    public $conn;
    public $response = [];
    public $get_last_insert_user;

    public function __construct()
    {
        try {
            session_start();
            $this->conn = new mysqli("localhost", "root", "", "react_blog");
        } catch (error) {
            http_response_code(1001);
            exit("Connection Refused!");
        }
    }

    /**
     * GET REQUEST FROM DATABASE
     **/
    function GET(string $table, string $data = "*", string $option)
    {
        if (empty($table)) {
            $this->response = [
                "status" => 400,
                "statusText" => "Bad Request",
                "message" => "First GET Parameter is required!",
            ];

            return $this->response;
        }

        if (empty($data)) {
            $sql = "SELECT * FROM {$table} {$option}";
        } else {
            $sql = "SELECT {$data} FROM {$table} {$option}";
        }

        if ($this->conn->query($sql)) {
            $this->response = [
                "status" => 200,
                "statusText" => "OK",
                "query" => $this->conn->query($sql),
                "message" => "Successfully Get Requested Users.",
            ];
        } else {
            $this->response = [
                "status" => 500,
                "statusText" => "Server Internal Error",
                "message" => "Error Occured! Get Request Terminated!",
            ];
        }

        return $this->response;
    }

    /**
     * POST REQUEST TO DATABASE
     **/
    function POST(string $table, array $data)
    {
        if ((array_key_exists("email", $data) || array_key_exists("user_id", $data)) && $table == "users") {
            $get_email = $this->GET(
                $table,
                "email",
                "WHERE email = '{$data["email"]}' OR user_id = '{$data["user_id"]}'"
            );

            if ($get_email["query"]->num_rows > 0) {
                $this->response = [
                    "status" => 403,
                    "statusText" => "Forbidden",
                    "message" => "The Email or User ID has already been used.",
                ];

                return $this->response;
            }
        }

        $data_key = "";
        $data_value = "";
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $data_key .= $key . ", ";
                $data_value .= "'{$value}'" . ", ";
            } else {
                $data_key .= $key . ", ";
                $data_value .= $value . ", ";
            }
        }

        $data_key = substr($data_key, 0, strlen($data_key) - 2);
        $data_value = substr($data_value, 0, strlen($data_value) - 2);

        $sql = "INSERT INTO {$table} (
            {$data_key}
        ) VALUES (
            {$data_value}
        )";

        if ($this->conn->query($sql)) {
            $this->get_last_insert_user = $this->GET($table, "*", "WHERE id = {$this->conn->insert_id}");

            $this->response = [
                "status" => 200,
                "statusText" => "OK",
                "data" => $this->get_last_insert_user["query"]->fetch_assoc(),
                "message" => "User Registered Successfully.",
            ];
        } else {
            $this->response = [
                "status" => 500,
                "statusText" => "Server Internal Error",
                "message" => "Error Occured! Registration Terminated!",
            ];
        }

        return $this->response;
    }

    function UPDATE(string $table, array $data, array $option)
    {
    }

    function DELETE(string $table, array $option)
    {
    }

    /**
     * GET ALL USERS FROM DATABASE
     **/
    function GET_USERS(string $option = "WHERE id=1")
    {
        return $this->GET("users", "", $option);
    }
}
