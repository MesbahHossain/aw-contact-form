<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\tables\SelectData;

class GetFormSettings {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/selectformsettings/(?P<id>[a-zA-Z0-9_-]+)', [
            'methods'               => \WP_REST_Server::READABLE,
            'callback'              => [$this, 'select_form_settings'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function permissions_check_callback() {
        // Allow the request if it's coming from an internal source
        if (defined('DOING_CRON') && DOING_CRON) {
            return true;
        }
        return current_user_can( 'manage_options' );
    }

    public function select_form_settings($request) {
        $form_id = $request->get_param('id');
        return SelectData::select_settings_data($form_id);
    }
}