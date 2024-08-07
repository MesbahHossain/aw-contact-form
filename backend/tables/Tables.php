<?php

namespace AwContactForm\Backend\tables;

use AwContactForm\Backend\tables\CreateTables;

class Tables {
    public function __construct() {
        $this->create_forms_table();
        $this->create_form_settings_table();
        $this->create_recaptcha_table();
    }

    private function create_forms_table () {
        $t_name = 'forms';
        $inner_sql = '
        form_id varchar (25) NOT NULL,
        name varchar(100) NOT NULL,
        form text NOT NULL,
        prompt text NOT NULL,
        data json NOT NULL,
        is_configured Boolean,
        is_trashed Boolean,
        created_at DATE,
        PRIMARY KEY (form_id)';
        
        CreateTables::create_custom_tables($t_name, $inner_sql);
    }

    private function create_form_settings_table () {
        global $wpdb;
        $t_name = 'form_settings';
        $inner_sql = '
        id mediumint(9) UNSIGNED NOT NULL AUTO_INCREMENT,
        form_id varchar (25) NOT NULL,
        to_email varchar(50),
        from_email varchar(50),
        reply_to varchar(50),
        cc varchar(50),
        bcc varchar(50),
        body text NOT NULL,
        type varchar(10),
        PRIMARY KEY (id),
        FOREIGN KEY (form_id) REFERENCES '.$wpdb->prefix.'forms(form_id) ON DELETE CASCADE';
        
        CreateTables::create_custom_tables($t_name, $inner_sql);
    }

    private function create_recaptcha_table () {
        $t_name = 'awcf_integration';
        $inner_sql = '
        id varchar(10),
        type varchar(10),
        username varchar (50),
        password varchar(50),
        is_active Boolean,
        PRIMARY KEY (id)';
        
        CreateTables::create_custom_tables($t_name, $inner_sql);
    }
}

// Create child table with foreign key
// $child_table_name = $wpdb->prefix . 'child_table';
// $child_sql = "CREATE TABLE $child_table_name (
//     id mediumint(9) NOT NULL AUTO_INCREMENT,
//     parent_id mediumint(9) NOT NULL,
//     name varchar(100) NOT NULL,
//     PRIMARY KEY (id),
//     FOREIGN KEY (parent_id) REFERENCES $parent_table_name(id)
// ) $charset_collate;";
// dbDelta($child_sql);
/* 
 id           String       @id @default(uuid())
  name         String?
  shop         String
  data         Json
  is_active    Boolean
  collect_lead Boolean      @default(true)
  status       Int          @default(0) //0 = draft, 1 = completed, 2 = incompleted
  lead         Leads[]
  from_setting FormSettings?
  deleted   Boolean   @default(false) // Soft delete field
  createdAt    DateTime     @default(now())
  updatedAt    DateTime?     @updatedAt
  */