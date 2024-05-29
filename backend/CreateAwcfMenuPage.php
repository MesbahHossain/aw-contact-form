<?php

namespace AwContactForm;

class CreateAwcfMenuPage {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'register_awcf_menu_page' ] );
	}

	/**
	 * Register a custom menu page.
	 */
	public function register_awcf_menu_page() {
		add_menu_page(
			__( 'AW Contact Form', 'awcf' ),
			'AW Contact Form',
			'manage_options',
			'aw-contact-form',
			[ $this, 'awcf_home_page' ],
			'dashicons-email-alt2',
			6
		);
		
        global $submenu;
		$slug = 'aw-contact-form';
		// add_submenu_page( 'aw-contact-form', 'Add New Form', 'Add New Form', 'manage_options', 'aw-contact-form' );
		// add_submenu_page( 'aw-contact-form', 'All Forms', 'All Forms', 'manage_options', 'aw-contact-form#/aw-forms', [''] );
		// add_submenu_page( 'aw-contact-form', 'From Setup', 'From Setup', 'manage_options', 'aw-contact-form#/aw-form-setup', [''] );
		$submenu[ $slug ][] = [ 'Add New Form', 'manage_options', 'admin.php?page=' . $slug . '#/' ];// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$submenu[ $slug ][] = [ 'All Forms', 'manage_options', 'admin.php?page=' . $slug . '#/aw-forms' ];// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
	}

	public function awcf_home_page() {
		require_once 'AwcfHomePage.php';
	}
}
