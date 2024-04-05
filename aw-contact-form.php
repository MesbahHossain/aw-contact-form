<?php
/*
 * Plugin Name:       AW Contact Form
 * Plugin URI:        #
 * Description:       Automatically generates contact forms with the help of ChatGPT
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Axilweb
 * Author URI:        https://www.axilweb.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://example.com/my-plugin/
 * Text Domain:       awcf
 * Domain Path:       /languages
 */

use AwContactForm\AwcfInit;

require_once 'vendor/autoload.php';

new AwcfInit;

function awcf_activate() {
	set_transient('awcf_welcome_screen_redirect', true, 60); // Redirect after activation to welcome page
	AwcfInit::migrate(); // Database migration
}

register_activation_hook( __FILE__, 'awcf_activate' );

function awcf_deactivate() {
	// Unregister the menu, so the rules are no longer in memory.
	remove_menu_page( 'aw-contact-form' );
	// Clear the permalinks after the menu has been registered.
	flush_rewrite_rules();
}

register_deactivation_hook( __FILE__, 'awcf_deactivate' );
