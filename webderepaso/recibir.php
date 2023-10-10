<!--David Pozo Berlinches-->
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>Recoger Información</title>
    </head>
    <body>
        <?php
        //  No da error pero se muestra vacio.
            if(isset($_GET['nombre'])){
                $nombre=$_GET['nombre'];
                echo'Nombre:'.$nombre.'<br>';
            }
        //  echo $_GET['opcion']; Da error porque el array no se creo si no se marca la opcion
            if(isset($_GET['genero'])) {
                $opcion=$_GET['genero'];
                echo'El genero con el que te sientes identificado es:'.$genero.'<br>';
            }
            if(isset($_GET['pais'])){
                $pais=$_GET['pais'];
                echo'Resides en:'.$pais.'<br>';
            }
            $informacion=$_GET['informacion'];
            foreach($informacion as $valor){
                echo 'Te interesa recibir informacion sobre: '.$valor.'<br>';
            }
        //  echo $_GET['terminos']; Da error porque el array no se creo si no se marca la opcion
            if(isset($_GET['terminos'])){
                echo'Aceptaste los términos y condiciones.<br>';
            }
        ?>
    </body>
</html>

