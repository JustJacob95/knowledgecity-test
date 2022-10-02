<?php

namespace Core;

class Config
{
    public static $configuration = [];

    public static function setConfiguration($config)
    {
        self::$configuration = $config;
    }
}