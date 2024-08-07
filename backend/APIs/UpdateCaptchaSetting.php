<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\Dotenv;
use AwContactForm\Backend\tables\InsertData;
use AwContactForm\Backend\tables\SelectData;
use AwContactForm\Backend\tables\UpdateData;

class UpdateCaptchaSetting {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/updatecaptchasetting/', [
            'methods'               => \WP_REST_Server::EDITABLE,
            'callback'              => [$this, 'update_captcha_setting'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function update_captcha_setting($request) {
        $table_name = 'awcf_integration';
        $table_data = $request['tableData'];

        /*----------- Store the reCaptcha keys in .env file ----------*/
        if($request['tableData']['id'] == 'recaptcha') {
            if($request['tableData']['username'] || $request['tableData']['password']) {
                Dotenv::load();
                $env_file       = __DIR__ . '/../../.env';
                $env_key1       = 'RECAPTCHA_SITE_KEY';
                $env_value1     = $request['tableData']['username'];
                $env_key2       = 'RECAPTCHA_SECRET_KEY';
                $env_value2     = $request['tableData']['password'];
                $env_contents   = file_get_contents($env_file);
    
                if (str_contains($env_contents, "$env_key1=")) {
                    $env_contents = preg_replace("/^$env_key1=.*$/m", "$env_key1=$env_value1", $env_contents);
                } else {
                    $env_contents .= "\n$env_key1=$env_value1";
                }
                if (str_contains($env_contents, "$env_key2=")) {
                    $env_contents = preg_replace("/^$env_key2=.*$/m", "$env_key2=$env_value2", $env_contents);
                } else {
                    $env_contents .= "\n$env_key2=$env_value2";
                }
    
                file_put_contents($env_file, $env_contents);
            }
        }

        $result = SelectData::select_data($table_name, 'id', $table_data['id']) ? UpdateData::update_table_data($table_name, $request['tableData'], 'id', $table_data['id']) : InsertData::insert_table_data($table_name, $table_data);
        
        return $result;
    }
}