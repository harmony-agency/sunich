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

if(isset($user_id) && $user_id != null)  {   


                    try {

                          $sql = "INSERT INTO scores (user_id, cactus, blueberry , cherries , pear , portugal , apple , grape , fruit , lemonade , mohito)

                          VALUES ('$user_id', '$cactus', '$blueberry' , '$cherries' , '$pear' , '$portugal' , '$apple' , '$grape' , '$fruit','$lemonade' , '$mohito')";
  
                          // use exec() because no results are returned
  
                          $pdo->exec($sql);
                          
                          $data['success'] = true;
                          $data['message'] =  'Insert Success Scores';

                    }
                      catch(PDOException $e) {
                        $data['success'] = false;
                        $data['message'] =  $sql . "<br>" . $e->getMessage();

                      }

  }
if(isset($resultScore) && $resultScore = 'All')  {   


    try {    

        $sql_fetch = "SELECT * FROM scores ";

        $stmt= $pdo->query($sql_fetch);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()){

            $cactus = $row['cactus'] + $cactus;
            $blueberry = $row['blueberry'] + $blueberry;
            $cherries = $row['cherries'] + $cherries;
            $pear = $row['pear'] + $pear;
            $portugal = $row['portugal'] + $portugal;
            $apple = $row['apple'] + $apple;
            $grape = $row['grape'] + $grape;
            $fruit = $row['fruit'] + $fruit;
            $lemonade = $row['lemonade'] + $lemonade;
            $mohito = $row['mohito'] + $mohito;
        }

        $data['cactus'] = $cactus;
        $data['blueberry'] = $blueberry;
        $data['cherries'] = $cherries;
        $data['pear'] = $pear;
        $data['portugal'] = $portugal;
        $data['apple'] = $apple;
        $data['grape'] = $grape;
        $data['fruit'] = $fruit;
        $data['lemonade'] = $fruit;
        $data['mohito'] = $fruit;

        $data['success'] = true;

    } catch (PDOException $e) {
        $data['success'] = false;
        $data['message'] =  $sql . "<br>" . $e->getMessage();
    }


  }
echo json_encode($data);