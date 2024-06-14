<?php

namespace AwContactForm\Backend\tables;

class CreateTables {
    public static function create_custom_tables($t_name, $inner_sql) {
        global $wpdb;
        $table_name = $wpdb->prefix . $t_name;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS $table_name ( $inner_sql ) $charset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }
}