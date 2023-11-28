/**
*  Slider card tabs functionality
*/
(function ($, Drupal){
  'use strict';

  /**
   *
   * Drupal behavior for slider card tabs.
   *
   */
  Drupal.behaviors.SliderCardTabs = {
    attach: function (context, settings) {
      once('SliderCardTabs', '.paragraph--type--slider-card-tabs-block', context).forEach(sliderCardTabsInit);
    }
  };

  /**
   *
   * Resize event for slider card tabs.
   *
   */
  var isResizing = false;
  window.addEventListener('resize', function() {
    if (!isResizing) {
      isResizing = true;
      requestAnimationFrame(function() {
        document.querySelectorAll('.paragraph--type--slider-card-tabs-block').forEach(sliderCardTabsInit);
        isResizing = false;
      });
    }
  });


  /**
   * The function `sliderCardTabsInit` is used to initialize a slider card tabs component and update
   * the active tab based on the scroll position of the parent container.
   * @param item - The `item` parameter is a DOM element that represents the container of the slider
   * card tabs.
   * @returns There is no explicit return statement in the code provided. Therefore, the function does
   * not return any value.
   */
  function sliderCardTabsInit(item) {
    var parent = item.querySelector('.scrollspy-h-container');
    var parentDimensions = parent.getBoundingClientRect();
    var parentX = parentDimensions.x;

    $(parent).on('scroll', function () {
      var items = parent.querySelectorAll('.paragraph--type--slider-card-tabs-item');
      var arr = [];

      $(items).each(function (index, item) {
        let itemDimensions = item.getBoundingClientRect();
        let itemX = itemDimensions.x;
        arr[index] = itemX;
        let itemId = item.id;
        let itemBtn = parent.closest('.items').querySelector('.nav a[href="#' + itemId + '"]');

        if (itemBtn && itemBtn.classList.contains('active')) {
          itemBtn.classList.remove('active');
        }
      });

      var closest = arr.reduce(function(prev, curr, index, array) {
        return  (Math.abs(curr - parentX) < Math.abs(prev - parentX) ? curr : prev)
      });

      arr.map(function(item, index, array){
        if (item === closest) {
          var cardItem = parent.closest('.items').querySelector('.nav [data-index="' + index  + '"]');
          if (cardItem){
            cardItem.classList.add('active');
          }
        }
      });
    });
  }

  /**
   *
   * Click event for slider card tabs.
   *
   */
  $(document).on('click', '.paragraph--type--slider-card-tabs-block .items .nav .nav-link', function(e) {
    e.preventDefault();
    let offset = $(document).find($(this).attr('aria-controls'))[0].offsetLeft;

    $(this).closest('.items').find('.scrollspy-h-container').animate({
      scrollLeft: offset
    }, 100);
  });

})(jQuery, Drupal);
