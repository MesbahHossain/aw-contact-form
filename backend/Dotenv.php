<?php 

namespace AwContactForm\Backend;

class Dotenv {
    public static function load () {
        $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__. '/../');
        $dotenv->load();
    }
}