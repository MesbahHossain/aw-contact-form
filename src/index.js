import App from "./App";
import { render } from '@wordpress/element';

/**
 * Import the stylesheet for the plugin.
 */
import './assets/css/main.css';
import './assets/scss/main.scss';

// Render the App component into the DOM
render(<App />, document.getElementById('awcf'));

jQuery(document).ready(function($) {         //wrapper
	$("#sendMessageToChatGPT").click(function(e) {
        e.preventDefault();         //event
		// var this2 = this;                  //use in callback
		$.ajax({
			url: my_ajax_obj.ajax_url,
			method: 'POST',
			data: {
				action: 'send_message_to_chatgpt', // Action hook to identify the PHP function to call
				prompt: userMessage,
				'security': my_ajax_obj.nonce
			},
			success: function(response) {
				console.log('Response from PHP function:', response);
				// Handle response as needed
			},
			error: function(xhr, status, error) {
				console.error('Error calling PHP function:', error);
			}
		});
	} );
} );