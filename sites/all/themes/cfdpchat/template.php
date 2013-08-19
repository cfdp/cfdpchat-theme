<?php

function cfdpchat_preprocess_html(&$variables) {
  drupal_add_css('http://fonts.googleapis.com/css?family=Acme', array('type' => 'external'));
}

/**
 * Bootstrap theme wrapper function for the secondary menu links
 */
function cfdpchat_menu_tree__secondary(&$variables) {
  return '<ul class="menu navbar-nav nav pull-right">' . $variables['tree'] . '</ul>';
}