<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\tables\InsertData;
use AwContactForm\Backend\tables\UpdateData;

class SaveFormSettings {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/insertformsettings/', [
            'methods'               => \WP_REST_Server::CREATABLE,
            'callback'              => [$this, 'insert_form_settings'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function insert_form_settings($request) {
        $table_data = [
            'form_id'       => $request['formId'],
            'to_email'      => $request['to'],
            'from_email'    => $request['from'],
            'reply_to'      => $request['replyTo'],
            'cc'            => $request['cc'],
            'bcc'           => $request['bcc'],
            'body'          => $request['body'],
            'type'          => $request['isChecked'] ? 'html' : 'plain'
        ];

        $insert = InsertData::insert_table_data('form_settings', $table_data);
        if($insert && $request['to'] != '' && $request['from'] != '' && $request['body'] != '') {
            $t_data = ['is_configured' => true];
            UpdateData::update_table_data('forms', $t_data, 'form_id', $request['formId']);
        }
        return $insert;
    }
}