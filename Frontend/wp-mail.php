<?php 
add_action('admin_post_nopriv_send_custom_mail', 'handle_awcf_mail_form');
add_action('admin_post_send_custom_mail', 'handle_awcf_mail_form');

function handle_awcf_mail_form() {
    if (isset($_POST['form_id'])) {
        $form_id = sanitize_text_field($_POST['form_id']);
        
        // Retrieve the email address associated with the form_id from the awcf post type
        $settings = get_settings_from_rest_api($form_id);
        // error_log(print_r($settings, true));
        
        if (!empty($settings)) {
            $to = $settings[0]['to_email'];
            $subject = 'Custom Form Submission';
            $message = 'You have submitted a form.';
            $headers = array('Content-Type: text/html; charset=UTF-8');

            // Send the email
            if (wp_mail($to, $subject, $message, $headers)) {
                error_log('Email sent successfully!');
            } else {
                error_log('Failed to send email.');
            }
        }
    }

    // Redirect after sending the email
    wp_redirect(home_url());
    exit();
}

function get_settings_from_rest_api($form_id) {
    // Define the REST API endpoint
    $api_url = get_site_url() . '/wp-json/awcontactform/v1/selectformsettings/'.$form_id;

    // Make the GET request
    $response = wp_remote_get($api_url);

    // Check for errors
    if (is_wp_error($response)) {
        return 'Request failed: ' . $response->get_error_message();
    }

    // Get the body of the response
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response
    $data = json_decode($body, true);
    return $data;
}
