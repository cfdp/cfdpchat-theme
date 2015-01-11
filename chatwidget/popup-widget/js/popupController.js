/**
 * Script for controlling the popup chat window
 */

(function($) {

  var pop_exp_w = 10;
  var pop_exp_h = 160;
  var pop_shr_w = -342;
  var pop_shr_h = 160;
  
  // Insert Iframe element
  $( ".page-node-2 .main-container" ).append( '<div id="cura-chat-iframe"><iframe src="https://demo.curachat.com/sites/all/themes/cura-chat-theme/chatwidget/popup-widget/pairchat.html?base_url=https://demo.curachat.com&port=3000" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" height="172"></iframe></div>' );
  
  // Add close button
  $( ".page-node-2 #cura-chat-iframe" ).prepend( "<button class='close curachat-popup'>&times;</button>" );

  $(".curachat-popup").click(function() {
    $(".page-node-2 #cura-chat-iframe").hide();
  });
      
  /**
   * RIGHT SIDE TAB POPUP ANIMATION
   */
  function popupController(popupAction){
  
    if ( popupAction === "Activate") {
      $(".page-node-2 #cura-chat-iframe").show();
      $(".page-node-2 #cura-chat-iframe").animate({         
          right: pop_exp_w,
          height: pop_exp_h
        },1000);
      }
      else if (popupAction === "Deactivate") {
        $(".page-node-2 #cura-chat-iframe").animate({         
          right: pop_shr_w,
          height: pop_shr_h
        },1000);
//        $(".page-node-2 #cura-chat-iframe").hide();
      }
  
  }
  
  // Receive activate or deactive messages from the iframe
  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event)
  {
    if (event.origin !== "https://demo.curachat.com") {
      console.log("baad window");
      return;  
    }
    else {
      popupController(event.data);
    }
  }

})(jQuery); 







