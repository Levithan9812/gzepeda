<?php
// phpcs:ignoreFile

/**
 * @file
 * Preprocessing of theme_overrides.
 */

use Drupal\Core\File\FileSystemInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StreamWrapper\StreamWrapperManager;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function gzepeda_theme_form_system_theme_settings_alter(&$form, FormStateInterface &$form_state, $form_id = NULL) {
  if (isset($form_id)) {
    return;
  }

  $theme = 'gzepeda_theme';

  // Snippets.
  $form['snippets'] = [
    '#type' => 'details',
    '#title' => t('Snippets'),
    '#group' => 'global',
    '#weight' => 11,
  ];

  $form['snippets']['snippet_header_above'] = [
    '#type' => 'textarea',
    '#title' => t('Header [Above]'),
    '#description' => t('What you type here will appear immediately after opening <header> tag.'),
    '#default_value' => theme_get_setting('snippet_header_above', $theme),
  ];

  $form['snippets']['snippet_body_above'] = [
    '#type' => 'textarea',
    '#title' => t('Body [Above]'),
    '#description' => t('What you type here will appear immediately after opening <body> tag.'),
    '#default_value' => theme_get_setting('snippet_body_above', $theme),
  ];

  $form['#submit'][] = 'gzepeda_theme_settings_form_submit';
}


/**
 * Submits additional fields for gzepeda theme settings form.
 */
function gzepeda_theme_settings_form_submit(array &$form, FormStateInterface $form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  $values = $form_state->getValues();

  $config_key = 'gzepeda_theme.settings';
  $config = \Drupal::service('config.factory')->getEditable($config_key);

  if (isset($values['snippet_header_above']) && !empty($values['snippet_header_above'])) {
    $config->set('snippet_header_above', $values['snippet_header_above']);
  }

  if (isset($values['snippet_body_above']) && !empty($values['snippet_body_above'])) {
    $config->set('snippet_body_above', $values['snippet_body_above']);
  }
}
