<?php 

include_once('config.php'); 
$data = [];


$id = intval($_POST['id']);


try {
  $sql = 'SELECT id,fullName,comment,like_count FROM `comments` WHERE `id` < '.$id.' LIMIT 50';
             $comment = $pdo->query($sql);
             $comment->setFetchMode(PDO::FETCH_ASSOC); 
    
    while ($row = $comment->fetch()){
              array_push($data,$row);
    }
     


}
catch (PDOException $e) {
    $data['error'] = "Could not connect to the database:" . $e->getMessage(); 
} 


echo json_encode($data,JSON_UNESCAPED_UNICODE);