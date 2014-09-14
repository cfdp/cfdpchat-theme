(function($) {
  Drupal.behaviors.cfdpchatBehaviour = {
    attach: function (context, settings) {
        
    /* note that javascript will only work on "standard" Drupal elements
       it won't apply to the elements in the opeka chat (Node.js rendered)
       unless a DOMchange listener is setup
    */

      /**
       * RIGHT SIDE TAB ANIMATION
       */
      var exp_w = -40;
      var exp_h = 160;
      var shr_w = -265;
      var shr_h = 40;
      $(".fixed-tab").hover(
        function() {   
          $(this).stop(true,true).animate({         
            right: exp_w,
            height: exp_h
          },200);   
        },
        function() {   
          $(this).stop(true,true).animate({      
            right: shr_w,
            height: shr_h
          },200); 
        }
      );

    }
  };
})(jQuery); 
