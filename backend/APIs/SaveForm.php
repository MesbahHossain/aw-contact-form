<?php 

namespace AwContactForm\APIs;

use AwContactForm\shortcodes\Shortcode;
use AwContactForm\tables\InsertData;

class SaveForm {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/insertformdata/', [
            'methods'               => 'POST',
            'callback'              => [$this, 'insert_form_data'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function insert_form_data($request) {
        $table_data = [
            'form_id'       => $request['formId'],
            'name'          => $request['formName'] ?? 'Contact Form',
            'form'          => $request['form'],
            'prompt'        => $request['prompt'],
            'data'          => $request['resposne'],
            'created_at'    => current_time( 'mysql' ),
        ];
        
        $result = InsertData::insert_table_data('forms', $table_data);
        if($result == true) {
            Shortcode::createShortcode();
        }
        return $result;
    }
}