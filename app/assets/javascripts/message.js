$(function(){
  function buildHTML(message){
    if (message.image) {
      var image = `<img src=${message.image}>`;
    } else {
      var image = "";
    }
    var html = `<div class="content" data-message-id="${message.id}">
                  <div class="content__name">
                    ${message.name}
                    <span class="posted-time">
                    ${message.created_at}
                    </span>
                  </div>
                  <div class="content__massage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__contents').append(html);
      $('.send-button').prop('disabled', false);
      $('#new_message')[0].reset();
      $('.main-chat__contents').animate({scrollTop: $('.main-chat__contents')[0].scrollHeight}, 'swing');
    })
    .fail(function(){
      alert('error');
    })
  })

  function getMessage() {
    var newMessageId = $('.content').last().data('message-id');
    console.log(this);
    var url = location.pathname.match(/\/groups\/\d+\/messages/);
    $.ajax({
      url: url,
      type: "GET",
      data: {id: newMessageId},
      dataType: 'json'
    })
    .done(function(data) {
      if (data.length == 0) return false;
      data.forEach(function(message) {
        var html = buildHTML(message);
        $('.main-chat__contents').append(html);
      })
      $('.main-chat__contents').animate({scrollTop: $('.main-chat__contents')[0].scrollHeight}, 'swing');
    })
    .fail(function(){
      alert('error');
    })
  }

  setInterval(getMessage, 5000);
})
