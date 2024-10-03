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

<div class="content about">
<!-- <middle> -->

	<div class="title-page"><span>О нашем сайте</span></div>

	<p>Добро пожаловать на наш сервис beelotery.ru по розыгрышам предметов из игры Counter-Strike: Global Offensive</p>

	<p class="title">Как же происходит розыгрыш предметов?</p>

	<p>Все участники вносят предметы или скины из CS:GO в сервис. Когда набирается необходимоче количество предметов или проходит отведенное на игру время, система случайным образом выбирает победителя, который забирает все предметы. Чаще выигрывает тот, кто добавил более дорогие позиции.</p>

	<p class="title">Как это работает?</p>

	<p>Все довольно просто: Вы вносите в депозит свои скины. Система начисляет Вам очки (У каждого скина есть своя цена на торговой площадке). Например: если Ваш предмет стоит $1, то Вы получите 100 билетов. А со скином $10, вы получите 1000 билетов. И так далее. При достижении порога в 70 предметов, мы собираем все выданные очки вместе и случайным образом выбираем одного победителя. Шанс выигрыша у игрока с большим количеством очков выше, чем у других. Победитель получает все предметы розыгрыша, за вычетом комиссии системы.</p>

	<div class="inform-about">Чем больше и дороже предметы Вы ставите, тем больше шанс сорвать джекпот! Но даже вкладывая 1 цент, у Вас есть возможность получить все предметы!</div>

	<p class="title">Правила и особенности:</p>

	<ol>
		<li>Максимальный депозит предметов в одной игре указан в описании выбраной комнаты.</li>
		<li>Если Вы поставили предметов больше, чем может вместить текущий раунд или после окончания раунда, они пойдут в следующий.</li>
		<li>Комиссия системы варьируется от 4 до 10 процентов в зависимости от величины выигрыша и бонусов.</li>
		<li>Выдача выигрыша передается сразу в автоматическом режиме. В редких случаях время выдачи может затянуться до нескольких минут.</li>
		<li>Если вы не забрали выигрыш в течении 10 минут, он аннулируется. Это необходимо, что бы инвентарь бота не забивался.</li>
		<li>Каждый раз отправляя предметы, Вы соглашаетесь с правилами использования сайта.</li>
		<li>Если Ваш инвентарь закрыт или Вы указали не верную ссылку на инвентарь, то в течении часа можете это исправить самостоятельно или с помощью технической поддержки. Мы будем пытаться отправить выигрыш постоянно в течении отведенного времени.</li>
		<li>Максимальное время игры регулируется правилами выбранной комнаты.</li>
		<li>Принимается вещи только для CS:GO. Если при передачи депозита будут предметы из других игр или сервиса Steam, такие передачи будут отклоняться в автоматическом режиме.</li>
		<li>Мы можем гарантировать правильную оценку стоимости вещи только тогда, когда она есть на Торговой площадке Steam, иначе ваш предмет может быть неверно оценен.
		<li>Запрещено ставить сувенирные предметы исключая сувенирные наборы, такие передачи отменяются.</li>
		<li>Мы оставляем за собой право высылать выигрыш случайными предметами эквивалентно сумме выигрыша, в случае, если по нашей вине выигрыш не был доставлен вовремя.</li>
	</ol>

	<p class="title">Конфиденциальность:</p>

	<ol>
		<li>Мы не храним каких-либо данных пользователя, кроме логина в Steam и Вашу ссылку на инвентарь.</li>
		<li>Аватар и Ваш ник доступны всем пользователям сервиса в реальном времени.</li>
	</ol>


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