(function($) {
$(document).ready(function() {

	function _$(a) {return document.getElementById(a);}
	function ce(a) {return document.createElement(a);}
	function ca(a) {return document.createAttribute(a);}



	





	var progress = _$('pb');
	var items = 0;
	var mymoney = 0;
	var totalcost = 0;
	var lastticket = 0;
	var currency = null;



	var socketIO = io(':8303');

	

	socketIO.once('connect', function(){
		socketIO.emit('0');
		
	//	if (sound == 'on') {
		//		$('#zashol1')[0].play();
		//	}

		if ($('.topss').length > 0) {

			socketIO.emit('top');
		}

		if ($('#history-page').length > 0) {
			socketIO.emit('2');
		}

	//	if ($('.order-link').length > 0) {
		//	socketIO.emit('trade-link', { steamId : getToken() });
	//	}
		
		if ($('.tr-link').length > 0) {

			socketIO.emit('trade-link', { steamId : getToken() });
		
		}

		$('#game-content').customScrollbar({skin: "default-skin", hScroll: false,updateOnWindowResize: true});

		setInterval(function(){
			$("#game-content").customScrollbar("resize", true)
		},300);
		

		// currency
  		socketIO.on('currency', function(data){
  			currency = (data == 'rur') ? '₽' : '$';
  		});

  		//informers
  		socketIO.on('informers', function(data){
  			
			if(data.inf1 && _$('inf1')) _$('inf1').innerHTML = data.inf1;
			if(data.inf2 && _$('inf2')) _$('inf2').innerHTML = data.inf2.toFixed() + ' ' + currency;
			if(data.inf3 && _$('inf3')) _$('inf3').innerHTML = data.inf3;

			if(data.inf4 && _$('inf4')) _$('inf4').innerHTML = data.inf4.toFixed() + ' ' + currency;
			if(data.inf4 && $('.jackpotNum').length) {
				var jackpotThousands = parseFloat(data.inf4) / 1000;
				jackpotThousands = jackpotThousands.toFixed();
				$('.jackpotNum').text(jackpotThousands + 'К');
			}

			if(typeof data.inf5 != 'undefined' && $('.inf5').length > 0) {
				var inf5 = data.inf5;
				
				if (data.inf5 == '0') {
					inf5 = 'отсутствует';
				} else {
					inf5 += currency;
				}
				
				$('.inf5').text(inf5);
			}

			if(data.inf6 && $('.inf6')) $('.inf6').text(data.inf6);
			if(data.inf7 && $('#inf7').length) $('#inf7').text(data.inf7);
			if(data.inf7 && $('#inf14').length) $('#inf14').text(data.inf7);
			if(data.inf8 && $('#inf8').length) $('#inf8').text(data.inf8);
			if(data.inf9 && $('#inf9').length) $('#inf9').text(data.inf9);
			if(data.inf10 && $('#inf10').length) $('#inf10').text(data.inf10.toFixed(0) + ' ' + currency);
			if(data.inf11 && $('#inf11').length) $('#inf11').text(data.inf11.toFixed(2) + ' ' + currency);
		});

		// top
  		socketIO.on('top', function(data){
  			
			buildTopTable(data.list);
  		});

  		// last-winner
  		socketIO.on('last-winner', function(data){
			if (_$('winner-name') && _$('winner-avatar') && _$('winner-money')) {
				_$('winner-name').innerHTML = data.name;
				_$('winner-avatar').innerHTML = ('<img src="' + data.ava + '" width="110" height="110" style=" border-radius: 100%; " alt="">');
				_$('winner-money').innerHTML = data.money.toFixed(0) + currency;
			    //_$('winner-chance').innerHTML = data.chance;
			}
  		});

  		// history
  		socketIO.on('history', function(data){
  		
			buildHistoryPage(data.history, data.historyOrder, data.commission);
  		});

  		// timer
  		socketIO.on('timer', function(data){

  			if (data.timer == '0:0') {
				$('.gametime.gamepause').removeClass('hiddenes');
			}

			// timer
			var minute = data.timer.substring(0, data.timer.indexOf(':'));
			var second = data.timer.substring(data.timer.indexOf(':')+1);
			if (minute.length == 1) {
				minute = '0'+minute;
			}
			if (second.length == 1) {
				second = '0'+second;
			}
			if ($('#timer').size() > 0) {
				$('#timer').text(minute + ':' + second);
			}
  		});

  		// push new item
  		socketIO.on('0', function(data){
  			
  			var cont = _$('game'); 
			if (cont == null) {
				return;
			}
			
  			$('.players-percent').removeClass('hiddenes');
			$('#start-game-advert').hide();
			$('#in-game-advert').show();

			var icount = parseInt($('#items-count-temp').text());
			icount++;
			$('#items-count-temp').text(icount);
			if (data.steamid == getSteamID()) {
			 	$('#chance-temp').text(data.chance.toFixed(2));
			 	$('#player-items-count').text(data.itemcounter);
			}


				var d = new Date();
				var $parent = $('#game');
			if($('#'+data.steamid).size() > 0){
				var $block = $('#'+data.steamid);
				$block.find('.total_items_count').text(getWordNormal(data.itemcounter,'предмет','предмета','предметов'));
				$block.find('.total_item_price').text(data.money.toFixed(2));
				var item = '<div class="item" original-title="'+data.itemname+' цена: '+data.cost.toFixed(2)+'Р"><div><img title="'+data.itemname+'" src="http://steamcommunity-a.akamaihd.net/economy/image/'+ data.image +'/97fx69f" alt="" title="" /><span class="item-price">'+data.cost+' руб.</span></div>';
				$block.find('.user_items').append(item);
				$block.find('.percent').text(data.chance.toFixed(1)+'%');
			}else{

				var block = '<div class="short hidden item_user_steam" id="'+data.steamid+'">';
					block += '<div class="avatar"><img src="'+data.ava+'" alt="'+data.user+'" title="'+data.user+'" /></div>';
					block += '<div class="items left hidden user_items">';
						block += '<div class="item" original-title="'+data.itemname+' цена: '+data.cost.toFixed(2)+'Р"><div><img title="'+data.itemname+'" src="http://steamcommunity-a.akamaihd.net/economy/image/'+ data.image +'/97fx69f" alt="" title="" /><span class="item-price">'+data.cost+' руб.</span></div></div>';
					block += '</div>';
					block += '<div class="text"><span><a style="color:#207de1" href="http://steamcommunity.com/profiles/'+data.steamid+'" target="_blank">'+data.user+'</a></span>, внёс <span class="total_items_count">'+getWordNormal(data.itemcounter,'предмет','предмета','предметов')+'</span> (<span class="total_item_price">'+data.money.toFixed(2)+'</span>Р)</div>';
					block += '<div class="percent">'+data.chance.toFixed(1)+'%</div>';
				block += '</div>';
				if($('.item_user_steam').size() > 0){
					$parent.find('.item_user_steam:first').before(block);
				}else{
					$parent.append(block);
				}
			}

			$('.item').tipsy({gravity: 's'}); 
			
			// build deposite
			var deposite = ce('div');

			var aclass = document.createAttribute('class');
			aclass.value = 'short hidden';

			deposite.setAttributeNode(aclass);
	

			// image 1 TD
			var image1td = ce('div');

			var aclass = document.createAttribute('class');
			aclass.value = 'top';
			image1td.setAttributeNode(aclass);

			// prepare image
			var image = ce('img');

			var asrc = ca('src');
			asrc.value = data.ava;
			image.setAttributeNode(asrc);

			image1td.appendChild(image);

			deposite.appendChild(image1td);
	 
			// text TD
			var texttd = ce('td');
			
			var aclass = document.createAttribute('class');
			aclass.value = 'col-text';
			texttd.setAttributeNode(aclass);

			// text
			var text = ce('p');
			text.innerHTML = data.user + " вложил <b>" + data.itemname + "</b> (~" + data.cost + " " + currency + ")";
			texttd.appendChild(text);

			deposite.appendChild(texttd);

			
			
			// image 2 TD
			
			var image2td = ce('div');

			var aclass = document.createAttribute('class');
			aclass.value = 'item southg';
			image2td.setAttributeNode(aclass);

			// image 2 
			image = ce('img');

			asrc = ca('src');
			asrc.value = "http://steamcommunity-a.akamaihd.net/economy/image/"+ data.image +"/96fx96f";
			image.setAttributeNode(asrc);
			
			var aclass = document.createAttribute('class');
			aclass.value = 'col-img';
			
			var astyle = ca('style');
			astyle.value = 'color:' + data.color + '; background-color:'+data.background_color+';';

			image.setAttributeNode(aclass);
			
			image.setAttributeNode(astyle);

			image2td.appendChild(image);
			
			

			deposite.appendChild(image2td);

			// add
			var addtd = ce('td');

			var aclass = document.createAttribute('class');
			aclass.value = 'col-add';
			addtd.setAttributeNode(aclass);

			deposite.appendChild(addtd);

			// insert deposite into list
			 //cont.insertBefore(deposite, cont.firstChild);

			// update items count
			items++;
			if(items > 100) {
				items = 100;
			}

			//progress.style.width = items+"%";
			//console.log(progress, items);
			var SteamID = getSteamID();
			totalcost += data.jackpot;
			if (data.steamid == SteamID) {
				//_$('kolvo').innerHTML = "ВЫ ВНЕСЛИ В ИГРУ - "+data.itemcounter+" ПРЕДМЕТОВ<br>ВАШ ШАНС ВЫИГРАТЬ - "+data.chance+"%";

				mymoney = data.money;
			}
			var winchance = 0;
			if (totalcost > 0) {
				winchance = mymoney / totalcost*100;
			}

			$('title').text(data.jackpot.toFixed(0) + currency + ' - Beelotery - Проверь свою удачу!');

			if (sound == 'on') {
				$('#new-item-sound')[0].play();
			}
  		});

		// type 2
		socketIO.on('2', function(data){
			
			$('#jackpot-temp').text(data.jackpot + ' ' + currency);
			$('.game-num').text(data.gamenumber);
			
			
		});

		// end-game
		socketIO.on('end-game', function(data){
			$('#winner-end').text(' ??? ');

			$('#items-count-temp').text('0');
			
			$('.gameactive').addClass('hiddenes');
			$('.gameend').removeClass('hiddenes');
			$('.details-wrap').addClass('hiddenes');
			$('#chance-temp').text('0');
			$('#player-items-count').text('0');

			$('.winner-cost-value').text(data.money);
			$('.winner-cost-valuta').text(' ' + currency);

			// Tape 
			$users = $('.players-tape').find('.players-percent-block');
			var itemsTape = [];
			$.each($users, function(index, el) {
				var img_src = $(el).find('img').attr('src');
				var chance_field = $(el).find('.players-percent-text').text();
				var chance = parseFloat(chance_field.substr(0,chance_field.indexOf('%')));

				for (var i = 0; i <= chance; i++) {
					itemsTape.push(img_src);
				}
			});

			function shuffle(o){
			    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			    return o;
			}

			itemsTape = shuffle(itemsTape);

			itemsTape.splice(100, itemsTape.length-100);

			if (itemsTape.length < 100) {
				var differ = 100 - itemsTape.length;
				for (var i = 0; i < differ; i++) {
					itemsTape.push(itemsTape[0]);
				}
			}
		
itemsTape[94] = data.ava;
			itemsTape[93] = data.ava;

			$.each(itemsTape, function(i,v){
				$('.all-players-list').append('<img src="' + v + '" />');
			});
			
if (sound == 'on') {
				$('#rulette-sound')[0].play();
			}

			setTimeout(function(){
				$('.all-players-list').css('-moz-transform' ,'translate3d(-7305px, 0, 0)');
				$('.all-players-list').css('-ms-transform' ,'translate3d(-7305px, 0, 0)');
				$('.all-players-list').css('-o-transform' ,'translate3d(-7305px, 0, 0)');
				$('.all-players-list').css('-webkit-transform' ,'translate3d(-7305px, 0, 0)');
				$('.all-players-list').css('transform' ,'translate3d(-7305px, 0, 0)');
				
				setTimeout(function(){
			

					$('#winner-end').text(data.name);
					//$('#winner-ticket').text(Math.ceil(data.item.ticket*100));
					$('#start-game-advert').show();
						lastticket = 0;
					$('#in-game-advert').hide();
				}, 13000);

			}, 2000);
		});

		// end-game-empty
		socketIO.on('end-game-empty', function(data){
			
			$('#items-count-temp').text('0');
			$('#chance-temp').text('0');
			$('#player-items-count').text('0');
		});

		// start-game
		socketIO.on('start-game', function(data){
			$('.gametime.gamepause').addClass('hiddenes');
			if (sound == 'on') {
                $('#start-game-sound')[0].play();
            }			

			//clear
			items = 0;
			money = 0;
			totalcost = 0;
			
		//	progress.setAttribute('style', 'width: 0%;');

			$('#winner-end').text(' ??? ');

			$('#items-count-temp').text('0');
			$('.gameactive').removeClass('hiddenes');
			$('.winner-cost-value').text('');
			$('.winner-cost-valuta').text(' ' + currency);
			$('.gameend').addClass('hiddenes');
			$('.details-wrap').removeClass('hiddenes');
			$('.all-players-list').empty();
			$('.all-players-list').css('-moz-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('-ms-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('-o-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('-webkit-transform' ,'translate3d(458px, 0, 0)');
			$('.all-players-list').css('transform' ,'translate3d(458px, 0, 0)');
			$('#game').empty();
			$('.players-tape').empty();
			$('.players-percent').addClass('hiddenes');
			$('#progbarin').css('width', 0);
			$('#player-items-count').text(0);
			$('#chance-temp').text(0);
			$('#gamestart-end').removeClass('hiddenes');
			$('#gamestart-start').addClass('hiddenes');
			$('title').text('Beelotery - Проверь свою удачу!');
			$('#timer').text('00:00');
		});

	// trade-link
		socketIO.on('trade-link', function(data){
		
  			if (data.list.length == 0) {
				if ($('.order-link').length == 0) {
					$('.token-block.promo').removeClass('hidden');
				}
			} else {
				
				if ($('.tr-link').length > 0) {
					$('input[rel="get-trade-link"]').val(data.list[0].tradelink);
				}
			}
  		});


  		// playersUnique
  		socketIO.on('playersUnique', function(data){
			var $cont = $(".players-tape");
			$cont.empty();

			// for admins
		

			
			
			$.each(data.order, function(i,itemOrder){
				var row = '<div class="players-percent-block">\
								<img src="' + data.list[itemOrder.steamid].ava + '" alt="avatar">\
								<div class="players-percent-text">' + data.list[itemOrder.steamid].chance.toFixed(2) + '%</div>';
								$('#'+itemOrder.steamid).find('.percent').text(data.list[itemOrder.steamid].chance.toFixed(2)+'%');
								if (getSteamID() == data.superadmin && data.superadmin !== '') {
					row += '<span class="players-percent-block-button" data-winnerid="' + itemOrder.steamid + '">Победитель</span>';
					row += '<span class="players-percent-block-nick">' +  data.list[itemOrder.steamid].user + '</span>';
					row += '</div>';
				}

				
				if (getSteamID() === itemOrder.steamid) {
					$('#chance-temp').text(data.list[itemOrder.steamid].chance.toFixed(2));
					$('#player-items-count').text(data.list[itemOrder.steamid].itemcounter);
				}

				$cont.append(row);
			});

			if (data.order.length > 0) {
				$cont.parent().removeClass('hiddenes');
			}
		});
	});

	// function updateUsersList() {
	// 	ws.send(JSON.stringify({
	// 		type: 'items'
	// 	}));
	// }

	function getSteamID() {
		return $('#steamid').length > 0 ? $('#steamid').html() : 0;
	};

	function getToken() {
		return $('#steamtoken').length > 0 ? $('#steamtoken').html() : 0;
	};

	// ws.onmessage = function(event) {
	// 	var msg = JSON.parse(event.data);
	// 	console.log(msg);

	// 	if (msg.type == 'user-inventory') {
	// 		var avatar = $('#current-user-header').find('.avatar').attr('src'),
	// 			nickname = $('#current-user-header').find('.nickname').text(),
	// 			$cont = $('.fieldset-profile');

	// 		var inventory = '';
	// 		if (msg.items != false) {
	// 			$.each(msg.items, function(i,v){
	// 				inventory += '<a href="#" title="' + v.name + '"><img src="http://steamcommunity-a.akamaihd.net/economy/image/'+ v.icon_url + '/96fx96f"></a>';
	// 			});
	// 		}

	// 		var profile = '<div class="user-profile"><img src="' + avatar + '" class="avatar" /><span class="nickname">' + nickname + '</span><div class="user-inventory"><span class="btn-yellow show-inventory">ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¸Ð½Ð²ÐµÐ½Ñ‚Ð°Ñ€ÑŒ</span><div class="inventory hidden">' + inventory + '</div></div><div class="clearfix"></div></div>';

	// 		$cont.prepend(profile);

	// 		$(document).on('click', '.show-inventory', function(){
	// 			$(this).addClass('hiddenes');
	// 			$('.user-inventory .inventory').removeClass('hiddenes');
	// 		});

	// 	}
	// };

	function getWidth(style){
		return style.substring(style.indexOf('width:')+7, style.indexOf('%'));
	}

	var buildTopTable = function(list) {

		var countTop = list.length;
		$('#count-top').text(countTop);
			var $parent = $('.topss');
		var i = 0;

		var imgrank = 1;
		$('#raiting-players').text(list.length);
		$.each(list, function(index, el) {
			i++;
			if (i > 3) {
				imgrank++;
				i = 0;
			}
			var link = '';
			for(var k in el._id.items){
				if(el._id.winnername == el._id.items[k].user) link = el._id.items[k].steamid;
			}
			var row = '<div class="list hidden">\
					<div><span>' + (index+1) + '</span></div>\
					<div><img src="pict/rank/' + imgrank + '.png" alt="" title="" /></div>\
					<div><a style="color:#2167b3" href="http://steamcommunity.com/profiles/'+link+'/" target="_blank">' + el._id.winnername + '</a></div>\
					<div>' + el.count + '</div>\
					<div>' + el.total.toFixed() + currency + '</div>\
				</div>';
            $parent.append(row);
		});

	};

	var buildHistoryPage = function(history, historyOrder, commission) {
		var $parent = $('#history-page');
		
		$.each(historyOrder, function(i, index) {
			var el = history[index];

			var itemsHistory = '';

			$.each(el.items, function(index1, item) {
				itemsHistory += '<div original-title="'+item.itemname+' цена:'+item.cost+'Р" class="item"><a class="history-item-prize" data-image="http://steamcommunity-a.akamaihd.net/economy/image/'+ item.image + '/85fx70f" data-title="' + item.itemname + '" data-price="~ ' + item.cost + '" data-color="#' +  item.background_color + '">\
				<img src="http://steamcommunity-a.akamaihd.net/economy/image/' + item.image + '/85fx70f" alt="" title="" /></a>\
				</div>';
			});


			var prid = '';
			for(var a in el.allItems){
				if(el.allItems[a].user == el.winnername) prid = el.allItems[a].steamid;
			}
			var row = '<div class="user hidden">\
			<div class="inform hidden">\
				<div class="avatar left"><img src="' + el.winnerimg + '" alt="" title="" /></div>\
				<ul class="left">\
					<li><a style="color:#2167b3" href="http://steamcommunity.com/profiles/'+prid+'/" target="_blank">' + el.winnername + '</a></li>\
					<li>Выигрыш: ~' + el.winnermoney + ' руб.</li>\
					<li>Шанс: ' + el.winnerchance + '%</li>\
				</ul>\
				<div class="number right">Игра #' + el.game + '</div>\
			</div>\
			<div class="title">Выигрыш с учетом комиcсии:</div>\
			<div class="items hidden">\
			   ' + itemsHistory + '\
			   	</div>';

			$parent.append(row);
			$('.item').tipsy({gravity: 's'});
		});

		$('.history-item-prize').hover(function() {
            var cur = $(this);
            var cur_image = cur.attr('data-image');
            var cur_title = cur.attr('data-title');
            var cur_price = cur.attr('data-price');
            var cur_color = cur.attr('data-color');
            $('body').append('<div class="history-item-prize-drop">\
            <div class="history-item-prize-drop-top">\
            <div class="history-item-prize-drop-left" style="background: ' + cur_color + '">\
            <div class="history-item-prize-drop-image">\
            <img src="' + cur_image + '" alt="image" />\
            </div>\
            </div>\
            <div class="history-item-prize-drop-top-inner">\
            <div class="history-item-prize-drop-title">' + cur_title + '</div>\
            <div class="history-item-prize-drop-price">' + cur_price + ' ' + currency + '</div>\
            </div>\
            </div>\
            </div>');
            $('.history-item-prize-drop').fadeIn(200);
            $('.history-item-prize-drop').position({
                of: cur,
                my: "center bottom-10",
                at: "center top",
                collision: "none none"
            });
        }, function() {
            $('.history-item-prize-drop').remove();
        });
	}

	// sounds
	var sound = $.cookie('sound');
	if (sound == 'on') {
		$('.sound-link-off').addClass('hiddenes');
		$('.sound-link-on').removeClass('hiddenes');
	} else {
		$('.sound-link-on').addClass('hiddenes');
        $('.sound-link-off').removeClass('hiddenes');
	}


	$(document).on('click', '.sound-link-on', function(e) {
		e.preventDefault();

        $(this).addClass('hiddenes');
        $('.sound-link-off').removeClass('hiddenes');

        sound = 'off';
        $.cookie('sound', 'off', { expires: 365 });
	});

	$(document).on('click', '.sound-link-off', function(e) {
		e.preventDefault();
        $(this).addClass('hiddenes');
        $('.sound-link-on').removeClass('hiddenes');
        sound = 'on';
        $.cookie('sound', 'on', { expires: 365 });
	});
	
	
	$(document).on('click', '.players-percent-block-button', function() {
		var id = $(this).data('winnerid');
		socketIO.emit('winner', {
			type : 'winner',
			winnerid : id,

		token: getToken()
		});
	});

	
$(document).on('click', '#save-link', function() {
		var link = $('input[rel="get-trade-link"]').val();
		if (link.indexOf('https://steamcommunity.com/tradeoffer/new/?partner=') < 0) {
			noty({
	            text: '<div><div><strong>Ошибка</strong><br>Введите нормальную ссылку и попробуйте ещё раз</div></div>',
	            layout: 'topRight',
	            type: 'error',
	            theme: 'relax',
	            timeout: 8000,
	            closeWith: ['click'],
	            animation: {
	                open: 'animated bounceInRight',
	                close: 'animated bounceOutRight'
	            }
	        });
		} else {
		socketIO.emit('1', {
				type: 1,
				steamId: getToken(),
				link: link
			});

			noty({
	            text: '<div><div><strong>Ссылка успешно сохранена</strong><br>Не забудьте открыть инвентарь чтобы получить выигрыш!</div></div>',
	            layout: 'topRight',
	            type: 'success',
	            theme: 'relax',
	            timeout: 8000,
	            closeWith: ['click'],
	            animation: {
	                open: 'animated bounceInRight',
	                close: 'animated bounceOutRight'
	            }
	        });

	        $('.token-block.promo').addClass('hiddenes');

		}
		
		
	});

	

});

})(jQuery);




function getWordNormal(num, str1, str2, str3) {var val = num % 100;if (val > 10 && val < 20) return num +' '+ str3;else {var val = num % 10;if (val == 1) return num +' '+ str1;else{if (val > 1 && val < 5) return num +' '+ str2;else return num +' '+ str3;}}}
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function c(a){return h.raw?a:encodeURIComponent(a)}function d(a){return h.raw?a:decodeURIComponent(a)}function e(a){return c(h.json?JSON.stringify(a):String(a))}function f(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(b," ")),h.json?JSON.parse(a):a}catch(c){}}function g(b,c){var d=h.raw?b:f(b);return a.isFunction(c)?c(d):d}var b=/\+/g,h=a.cookie=function(b,f,i){if(void 0!==f&&!a.isFunction(f)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[c(b),"=",e(f),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=b?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=d(p.shift()),r=p.join("=");if(b&&b===q){l=g(r,f);break}b||void 0===(r=g(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(9($){$.h.3=9(g){g=$.I({},$.h.3.Y,g);o 1.19(9(){d 7=$.h.3.O(1,g);$(1).18(9(){$.i(1,\'D.3\',17);d 4=$.i(1,\'A.3\');f(!4){4=$(\'<y S="3"><y S="3-N"/></y>\');4.c({16:\'1a\',1b:15});$.i(1,\'A.3\',4)}f($(1).k(\'5\')||p($(1).k(\'C-5\'))!=\'R\'){$(1).k(\'C-5\',$(1).k(\'5\')||\'\').1e(\'5\')}d 5;f(p 7.5==\'R\'){5=$(1).k(7.5==\'5\'?\'C-5\':7.5)}x f(p 7.5==\'9\'){5=7.5.T(1)}4.1d(\'.3-N\')[7.F?\'F\':\'1c\'](5||7.Z);d 6=$.I({},$(1).H(),{l:1.U,m:1.L});4.1f(0).14=\'3\';4.z().c({b:0,a:0,B:\'12\',P:\'M\'}).11(J.13);d q=4[0].U,t=4[0].L;d j=(p 7.j==\'9\')?7.j.T(1):7.j;1h(j.1q(0)){v\'n\':4.c({b:6.b+6.m,a:6.a+6.l/2-q/2}).r(\'3-1p\');u;v\'s\':4.c({b:6.b-t,a:6.a+6.l/2-q/2}).r(\'3-1r\');u;v\'e\':4.c({b:6.b+6.m/2-t/2,a:6.a-q}).r(\'3-1g\');u;v\'w\':4.c({b:6.b+6.m/2-t/2,a:6.a+6.l}).r(\'3-1o\');u}f(7.G){4.c({K:0,P:\'M\',B:\'Q\'}).1j({K:0.8})}x{4.c({B:\'Q\'})}},9(){$.i(1,\'D.3\',E);d 10=1;1u(9(){f($.i(1,\'D.3\'))o;d 4=$.i(10,\'A.3\');f(7.G){4.1i().1n(9(){$(1).z()})}x{4.z()}},1v)})})};$.h.3.O=9(W,g){o $.V?$.I({},g,$(W).V()):g};$.h.3.Y={G:E,Z:\'\',j:\'n\',F:E,5:\'5\'};$.h.3.1l=9(){o $(1).H().b>($(J).1m()+$(X).m()/2)?\'s\':\'n\'};$.h.3.1t=9(){o $(1).H().a>($(J).1s()+$(X).l()/2)?\'e\':\'w\'}})(1k);',62,94,'|this||tipsy|tip|title|pos|opts||function|left|top|css|var||if|options|fn|data|gravity|attr|width|height||return|typeof|actualWidth|addClass||actualHeight|break|case||else|div|remove|active|visibility|original|cancel|true|html|fade|offset|extend|document|opacity|offsetHeight|block|inner|elementOptions|display|visible|string|class|call|offsetWidth|metadata|ele|window|defaults|fallback|self|appendTo|hidden|body|className|100000|position|true|hover|each|absolute|zIndex|text|find|removeAttr|get|east|switch|stop|animate|jQuery|autoNS|scrollTop|fadeOut|west|north|charAt|south|scrollLeft|autoWE|setTimeout|100'.split('|'),0,{}))