<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\tables\SelectData;

class GetFormData {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/selectformdata/(?P<id>[a-zA-Z0-9_-]+)', [
            'methods'               => \WP_REST_Server::READABLE,
            'callback'              => [$this, 'select_form_data'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function select_form_data($request) {
        $table_name = 'forms';
        $column = 'form_id';
        $value = $request->get_param('id');
        
        return SelectData::select_data($table_name, $column, $value);
    }
}