<?php 
add_action('admin_post_nopriv_send_custom_mail', 'handle_awcf_mail_form');
add_action('admin_post_send_custom_mail', 'handle_awcf_mail_form');

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

use AwContactForm\Backend\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
// require 'vendor/autoload.php';
function handle_awcf_mail_form() {
    $url = add_query_arg(
        array(
            'table' => 'awcf_integration',
            'id' => 'smtp'
        ),
        'http://localhost/contact-form-plugin/wp-json/awcontactform/v1/selectsingledata/'
    );

    $response = wp_remote_get($url, array(
        'headers' => array(
            'X-WP-Nonce' => wp_create_nonce('wp_rest')
        ),
        'cookies' => $_COOKIE // Use the current user's cookies for authentication
    ));

    if (is_wp_error($response)) {
        return 'Error: ' . $response->get_error_message();
    }

    $body = wp_remote_retrieve_body($response);

    $data = json_decode($body, true);
    echo '<pre>';
    print_r($data);
    echo '</pre>';

    $recaptcha_verification = myplugin_verify_recaptcha();
        if (is_wp_error($recaptcha_verification)) {
            // Handle the error appropriately
            echo $recaptcha_verification->get_error_message();
            return;
        }

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'mesbah@axilweb.com';                     //SMTP username
        $mail->Password   = '';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('from@example.com', 'Mailer');
        $mail->addAddress('mesbah@axilweb.com', 'Joe User');     //Add a recipient
        // $mail->addAddress('ellen@example.com');               //Name is optional
        $mail->addReplyTo('info@example.com', 'Information');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');

        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Here is the subject';
        $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        error_log( 'Message has been sent');
    } catch (Exception $e) {
        error_log( "Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
    // if (isset($_POST['form_id'])) {
    //     $form_id = sanitize_text_field($_POST['form_id']);
        
    //     // Retrieve the email address associated with the form_id from the awcf post type
    //     $settings = get_settings_from_rest_api($form_id);
    //     // error_log(print_r($settings, true));
        
    //     if (!empty($settings)) {
    //         $to = $settings[0]['to_email'];
    //         $subject = 'Custom Form Submission';
    //         $message = $settings[0]['body'];
    //         $headers = array(
    //             'Content-Type: text/'.$settings[0]['type'].'; charset=UTF-8',
    //             'Reply-To: '.$settings[0]['reply_to'],
    //             'Cc: '.$settings[0]['cc'],
    //             'Bcc: '.$settings[0]['bcc']
    //         );
            
    //         // Use preg_replace_callback to replace placeholders with variable values
    //         $message = preg_replace_callback('/\[(.*?)\]/', function ($matches) {
    //             $varName = $matches[1]; // Get the variable name inside the brackets
    //             return isset($_POST[$varName]) ? $_POST[$varName] : $matches[0];
    //         }, $message);

    //         // Send the email
    //         if (wp_mail($to, $subject, $message, $headers)) {
    //             error_log('Email sent successfully!');
    //         } else {
    //             error_log('Failed to send email.');
    //         }
    //     }
    // }

    // Redirect after sending the email
    wp_redirect(home_url());
    exit();
}

function get_settings_from_rest_api($form_id) {
    // Define the REST API endpoint
    $api_url = get_site_url() . '/wp-json/awcontactform/v1/selectformsettings/'.$form_id;

    // Make the GET request
    $response = wp_remote_get($api_url);
    
    if (is_wp_error($response)) {
        return 'Request failed: ' . $response->get_error_message();
    }

    // Get the body of the response
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response
    $data = json_decode($body, true);
    return $data;
}

function myplugin_verify_recaptcha() {
    if (isset($_POST['g-recaptcha-response'])) {
        Dotenv::load();
        $recaptcha_secret = $_SERVER['RECAPTCHA_SECRET_KEY'];
        $recaptcha_response = $_POST['g-recaptcha-response'];

        $response = wp_remote_post("https://www.google.com/recaptcha/api/siteverify", array(
            'body' => array(
                'secret' => $recaptcha_secret,
                'response' => $recaptcha_response
            )
        ));

        $response_body = wp_remote_retrieve_body($response);
        $result = json_decode($response_body, true);

        if (!$result['success']) {
            return new WP_Error('recaptcha_error', 'reCAPTCHA verification failed.');
        }else {
            return new WP_Error('recaptcha_error', 'reCAPTCHA verification success.');
        }
    } else {
        return new WP_Error('recaptcha_error', 'reCAPTCHA is not set.');
    }

    return true;
}

// function myplugin_handle_form_submission() {
//     if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//         $recaptcha_verification = myplugin_verify_recaptcha();
//         if (is_wp_error($recaptcha_verification)) {
//             // Handle the error appropriately
//             echo $recaptcha_verification->get_error_message();
//             return;
//         }

//         // Process the form data
//         // ...
//     }
// }
// add_action('init', 'myplugin_handle_form_submission');

