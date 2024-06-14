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
        register_rest_route('awcontactform/v1', '/selectformdata/', [
            'methods'               => \WP_REST_Server::READABLE,
            'callback'              => [$this, 'select_form_data'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function select_form_data($request) {
        $page = isset($request['page']) && is_numeric($request['page']) ? intval($request['page']) : 1;
        $pageSize = isset($request['pageSize']) && is_numeric($request['pageSize']) ? intval($request['pageSize']) : 2;
        $is_trashed = isset($request['is_trashed']) && in_array($request['is_trashed'], ['0', '1']) ? $request['is_trashed'] : '0';
        $search = isset($request['search']) ? sanitize_text_field($request['search']) : '';

        $offset = ($page - 1) * $pageSize;
        
        return SelectData::select_forms_data($is_trashed, $pageSize, $offset, $search);
    }
}