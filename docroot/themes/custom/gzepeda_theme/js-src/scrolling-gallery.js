/**
*  Scroll gallery functionality
*/
(function ($, Drupal){
  'use strict';

  /**
   *
   * Drupal behavior for scrolling gallery.
   *
   */
  Drupal.behaviors.ScrollingGallery = {
    attach: function (context, settings) {
      once('ScrollingGallery', '.paragraph--type--scrolling-gallery', context).forEach(scrollingGalleryInit);
    }
  };

  /**
   *
   * Resize event for scrolling gallery.
   *
   */
  var isResizing = false;
  window.addEventListener('resize', function() {
    if (!isResizing) {
      isResizing = true;
      requestAnimationFrame(function() {
        document.querySelectorAll('.paragraph--type--scrolling-gallery').forEach(scrollingGalleryInit);
        isResizing = false;
      });
    }
  });


  function scrollingGalleryInit(item) {
    setTimeout(function () {
      item.style.setProperty('--scrolling-gallery-offset', getOffset() + 'px');
    }, 150);
  }

  $('.toolbar-icon-menu').on('click', function () {
    document.querySelectorAll('.paragraph--type--scrolling-gallery').forEach(scrollingGalleryInit);
  });

  /**
   * Calculates top offset.
   */
  function getOffset(include_sticky) {
    let offset = $('html').css('--drupal-displace-offset-top') != undefined ? parseInt($('html').css('--drupal-displace-offset-top'), 10) : 0;
    let header = parseInt($(document).find('header').innerHeight(), 10) ?? 0;
    let primaryTabsRegion = $(document).find('#primary-tabs-region').length > 0 ? parseInt($(document).find('#primary-tabs-region').innerHeight(), 10) : 0;

    offset += header;
    offset += primaryTabsRegion;

    return offset;
  }
})(jQuery, Drupal);
