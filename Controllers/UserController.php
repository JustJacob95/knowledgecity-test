<?php

namespace Controllers;


use Core\Http\AbstractController;
use Core\Http\Response;
use Models\Students;

class UserController extends AbstractController
{
    public function userList()
    {
        Response::json([
            'totalCount' => Students::count(),
            'limit' => Students::$limit,
            'items' => Students::all()->toArray()
        ], 200);
    }
}
