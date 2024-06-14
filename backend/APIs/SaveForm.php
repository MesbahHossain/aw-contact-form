<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\shortcodes\Shortcode;
use AwContactForm\Backend\tables\InsertData;

class SaveForm {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/insertformdata/', [
            'methods'               => \WP_REST_Server::CREATABLE,
            'callback'              => [$this, 'insert_form_data'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function insert_form_data($request) {        
        $dateTime = \DateTime::createFromFormat('m/d/Y, g:i:s A', $request['createTime']);  // Create a DateTime object from the date string   
        $formattedDate = $dateTime->format('Y-m-d H:i:s');  // Format the date into MySQL DATETIME format
        
        $table_data = [
            'form_id'       => $request['formId'],
            'name'          => $request['formName'] ?? 'Contact Form',
            'form'          => $request['form'],
            'prompt'        => $request['prompt'],
            'data'          => $request['resposne'],
            'created_at'    => $formattedDate,
        ];
        
        $result = InsertData::insert_table_data('forms', $table_data);
        if($result == true) {
            Shortcode::createShortcode();
        }
        return $result;
    }
}