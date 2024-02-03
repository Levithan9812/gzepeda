<?php

/**
 * @file
 * gzepeda 2023 preprocess of blocks.
 */

/**
 * {@inheritdoc}
 *
 * Implements template_preprocess_block__system_branding_block().
 */
function gzepeda_theme_preprocess_block__system_branding_block(&$variables) {
  $file_path = DRUPAL_ROOT . $variables['site_logo'];
  $svg = file_get_contents($file_path);
  $variables['logo_svg'] = $svg;
}
