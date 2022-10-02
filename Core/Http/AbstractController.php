<?php

namespace Core\Http;

abstract class AbstractController
{
    public $request;

    public function __construct()
    {
        $this->request = Request::getInstance();
    }
}