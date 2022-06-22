<?php



include "config.php";


function validate_number($mobile_number){
    if(preg_match('/^[0-9]9[0-9]*$/', $mobile_number)) {
            // the format /^[0-9]{11}+$/ will check for mobile number with 11 digits and only numbers
            return true;
        } else{
            return false;
         }
}


function verifySMS($mobile,$token){

    $mobile = (int)$mobile;

      $url = "https://new.payamsms.com/services/rest/index.php";

      $message = "کد تایید سن ایچ کول :‌$token";


      $curl = curl_init();
      
      $fields = [
        "organization" => "sunich", 
        "username" => "Marketing", 
        "password" => "marketing1020", 
        "method" => "send", 
        "messages" => [
              [
                 "sender" => "9820001020", 
                 "recipient" => "98$mobile", 
                 "body" => $message, 
                 "customerId" => 1 
              ] 
           ] 
     ]; 


      $json_string = json_encode($fields);
      
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_POST, TRUE);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $json_string);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );
      
      $response = curl_exec($curl);

      curl_close($curl);
}

// Function to generate OTP
function generateNumericOTP($n) {
      
    // Take a generator string which consist of
    // all numeric digits
    $generator = "1357902468";
  
    // Iterate for n-times and pick a single character
    // from generator and append it to $result
      
    // Login for generating a random character from generator
    //     ---generate a random number
    //     ---take modulus of same with length of generator (say i)
    //     ---append the character at place (i) from generator to result
  
    $result = "";
  
    for ($i = 1; $i <= $n; $i++) {
        $result .= substr($generator, (rand()%(strlen($generator))), 1);
    }
  
    // Return result
    return $result;
}

$data = [];

$mobile =strval($_POST['mobile']);



if(isset($mobile))  {   
    
    
          $sql_select_user = "SELECT mobile FROM users WHERE mobile = $mobile AND level1 = 1";
                        
          $recordsUsers = $pdo->query($sql_select_user)->fetchColumn();

          if($recordsUsers > 0)
          {

            $data['message'] = '  شما قبلا در این مسابقه شرکت کرده اید و 100 امتیاز دریافت کردید ';
            $data['success'] = false;
          }else{



               if(validate_number($mobile) == false) 
                {

                    $data['message'] = 'لطفا شماره همراه معتبر وارد کنید.';

                    $data['success'] = false;

                }else{

                  try {

                    $sql_select = "SELECT count FROM otp WHERE mobile = $mobile";
                
                    $records = $pdo->query($sql_select)->fetchColumn();
                    
                        $data['success'] = true;

                        $code = generateNumericOTP(4);
                      
                        verifySMS($mobile,$code);


                      if  ($records > 0) {
                        $count = $count + $records;
                        $sql_update = "UPDATE  otp  SET count = '$count' , code = '$code' WHERE mobile = $mobile";
                        // use exec() because no results are returned
                        $pdo->exec($sql_update);
                        $data['message'] =  "Success Update";

                      }else{

                        $count = 1 ;

                        $sql_insert = "INSERT INTO otp (mobile, code, count)

                        VALUES ('$mobile', '$code', '$count')";

                        // use exec() because no results are returned

                        $pdo->exec($sql_insert);
                      }

  
                    }
                    catch(PDOException $e) {
                      $data['success'] = false;
                      $data['message'] =  $sql . "<br>" . $e->getMessage();

                    }

                  }
                }

 }     

echo json_encode($data);