<?php

namespace Core\Database;

use Core\Config;
use PDO;

class DbConnection
{

    protected $db;

    private static $instance;


    protected function __construct()
    {
        try {
            $this->db = new PDO('mysql:host=' . Config::$configuration['db_host'] . ':' .Config::$configuration['db_port'] .  ';dbname='.Config::$configuration['db_name'], Config::$configuration['db_user'], Config::$configuration['db_pwd']);
        } catch (PDOException $e) {
            echo "Error!: " . $e->getMessage() . "<br/>";
            exit;
        }
    }

    public function query($query)
    {
        return $this->db->query($query);
    }

    public static function getConnection()
    {
        if (!self::$instance) {
            self::$instance = new static();
        }
        return self::$instance;
    }
}