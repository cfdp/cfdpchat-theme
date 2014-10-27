/**
 * Script for controlling the popup chat window
 */

(function($) {

  var pop_exp_w = 10;
  var pop_exp_h = 160;
  var pop_shr_w = -262;
  var pop_shr_h = 160;
  
  // Add CSS file
  $('head').append('<link rel="stylesheet" href="https://netstof.curachat.com/sites/all/themes/netstof-chat-theme/chatwidget/popup-widget/css/popup.css" type="text/css" />');
  
  // Insert Iframe element
  $( "body" ).append( '<div id="cura-chat-iframe"><iframe src="https://netstof.curachat.com/sites/all/themes/netstof-chat-theme/chatwidget/popup-widget/pairchat.html?base_url=https://netstof.curachat.com&port=3003" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" height="172" width="200"></iframe></div>' );
  
  // Add close button
  $( "#cura-chat-iframe" ).prepend( "<button class='close curachat-popup'>&times;</button>" );

  $(".curachat-popup").click(function() {
    $("#cura-chat-iframe").hide();
  });
      
  /**
   * RIGHT SIDE TAB POPUP ANIMATION
   */
  function popupController(popupAction){
  
    if ( popupAction === "Activate") {
      $("#cura-chat-iframe").show();
      $("#cura-chat-iframe").animate({         
          right: pop_exp_w,
          height: pop_exp_h
        },400);
      }
      else if (popupAction === "Deactivate") {
        $("#cura-chat-iframe").animate({         
          right: pop_shr_w,
          height: pop_shr_h
        },400);
//        $(".page-node-2 #cura-chat-iframe").hide();
      }
  
  }
  
  // Receive activate or deactive messages from the iframe
  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event)
  {
    if (event.origin !== "https://netstof.curachat.com") {
      console.log("Bad window");
      return;  
    }
    else {
      popupController(event.data);
    }
  }

})(jQuery); 







