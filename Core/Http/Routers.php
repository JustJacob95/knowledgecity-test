<?php

namespace Core\Http;

class Routers
{
    static $registeredRouters = [];
    static $currentMiddleware = [];

    public static function match()
    {
        $request = Request::getInstance();
        foreach (self::$registeredRouters as $path => $route)
        {
            if (
                $route['httpMethod'] === $request->server['REQUEST_METHOD'] &&
                $path === parse_url($request->server['REQUEST_URI'], PHP_URL_PATH)
            )
            {
                if ($route['middleware'])
                {
                    $middlewareObject = new $route['middleware'][0]();
                    $middlewareObject->{$route['middleware'][1]}();
                }
                $class = new $route['class']();
                $class->{$route['classMethod']}($request);
            }
        }

        //not found


        //if its not any of router return our react app
        Response::html(file_get_contents($_SERVER["DOCUMENT_ROOT"] . DIRECTORY_SEPARATOR . 'index.html'),200);
    }

    public static function registerRouter($httpMethod, $path, $controllerClass, $controllerMethod)
    {

        //todo Make more complicated pattern for $path, to allow use something like /users/:userId/show if needed

        self::$registeredRouters[$path] = [
            'class' => $controllerClass,
            'classMethod' => $controllerMethod,
            'httpMethod' => $httpMethod,
            'middleware' => self::$currentMiddleware
        ];

    }

    public static function middleware($middleware, $middlewareMethod, $callback)
    {
        //keep current middleware scope to call it if router is match
        self::$currentMiddleware = [$middleware, $middlewareMethod] ;
        $callback();
        //clear middleware data for router register
        self::$currentMiddleware = [];
    }
}