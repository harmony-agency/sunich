<?php
include "../../panel/config.php";
$data = [];

$score = $_POST["score"];


// Verifying whether a cookie is set or not
if(isset($_COOKIE["username"])){
    $username =  $_COOKIE["username"];
} else{
    echo "Not Set Username";
    die();
}


if(isset($score))  { 

        if($score!='' )
        {

               
     
                try {

                            $data['success'] = true;
                            $sql = "UPDATE `subscribers` SET `score` = $score  WHERE `phone` = $username ;";
                            // use exec() because no results are returned
                            $pdo->exec($sql);
                            $data['message'] = "امتیاز با موفقیت ثبت شد";
                       
                       
                    } 
             catch(PDOException $e) {
                            $data['message'] =  $sql . "<br>" . $e->getMessage();
            }
        }
        
}

echo json_encode($data);
exit();
