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


    $phone = $_POST['phone'];
    $score = $_POST["score"];

    if(isset($phone))  { 

            if($phone!='' )
            {
                if(validate_number($phone) == false) 

                {
                    $data['message'] = 'لطفا شماره تماس معتبر وارد کنید.';
                    $data['success'] = false;
                }else{
                   
         
                    try {

                                $data['success'] = true;
                                $sql = "UPDATE `users` SET `score` = $score  WHERE `users`.`phone` = $phone;";
                                // use exec() because no results are returned
                                $pdo->exec($sql);
                                $data['message'] = "امتیاز با موفقیت ثبت شد";
                           
                           
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
