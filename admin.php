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
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mensajes</title>
<link rel="stylesheet" href="styles.min.css">
</head>
<body>
<header class="sticky">
  <div class="container">
    <h1>Mensajes</h1>
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
<?php endif; ?>
</main>
</body>
</html>
