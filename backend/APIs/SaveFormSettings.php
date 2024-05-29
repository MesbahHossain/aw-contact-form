<?php 

namespace AwContactForm\APIs;

use AwContactForm\tables\InsertData;

class SaveFormSettings {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/insertformsettings/', [
            'methods'               => 'POST',
            'callback'              => [$this, 'insert_form_settings'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function insert_form_settings($request) {
        $table_data = [
            'form_id'       => $request['formId'],
            'to_email'      => $request['to'],
            'from_email'    => $request['from'],
            'replyTo'       => $request['replyTo'],
            'cc'            => $request['cc'],
            'bcc'           => $request['bcc'],
            'body'          => $request['body'],
            'created_at'    => current_time( 'mysql' ),
        ];
        // echo '<pre>'. print_r($table_data). '</pre>';
        return InsertData::insert_table_data('form_settings', $table_data);
    }
}