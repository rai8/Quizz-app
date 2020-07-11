<!DOCTYPE html>
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

<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <div class="container">
        <div class="jumbotron">
        <h1>Enter password to play the game quiz</h1>
        <div class="card-body">
            <div class="col-md-6">
                <form action="login.php" method="POST">
                    <div class="form-group">
                        <label for="exampleINputPassword">Mobile number</label>
                        <input type="number" name="num" class="form-control" id="number" placeholder="Enter mobile number">
                    </div>
<button type="submit" name="sendotp" class="btn btn-success">Send Password</button>
<input type="number" name="otp" placeholder="Enter received password" />
<button type="submit" name="ver" class="btn btn-info">Send Password</button>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="./js/jquery.slim.min.js"></script>
    <script src="./js/popper.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>
</body>

</html>
