<?php

/**
 * @file
 * gzepeda_theme 2023 preprocess of paragraphs.
 */

use Drupal\image\Entity\ImageStyle;

/**
 * {@inheritdoc}
 *
 * Implements hook_preprocess_paragraph().
 */
function gzepeda_theme_preprocess_paragraph(&$variables) {
  // Add has_ variable for any field.
  gzepeda_theme_preprocess_paragraph_has($variables);
  gzepeda_theme_preprocess_paragraph_parent($variables);
  gzepeda_theme_preprocess_paragraph_video($variables);
  gzepeda_theme_preprocess_paragraph_text_block($variables);
}

/**
 * {@inheritdoc}
 *
 * Helper for adding has_ value to any variable.
 */
function gzepeda_theme_preprocess_paragraph_has(&$variables) {
  if (empty($variables['content'])) {
    return;
  }

  // Add has_ variable for any field.
  foreach ($variables['content'] as $field_name => $field) {
    if (substr($field_name, 0, 6) != 'field_') {
      continue;
    }

    if (!isset($field[0])) {
      continue;
    }

    $variables['has_' . $field_name] = TRUE;
  }
}

/**
 * {@inheritdoc}
 *
 * Adds pid and ptype to paragraph twig.
 */
function gzepeda_theme_preprocess_paragraph_parent(&$variables) {
  $paragraph = $variables['elements']['#paragraph'];
  if (!($parent_entity = $paragraph->getParentEntity())) {
    return;
  }

  $parent_field = $paragraph->parent_field_name->value;
  $paragraph_id = $paragraph->id();
  $values = $parent_entity->get($parent_field)->getValue();
  foreach ($values as $delta => $value) {
    if (isset($value['target_id']) && $value['target_id'] == $paragraph_id) {
      $variables['accordion_active'] = $delta;
      break;
    }
  }

  $variables['pid'] = $parent_entity->id();
  $variables['ptype'] = $paragraph->parent_type->getString();
  $methods = get_class_methods($parent_entity);

  if (!in_array('getType', $methods)) {
    return FALSE;
  }
  $variables['pbundle'] = $parent_entity->getType();
}

/**
 * {@inheritdoc}
 *
 * Adds view mode to paragraph video.
 */
function gzepeda_theme_preprocess_paragraph_video(&$variables) {
  $paragraph = $variables['elements']['#paragraph'];
  $pbundle = $paragraph->bundle();

  if ($pbundle != 'video_player') {
    return;
  }

  $video = $paragraph->field_media_single->entity;
  $view_builder = \Drupal::entityTypeManager()->getViewBuilder('media');
  $video_modal = $view_builder->view($video, 'modal');
  $video_muted = $view_builder->view($video, 'muted');
  $video_muted_paused = $view_builder->view($video, 'muted_paused');
  $variables['video_modal'] = $video_modal;
  $variables['video_muted'] = $video_muted;
  $variables['video_muted_paused'] = $video_muted_paused;
}

/**
 * {@inheritdoc}
 * Helper for adding extra wrapper for link field on text block.
 */
function gzepeda_theme_preprocess_paragraph_text_block(&$variables) {
  $paragraph = $variables['elements']['#paragraph'];
  $pbundle = $paragraph->bundle();

  if ($pbundle != 'text_block') {
    return;
  }

  $text_value = $paragraph->field_text->getValue();

  if (!isset($text_value[0])) {
    return;
  }

  $text_value = $text_value[0];

  if (empty($text_value['value'])) {
    return;
  }

  $text_value = $text_value['value'];
  $pattern = '/<a(.*?)>(.*?)<\/a>/i';

  // Replace the anchor tags with the desired format.
  $replacement = '<a$1><span class="text">$2</span></a>';
  $text = preg_replace($pattern, $replacement, $text_value);

  if (!isset($variables['content']['field_text'])) {
    return;
  }

  if (!isset($variables['content']['field_text'][0])) {
    return;
  }

  if (empty($variables['content']['field_text'][0]['#text'])) {
    return;
  }

  $variables['content']['field_text'][0]['#text'] = $text;

  if (!isset($variables['elements']['field_text'])) {
    return;
  }

  if (!isset($variables['elements']['field_text'][0])) {
    return;
  }

  if (empty($variables['elements']['field_text'][0]['#text'])) {
    return;
  }

  $variables['elements']['field_text'][0]['#text'] = $text;
}
