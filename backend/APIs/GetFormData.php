<?php 

namespace AwContactForm\APIs;

use AwContactForm\tables\SelectData;

class GetFormData {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/selectformdata/', [
            'methods'               => 'GET',
            'callback'              => [$this, 'select_form_data'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function select_form_data() {
        return SelectData::select_table_data('forms');
    }
}