<?php
header('Content-Type: application/json');
$max=1048576; //1MB
$file=__DIR__.'/../data/enrollments.json';
$notifFile=__DIR__.'/../data/notifications.json';
$coursesFile=__DIR__.'/../data/courses.json';
if(filesize($file)>$max){echo json_encode(['ok'=>false]);exit;}
$data=file_exists($file)?json_decode(file_get_contents($file),true):[];
$token=$_POST['token']??'';
if(!$token||in_array($token,array_column($data,'token'))){echo json_encode(['ok'=>false]);exit;}
$name=trim($_POST['name']??'');
$email=trim($_POST['email']??'');
$phone=trim($_POST['phone']??'');
$group=trim($_POST['group_id']??'');
if(strlen($name)>100||strlen($email)>100||strlen($phone)>20){echo json_encode(['ok'=>false]);exit;}
if(!filter_var($email,FILTER_VALIDATE_EMAIL)){echo json_encode(['ok'=>false]);exit;}
if(!preg_match('/^\d{10,15}$/',$phone)){echo json_encode(['ok'=>false]);exit;}
$courses=json_decode(file_get_contents($coursesFile),true);
$price=300;$discount=0;$start=null;
foreach($courses as $c){
  foreach($c['grupos'] as $g){
    if($g['id_grupo']===$group){$start=$g['inicio'];break 2;}
  }
}
if($start){
  $diff=(strtotime($start)-time())/86400;
  if($diff>=7){$discount=0.2;$price=240;}
}
$entry=[
  'token'=>$token,
  'name'=>htmlspecialchars($name,ENT_QUOTES,'UTF-8'),
  'email'=>htmlspecialchars($email,ENT_QUOTES,'UTF-8'),
  'phone'=>htmlspecialchars($phone,ENT_QUOTES,'UTF-8'),
  'group_id'=>$group,
  'price'=>$price,
  'discount'=>$discount,
  'time'=>date('c')
];
$data[]=$entry;
file_put_contents($file,json_encode($data,JSON_PRETTY_PRINT));
$notif=file_exists($notifFile)?json_decode(file_get_contents($notifFile),true):['enrollments'=>0,'callbacks'=>0];
$notif['enrollments']++;
file_put_contents($notifFile,json_encode($notif));
echo json_encode(['ok'=>true]);
