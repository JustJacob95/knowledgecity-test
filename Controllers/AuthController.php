<?php

namespace Controllers;

use Core\Http\AbstractController;
use Core\Http\Request;
use Core\Http\Response;
use Models\User;

class AuthController extends AbstractController
{
    public function auth()
    {
        $request = Request::getInstance();
        $user = User::login($request->params['username'], $request->params['password']);
        if ($user) {
            Response::json($user->attributes, 200);
        }
        else{
            Response::json(['message' => 'Incorrect username or password'], 401);
        }
    }

    public function logout()
    {

    }
}