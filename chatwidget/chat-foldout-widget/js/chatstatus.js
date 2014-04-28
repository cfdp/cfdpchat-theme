/* This script is called when the connection to the chat server (now.js) has been established */

(function ($) {
  var chatStatus = {};

  // The following callback is called by the server in order to
  // advertise its status.
  now.updateStatus = function (attributes) {
    chatStatus = attributes;
    $(window).trigger('opekaChatStatusUpdate', [attributes]);
  };

  // When the DOM is ready, set up the widget.
  $(function () {
    var statusTab = $('.status-tab'),
        chatButton = $('#join-pair-chat'),
        statusInfo = $('.status-info'),
        brevkasser = $('.brevkasser');

    // Updates the actual status text.
    var updateDisplay = function (attributes) {

            //For debugging...
      var debugchat = false;
      if (debugchat) {
        chatButton.hide();
        return;
      }

      // If there are any active one-to-one rooms.
      if (chatStatus.chatOpen && chatStatus.rooms && chatStatus.rooms.pair.active > 0) {

        statusTab.css("background","url('http://netstof.curachat.com/sites/all/themes/netstof-chat-theme/chatwidget/chat-foldout-widget/img/chat-open.png') no-repeat #85b429");

        chatButton.css("display","inline-block");
        statusInfo.hide();
        brevkasser.hide();

      }
      // The chat app is not initialized yet
      else if ($.isEmptyObject(chatStatus)) {
        chatButton.html('Loading...').removeClass('chat-open chat-closed').addClass('chat-busy');
      }
      
      // If not, it might be busy? Check if chat app is turned on (chat busy).
      else if (chatStatus.rooms && chatStatus.rooms.pair.full > 0) {
        statusTab.css("background","url('http://netstof.curachat.com/sites/all/themes/netstof-chat-theme/chatwidget/cha7-foldout-widget/img/chat-busy.png') no-repeat #ee9200");

        chatButton.hide();
        brevkasser.show();
        statusInfo.show().html("Chatten er optaget. Klik forbi brevkasserne og stil dit sp&oslash;rgsm&aring;l dér, eller se om der ligger et svar du kan bruge.");

      }
      // The chat app not turned on or is not initialized / unreachable (no now.js).
      else if (chatStatus === 'undefined' || !chatStatus.chatOpen){
        chatButton.hide().removeClass('chat-open chat-busy').addClass('chat-closed');
        console.log('Chat app is not turned on or chatStatus is undefined, chatStatus: ', chatStatus);
      }

      else {
        statusTab.css("background","url('http://netstofchat.cybhus.dk/sites/all/themes/netstofchat/img/chat-busy-horizontal.png') no-repeat #ee9200");

        brevkasser.show();
        statusInfo.show();

        statusInfo.html("Chatten er &aring;ben <strong>onsdag kl. 10-13 & igen 18-21.</strong> Klik forbi brevkasserne og stil dit sp&oslash;rgsm&aring;l der, eller se om der ligger et svar du kan bruge.");
        chatButton.hide().removeClass('chat-open chat-busy').addClass('chat-closed');
        console.log('Error - chatStatus: ', chatStatus);
      };

     };
    // When the document is ready, update the status, and bind the event
    // to have it update automatically later.
    $(window).bind('opekaChatStatusUpdate', updateDisplay);

    // When the user clicks the button, ask the chat server to join a room.
    chatButton.click(function (e) {
      if (chatStatus.chatOpen && chatStatus.rooms && chatStatus.rooms.pair.active > 0) {
        
        if(!$.browser.opera){
          var w = open_window('_blank', baseURL+'/opeka', 1000, 700);
        } else {
          window.parent.location = baseURL+'/chat-on-opera';
        }
        
        now.getDirectSignInURL('pair', function (signInURL) {
          if (!(chatStatus.rooms && chatStatus.rooms.pair.active > 0) && !(chatStatus.rooms && chatStatus.rooms.pair.full > 0)) {
            w.close();
            window.location = "http://netstof.dk/brevkasse";
          }
          else {
            w.location = signInURL;
          }
        });
      
      }else{
        e.preventDefault();
      }

    });

    // Run updateDisplay once manually so we have the initial text
    // nailed down.
    updateDisplay();
  });
}(jQuery));

// Build pop-up window
function open_window(window_name,file_name,width,height) {
  parameters = "width=" + width;
  parameters = parameters + ",height=" + height;
  parameters = parameters + ",status=no";
  parameters = parameters + ",resizable=no";
  parameters = parameters + ",scrollbars=no";
  parameters = parameters + ",menubar=no";
  parameters = parameters + ",toolbar=no";
  parameters = parameters + ",directories=no";
  parameters = parameters + ",location=no";

  vindue = window.open(file_name,window_name,parameters);
  return vindue;
}
