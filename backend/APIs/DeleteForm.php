<?php 

namespace AwContactForm\APIs;

use AwContactForm\tables\DeleteData;

class DeleteForm {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/deletefromdata/', [
            'methods'               => \WP_REST_Server::DELETABLE,
            'callback'              => [$this, 'delete_form_data'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'edit_something' );
    }

    public function delete_form_data($request) {
        return DeleteData::delete_table_data('forms', $request['formId']);
    }
}