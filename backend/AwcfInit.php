<?php

namespace AwContactForm;

use AwContactForm\APIs\DeleteForm;
use AwContactForm\APIs\GetFormData;
use AwContactForm\APIs\GetFormSettings;
use AwContactForm\APIs\PromptSubmission;
use AwContactForm\APIs\SaveForm;
use AwContactForm\APIs\SaveFormSettings;
use AwContactForm\APIs\UpdateFormData;
use AwContactForm\shortcodes\Shortcode;
use AwContactForm\tables\Tables;

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
        new GetFormSettings();
        new UpdateFormData();
        Shortcode::createShortcode();
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
        }
    }

    /**
     * Enqueue scripts and styles for frontend.
     *
     * @return void
     */
    public function awcf_wp_enqueue_scripts() {        
        wp_enqueue_style( 'awcf-front-style', plugin_dir_url( __FILE__ ) . '../build/frontend.css' );
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

    public static function migrate () {
        Tables::create_forms_table();
        Tables::create_form_settings_table();
    }
}