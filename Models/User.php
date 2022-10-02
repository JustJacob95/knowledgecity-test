<?php

namespace Models;

use Core\Encryption\Token;
use Core\Http\Response;
use Core\Model\AbstractModel;
use Core\Database\QueryBuilder;

class User extends AbstractModel
{
    public static $table = 'api_users';
    public static $fields = ['id','username', 'token'];
    public static $primary = 'id';
    public $attributes = [];


    public static function checkBearerToken($token)
    {
        return QueryBuilder::find(self::$table, self::$fields, ['token' => $token]);
    }

    public static function login($username, $password)
    {
        //todo some brute force protection methods
        $user = self::find(['username' => $username, 'password' => md5($password)]);
        if ($user) {
            if (!is_null($user->get('token'))) {
                return $user;
            }
            else{
                $user->update(['token' => Token::generateToken($user->get('id'))]);
                return $user;
            }
        }
        return false;
    }
}