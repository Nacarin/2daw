<!--David Pozo Berlinches-->
<!DOCTYPE html>
<html>
    <head>
        <title>Resultado de Búsqueda</title>
    </head>
    <body>
        <h1>Resultado de Busqueda</h1>
        <?php
            //Comprobamos si existe el valor nombre          
            if(isset($_POST['nombre'])){
                $nombre=$_POST['nombre'];
                //Conectamos
                $conexion=new mysqli('localhost','root','','jesuitas');

                //Realizamos la consulta                
                $sql='select * from jesuita where nombre ='."'$nombre'";               
                //echo $sql; Si tenemos algun error lo mejor es hacerle un echo a la variable
                $resultado=$conexion->query($sql);
                if($nombre==NULL){//Comprobamos si la variable no esta vacia
                    echo "<h2>Jesuita No Encontrado</h2>";
                    echo 'No se ha introducido ningun nombre';
                }else if($resultado->num_rows==0){//Comprobamos si existen jesuitas con ese nombre
                    echo "<h2>Jesuita No Encontrado</h2>";
                    echo "No se encontraron Jesuitas con ese nombre.";
                }else
                {   //Si lo encuentra lo mostramos junto a su firma
                    if($fila=$resultado->fetch_array()) {
                        echo "<h2>Jesuita Encontrado</h2>";
                        echo "NOMBRE: ".$fila['nombre']."<br>";
                        echo "FIRMA: ".$fila['firma']."<br>";
                    }                   
                }  
                //Cerramos la conexion
                $conexion->close();
            }         
        ?>
    </body>
</html>

<!--
    while($fila=mysqli_fetch_array($consulta)) {
        echo "<h2>Jesuita Encontrado</h2>";
        echo "NOMBRE: ".$fila['nombre']."<br>";
        echo "FIRMA: ".$fila['firma']."<br>";
    }  
-->

