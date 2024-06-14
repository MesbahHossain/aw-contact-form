<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\tables\UpdateData;

class UpdateFormData {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/updateformdata/', [
            'methods'               => \WP_REST_Server::EDITABLE,
            'callback'              => [$this, 'update_form_data'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function update_form_data($request) {
        return UpdateData::update_table_data('forms', $request['tableData'], $request['formId']);
    }
}