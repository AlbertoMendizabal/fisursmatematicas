<?php
header('Content-Type: application/json');
if($_SERVER['REQUEST_METHOD']!=='POST'){
  http_response_code(405);
  echo json_encode(['error'=>'Método no permitido']);
  exit;
}
if(!empty($_POST['website'])){
  echo json_encode(['error'=>'Spam']);
  exit;
}
$nombre=trim($_POST['nombre']??'');
$telefono=trim($_POST['telefono']??'');
$email=trim($_POST['email']??'');
$curso=trim($_POST['curso']??'');
$mensaje=trim($_POST['mensaje']??'');
if($nombre===''||$telefono===''||$email===''||$curso===''||$mensaje===''){
  echo json_encode(['error'=>'Faltan campos']);
  exit;
}
if(!preg_match('/^\d{10}$/',$telefono)){
  echo json_encode(['error'=>'Teléfono inválido']);
  exit;
}
$uploadDir=__DIR__.'/uploads';
$dataDir=__DIR__.'/data';
if(!is_dir($uploadDir)) mkdir($uploadDir,0775,true);
if(!is_dir($dataDir)) mkdir($dataDir,0775,true);
$allowed=['pdf','jpg','jpeg','png','heic','docx'];
$max=10*1024*1024;
$files=[];
if(!empty($_FILES['archivos'])){
  foreach($_FILES['archivos']['tmp_name'] as $i=>$tmp){
    if($_FILES['archivos']['error'][$i]===UPLOAD_ERR_NO_FILE) continue;
    if($_FILES['archivos']['size'][$i]>$max) continue;
    $ext=strtolower(pathinfo($_FILES['archivos']['name'][$i],PATHINFO_EXTENSION));
    if(!in_array($ext,$allowed)) continue;
    $safe=time()."_{$i}.{$ext}";
    if(move_uploaded_file($tmp,$uploadDir.'/'.$safe)) $files[]=$safe;
  }
}
$csv=$dataDir.'/contactos.csv';
if(!file_exists($csv)){
  file_put_contents($csv,"fecha,nombre,telefono,email,curso,mensaje,archivos\n");
}
$row=[date('Y-m-d H:i:s'),$nombre,$telefono,$email,$curso,$mensaje,implode('|',$files)];
$f=fopen($csv,'a');
fputcsv($f,$row);
fclose($f);
echo json_encode(['ok'=>true]);
?>
