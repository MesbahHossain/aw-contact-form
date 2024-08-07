<?php

namespace AwContactForm\Backend\tables;

class UpdateData {
    public static function update_table_data($t_name, $t_data, $column, $value) {
        global $wpdb;
    
        $table_name = $wpdb->prefix . $t_name;
    
        $result = $wpdb->update(
            $table_name,
            $t_data,
            array( $column => $value )
        );

        return $result ? true : $wpdb->last_error;
    }
}