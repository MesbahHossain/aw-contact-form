<?php 

namespace AwContactForm\APIs;

use AwContactForm\Dotenv;

class PromtSubmission {
    public function  __construct() {
        $this->init();
    }

    public function init() {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes() {
        register_rest_route('awcontactform/v1', '/promtsubmit/', [
            'methods'               => 'POST',
            'callback'              => [$this, 'send_message_to_chatgpt'],
            'permission_callback'   => '__return_true'
        ]);
    }

    public function send_message_to_chatgpt($request) {  
        // Load dotenv
        Dotenv::load();

        $ApiKey = $_ENV['AW_API_KEY'];
        $client = \OpenAI::client($ApiKey);
        $prompt = $request['prompt'];
    
        $result = $client->chat()->create([
            'model' => 'gpt-3.5-turbo-1106',
            'messages' => [
                [
                    'role' => 'user', 
                    'content' => 'Generate a simple form using this prompt "'.$prompt.'". Then use this example form field json array object "{formElements: [{type: text, title: "Name", name: name, defaultValue: "", required:false, placeHolder: "eg. Name"}, {type: tel, title: "Phone Number", name: phone, defaultValue: "", required:false, placeHolder: eg. Phone}, {type: "select", title: "Gender", name: "gender", defaultValue: "", required:false, placeHolder: eg. Gender, options: ["Male", "Female"]}]}" return a new array object along with a formName. Please ensure that the generated form includes only these fields and no additional information'
                ],
            ],
        ]);
    
        return $result->choices[0]->message->content;
    }
}