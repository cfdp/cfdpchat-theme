<?php

/**
 * @file template.php
 */
function cfdpchat_preprocess_html(&$variables) {

  // Set viewport meta tag - http://www.webomelette.com/drupal-add-html-tag-head-meta-link
  $viewport = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
    ),
  );

  drupal_add_html_head($viewport, 'viewport');

	drupal_add_css('https://fonts.googleapis.com/css?family=Ubuntu', array('type' => 'external'));
}
