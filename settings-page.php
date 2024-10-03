<?php include('head.php'); ?>

<body id="settings-page">
<div class="wrapper">

<?php include('header.php'); ?>

<div class="content" role="main">
<div class="container">
<div class="content-box shown">
<div class="content-main">
<div class="content-main-inner">
<div class="settings">
        <div class="settings-top">
            <div class="settings-title">Настройки</div>
        </div>
        <div class="settings-content">
                <!--fieldset class="fieldset-browser">
                    <h4>Настройка оповещения через браузер</h4>
                    <p>При получении Ваших вещей ботом или победе, появится окно в правом нижнем углу монитора (даже если браузер свернут в трей) и прозувучит разовый звуковой сигнал. Если у Вас будет закрыта вкладка с нашим сайтом, то оповещения не произойдет.</p>
                    <p>Эта функция может быть недоступна а старых или малоиспользуемых браузерах.</p>
                    <div class="buttons">
                        <a href="#" class="btn-yellow">Включить оповещения через браузер</a>
                        <a href="#" class="btn-blue">Выключить звук оповещения</a>
                    </div>
                </fieldset>
                <fieldset class="fieldset-referral">
                    <h4>Реферальная система</h4>
                    <div class="fieldset-referral-form">
                        <h4>Приглашайте больше друзей - и получайте бонусы!</h4>
                        <div class="referrals">
                            <span class="referrals-title">Вы привели:</span><span class="referrals-count"><span class="referrals-count-value">8</span> человек</span><span class="referrals-cost">~ $243.29</span>
                        </div>
                        <div class="form-line">
                            <div class="wrap-input"><input type="text" name="par1" value="https://steemcommuniy.com/sddsdfdfdf/dfsdggfdhfh/dhf`j84398jffidj8us7df7y"></div>
                        </div>
                        <div class="buttons">
                            <a href="#" class="btn-yellow">Скопировать в буфер</a>
                        </div>
                    </div>
                </fieldset-->
                <fieldset class="fieldset-profile">
                    <h4>Настройки профиля</h4>
                    <div class="form-line first">
                        <div class="wrap-label">
                            <label for="par2">Ссылка на обмен в Steam:</label>
                        </div>
                        <div class="form-inner">
                            <div class="form-line">
                                <div class="wrap-input">
                                    <input type="text" rel="get-trade-link" id="par2" name="par2" placeholder="Например: https://steamcommunity.com/tradeoffer/new/?partner=226107091&amp;token=pWn1337k">
                                </div>
                            </div>
                            <p><a class="trade-link" href="http://steamcommunity.com/id/id/tradeoffers/privacy#trade_offer_access_url" target="_blank">Где взять ссылку?</a></p>
                            <p><strong>Обязательно <a href="http://steamcommunity.com/id/id/edit/settings" target="_blank" class="">откройте инвентарь</a> в Steam для получения приза! </strong></p>
                        </div>
                    </div>
                    <div class="form-line">
                        <div class="wrap-label">
                            <label for="par3">Ссылка на обмен в Steam:</label>
                        </div>
                        <div class="form-inner">
                            <div class="wrap-input">
                                <input type="text" id="par3" name="par3" value="Mail@mail.ru">
                            </div>
                            <div class="checkbox-holder">
                                <label>
                                    <input type="checkbox" class="check" name="par3" checked="" style="position: absolute; z-index: 1; opacity: 0; cursor: pointer;"><span class="checkbox checkbox-checked"><span class="mark"><img src="img/empty.png"></span></span>
                                    <span class="checkbox-label">Я согласен получать новости</span>
                                </label>
                            </div>
                        </div>
                    </div-->
                    <div class="buttons">
                        <div class="btn-yellow save-link">
                            <span>Сохранить настройки</span>
                        </div>
                    </div>
                </fieldset>
        </div>
    </div>
    <!-- promo end -->

    <!-- promo no token -->
    <div class="token-block promo hidden">
        <!-- jackpot -->
        <div class="jackpot">
            <!-- form-get-link -->
            <div class="form-get-link">
                <h4>Внимание! Необходимо ввести ссылку на обмен. <a class="trade-link" href="http://steamcommunity.com/id/id/tradeoffers/privacy#trade_offer_access_url" target="_blank">( Где взять ссылку? )</a></h4>
                <div class="form-line">
                    <div class="wrap-input"><input type="text" name="link" placeholder="Например: https://steamcommunity.com/tradeoffer/new/?partner=226107091&amp;token=pWn1337k"></div>
                </div>
                <div class="buttons">
                    <div class="btn-yellow save-link">Запомнить ссылку</div>
                    <p>Обязательно <a href="http://steamcommunity.com/id/id/edit/settings" target="_blank" class="openinv-link">откройте инвентарь</a> в Steam для получения приза! </p>
                </div>
            </div>
            <!-- form-get-link end -->
        </div>
        <!-- jackpot end -->
    </div>
    <!-- promo end -->

    <div class="game">
    <p class="steampowered">Powered by Steam, a registered trademark of Valve Corporation.</p>
</div>
</div>
</div>
<?php include('sidebar.php'); ?>
</div>
</div>
</div>
</div>

</body>
</html>
