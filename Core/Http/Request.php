<?php

namespace Core\Http;


class Request
{
    public $params;
    public $headers;
    public $server;

    private static $instance;

    protected function __construct()
    {
        $this->prepareRequest();
    }

    public function prepareRequest()
    {
        //todo not coverage all cases, example FILES
        $this->server = $_SERVER;
        $params = [];
        $url_components = parse_url($this->server['REQUEST_URI']);
        if (count($url_components) && isset($url_components['query'])) {
            parse_str($url_components['query'], $params);
        }
        if (
            json_decode(file_get_contents("php://input")) !== null &&
            count($params)
        ) {
            $this->params = array_merge(json_decode(file_get_contents("php://input"), true), $params);
        }
        elseif(json_decode(file_get_contents("php://input")) !== null){
            $this->params = json_decode(file_get_contents("php://input"), true);
        }
        elseif(count($params)){
            $this->params = $params;
        }

        $this->headers = getallheaders();
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new static();
        }
        return self::$instance;
    }


    function getAuthorizationHeader(){
        $headers = null;
        if (isset($this->server['Authorization'])) {
            $headers = trim($this->server["Authorization"]);
        }
        else if (isset($this->server['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($this->server["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    function getBearerToken() {
        $headers = self::getAuthorizationHeader();
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }
}