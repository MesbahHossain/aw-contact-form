<?php 

namespace AwContactForm\Backend\APIs;

use AwContactForm\Backend\Dotenv;

class PromptSubmission {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('awcontactform/v1', '/promptsubmit/', [
            'methods'               => \WP_REST_Server::CREATABLE,
            'callback'              => [$this, 'send_message_to_chatgpt'],
            'permission_callback'   => [$this, 'permissions_check_callback']
        ]);
    }

    public function permissions_check_callback() {
        return current_user_can( 'manage_options' );
    }

    public function send_message_to_chatgpt($request) { 
        Dotenv::load();

        $ApiKey = $_ENV['AW_API_KEY'];
        $client = \OpenAI::client($ApiKey);
        $prompt = $request['prompt'];
    
        $result = $client->chat()->create([
            'model' => 'gpt-3.5-turbo-1106',
            'messages' => [
                [
                    'role' => 'user', 
                    'content' => 'Generate a simple form using this prompt "'. $prompt .'". Then use this example form field json array object "{formElements: [{type: text, title: "Name", name: name, defaultValue: "", required:false, placeHolder: "eg. Name"}, {type: tel, title: "Phone Number", name: phone, defaultValue: "", required:false, placeHolder: eg. Phone}, {type: "select", title: "Gender", name: "gender", defaultValue: "", required:false, placeHolder: eg. Gender, options: ["Male", "Female"]}]}" return a new array object along with a formName. Please ensure that the generated form includes only these fields and no additional information, and wrap the property names in double quotes and ensure that the string is valid JSON syntax'
                ],
            ],
        ]);
    
        return $result->choices[0]->message->content;
    }
}