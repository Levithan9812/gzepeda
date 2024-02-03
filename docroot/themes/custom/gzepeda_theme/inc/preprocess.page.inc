<?php

/**
 * @file
 * gzepeda_theme 2023 preprocess of blocks.
 */

/**
 * {@inheritdoc}
 *
 * Implements hook_preprocess_page().
 */
function gzepeda_theme_preprocess_page(&$variables) {
  $node = \Drupal::routeMatch()->getParameter('node');

  if ($node && !is_object($node)) {
    $entity_type_manager = \Drupal::entityTypeManager();
    $node_storage = $entity_type_manager->getStorage('node');
    $nodes = $node_storage->loadMultiple([$node]);
    $node = array_shift($nodes);
    gzepeda_theme_preprocess_page_node($variables, $node);
  }
}

/**
 * {@inheritdoc}
 *
 * Helper function for hook_preprocess_page().
 */
function gzepeda_theme_preprocess_page_node(&$variables, &$node) {
  $bundle = $node->bundle();
  $variables['bundle'] = $bundle;
}
