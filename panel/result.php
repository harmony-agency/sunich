<?php



include "config.php";


$data = [];





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


    $users = $pdo->query('select count(*) from users')->fetchColumn(); 


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
    $data['users'] = intval($users);

    $data['success'] = true;

} catch (PDOException $e) {
    $data['success'] = false;
    $data['message'] =  $sql . "<br>" . $e->getMessage();
}


}

$user_id = $_POST['user_id'];

if(isset($user_id) && $user_id != null)  {   


    try {    
    
        $sql_fetch_user = "SELECT * FROM users  WHERE id = $user_id";
    
        $stmt_users= $pdo->query($sql_fetch_user);

        $stmt_users->setFetchMode(PDO::FETCH_ASSOC);
    
        while ($row = $stmt_users->fetch()){
    
            $level1 = $row['level1'] ;
            $level2 = $row['level2'] ;
            $level3 = $row['level3'] ;
            $level4 = $row['level4'];

        }

    
        $data['level1'] = intval($level1);
        $data['level2'] = intval($level2);
        $data['level3'] = intval($level3);
        $data['level4'] = intval($level4);

        $data['success'] = true;
    
    } catch (PDOException $e) {
        $data['success'] = false;
        $data['message'] =  $sql . "<br>" . $e->getMessage();
    }
    
    
}

echo json_encode($data);