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

    var copyTextBusy = "<p>Velkommen til Cyberhus-gruppechat.</p><p>Chatten er optaget.</p>";
    var copyTextClosed = "<p>Velkommen til Cyberhus-gruppechat.</p><p> &Aring;bningstider:</p><ul><li>Tirsdag og torsdag 18-21</li></ul>";

    // Updates the actual status text.
    var updateDisplay = function (attributes) {
      //console.log(chatStatus);
      // Now check if chat is open and there are any group rooms active
      if (chatStatus.chatOpen && chatStatus.roomsList && chatStatus.roomsList.length && chatStatus.rooms.group.full == 0) {
        statusTab.removeClass('chat-closed chat-busy').addClass('chat-open');
        groupButton.css("display","inline-block");
        statusInfo.html('<p>Velkommen til Cyberhus-gruppechat.</p>');
      }
      else if((chatStatus.chatOpen && chatStatus.roomsList && chatStatus.rooms.group.full > 0) || (chatStatus.chatOpen && chatStatus.roomsList.length == 0 )){
        groupButton.hide();
        statusTab.removeClass('chat-open chat-closed').addClass('chat-busy');
        statusInfo.html(copyTextBusy);
      }
      else {
        statusTab.removeClass('chat-open chat-busy').addClass('chat-closed');
        groupButton.hide();
        statusInfo.html(copyTextClosed);
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
