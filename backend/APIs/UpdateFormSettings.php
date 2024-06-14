<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\tables\UpdateData;

class UpdateFormSettings {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/updateformsettings/', [
            'methods'               => \WP_REST_Server::EDITABLE,
            'callback'              => [$this, 'update_form_settings'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function update_form_settings($request) {
        $table_data = [
            'to_email'      => $request['to'],
            'from_email'    => $request['from'],
            'reply_to'      => $request['replyTo'],
            'cc'            => $request['cc'],
            'bcc'           => $request['bcc'],
            'body'          => $request['body'],
        ];

        $result = UpdateData::update_table_data('form_settings', $table_data, $request['formId']);
        $t_data = ($request['to'] != '' && $request['from'] != '' && $request['body'] != '') ? ['is_configured' => true] : ['is_configured' => false];
        UpdateData::update_table_data('forms', $t_data, $request['formId']);
        return $result;
    }
}