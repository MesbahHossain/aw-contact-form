<?php 

namespace AwContactForm\APIs;

use AwContactForm\tables\SelectData;

class GetFormSettings {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/selectformsettings/(?P<id>[a-zA-Z0-9_-]+)', [
            'methods'               => 'GET',
            'callback'              => [$this, 'select_form_settings'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function select_form_settings($request) {
        $form_id = $request->get_param('id');
        return SelectData::select_table_data('form_settings', $form_id);
    }
}