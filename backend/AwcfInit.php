<?php

namespace AwContactForm;

use AwContactForm\APIs\PromtSubmission;
use Forms;

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
    }

    /**
     * Instantiating other classes.
     *
     * @return void
     */
    public function instantiate() {
        new CreateAwcfMenuPage();
        new PromtSubmission();
    }

    /**
     * Enqueue scripts and styles.
     *
     * @return void
     */
    public function awcf_admin_enqueue_scripts() {
        wp_enqueue_style( 'awcf-style', plugin_dir_url( __FILE__ ) . '../build/index.css' );
        wp_enqueue_script( 'awcf-script', plugin_dir_url( __FILE__ ) . '../build/index.js', array( 'wp-element' ), '1.0.0', true );
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
        Forms::create_forms_table();
    }
}