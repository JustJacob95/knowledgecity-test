<?php


spl_autoload_register(function ($class_name) {
    $class_name = str_replace('\\', DIRECTORY_SEPARATOR, $class_name);
    include __DIR__ . DIRECTORY_SEPARATOR .$class_name . '.php';
});