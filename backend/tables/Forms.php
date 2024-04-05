<?php

use AwContactForm\tables\CreateTables;

class Forms {
    public static function create_forms_table () {
        $t_name = 'forms';
        $inner_sql = '
        id mediumint(9) UNSIGNED NOT NULL AUTO_INCREMENT,
        form_id varchar (25) NOT NULL,
        name varchar(100) NOT NULL,
        data json NOT NULL,
        form text NOT NULL,
        status ENUM("draft", "ready", "deleted") default "draft",
        created_at DATE,
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