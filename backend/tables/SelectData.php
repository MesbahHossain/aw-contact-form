<?php

namespace AwContactForm\Backend\tables;

class SelectData {
    // Get forms from forms table
    public static function select_forms_data ($is_trashed, $pageSize, $offset, $search) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'forms';

        $totalFormsQuery = "SELECT COUNT(*) FROM $table_name WHERE is_trashed = %s";
        $totalFormsParams = [$is_trashed];
    
        $query = "SELECT * FROM $table_name WHERE is_trashed = %s";
        $queryParams = [$is_trashed];
        
        if ($search) {
            $totalFormsQuery .= " AND name LIKE %s";
            $totalFormsParams[] = '%' . $wpdb->esc_like($search) . '%';
            $query .= " AND name LIKE %s";
            $queryParams[] = '%' . $wpdb->esc_like($search) . '%';
        }

        $query .= " LIMIT %d OFFSET %d";
        $queryParams[] = $pageSize;
        $queryParams[] = $offset;

        $totalForms = $wpdb->get_var($wpdb->prepare($totalFormsQuery, ...$totalFormsParams));
        $forms = $wpdb->get_results($wpdb->prepare($query, ...$queryParams));

        return rest_ensure_response([
            'totalForms' => (int) $totalForms,
            'forms' => $forms,
        ]);
    }

    // Get form settings by ID
    public static function select_settings_data ($id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'form_settings';

        $sql = "SELECT * FROM $table_name WHERE form_id = '$id'";
        $results = $wpdb->get_results( $sql );

        return ($results) ? $results : $wpdb->last_error;
    }
}