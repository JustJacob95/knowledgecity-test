<?php

namespace Core\Model;

use Core\Database\QueryBuilder;
use Core\Http\Request;

abstract class AbstractModel
{

    public $attributes = [];

    public function __construct($attributes)
    {
        $this->attributes = $attributes;
    }

    protected static function getTable()
    {
        return \get_called_class()::$table;
    }

    protected static function getFields()
    {
        return \get_called_class()::$fields;
    }

    protected static function getPrimaryField()
    {
        return \get_called_class()::$primary;
    }

    protected static function getLimitCollection()
    {
        return \get_called_class()::$limit;
    }


    public static function all()
    {
        $models = [];
        $page = isset(Request::getInstance()->params['page']) ? Request::getInstance()->params['page'] : 0;
        $offset = $page - 1;
        $offsetToSql = $offset > 0 ? self::getLimitCollection() * $offset : 0;
        foreach (QueryBuilder::getAll(self::getTable(), self::getFields(), self::getLimitCollection(), $offsetToSql) as $row)
        {
            $classModel = get_called_class();
            $models[] = new $classModel($row);
        }

        return new Collection($models);
    }

    public static function find($filter)
    {
        $classModel = get_called_class();
        $result = QueryBuilder::find(self::getTable(), self::getFields(), $filter);
        if ($result) {
            return new $classModel($result);
        }
        else{
            return false;
        }

    }

    public function get($attribute)
    {
        return $this->attributes[$attribute];
    }

    public function getAttributes()
    {
        return $this->attributes;
    }

    public static function count()
    {
        $result = QueryBuilder::count(self::getTable());
        return $result;
    }

    public function update($fields){
        $result = QueryBuilder::update(self::getTable(), $fields, [self::getPrimaryField() => $this->attributes[self::getPrimaryField()]]);
        if ($result) {
            foreach ($fields as $field => $value)
            {
                $this->attributes[$field] = $value;
            }

            return $this;

        }
        return false;
    }



    //todo good to have this methods on model

    public function delete(){}

    public static function create(){}




}