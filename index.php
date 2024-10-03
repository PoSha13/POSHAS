<html>
<head>
<meta charset="utf-8">
<link rel="SHORTCUT ICON" href="favicon.ico">
<title> Beelotery.ru </title>
<meta name="keywords" content="">
<meta name="description" content="">
<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<meta name="viewport" content="width=1180">

<link href="css/widgets.css" rel="stylesheet" media="screen">
<!--[if gte IE 9]><link rel="stylesheet" href="/css/ie9.css" media="screen, projection"><![endif]-->
<!--[if lte IE 8]><link rel="stylesheet" href="/css/ie8.css" media="screen, projection"><![endif]-->
<!--[if lte IE 7]><link rel="stylesheet" href="/css/ie7.css" media="screen, projection"><![endif]-->
<script src="/js/libs/jquery-2.1.3.min.js"></script>
<script src="/js/jquery.noty.packaged.min.js"></script>
<script src="js/jquery.cookie.js"></script>
<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="styles/fonts.css" />
<script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
<script type="text/javascript" src="/scripts/scroll.js"></script>
<script type="text/javascript" src="/scripts/nscroll.js"></script>
<script src="/scripts/script.js"></script>

<script src="/script.js"></script>
</head>

<audio id="new-item-sound" src="/sounds/new-item.mp3" preload="auto"></audio> 
<audio id="start-game-sound" src="/sounds/start-game.mp3" preload="auto"></audio>
<audio id="rulette-sound" src="/sounds/rulette.wav" preload="auto"></audio>

<body>



<header>

	<div class="top hidden">
		<div class="width">

			<a href="/" class="logotype left"></a>

			<ul class="left">
				<li><a href="/">Начать игру</a></li>
				<li><a href="/about.php">О сайте</a></li>
				<li><a href="/history.php">История игр</a></li>
				<li><a href="/top.php">Топ игроков</a></li>
			</ul>
						<a href="logger.php?login" class="login right"><span>Войти через Steam</span></a>
 		</div>
	</div>

	<div class="middle hidden">
		<div class="width">

			<div class="numbers hidden">

				<div class="left">
					<div class="block"><span id="inf1"></span>человек онлайн</div>
					<div class="block"><span id="inf7"></span>игр за сегодня</div>
				</div>

				<div class="right">
					<div class="block"><span id="inf8"></span>вещ. разыграно</div>
					<div class="block"><span class="jackpotNum"></span>макс. выигрыш</div>
				</div>

			</div>

			<div class="inform inf-l"><a href="https://vk.com/topic-97725900_31972171" target="_blank" class="btn help__button"><span>Тех. Поддержка</span></a></div>
			<div class="inform inf-r"><span>Beelotery.ru</span>Добавь в свой ник и получи -5% комиссии!</div>

			<div class="last-winner">

				<div>Последний победитель</div>

				<div class="user">

					<div class="avatar">
						<span id="winner-avatar"></span>
						
						<div class="sum" id="winner-money"></div>
					</div>

					<a href="#" id="winner-name"></a>

				</div>

			</div>

		</div>
	</div>

</header>

<div class="content">
<!-- <middle> -->
	<div class="players-percent hidden hiddenes">
		<div hidden class="players-arrows players-left" style="display: none;"></div>
		<div hidden class="players-tape">
		</div>
		<div hidden class="players-arrows players-right" style="display: none;"></div>
	</div>
	<div class="game-panel hidden">

		<div class="block">Игра:  <span >#</span><span class="game-num"></span></div>

		<div class="block">Банк: <span id="jackpot-temp">0</span></div>

		<div class="block">Предметов: <span id="items-count-temp">0</span></div>

		<div class="timer">
			<div class="arrow"></div>
			Осталось<br>немного!)
			<div class="time">Время - <div id="timer"  style=" float: right; "><span id="timer-1" class="timer-digit">0</span><span id="timer-2" class="timer-digit">0</span>:<span id="timer-3" class="timer-digit">0</span><span id="timer-4" class="timer-digit">0</span> </div></div>
		</div>
			<a href="logger.php?login" class="added right"><span>Войти</span></a>
 	</div>

	<div class="deposit">Минимальная сумма депозита 10 рублей. Максимальный депозит - 20 вещей</div>

	
	<div class="game-info gameend hiddenes">
		<div hidden class="game-status"><strong hidden>Игра #<span hidden class="game-num"></span> - закончилась!</strong></div>
		<div class="all-playersalll">
		<div class="all-players">
		<span class="lineaall"></span>
			<div class="all-players-list" style="-moz-transform: translate3d(390px, 0, 0);-ms-transform: translate3d(390px, 0, 0);-o-transform: translate3d(390px, 0, 0);-webkit-transform: translate3d(390px, 0, 0);transform: translate3d(390px, 0, 0); -moz-transition: 13s ease;-o-transition: 13s ease;-webkit-transition: 13s ease;transition: 13s ease; backface-visibility: hidden;">
			</div>
		</div>	</div>
		
	</div>
	
<div id="game-content">
		<div id="scrollcontent">
			
			<div id="game">
</div>
		</div>

		<div id="scrollbar">
			<div id="scroller" class="scroller"></div>
		</div>

	</div>

	<div class="start-game">ИГРА НАЧАЛАСЬ! ВНОСИТЕ ДЕПОЗИТЫ!</div>

<!-- </middle> -->
</div>

<footer>
	<div class="width">

		<div class="copyrights">© 2015, BEELOTERY.RU. ВСЕ ПРАВА СОХРАНЕНЫ!</div>
		<div class="">авторизируйся через steam и испытай свою удачу :)</div>

	</div>
</footer>

<script> 
TINY.scroller.init('game-content','scrollcontent','scrollbar','scroller');
</script>

</body>
</html>