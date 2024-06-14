<?php

namespace AwContactForm\Backend\tables;

class DeleteData {
    public static function delete_table_data ($t_name, $table_data) {
        global $wpdb;
        $table_name = $wpdb->prefix . $t_name;

        $result = $wpdb->delete( $table_name, array( 'form_id' => $table_data ) );

        return ($result === false) ? $wpdb->last_error : true;
    }
}