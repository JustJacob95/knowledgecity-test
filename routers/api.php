<?php

use Core\Http\Routers;
use Middleware\Auth;

Routers::registerRouter('POST', '/auth/', \Controllers\AuthController::class, 'auth');
//Routers::registerRouter('GET', '/', \Controllers\IndexController::class, 'index');
Routers::middleware(Auth::class, 'userIsLoggedIn',  function() {
//no need create extra endpoint to logout because we use jwt
//    Routers::registerRouter('DELETE', '/auth', \Controllers\AuthController::class, 'logout');
    Routers::registerRouter('GET', '/users', \Controllers\UserController::class, 'userList');
});
