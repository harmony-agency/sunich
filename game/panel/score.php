<?php
include "../../panel/config.php";
$data = [];

$score = $_POST["score"];
$username = $_POST["username"];

if(isset($score) && isset($username))  { 

        if($score!='' )
        {

               
     
                try {

                        $sql_select = "SELECT limited FROM otp WHERE username = $username";
                                
                        $limited = $pdo->query($sql_select)->fetchColumn();
                        $limited = $limited +1 ;
                            if($limited < 4){
                                
                               $sql = "UPDATE `users` SET `score` = $score AND `limited`= $limited WHERE `username` = $username ;";
                                // use exec() because no results are returned
                                $pdo->exec($sql);
                                $data['success'] = true;
                                $data['message'] = "امتیاز با موفقیت ثبت شد";
                             }else{
                                   $data['success'] = false;
                                $data['message'] = "شما 3 بار بازی کردید";
                             }
 
                       
                       
                    } 
             catch(PDOException $e) {
                            $data['message'] =  $sql . "<br>" . $e->getMessage();
            }
        }
        
}

echo json_encode($data);
exit();
