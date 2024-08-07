<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\tables\SelectData;

class GetSingleData {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/selectsingledata/', [
            'methods'               => \WP_REST_Server::READABLE,
            'callback'              => [$this, 'select_single_data'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function select_single_data($request) {
        if(!$request['table'] || !$request['id']) {
            return 'You must provide table name and id';
        }
        $table_name = $request['table'];
        $column = 'id';
        $value = $request['id'];
        
        return SelectData::select_data($table_name, $column, $value);
    }
}