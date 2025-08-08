<?php
header('Content-Type: application/json');
$max=1048576;
$file=__DIR__.'/../data/callbacks.json';
$notifFile=__DIR__.'/../data/notifications.json';
if(filesize($file)>$max){echo json_encode(['ok'=>false]);exit;}
$data=file_exists($file)?json_decode(file_get_contents($file),true):[];
$token=$_POST['token']??'';
if(!$token||in_array($token,array_column($data,'token'))){echo json_encode(['ok'=>false]);exit;}
$name=trim($_POST['name']??'');
$contact=trim($_POST['contact']??'');
$dt=trim($_POST['datetime']??'');
$course=trim($_POST['course_id']??'');
$comment=trim($_POST['comment']??'');
if(strlen($name)>100||strlen($contact)>100||strlen($comment)>500||strlen($course)>50){echo json_encode(['ok'=>false]);exit;}
if(!$dt||strtotime($dt)===false){echo json_encode(['ok'=>false]);exit;}
$entry=[
  'token'=>$token,
  'name'=>htmlspecialchars($name,ENT_QUOTES,'UTF-8'),
  'contact'=>htmlspecialchars($contact,ENT_QUOTES,'UTF-8'),
  'course_id'=>htmlspecialchars($course,ENT_QUOTES,'UTF-8'),
  'datetime'=>$dt,
  'comment'=>htmlspecialchars($comment,ENT_QUOTES,'UTF-8'),
  'time'=>date('c')
];
$data[]=$entry;
file_put_contents($file,json_encode($data,JSON_PRETTY_PRINT));
$notif=file_exists($notifFile)?json_decode(file_get_contents($notifFile),true):['enrollments'=>0,'callbacks'=>0];
$notif['callbacks']++;
file_put_contents($notifFile,json_encode($notif));
echo json_encode(['ok'=>true]);
