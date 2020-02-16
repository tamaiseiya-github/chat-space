$(function(){
  var buildHTML = function(message){
    if (message.image){
      var html =  
        `<div class = "message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__member">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
        return html;
    } else {
      var html =
        `<div class = "message" data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info__member">
              ${message.user_name}
            </div>
            <div class="message__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text__content">
              ${message.content}
            </p>
        </div>`
        return html;
    };
  }

    $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.middle').append(html);
      $('form')[0].reset();
      $('.middle').animate({ scrollTop: $('.middle')[0].scrollHeight},'fast');
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
  
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.middle').append(insertHTML);
        $('.middle').animate({ scrollTop: $('.middle')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


// 現状の問題
// 1,自動更新されるコメントがどんどん小要素になっていってしまう。

// メンターさんにしてもらった対応
// 2,_message.html.hamlの記述のうち messagesの親要素、messageが削除された。
// 3,その関係で94-97行目の('.message')を('.middle')に変更
// 4,return html;の記述を、24.43行目に再追記

// 結果1の不具合が発生