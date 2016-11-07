<?php 
// $to - кому отправляем 
$to = 'info@2evolution.it';
// $from - от кого 
$from='info@2evolution.it'; 
// $title - Заголовок письма
$title = "Title";
// $success - Сообщение при успешной отправке
$success = "Message success";
// $success - Сообщение при НЕ успешной отправке
$error = "Message failed";

    //print_r($_POST);
	
if($_POST[name] && $_POST[email] && $_POST[message]) {
	$name = htmlspecialchars(trim($_POST[name]));
    $email = htmlspecialchars(trim($_POST[email]));    
	$text = htmlspecialchars($_POST[message]);

    $mess = "";
		$mess .= "\r\n".'Name - '.$name;
		$mess .= "\r\n".'Email - '.$email;
		$mess .= "\r\n".'Message - '.$text;

	
	require_once('phpmailer/PHPMailerAutoload.php');
	$email = new PHPMailer;
    $email->CharSet   = "UTF-8";
	$email->From      = $from;
	$email->FromName  = $name;
	$email->Subject   = $title;
	$email->Body      = $mess;
	$email->AddAddress( $to );
	
	
	if(!$email->send()) {
		echo $error;
		//echo 'Mailer Error: ' . $email->ErrorInfo;
	} else {
		echo $success;
	}
        
} 
