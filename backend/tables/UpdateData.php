<?php

namespace AwContactForm\Backend\tables;

class UpdateData {
    public static function update_table_data($t_name, $t_data, $id) {
        global $wpdb;
    
        $table_name = $wpdb->prefix . $t_name;
    
        $result = $wpdb->update(
            $table_name,
            $t_data,
            array( 'form_id' => $id )
        );

        if ($result === false) { // There was an error inserting data            
            return $wpdb->last_error;
        } else {
            return true;
        }
    }
}