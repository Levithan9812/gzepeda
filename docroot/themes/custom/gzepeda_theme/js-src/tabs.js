/**
*  Tabs arrows functionality
*/
(function ($, Drupal){
  'use strict';

  var block,
      Ewidth = 0,
      parentWidth = 0,
      offsetBlock = 0,
      move = 54,
      element,
      scrollWidth = 0,
      lastItem = 0;

  Drupal.behaviors.TabsNavigation = {
    attach: function (context, settings) {
      $(window).on('load', function () {
        $(document).find('.paragraph--type--tabs-block').each(function (_index, item) {
          initTabs($(item));
        });
      });
    }
  };

  function initTabs(obj) {
    block = $(obj);
    Ewidth = 0;

    $(block).find('.nav-tabs-wrapper .nav-item').each(function (_index, item) {
      Ewidth += parseInt($(item).innerWidth(), 10) + 30;
    });

    lastItem = parseInt($(block).find('.nav-tabs-wrapper .nav-item').last().outerWidth(true), 10);

    Ewidth += 30;
    parentWidth = parseInt($(block).find('.nav-tabs-wrapper').innerWidth(), 10);
    offsetBlock = 0;
    scrollWidth = block[0].querySelector('.nav-tabs-wrapper').scrollWidth;

    if (parentWidth <= Ewidth) {
      $(block).find('.nav-tabs-wrapper .arrow-actions').removeClass('d-none');
      $(block).find('.nav-tabs-wrapper').removeClass('no-arrows');
    } else {
      $(block).find('.nav-tabs-wrapper .arrow-actions').addClass('d-none');
      $(block).find('.nav-tabs-wrapper').addClass('no-arrows');
    }


    $(block).find('.nav-tabs').animate({
      scrollLeft: offsetBlock
    }, 0);
  }

  $(document).on('click', '.paragraph--type--tabs-block .nav-tabs-wrapper .arrow-actions', function () {
    var side = $(this).hasClass('left') ? 'left' : 'right';
    element = $(this).closest('.nav-tabs-wrapper').find('.nav-tabs')[0];
    let nextMovement;

    if (side == 'right') {
      offsetBlock += (parentWidth / 2);
      nextMovement = offsetBlock + (parentWidth / 2);

      if (nextMovement >= Ewidth) {
        offsetBlock = Ewidth - (parentWidth / 2);
      }
    }

    if (side == 'left') {
      offsetBlock -= (parentWidth / 2);
      nextMovement = offsetBlock - (parentWidth / 2);

      if (nextMovement <= 0) {
        offsetBlock = 0;
      }
    }


    $(this).closest('.nav-tabs-wrapper').find('.nav-tabs').animate({
      scrollLeft: offsetBlock
    }, 0);
  });

  var timer;
  $(window).on('resize', function (_) {
    clearTimeout(timer);

    timer = setTimeout(function () {
      $(document).find('.paragraph--type--tabs-block').each(function (_index, item) {
        initTabs($(item));
      });
    }, 250);
  });
})(jQuery, Drupal);
