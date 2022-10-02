<?php

namespace Core\Database;

use PDO;

class QueryBuilder
{
//is't not actually builder pattern, but if need in future can change it to real builder class
    public static function getAll($table, $fields, $limit, $offset = 0)
    {
        $db = DbConnection::getConnection();
        return $db->query('SELECT '. implode(', ', $fields) .' FROM '.$table . ' LIMIT ' . $limit . ' OFFSET ' . $offset)->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function prepareCondition($condition)
    {
        $result = '';
        if (is_array($condition)) {
            foreach ($condition as $field => $item)
            {
                if ($item === null) {
                    $result .= $field . ' IS NULL AND ';
                }
                else{
                    $result .= $field . '=\''.$item .'\'  AND ';
                }
            }

        }

        return trim(trim($result, 'AND '));
    }


    public static function find($table, $fields, $conditions)
    {
        $db = DbConnection::getConnection();
        return $db->query('SELECT '. implode(', ', $fields) .' FROM '.$table . ' WHERE ' . self::prepareCondition($conditions))->fetch(PDO::FETCH_ASSOC);
    }


    public static function prepareFieldsForUpdate($fields)
    {
        $result = '';
        foreach ($fields as $field => $value)
        {
            $result .= $field . '=\'' . $value . '\', ';
        }
        return trim(trim($result, ', '));
    }


    public static function update($table, $fields, $condition)
    {
        $db = DbConnection::getConnection();
        return $db->query('UPDATE '. $table .' SET '.self::prepareFieldsForUpdate($fields) . ' WHERE ' . self::prepareCondition($condition));
    }

    public static function count($table)
    {
        $db = DbConnection::getConnection();
        return $db->query('SELECT COUNT(*) FROM '.$table.' USE INDEX(PRIMARY)')->fetch()[0];
    }
}