<?php

?><!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="./assets/css/app.css">
  <script src="./assets/js/app.js"></script>
</head>
<body class="l-body">

<section class="u-pr4e u-pl4e">

  <h1>docker nginx php-fpm7.4 browser-sync</h1>

  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero inventore distinctio, odit cumque illum veniam perferendis voluptates numquam sint, rem alias temporibus omnis accusamus praesentium recusandae culpa ratione officia qui!</p>

  <p>PHP: <?php echo phpversion(); ?></p>

  <h2 class="u-mt2e">MySQL PDO</h2>

<?php
  try {
      # hostには「docker-compose.yml」で指定したコンテナ名を記載
      $dsn = "mysql:host=db;dbname=test;";
      $db = new PDO($dsn, 'test', 'test');

      $sql = "SELECT * FROM test";
      $stmt = $db->prepare($sql);
      $stmt->execute();
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
      echo '<pre>';
      var_dump($result);
      echo '</pre>';
  } catch (PDOException $e) {
      echo $e->getMessage();
      exit;
  }
?>

</section>

</body>
</html>
