/* This script is meant to be used with the chatwidget showing both
 * 1-1 rooms and group rooms. It should be tailored to the specific 
 * use case
 */
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
    var statusText = $('#status'),
        statusTab = $('.status-tab'),
        statusInfo = $('.status-info'),
        groupButton = $('#join-group-chat');

    // Updates the actual status text.
    var updateDisplay = function (attributes) {
      // Now check if chat is open and there are any group rooms active
      if (chatStatus.chatOpen && chatStatus.roomsList && chatStatus.roomsList.length && chatStatus.rooms.group.full == 0) {
        statusTab.removeClass('chat-closed chat-busy').addClass('chat-open');
        groupButton.css("display","inline-block");
        statusInfo.html('<p>Velkommen til Cyberhus-gruppechat.</p>');
      }
      else if(chatStatus.chatOpen && chatStatus.roomsList && chatStatus.rooms.group.full > 0){
        groupButton.hide();
        statusTab.removeClass('chat-open chat-closed').addClass('chat-busy');
        statusInfo.html('<p>Velkommen til Cyberhus-gruppechat.</p><p> &Aring;bningstider:</p><ul><li>Tirsdag 18-21</li></ul>');
      }
      else {
        statusTab.removeClass('chat-open chat-busy').addClass('chat-closed');
        groupButton.hide();
        statusInfo.html('<p>Velkommen til Cyberhus-gruppechat.</p><p> &Aring;bningstider:</p><ul><li>Tirsdag 18-21</li></ul>');
      }
    };

    // When the document is ready, update the status, and bind the event
    // to have it update automatically later.
    $(window).bind('opekaChatStatusUpdate', updateDisplay);

    groupButton.click(function() {

      if(!$.browser.opera){
        var w = open_window('_blank', baseURL+'/opeka/signIn/groupChat', 600, 700);
      } else {
        window.parent.location = baseURL+"/chat-on-opera";
      }
    });

    // Run updateDisplay once manually so we have the initial text
    // nailed down.
    updateDisplay();
  });
}(jQuery));

// Build pop-up window
function open_window(window_name,file_name,width,height) {
  parameters = 'width=' + width;
  parameters = parameters + ',height=' + height;
  parameters = parameters + ',status=no';
  parameters = parameters + ',resizable=no';
  parameters = parameters + ',scrollbars=no';
  parameters = parameters + ',menubar=no';
  parameters = parameters + ',toolbar=no';
  parameters = parameters + ',directories=no';
  parameters = parameters + ',location=no';

  vindue = window.open(file_name,window_name,parameters);
  return vindue;
}