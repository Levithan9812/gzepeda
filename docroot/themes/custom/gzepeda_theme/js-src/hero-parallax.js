/**
*  Hero Home functionality
*/
(function ($, Drupal){
  'use strict';

  /**
   *
   * Drupal behavior for Video Player.
   *
   */
  Drupal.behaviors.HeroHome = {
    attach: function (context, settings) {
      once('HeroHome', '#homepage-hero', context).forEach(heroHomeInit);
    }
  };

  /**
   *
   * Resize event for Video Player.
   *
   */
  var isResizing = false;
  window.addEventListener('resize', function() {
    if (!isResizing) {
      isResizing = true;
      requestAnimationFrame(function() {
        document.querySelectorAll('#homepage-hero').forEach(heroHomeInit);
        isResizing = false;
      });
    }
  });

  /**
   *
   * Hidden modal event.
   *
   * To pause video when modal is closed.
   */
  let video = document.querySelector('#video-player-modal');

  if (video) {
    document.querySelector('#video-player-modal').addEventListener('hidden.bs.modal', event => {
      let video = event.target.querySelector('video');
      video.pause();
    })

    document.querySelector('#video-player-modal').addEventListener('shown.bs.modal', event => {
      let video = event.target.querySelector('video');
      video.play();
    })
  }

  /**
   *
   * Scroll event for Video Player.
   *
   */
  window.addEventListener('scroll', function (e) {
    if (!document.querySelector('#homepage-hero')) {
      return false;
    }

    if (document.querySelector('#homepage-hero').getBoundingClientRect().y < 0) {
      document.querySelector('#homepage-video-player').classList.add('active');
    } else {
      document.querySelector('#homepage-video-player').classList.remove('active');
    }
  })


  /**
   * The `heroHomeInit` function initializes a parallax effect on specified elements with different
   * directions, delays, and scales.
   * @param item - The "item" parameter refers to the element or object that you want to apply the
   * parallax effect to. It could be an HTML element, such as a div or an image, or it could be a
   * JavaScript object.
   */
  function heroHomeInit(item) {
    let videoPlayer = document.querySelector('#homepage-video-player video').height ?? 0;
    document.querySelector('#homepage-video-player').style.setProperty('--video-player-bottom-size', '-' + videoPlayer + 'px');

    initParallax(item.querySelector('.hero-first-image svg'), 'up', 0.4, 1.4);
    initParallax(item.querySelector('.hero-second-image svg'), 'left down', 0.4, 1.6);
    initParallax(item.querySelector('.hero-third-image svg'), 'down', 0.4, 1.3);
  }

  /**
   * The function initializes a parallax effect on an item with specified direction, delay, and scale.
   * @param item - The "item" parameter refers to the element or object that you want to apply the
   * parallax effect to. It could be an HTML element, such as a div or an image, or it could be a
   * JavaScript object.
   * @param direction - The direction parameter determines the orientation of the parallax effect. It
   * can be set to either "horizontal" or "vertical".
   * @param delay - The "delay" parameter is used to specify the delay in milliseconds before the
   * parallax effect starts.
   * @param scale - The `scale` parameter determines the amount of parallax effect applied to the item.
   * It controls the speed at which the item moves in relation to the scrolling. A higher scale value
   * will result in a more pronounced parallax effect, while a lower scale value will result in a more
   * subtle effect.
   */
  function initParallax(item, direction, delay, scale) {
    item.background = new simpleParallax(item, {
      orientation: direction,
      scale: scale,
      delay: delay,
      overflow: true,
      transition: 'cubic-bezier(0,0,0,1)'
    });
  }

})(jQuery, Drupal);
