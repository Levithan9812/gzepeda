<?php

/**
 * @file
 * gzepeda 2023 suggestions for page.
 */

/**
 * {@inheritdoc}
 *
 * Implements hook_theme_suggestions_page_alter().
 */
function gzepeda_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  gzepeda_theme_suggestions_page_alter_node($suggestions, $variables);
  gzepeda_theme_suggestions_page_alter_view($suggestions, $variables);
}

/**
 * {@inheritdoc}
 *
 * Process page suggestions for view pages.
 */
function gzepeda_theme_suggestions_page_alter_node(array &$suggestions, array $variables) {
  $node = \Drupal::routeMatch()->getParameter('node');

  if (!$node) {
    return FALSE;
  }

  if (!is_object($node)) {
    $entity_type_manager = \Drupal::entityTypeManager();
    $node_storage = $entity_type_manager->getStorage('node');
    $nodes = $node_storage->loadMultiple([$node]);
    $node = array_shift($nodes);
  }
  $bundle = $node->bundle();
  $suggestions[] = 'page__type';
  $suggestions[] = 'page__type__' . $bundle;
}

/**
 * {@inheritdoc}
 *
 * Process page suggestions for view pages.
 */
function gzepeda_theme_suggestions_page_alter_view(array &$suggestions, array $variables) {
  $route = \Drupal::routeMatch();
  $route_name = $route->getRouteName();
  $route_name_parts = explode('.', $route_name);

  if (!(isset($route_name_parts[0]) && $route_name_parts[0] == 'view')) {
    return FALSE;
  }

  if (!isset($route_name_parts[2])) {
    return FALSE;
  }

  if (substr($route_name_parts[2], 0, 4) != 'page') {
    return FALSE;
  }

  $suggestions[] = 'page__view';
  $suggestions[] = 'page__view__' . $route_name_parts[1];
}
