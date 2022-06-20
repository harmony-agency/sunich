<?php



include "config.php";


$data = [];





$name = strval($_POST['name']);
$mobile = strval($_POST['mobile']);
$instagram = strval(($_POST['instagram']));
$confirm = strval($_POST['confirm']);


$utm_source = strval($_POST['confirm']);
$utm_source = strval($_POST['utm_source']);
$utm_medium = strval($_POST['utm_medium']);
$utm_campaign = strval($_POST['utm_campaign']);
$utm_term = strval($_POST['utm_term']);
$utm_content = strval($_POST['utm_content']);
$referrer = strval($_POST['referrer']);


if(isset($mobile) && isset($confirm)  )  {   


                    try {

                      $sql_select = "SELECT code FROM otp WHERE mobile = $mobile";
                  
                      $verify_code = $pdo->query($sql_select)->fetchColumn();
                      $data['message'] = $verify_code ;
                      
                      if($verify_code ==  $confirm) {
                        

                          $sql = "INSERT INTO users (name, mobile, instagram , utm_source , utm_medium , utm_campaign , utm_term , utm_content , referrer )

                          VALUES ('$name', '$mobile', '$instagram' , '$utm_source' , '$utm_medium' , '$utm_campaign' , '$utm_term' , '$utm_content' , '$referrer')";
  
                          // use exec() because no results are returned
  
                          $pdo->exec($sql);
  
                          $insert_id = $pdo->lastInsertId();
                          
                          $data['success'] = true;
                          $data['user_id'] = $insert_id;

                        } else{
                          $data['success'] = false;
                          $data['message'] =  "کد وارد شده صحیح نیست ";
                        }
                       
                    }
                      catch(PDOException $e) {
                        $data['success'] = false;
                        $data['message'] =  $sql . "<br>" . $e->getMessage();

                      }

  }

echo json_encode($data);