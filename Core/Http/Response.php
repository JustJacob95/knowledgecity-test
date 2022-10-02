<?php

namespace Core\Http;

class Response
{
    //not good way, first need define some common headers
    public static function json($data, $responseCode)
    {
        http_response_code($responseCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    public static function html($html, $responseCode)
    {
        http_response_code($responseCode);
        header('Content-Type: text/html; charset=utf-8');
        echo $html;
        exit;
    }
}