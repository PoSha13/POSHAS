<?php
$str = isset($_GET['string']) ? md5($_GET['string']) : md5(time());
$srt = base64_encode($str);
echo md5($srt);