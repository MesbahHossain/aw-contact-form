<?php

namespace AwContactForm\tables;

class SelectData {
    public static function select_table_data ($t_name, $id = null) {
        global $wpdb;
        $table_name = $wpdb->prefix . $t_name;

        $sql = $id == null ? "SELECT * FROM $table_name" : "SELECT * FROM $table_name WHERE form_id = '$id'";
        $results = $wpdb->get_results( $sql );

        return ($results) ? $results : $wpdb->last_error;
    }
}