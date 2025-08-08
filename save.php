<?php
header('Content-Type: application/json; charset=utf-8');
if($_SERVER['REQUEST_METHOD']!=='POST'){
  echo json_encode(['ok'=>false,'error'=>'método']);
  exit;
}
if(!empty($_POST['website'])){
  echo json_encode(['ok'=>true]);
  exit;
}
$nombre=trim($_POST['nombre']??'');
$telefono=trim($_POST['telefono']??'');
$email=filter_var($_POST['email']??'',FILTER_VALIDATE_EMAIL);
$curso=trim($_POST['curso']??'');
$mensaje=trim($_POST['mensaje']??'');
if(!$nombre||!$telefono||!$email){
  echo json_encode(['ok'=>false,'error'=>'datos']);
  exit;
}
$fecha=date('c');
$uploadDir=__DIR__.'/uploads/';
if(!is_dir($uploadDir)) mkdir($uploadDir,0775,true);
$files=[];
$allowed=['pdf','jpg','jpeg','png','heic','docx'];
if(isset($_FILES['archivos'])){
  foreach($_FILES['archivos']['name'] as $i=>$name){
    if($_FILES['archivos']['error'][$i]!==UPLOAD_ERR_OK) continue;
    if($_FILES['archivos']['size'][$i]>10*1024*1024) continue;
    $ext=strtolower(pathinfo($name,PATHINFO_EXTENSION));
    if(!in_array($ext,$allowed)) continue;
    $safe=preg_replace('/[^A-Za-z0-9-_\.]/','_', $name);
    $final=time().'_'.$safe;
    if(move_uploaded_file($_FILES['archivos']['tmp_name'][$i],$uploadDir.$final)){
      $files[]=$final;
    }
  }
}
$dataDir=__DIR__.'/data/';
if(!is_dir($dataDir)) mkdir($dataDir,0775,true);
$csv=$dataDir.'contactos.csv';
if(!file_exists($csv)) file_put_contents($csv,"fecha,nombre,telefono,email,curso,mensaje,archivos\n");
$fp=fopen($csv,'a');
fputcsv($fp,[$fecha,$nombre,$telefono,$email,$curso,$mensaje,implode('|',$files)]);
fclose($fp);
echo json_encode(['ok'=>true]);
