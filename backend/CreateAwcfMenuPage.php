<?php

namespace AwContactForm\Backend;

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
		$capability = 'manage_options';

		if (current_user_can($capability)) {
			global $submenu;
			$slug = 'aw-contact-form';
			
			add_menu_page(
				__( 'AW Contact Form', 'awcf' ),
				'AW Contact Form',
				$capability,
				$slug,
				[ $this, 'awcf_home_page' ],
				'dashicons-email-alt2',
				6
			);			
			// add_submenu_page( 'aw-contact-form', 'Add New Form', 'Add New Form', $capability, 'aw-contact-form' );
			// add_submenu_page( 'aw-contact-form', 'All Forms', 'All Forms', $capability, 'aw-contact-form#/aw-forms', [''] );
			// add_submenu_page( 'aw-contact-form', 'From Setup', 'From Setup', $capability, 'aw-contact-form#/aw-form-setup', [''] );
			$submenu[ $slug ][] = [ 'Add New Form', $capability, 'admin.php?page=' . $slug . '#/' ];
			$submenu[ $slug ][] = [ 'All Forms', $capability, 'admin.php?page=' . $slug . '#/aw-forms' ];
			$submenu[ $slug ][] = [ 'Form Setup', $capability, 'admin.php?page=' . $slug . '#/aw-form-setup' ];
		}
	}

	public function awcf_home_page() {
		require_once 'AwcfHomePage.php';
	}
}
