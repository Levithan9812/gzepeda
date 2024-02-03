<?php

/**
 * @file
 * gzepeda_theme 2023 preprocess of nodes.
 */

/**
 * {@inheritdoc}
 *
 * Implements hook_preprocess_node().
 */
function gzepeda_theme_preprocess_node(&$variables) {
  // Add has_ variable for any field.
  gzepeda_theme_preprocess_node_has($variables);
  gzepeda_theme_preprocess_node_video($variables);
}

/**
 * {@inheritdoc}
 */
function gzepeda_theme_preprocess_node_has(&$variables) {
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
    $field_values = $field['#items'];
    foreach ($field_values as $i => $field_item) {
      if ($field_item->isEmpty()) {
        break;
      }

      $variables['has_' . $field_name . '_' . $i] = TRUE;
    }
  }
}

/**
 * {@inheritdoc}
 */
function gzepeda_theme_preprocess_node_video(&$variables) {
  $node = $variables['elements']['#node'];
  $bundle = $node->bundle();
  $nodes_allowed = ['homepage'];
  $has_field_video = $variables['has_field_video'] ?? FALSE;

  if (!in_array($bundle, $nodes_allowed)) {
    return;
  }

  if ($bundle == 'homepage' && !$has_field_video) {
    return;
  }

  $video = $node->field_video->entity;
  $view_builder = \Drupal::entityTypeManager()->getViewBuilder('media');
  $video_modal = $view_builder->view($video, 'modal');
  $video_muted = $view_builder->view($video, 'muted');
  $variables['video_modal'] = $video_modal;
  $variables['video_muted'] = $video_muted;
}
