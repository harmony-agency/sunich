<?php



include "config.php";


$data = [];





$user_id = intval($_POST['user_id']);

$resultScore = $_POST['resultScore'];

$cactus = intval($_POST['cactus']);
$blueberry = intval($_POST['blueberry']);
$cherries = intval($_POST['cherries']);
$pear = intval($_POST['pear']);
$portugal = intval($_POST['portugal']);
$apple = intval($_POST['apple']);
$grape = intval($_POST['grape']);
$fruit = intval($_POST['fruit']);
$lemonade = intval($_POST['lemonade']);
$mohito = intval($_POST['mohito']);
$level = $_POST['level'];


if(isset($user_id) && $user_id != null)  {   


                    try {

                      

                          $sql = "INSERT INTO scores (user_id, cactus, blueberry , cherries , pear , portugal , apple , grape , fruit , lemonade , mohito )

                          VALUES ('$user_id', '$cactus', '$blueberry' , '$cherries' , '$pear' , '$portugal' , '$apple' , '$grape' , '$fruit','$lemonade' , '$mohito')";
  
                          // use exec() because no results are returned
  
                          $pdo->exec($sql);
                          
                          $data['success'] = true;
                          $data['message'] =  'Insert Success Scores';

                          $sql_update = "UPDATE users SET level1 = '$level' WHERE id = $user_id";
                          // use exec() because no results are returned
                          $pdo->exec($sql_update);
                          
                          $data['level'] =  'Insert Success Level';


                    }
                      catch(PDOException $e) {
                        $data['success'] = false;
                        $data['message'] =  $sql . "<br>" . $e->getMessage();

                      }

  }
