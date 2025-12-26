<?php
session_start();
$codes=['1991','2025'];
if(isset($_POST['code']) && in_array($_POST['code'],$codes)){
  $_SESSION['auth']=true;
}
if(isset($_GET['logout'])){
  session_destroy();
  header('Location: admin.php');
  exit;
}
$csv=__DIR__.'/data/contactos.csv';
$rows=file_exists($csv)?array_map('str_getcsv',file($csv)):[[]];
$enrollFile=__DIR__.'/data/enrollments.json';
$callbackFile=__DIR__.'/data/callbacks.json';
$enrolls=file_exists($enrollFile)?json_decode(file_get_contents($enrollFile),true):[];
$callbacks=file_exists($callbackFile)?json_decode(file_get_contents($callbackFile),true):[];
$notifyFile=__DIR__.'/data/notifications.json';
$notify=file_exists($notifyFile)?json_decode(file_get_contents($notifyFile),true):['enrollments'=>0,'callbacks'=>0];
$hasNew=false;
if(isset($_SESSION['auth'])){
  $hasNew=(($notify['enrollments']+$notify['callbacks'])>0);
  if($hasNew) file_put_contents($notifyFile,json_encode(['enrollments'=>0,'callbacks'=>0]));
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mensajes</title>
<!-- build-id: GOLDLOCK_20250308_1200 -->
<link rel="stylesheet" href="css/styles.css?v=20250308-1200">
</head>
<body data-build="GOLDLOCK_20250308_1200">
<header class="sticky">
  <div class="container">
    <h1>Mensajes</h1>
    <a href="https://wa.me/525610885357" class="whatsapp">WhatsApp: +52 56 1088 5357</a>
    <?php if(isset($_SESSION['auth'])): ?>
    <nav><a href="index.html">Inicio</a> <a href="?logout=1">Salir</a></nav>
    <?php endif; ?>
  </div>
</header>
<main class="container">
<?php if(empty($_SESSION['auth'])): ?>
  <form method="post">
    <label>Código
      <input type="password" name="code" required>
    </label>
    <button type="submit">Entrar</button>
  </form>
<?php else: ?>
  <h2>Edicion rapida</h2>
  <table class="sheet"><thead><tr><th>Contenido</th><th>Fecha</th><th>Numero</th></tr></thead><tbody><tr><td contenteditable="true">Texto</td><td contenteditable="true">2025-01-01</td><td contenteditable="true">1</td></tr></tbody></table>

  <div style="overflow-x:auto">
    <table>
      <thead>
        <tr>
          <?php foreach($rows[0] as $h) echo '<th>'.htmlspecialchars($h).'</th>'; ?>
        </tr>
      </thead>
      <tbody>
        <?php for($i=1;$i<count($rows);$i++): $r=$rows[$i]; ?>
        <tr>
          <?php foreach($r as $k=>$v){
            if($k==6){
              echo '<td>';
              foreach(explode('|',$v) as $f){
                if($f) echo '<a href="uploads/'.htmlspecialchars($f).'">'.htmlspecialchars($f).'</a><br>';
              }
              echo '</td>';
            }else{
              echo '<td>'.htmlspecialchars($v).'</td>';
            }
          }
          ?>
        </tr>
        <?php endfor; ?>
      </tbody>
    </table>
  </div>
  <p><a href="data/contactos.csv" download>Descargar CSV</a></p>
  <h2>Inscripciones</h2>
  <table class="sheet">
    <thead><tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Grupo</th><th>Precio</th><th>Descuento</th></tr></thead>
    <tbody>
      <?php foreach($enrolls as $e): ?>
      <tr><td><?=htmlspecialchars($e['name'])?></td><td><?=htmlspecialchars($e['email'])?></td><td><?=htmlspecialchars($e['phone'])?></td><td><?=htmlspecialchars($e['group_id'])?></td><td><?=htmlspecialchars($e['price'])?></td><td><?=htmlspecialchars($e['discount'])?></td></tr>
      <?php endforeach; ?>
    </tbody>
  </table>

  <h2>Agendas de llamada</h2>
  <table class="sheet">
    <thead><tr><th>Nombre</th><th>Contacto</th><th>Curso</th><th>Fecha</th><th>Comentario</th></tr></thead>
    <tbody>
      <?php foreach($callbacks as $c): ?>
      <tr><td><?=htmlspecialchars($c['name'])?></td><td><?=htmlspecialchars($c['contact'])?></td><td><?=htmlspecialchars($c['course_id'])?></td><td><?=htmlspecialchars($c['datetime'])?></td><td><?=htmlspecialchars($c['comment'])?></td></tr>
      <?php endforeach; ?>
    </tbody>
  </table>
  <?php if($hasNew): ?>
  <div id="toast" class="toast" aria-live="polite">Nuevas solicitudes</div>
  <script>setTimeout(()=>document.getElementById('toast').style.display='none',4000);</script>
  <?php endif; ?>

<?php endif; ?>
</main>
<footer class="container">
  <a href="https://wa.me/525610885357" class="whatsapp">WhatsApp: +52 56 1088 5357</a>
</footer>
</body>
</html>
