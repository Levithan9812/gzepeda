<?php

/**
 * @file
 * gzepeda_theme 2023 preprocess of blocks.
 */

/**
 * {@inheritdoc}
 *
 * Implements hook_preprocess_html().
 */
function gzepeda_theme_preprocess_html(&$variables) {
  gzepeda_theme_preprocess_html_snippets($variables);
}

/**
 * Preprocess html snippets.
 */
function gzepeda_theme_preprocess_html_snippets(&$variables) {
  // Add snippets to html.
  $theme_settings = \Drupal::config('gzepeda_theme.settings');

  // Add snippet_header_above.
  $variables['snippet_header_above'] = '';
  if (($snippet_header_above = $theme_settings->get('snippet_header_above'))) {
    $variables['snippet_header_above'] = [
      '#type' => 'inline_template',
      '#template' => $snippet_header_above,
    ];
  }

  // Add snippet_body_above.
  $variables['snippet_body_above'] = '';
  if (($snippet_body_above = $theme_settings->get('snippet_body_above'))) {
    $variables['snippet_body_above'] = [
      '#type' => 'inline_template',
      '#template' => $snippet_body_above,
    ];
  }
}
