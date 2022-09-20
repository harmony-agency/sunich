<?php

include "config.php";

$data = [];



$id = $_POST['id'];


if(isset($id))  { 
            if($id!='')
            {
                    // $data['success'] = true;
         
                    try {
                          
                               $sql_current = "SELECT like_count FROM `comments` WHERE `id` = $id";

                               $records_like = $pdo->query($sql_current)->fetchColumn();
                             
                            //    $data_count['count'] =  $records_like;
                            $like_count = intval($records_like) +1;
                          

                                $sql = "UPDATE `comments` SET `like_count` = $like_count  WHERE `comments`.`id` = $id;";
                                


                                $pdo->exec($sql);
                                $data['like'] = $like_count;
                                 $data['success'] = true;
                                $data['message'] = "موفقیت امیز بود";
                        } 
                 catch(PDOException $e) {
                                $data['message'] =  $sql . "<br>" . $e->getMessage();
                    }
                
            }else{
                    $data['message'] = 'آی دی ارسال نشد';
                    
                    $data['success'] = false;
            }
        }


echo json_encode($data);
exit();


