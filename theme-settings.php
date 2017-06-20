<?php
function curachat_v2_form_system_theme_settings_alter(&$form, &$form_state) {

  // Opeka settings.
  $form['opeka'] = array(
    '#type' => 'fieldset',
    '#title' => t('Opeka'),
    '#group' => 'bootstrap',
  );

  // Online status
  $form['opeka']['online_status'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show online status view (number of connected counselors and clients).'),
    '#default_value' => theme_get_setting('online_status'),
  );

}

