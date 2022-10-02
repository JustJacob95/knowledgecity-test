<?php

namespace Models;

use Core\Model\AbstractModel;

class Students extends AbstractModel
{
    public static $table = 'students';
    public static $fields = ['id','first_name', 'last_name', 'nickname', 'status'];
    public static $primary = 'id';
    public static $limit = 5;
    public $attributes = [];
}