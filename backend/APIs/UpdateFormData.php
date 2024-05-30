<?php 

namespace AwContactForm\APIs;

use AwContactForm\tables\SelectData;
use AwContactForm\tables\UpdateData;

class UpdateFormData {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/updateformdata/', [
            'methods'               => 'PUT',
            'callback'              => [$this, 'update_form_data'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function update_form_data($request) {
        // return UpdateData::update_table_data('forms', $request['tableData'], $request['formId']);
        print_r($request['tableData']);
        // print_r($request['formId']);
        // echo 'working';
    }
}