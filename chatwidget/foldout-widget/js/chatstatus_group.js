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
        statusHours = $('.status-content'),
        groupButton = $('#join-group-chat'),
        groupRoomList = $('#group-chat-rooms'),
        queueList = $("#queue-list");

    // Updates the actual status text.
    var updateDisplay = function (attributes) {
      var liHtml = '';

      // Now check if chat is open and there are any group rooms active
      if (chatStatus.chatOpen && chatStatus.roomsList && chatStatus.roomsList.length) {
        statusTab.removeClass('chat-closed chat-busy').addClass('chat-open');
        groupButton.show();
        $.each(chatStatus.roomsList, function(i, room) {
          liHtml += '<li>' + room.name + ' (' + room.memberCount + ' &#47; ' + room.maxSize + ')</li>';
        });
        groupRoomList.find('ul').html(liHtml).end().show();
      }
      else {
        statusTab.removeClass('chat-open chat-busy').addClass('chat-closed');
        groupButton.hide();
        groupRoomList.hide();
      }

      // Hide the queue list if it is disabled or empty, or the chat is closed
      if (!chatStatus.chatOpen && chatStatus.queues === false || !chatStatus.queueList) {
        statusTab.removeClass('chat-open chat-busy').addClass('chat-closed');
        queueList.hide();
      }
      // List all queues
      else {
        liHtml = '';
        $.each(chatStatus.queueList, function(i, queue) {
          liHtml += '<li>' + queue.name + ' (' + queue.inQueue + ' in queue) <button id="' + i +  '" class="btn btn-success"' +'">Queue up</button></li>';
        });
        queueList.find('ul').html(liHtml).end().show();
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

    queueList.delegate('ul button', 'click', function() {
      var w;
      if(!$.browser.opera){
        w = open_window('_blank', baseURL+'/opeka', 600, 700);
      } else {
        window.parent.location = baseURL+"/chat-on-opera";
      }

      var queueId = $(this).attr('id');
      w.location = chatStatus.chatPageURL + '#signIn/queues/' + queueId;
    });

    // Run updateDisplay once manually so we have the initial text
    // nailed down.
    updateDisplay();
  });
}(jQuery));
