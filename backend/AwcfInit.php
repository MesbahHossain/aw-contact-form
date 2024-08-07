<?php

namespace AwContactForm\Backend;

use AwContactForm\Backend\APIs\DeleteForm;
use AwContactForm\Backend\APIs\GetFormData;
use AwContactForm\Backend\APIs\GetFormsData;
use AwContactForm\Backend\APIs\GetFormSettings;
use AwContactForm\Backend\APIs\GetSingleData;
use AwContactForm\Backend\APIs\PromptSubmission;
use AwContactForm\Backend\APIs\SaveForm;
use AwContactForm\Backend\APIs\SaveFormSettings;
use AwContactForm\Backend\APIs\UpdateCaptchaSetting;
use AwContactForm\Backend\APIs\UpdateFormData;
use AwContactForm\Backend\APIs\UpdateFormSettings;
use AwContactForm\Backend\shortcodes\Shortcode;
use AwContactForm\Backend\tables\Tables;

class AwcfInit {
    /**
	 * Constructor.
	 */
	public function __construct() {
        $this->init();
    }

    private function init() {
        add_action( 'init', [ $this, 'instantiate'] );
		add_action( 'admin_init', [ $this, 'open_welcome_page' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'awcf_admin_enqueue_scripts' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'awcf_wp_enqueue_scripts' ] );
    }

    /**
     * Instantiating other classes.
     *
     * @return void
     */
    public function instantiate() {
        new CreateAwcfMenuPage();
        new PromptSubmission();
        new SaveForm();
        new SaveFormSettings();
        new DeleteForm();
        new GetFormData();
        new GetFormsData();
        new GetSingleData();
        new GetFormSettings();
        new UpdateFormData();
        new UpdateFormSettings();
        new UpdateCaptchaSetting();
        Shortcode::createShortcode();
        require_once __DIR__ . '/../Frontend/wp-mail.php';
    }

    /**
     * Enqueue scripts and styles for admin.
     *
     * @return void
     */
    public function awcf_admin_enqueue_scripts($hook_suffix) {
        $dependency = require_once __DIR__ . '/../build/index.asset.php'; 
        
        if ($hook_suffix === 'toplevel_page_aw-contact-form') {
            wp_enqueue_style( 'awcf-style', plugin_dir_url( __FILE__ ) . '../build/index.css' );
            wp_enqueue_script( 'awcf-script', plugin_dir_url( __FILE__ ) . '../build/index.js', $dependency['dependencies'], $dependency['version'], true );
            wp_localize_script( 'awcf-script', 'AwcfApiSettings', array(
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
            ) );
        }
    }

    /**
     * Enqueue scripts and styles for frontend.
     *
     * @return void
     */
    public function awcf_wp_enqueue_scripts() {        
        wp_enqueue_style( 'awcf-front-style', plugin_dir_url( __FILE__ ) . '../Frontend/assets/css/frontend.css' );
        wp_enqueue_script( 'google-recaptcha', 'https://www.google.com/recaptcha/api.js?render=6LdRdw0qAAAAAKon2eRBWO5chCdNuNDS2R6rZ2Pj"', array(), null, true );
        wp_enqueue_script( 'g-recaptcha', plugin_dir_url( __FILE__ ) . '../Frontend/assets/js/g-recaptcha.js', array('google-recaptcha'), null, true );
        
        // Pass the SITE_KEY from .env to g-recaptcha.js
        Dotenv::load();
        wp_localize_script('g-recaptcha', 'envData', array( 'site_key' => $_SERVER['RECAPTCHA_SITE_KEY'] ));
    }

    /**
     * Redirect to welcome page after plugin activation. 
     * 
     * @return void
     */
	public function open_welcome_page() {
		if(!get_transient('awcf_welcome_screen_redirect')) return;
		delete_transient('awcf_welcome_screen_redirect');
		wp_safe_redirect(add_query_arg(array('page' => 'aw-contact-form'), admin_url('admin.php')));
		exit;
	}

    /**
     * Migrate the tables 
     */
    public static function migrate () {
        new Tables();
    }
}