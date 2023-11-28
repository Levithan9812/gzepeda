/**
*  Scroll Clients About functionality
*/
(function ($, Drupal){
  'use strict';

  /**
   *
   * Drupal behavior for Scroll Clients About.
   *
   */
  Drupal.behaviors.ClientsAbout = {
    attach: function (context, settings) {
      once('ClientsAbout', '.clients-logo', context).forEach(getScrollElement);
    }
  };


  /**
   *
   * Resize event for Scroll Elemen.
   *
   */
  var isResizing = false;
  window.addEventListener('resize', function() {
    if (!isResizing) {
      isResizing = true;
      requestAnimationFrame(function() {
        document.querySelectorAll('.clients-logo').forEach(getScrollElement);
        isResizing = false;
      });
    }
  });

  /**
   * Calculate Width Scroll Element.
   */
  function getScrollElement(item) {
    let timerPerElement = 4;
    var scrollElementPrimaryCount = item.querySelectorAll('.scroll-parent .scroll-element.primary .media--type-logo').length;
    let scrollElementPrimaryTimer = scrollElementPrimaryCount >= 4 ? scrollElementPrimaryCount * timerPerElement : 20;
    var scrollElementPrimary = item.querySelector('.scroll-parent .scroll-element.primary');
    var scrollElementSecondary = item.querySelector('.scroll-parent .scroll-element.secondary');
    var scrollParent = item.querySelector('.scroll-element.primary').closest('.scroll-parent');
    var scrollElementPrimaryCountOpposite = item.querySelectorAll('.scroll-parent .scroll-element.primary-opposite .media--type-logo').length;
    let scrollElementPrimaryOppositeTimer = scrollElementPrimaryCountOpposite >= 4 ? scrollElementPrimaryCountOpposite * timerPerElement : 20;
    var scrollElementPrimaryOpposite = item.querySelector('.scroll-parent .scroll-element.primary-opposite');
    var scrollElementSecondaryOpposite = item.querySelector('.scroll-parent .scroll-element.secondary-opposite');
    var scrollParentOpposite = item.querySelector('.scroll-element.primary-opposite').closest('.scroll-parent');
    var wWidth = parseInt(window.innerWidth);
    var logoWidth = 0;

    item.querySelector('.scroll-parent .scroll-element.primary').style.setProperty('--scroll-logo-timer', scrollElementPrimaryTimer + 's');
    item.querySelector('.scroll-parent .scroll-element.secondary').style.setProperty('--scroll-logo-timer', scrollElementPrimaryTimer + 's');
    item.querySelector('.scroll-parent .scroll-element.primary-opposite').style.setProperty('--scroll-logo-timer', scrollElementPrimaryOppositeTimer + 's');
    item.querySelector('.scroll-parent .scroll-element.secondary-opposite').style.setProperty('--scroll-logo-timer', scrollElementPrimaryOppositeTimer + 's');

    if (wWidth < 768) {
      logoWidth = 180;
    }

    if (wWidth > 767 && wWidth < 1024) {
      logoWidth = 300;
    }

    if (wWidth > 1023 && wWidth < 1920) {
      logoWidth = 350;
    }

    if (wWidth > 1919) {
      logoWidth = 400;
    }

    var scrollElementWidth = logoWidth * scrollElementPrimaryCount;
    var scrollElementWidthOpposite = logoWidth * scrollElementPrimaryCountOpposite;

    if (scrollElementWidth < wWidth) {
      scrollElementWidth = wWidth;
    }

    if (scrollElementWidthOpposite < wWidth) {
      scrollElementWidthOpposite = wWidth;
    }

    scrollElementPrimary.style.width = scrollElementWidth + 'px';
    scrollElementSecondary.style.width = scrollElementWidth + 'px';
    scrollParent.style.width = scrollElementWidth + 'px';
    scrollElementPrimaryOpposite.style.width = scrollElementWidthOpposite + 'px';
    scrollElementSecondaryOpposite.style.width = scrollElementWidthOpposite + 'px';
    scrollParentOpposite.style.width = scrollElementWidthOpposite + 'px';
  }

})(jQuery, Drupal);
