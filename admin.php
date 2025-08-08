<?php
session_start();
$codes=['1991','2025'];
if(isset($_GET['logout'])){session_destroy();header('Location: admin.php');exit;}
if(isset($_POST['code'])){
  if(in_array($_POST['code'],$codes)) $_SESSION['auth']=true;
}
$auth=!empty($_SESSION['auth']);
$dataDir=__DIR__.'/data/';
$csv=$dataDir.'contactos.csv';
$rows=file_exists($csv)?array_map('str_getcsv',file($csv)):[[]];
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Mensajería</title>
<link rel="stylesheet" href="styles.min.css">
</head>
<body>
<header class="site-header"><div class="container"><h1 class="site-title">Mensajería</h1></div></header>
<main class="container">
<?php if(!$auth): ?>
  <form method="post" id="loginForm" class="field">
    <label for="code">Código</label>
    <input type="password" id="code" name="code" required>
    <button type="submit">Entrar</button>
  </form>
<?php else: ?>
  <form id="contactForm" enctype="multipart/form-data" method="post" action="save.php">
    <input type="hidden" name="website" id="website">
    <div class="field"><label for="nombre">Nombre</label><input id="nombre" name="nombre" required></div>
    <div class="field"><label for="telefono">Teléfono</label><input id="telefono" name="telefono" pattern="\d{10}" required></div>
    <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required></div>
    <div class="field"><label for="curso">Curso de interés</label><input id="curso" name="curso" list="cursos"></div>
    <datalist id="cursos"><option value="aritmética"><option value="álgebra"><option value="geometría"><option value="trigonometría"><option value="cálculo diferencial"><option value="cálculo integral"><option value="probabilidad"><option value="estadística"></datalist>
    <div class="field"><label for="mensaje">Mensaje</label><textarea id="mensaje" name="mensaje" required></textarea></div>
    <div class="field"><label>Archivos</label><div id="dropZone" class="drop-zone">Arrastra aquí tus archivos <button type="button" id="fileBtn">Buscar archivos</button></div><ul id="fileList" class="file-list"></ul></div>
    <div id="formStatus" aria-live="polite"></div>
    <button type="submit">Enviar</button>
  </form>
  <?php if(count($rows)>1): ?>
  <div style="overflow:auto">
    <table>
      <thead>
        <tr><?php foreach($rows[0] as $h) echo "<th>$h</th>"; ?></tr>
      </thead>
      <tbody>
        <?php for($i=1;$i<count($rows);$i++): $r=$rows[$i]; if(!$r) continue; ?>
        <tr>
          <?php for($j=0;$j<count($rows[0]);$j++): ?>
            <?php if($j==6): $files=$r[$j]?explode('|',$r[$j]):[]; ?>
              <td><?php foreach($files as $f) echo "<a href='uploads/$f' download>$f</a> "; ?></td>
            <?php else: ?>
              <td><?php echo htmlspecialchars($r[$j]??''); ?></td>
            <?php endif; ?>
          <?php endfor; ?>
        </tr>
        <?php endfor; ?>
      </tbody>
    </table>
  </div>
  <p><a href="data/contactos.csv" download>Descargar CSV</a> | <a href="admin.php?logout=1">Salir</a></p>
  <?php endif; ?>
<?php endif; ?>
</main>
<script src="scripts.min.js"></script>
</body>
</html>
