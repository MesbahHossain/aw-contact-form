<?php 

namespace AwContactForm\shortcodes;

class Shortcode {
    /**
     * Get the forms from database then create shortcode for each form
     * 
     * @return void
     */
    public static function createShortcode() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'forms';
        $results = $wpdb->get_results( "SELECT * FROM $table_name" );
        foreach($results as $result) {
            $sCode = $result->form_id;
            add_shortcode($sCode, function() use ($result) {
                return $result->form;
            });
        }
    }
}