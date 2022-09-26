<?php

include "config.php";

$data = [];

function validate_number($mobile_number){
    if(preg_match('/^[0-9]9[0-9]*$/', $mobile_number)) {
        // the format /^[0-9]{11}+$/ will check for mobile number with 11 digits and only numbers
        return true;
    }   else{
         return false;
        }
    }

$username = $_POST['mobile'];
$confirm = $_POST['confirm'];

$utm_source = $_POST['utm_source'];
$utm_campaign = $_POST['utm_campaign'];
$utm_medium = $_POST['utm_medium'];
$utm_term = $_POST['utm_term'];
$utm_content = $_POST['utm_content'];
$referrer= $_POST['referrer'];



if(isset($username))  { 
            if($username!='')
            {
                if(validate_number($username) == false) 
                {
                    $data['message'] = 'لطفا شماره تماس معتبر وارد کنید.';
                    $data['success'] = false;
                }else{
                   
         
                    try {
                        
                              $sql_select = "SELECT confirm FROM otp WHERE mobile = $username";
                  
                              $verify_code = $pdo->query($sql_select)->fetchColumn();
                              
                              $data['message'] = $verify_code ;
                              
           
                               if($verify_code ==  $confirm) {

                                $sql = "INSERT INTO users ( username, utm_source ,  utm_medium , utm_campaign , utm_term , utm_content , referrer)
                                VALUES ('$username', '$utm_source' ,  '$utm_medium' , '$utm_campaign' , '$utm_term' , '$utm_content', '$referrer')";
                                // use exec() because no results are returned
                                $pdo->exec($sql);
                                

                                     $data['success'] = true;
                                    $data['username'] = $username;

                                 }
                                else{
                                  $data['success'] = false;
                                  $data['message'] =  "کد وارد شده صحیح نمی باشد";
                                }
                        } 
                 catch(PDOException $e) {
                                $data['message'] =  $sql . "<br>" . $e->getMessage();
                    }
                }
            }else{
                    $data['message'] = 'لطفا شماره تماس را وارد کنید.';
                    $data['success'] = false;
            }

}
echo json_encode($data);
exit();


