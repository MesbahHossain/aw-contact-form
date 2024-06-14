<?php 

namespace AwContactForm\Backend\shortcodes;

class Shortcode {
    /**
     * Get the forms from database then create shortcode for each form
     * 
     * @return void
     */
    public static function createShortcode() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'forms';
        $results = $wpdb->get_results( "SELECT * FROM $table_name" );
        foreach($results as $result) {
            $sCode = $result->form_id;
            add_shortcode($sCode, function() use ($result) {
                ob_start(); ?>
                <form action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST" class="awcf-form-wrapper">
                    <input type="hidden" name="action" value="send_custom_mail">
                    <?php echo $result->form; ?>
                </form>
                <?php
                return ob_get_clean();
            });
        }
    }
}