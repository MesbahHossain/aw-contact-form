<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\tables\DeleteData;

class DeleteForm {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/deletefromdata/(?P<id>[a-zA-Z0-9_-]+)', [
            'methods'               => \WP_REST_Server::DELETABLE,
            'callback'              => [$this, 'delete_form_data'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function delete_form_data($request) {
        $form_id = $request->get_param('id');
        return DeleteData::delete_table_data('forms', $form_id);
    }
}