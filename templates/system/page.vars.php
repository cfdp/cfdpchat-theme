<?php

/**
 * Pre-processes variables for the "page" theme hook.
 *
 * See template for list of available variables.
 *
 * @see page.tpl.php
 *
 * @ingroup theme_preprocess
 */

/**
 * Theme settings should be processed (i.e. made available to javascript) here
 *
 */
function curachat_v2_preprocess_page(&$variables) {
  // Hide the navbar for non-counselors / non-admins on chat pages
  $variables['curachat_show_navbar'] = FALSE;
  if (function_exists('opeka_is_opeka_chat_page')) {
    if (!opeka_is_opeka_chat_page() || $variables['is_admin']) {
      $variables['curachat_show_navbar'] = TRUE;
    }
  }
  else {
    drupal_set_message(t('Error: The opeka module does not seem to be enabled.'),'error');
  }
  
  //  How to access theme settings
  //  $curachat = array();
  //  if (theme_get_setting('button_color')) {
  //    $curachat['button_color'] = 1;
  //  }
  //  else {
  //    
  //  }
  //  drupal_add_js((), 'setting');
}