<?php

/**
 * @file
 * gzepeda 2023 suggestions for page.
 */

/**
 * {@inheritdoc}
 *
 * Implements gzepeda_theme_suggestions_input_alter().
 */
function gzepeda_theme_suggestions_input_alter(array &$suggestions, array $variables) {
  gzepeda_theme_suggestions_input_alter_webform($suggestions, $variables);
}

/**
 * {@inheritdoc}
 *
 * Process field suggestions for featured news paragraphs.
 */
function gzepeda_theme_suggestions_input_alter_webform(array &$suggestions, array $variables) {
  if ($variables['theme_hook_original'] != 'input__submit') {
    return FALSE;
  }

  if (!isset($variables['element']['#attributes']['class'])) {
    return FALSE;
  }
  if (!in_array('btn-outline-primary', $variables['element']['#attributes']['class'])) {
    return FALSE;
  }

  $suggestions[] = 'input__submit__btn_outline_primary';
}
