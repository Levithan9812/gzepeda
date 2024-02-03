<?php

/**
 * @file
 * gzepeda_theme 2023 preprocess of field.
 */

use Drupal\Core\Render\Markup;

/**
 * {@inheritdoc}
 *
 * Implements hook_preprocess_field().
 */
function gzepeda_theme_preprocess_field(&$variables) {
  gzepeda_theme_preprocess_field_government_title($variables);
  gzepeda_theme_preprocess_field_homepage_title($variables);
  gzepeda_theme_preprocess_field_paragraph_slider_card_tabs_block($variables);
  gzepeda_theme_preprocess_field_link($variables);
}

/**
 * {@inheritdoc}
 */
function gzepeda_theme_preprocess_field_government_title(&$variables) {
  if (!isset($variables['field_name'])) {
    return;
  }

  if ($variables['field_name'] != 'field_subtitle_text') {
    return;
  }

  if (!isset($variables['element']['#entity_type'])) {
    return;
  }

  if ($variables['element']['#entity_type'] != 'node') {
    return;
  }

  if ($variables['element']['#bundle'] != 'government_services') {
    return;
  }

  if (empty($variables['items'])) {
    return;
  }

  if (!isset($variables['items'][0]['content']['#text'])) {
    return;
  }

  $text = &$variables['items'][0]['content']['#text'];
  $text = str_replace([
    '<p>',
    '</p>',
  ], [
    '<h2 class="h1">',
    '</h2>',
  ], $text);
}

/**
 * {@inheritdoc}
 */
function gzepeda_theme_preprocess_field_homepage_title(&$variables) {
  if (!isset($variables['field_name'])) {
    return;
  }

  if ($variables['field_name'] != 'field_title') {
    return;
  }

  if (!isset($variables['element']['#entity_type'])) {
    return;
  }

  if ($variables['element']['#entity_type'] != 'node') {
    return;
  }

  if ($variables['element']['#bundle'] != 'homepage') {
    return;
  }

  if (empty($variables['items'])) {
    return;
  }

  if (!isset($variables['items'][0]['content']['#text'])) {
    return;
  }

  $text = &$variables['items'][0]['content']['#text'];
  $text = str_replace([
    '<p',
    '</p>',
  ], [
    '<h1',
    '</h1>',
  ], $text);
}

/**
 * {@inheritdoc}
 *
 * Helper for adding extra variables to the paragraph_slider_card_tabs_block.
 */
function gzepeda_theme_preprocess_field_paragraph_slider_card_tabs_block(&$variables) {
  if (!isset($variables['field_name'])) {
    return;
  }

  $field_name = $variables['field_name'];

  if ($field_name != 'field_item') {
    return;
  }

  if ($variables['label'] != 'Slider card tabs') {
    return;
  }

  $parent_id = $variables['element']['#object'];
  $parent_id = $parent_id->id();
  $variables['parent_id'] = $parent_id;

  foreach ($variables['items'] as $item) {
    if (!isset($item['content'])) {
      continue;
    }

    $content = &$item['content']['#paragraph'];

    if (empty($content->field_title->value)) {
      continue;
    }

    $title = $content->field_title->value;
    $id = $content->id->value;

    $variables['tab_titles'][] = [
      'id' => $id,
      'title' => $title,
    ];
  }
}

/**
 * {@inheritdoc}
 * Helper for adding extra wrapper for link field.
 */
function gzepeda_theme_preprocess_field_link(&$variables) {
  if (!isset($variables['field_name'])) {
    return;
  }

  $field_name = $variables['field_type'];

  if ($field_name != 'link') {
    return;
  }

  $items = &$variables['items'];

  foreach ($items as $key => $item) {
    $variables['element'][$key]['#title'] = Markup::create('<span class="text">' . $item['content']['#title'] . '</span>');
    $variables['items'][$key]['content']['#title'] = Markup::create('<span class="text">' . $item['content']['#title'] . '</span>');
  }
}
