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
        chatButton = $('#join-pair-chat');

    chatButton.hide();

    // Updates the actual status text.
    var updateDisplay = function (attributes) {

     //For debugging...
      var debugchat = false;
      if (debugchat) {
        statusTab.removeClass('chat-busy chat-open').addClass('chat-closed');
        statusTab.text('Closed');
        chatButton.hide();
        return;
      }

      // If chat is open and there are active one-to-one rooms (chat open).
      if (chatStatus.chatOpen && chatStatus.rooms && chatStatus.rooms.pair.active > 0) {
        statusTab.removeClass('chat-closed chat-busy').addClass('chat-open');
        statusTab.text('Open');
        chatButton.show();
        curaChatPopup("Activate");
      }
      // The chat app is not initialized yet
      else if ($.isEmptyObject(chatStatus)) {
        statusTab.removeClass('chat-closed chat-open').addClass('chat-busy');
        statusTab.text('Loading...');
        chatButton.hide();
        curaChatPopup("Deactivate");
      }
      // If not, it might be busy? Check if chat app is turned on (chat busy).
      else if (chatStatus.chatOpen) {
        statusTab.removeClass('chat-closed chat-open').addClass('chat-busy');
        statusTab.text('Busy');
        chatButton.hide();
        curaChatPopup("Deactivate");
      }
      // The chat app not turned on or is not initialized / unreachable (no now.js).
      else if (chatStatus === 'undefined' || !chatStatus.chatOpen){
        statusTab.removeClass('chat-busy chat-open').addClass('chat-closed');
        statusTab.text('Closed');
        chatButton.hide();
        curaChatPopup("Deactivate");
        console.log('Opeka chat app is not turned on or chatStatus is undefined, chatStatus: ', chatStatus);
      }
      else {
        statusTab.removeClass('chat-busy chat-open').addClass('chat-closed');
        statusTab.text('Closed');
        chatButton.hide();
        curaChatPopup("Deactivate");
        console.log('Opeka chat app error - chatStatus: ', chatStatus);
      }

     };
     
    // When the document is ready, update the status, and bind the event
    // to have it update automatically later.
    $(window).bind('opekaChatStatusUpdate', updateDisplay);
    
    // When the user clicks the button, ask the chat server to join a room.
    chatButton.click(function () {
      if(!$.browser.opera){
        var w = open_window('_blank', baseURL+'/opeka', 600, 700);
      } else {
        window.parent.location = baseURL+'/chat-on-opera';
      }

      now.getDirectSignInURL('pair', function (signInURL) {
        if (!(chatStatus.rooms && chatStatus.rooms.pair.active > 0) && !(chatStatus.rooms && chatStatus.rooms.pair.full > 0)) {
          w.close();
          window.location = baseURL;
        }
        else {
          w.location = signInURL;
        }
      });
    });

    // Run updateDisplay once manually so we have the initial text
    // nailed down.
    updateDisplay();
  });
}(jQuery));

// This will successfully queue a message to be sent to the parent
// window
function curaChatPopup(popupAction) {
  parent.postMessage(popupAction, "https://demo.curachat.com");
}

function receiveMessage(event)
{
  // Do we trust the sender of this message?  (might be
  // different from what we originally opened, for example).
  if (event.origin !== "https://demo.curachat.com")
    return;

  // event.source is popup
  // event.data is "hi there yourself!  the secret response is: rheeeeet!"
}
window.addEventListener("message", receiveMessage, false);
