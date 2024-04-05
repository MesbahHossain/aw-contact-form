<?php

namespace AwContactForm\tables;

class InsertData {
    public static function insert_table_data ($t_name, $table_data) {
        global $wpdb;
        $table_name = $wpdb->prefix . $t_name;

        $wpdb->insert(
            $table_name, $table_data
            // array(
            //     'time' => current_time( 'mysql' ),
            //     'name' => 'John Doe',
            //     'text' => 'Hello World!',
            //     'url'  => 'https://wordpress.org'
            // )
        );
    }
}