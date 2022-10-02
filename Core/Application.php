<?php

namespace Core;

use Core\Http\Routers;

class Application
{

    protected function initConfiguration()
    {
        include_once '..' . DIRECTORY_SEPARATOR  . 'config.php';
    }

    protected function initRouters()
    {
        include_once '..' . DIRECTORY_SEPARATOR . 'routers' .DIRECTORY_SEPARATOR. 'api.php';
        Routers::match();
        return true;
    }

    public function run()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        $this->initConfiguration();
        $this->initRouters();
    }
}