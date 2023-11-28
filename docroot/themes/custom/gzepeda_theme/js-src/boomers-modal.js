(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.BoomerModal = {
    attach: function (context, settings) {
      once('BoomerModal', '.cards-container', context).forEach(initBoomerModal);
    }
  };

  function initBoomerModal(item) {
    var container = item;
    activeModal(container);
  }

  /*
  ** This funtion set the modal active
  */
  function activeModal(container) {
    $(container).find('.btn-report a').each(function () {
      $(this).on('click',function () {
        var btn = this;
        $(document.body).attr('style','position:absolute;z-index:1;overflow:hidden;');
        $(btn).parents('.boomer-reports-cards').next('.boomers-modal').addClass('boomer-modal-active');
        modal = $(btn).parents('.boomer-reports-cards').next('.boomers-modal');
        closeModal( );
      })
    })
  }

  /*
  ** This funtion set the functions to close the modal.
  */
  function closeModal( ) {
    // declare the variable that tracks the state
    var modalContentClicked = false;

    // declare a function that updates the state
    function clickHandler(){
      modalContentClicked = true;
    }

    var modal = $('.boomer-modal-active');

    $( modal ).find( '.boomer-modal-container' ).on( 'click', clickHandler );

    $( modal ).on( 'click' ,function () {
      if ( modalContentClicked == false ) {
        $(document.body).removeAttr('style')
        $(this).removeClass('boomer-modal-active');
        modalContentClicked = true;
      }
      else {
        modalContentClicked = false;
      }
    });

    //Detect when the key Esc is pushed.
    $( document ).keyup(function (e) {
      if ( e.key === "Escape" ) { // escape key maps to keycode `27`
        var modal = $('.boomer-modal-active');
        $(document.body).removeAttr('style')
        $( modal ).removeClass('boomer-modal-active');
      }
    });

    $( modal ).find('.modal-exit').on('click', function () {
        var modal = $('.boomer-modal-active');
        $(document.body).removeAttr('style')
        $( modal ).removeClass('boomer-modal-active');
    });
  }

  /*
  **This function close the modal and goes to download reports block.
  */
  $('.cta-download-report a').on('click', function () {
    var modal = $('.boomer-modal-active');
    $(document.body).removeAttr('style')
    $( modal ).removeClass('boomer-modal-active');

    $('html, body').animate({ scrollTop: $('.bg-blue').offset().top - 0 }, 500);
  });
})(jQuery, Drupal, drupalSettings);
