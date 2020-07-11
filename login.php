<?php
if (isset($_POST['sendotp'])){
// Authorisation details.
$username = "ritonodhiambo@gmail.com";
$hash = "1cbc94b274e81347a1e639efa76b85cd10787b1a0e5af34298073f395e7eb161";

// Config variables. Consult http://api.txtlocal.com/docs for more info.
$test = "0";

// Data for text message. This is the text message data.
$sender = "API Test"; // This is who the message appears to be from.

$numbers = $_POST['num'];// A single number or a comma-seperated list of numbers
$otp= mt_rand(100000,99999);
setcookie("otp",$otp);
$message = "Password for Game Quiz is ".$otp;
// 612 chars or less
// A single number or a comma-seperated list of numbers
$message = urlencode($message);
$data = "username=".$username."&hash=".$hash."&message=".$message."&sender=".$sender."&numbers=".$numbers."&test=".$test;
$ch = curl_init('http://api.txtlocal.com/send/?');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch); // This is the result from the API
curl_close($ch);
}
if(isset($_POST['ver'])){
    $verotp=$_POST['otp'];
    if($verotp==$_COOKIE['otp']){
        echo ("logged in successfully");
    } else{
        echo("Wrong password");
    }
}
?>

