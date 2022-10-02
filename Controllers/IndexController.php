<?php

namespace Controllers;

use Core\Http\AbstractController;
use Core\Http\Response;
use Models\Students;

class IndexController extends AbstractController
{
    public function index()
    {
        Response::json(Students::all()->toArray(), 200);
    }
}