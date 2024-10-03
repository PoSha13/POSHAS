var steamUser = function(user_name,user_pic,steam_id){
	var self = this;
	this.user_name = user_name;
	this.user_pic = user_pic;
	this.steam_id = steam_id;
	return this;
}


var steamUserMessage = function(message,user_steam_id){
	this.message = message;
	this.user_id = user_steam_id;
	return this;
}


var userChat = function(){
	var self = this;
	this.messages = [];
	this.users = [];

	this.addMessage = function(message,user_id){
		var message = new steamUserMessage(message,user_id);
		this.messages.push(message);
	}

	this.sendMessage = function(){}
	
	this.syncMessages = function(){}

	return this;
}


function load_chat_messages(){
	$.ajax({
					type : "GET",
					url  : "/chat/test.php?action=get",
					dataType : "json",
					cache : false,
					success : function(message){
						if(message && message.length > 0){
							$('#chat_messages').html('');
							for(var i in message){
								var item = '<div class="chat_message">';
									item += '<div class="user_chat_photo"><a original-title="Перейти в профиль" href="/profile.php?steam_id='+message[i].user_id+'" target="_blank"><img src="'+message[i].user_avatar+'" /></a></div>';
									item += '<div class="user_chat_message">';
												item += '<div class="user_chat_name"><a style="color:#000" class="user_title_link" original-title="Перейти в профиль" href="/profile.php?steam_id='+message[i].user_id+'" target="_blank">'+message[i].user_name+'</a></div>';
												item += '<div class="user_message_text">'+message[i].user_message+'</div>';
									item += '</div>';
								item += '</div>';
								$('#chat_messages').append(item);
								
							}
							$('.user_title_link').tipsy({gravity: 's'}); 
							$('#chat_messages').scrollTop(2000);
						}
						setTimeout(function(){load_chat_messages();},1000);
					}
	});
}

$(document).ready(function(){
	load_chat_messages();
	
		

		$('#sendie').on('keyup',function(event){
			if(typeof window.chat_user != undefined){
				if(event.keyCode == 13){
					var current_message = $(this).val();
					var send_data = {
						user_message : current_message.slice(0,current_message.length-1).toLowerCase(),
						user_name : window.chat_user.user_name,
						user_id :  window.chat_user.steam_id,
						user_avatar : window.chat_user.user_pic
					};
					$('#sendie').val('');
					console.log(send_data.user_message.replace(/^\s+/, ""),send_data.user_message.replace(/^\s+/, "").length,send_data.user_message.length);
					if(send_data.user_message.length > 0 && send_data.user_message.replace(/^\s+/, "").length > 0){
						$.ajax({
							type : "POST",
							url : "/chat/test.php?action=add&userid="+window.steam_user.steamid,
							data : send_data,
							dataType : "json",
							cache : false,
							success : function(message){
								if(message && message.error) alert(message.error);
								$('#sendie').val('');
								$('#sendie').text('');
							}
						});
					}
				}
			}else alert('Вы должны быть авторизованы');
			return false;
		});
});