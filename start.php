<html>
  <head>
    <link rel="stylesheet" href="./src/assets/styles/scss/abstracts/variables.scss" />
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js"></script>
    
  </head>
  <body>
  <?php
  if ($_POST["user"]=="cranach" && $_POST["password"]=="meisterwerke") {
	  echo "<script src='p5.RoverCam.js'></script>";
	  echo "<script src='sketch.js'></script>";
	
  } 
  else {echo "FEHLER";} 

  ?>
  </body>
</html>
