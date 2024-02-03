<?php

/**
 * @file
 * gzepeda 2023 preprocess of facets.
 */

/**
 * {@inheritdoc}
 *
 * Implements facets_preprocess_facets_item_list().
 */
function gzepeda_theme_preprocess_facets_item_list(&$variables) {
  $taxonomy_storage = Drupal::entityTypeManager()->getStorage('taxonomy_term');
  $facet = $variables['facet'];
  switch ($facet->id()) {
    case 'facet_case_study_service':
    case 'facet_case_study_industry':
      foreach ($variables['items'] as $i => $item) {
        $tid = $item['value']['#title']['#raw_value'];
        $term = $taxonomy_storage->load($tid);
        if ($term->hasField('field_hide_from_filters')) {
          $hide = $term->field_hide_from_filters->getString();
          if ($hide == 1) {
            unset($variables['items'][$i]);
          }
        }
      }
  }
}
