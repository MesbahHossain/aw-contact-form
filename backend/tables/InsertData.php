<?php

namespace AwContactForm\tables;

class InsertData {
    public static function insert_table_data ($t_name, $table_data) {
        global $wpdb;
        $table_name = $wpdb->prefix . $t_name;

        $result = $wpdb->insert( $table_name, $table_data );

        if ($result === false) { // There was an error inserting data            
            return $wpdb->last_error;
        } else {
            return true;
        }
    }
}