(function($) {
  Drupal.behaviors.curachatBehaviour = {
    attach: function (context, settings) {
        
    /* note that javascript will only work on "standard" Drupal elements
       it won't apply to the elements in the opeka chat (Node.js rendered)
       unless a DOMchange listener is setup
    */

      /**
       * RIGHT SIDE TAB FOLDOUT ANIMATION
       */
      var exp_w = -40;
      var exp_h = 160;
      var shr_w = -265;
      var shr_h = 40;
      $(".front .fixed-tab").hover(
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
      
      /**
       * RIGHT SIDE TAB POPUP ANIMATION
       */
      var pop_exp_w = 10;
      var pop_exp_h = 160;
      var pop_shr_w = -322;
      var pop_shr_h = 160;
      $(".page-node-2 .fixed-tab").animate({         
        right: pop_exp_w,
        height: pop_exp_h
      },1000);
      

      $( ".page-node-2 .fixed-tab.well" ).prepend( "<button class='close curachat-popup'>&times;</button>" );
       
      $(".curachat-popup").click(function() {
        $(".page-node-2 .fixed-tab").hide();
      });
//        function() {   
//          $(this).stop(true,true).animate({      
//            right: pop_shr_w,
//            height: pop_shr_h
//          },200); 
//        }
//      );

    }
  };
})(jQuery); 
