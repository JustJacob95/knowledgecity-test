<?php

namespace Middleware;

use Core\Http\Request;
use Core\Http\Response;
use Models\User;

class Auth
{
    public function userIsLoggedIn()
    {
        $request = Request::getInstance();
        if (
            $request->getBearerToken() &&
            User::checkBearerToken($request->getBearerToken())
        ) {
            return true;
        }
        else{
            $this->failed();
        }
    }

    public function failed()
    {
        Response::json(['message' => 'Unauthorized'], 401);
    }
}