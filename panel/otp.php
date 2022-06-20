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

      $apiKey = '34766A373652457777676B464E2F344E6B653172564559504C7A356F643744654E454B4558564B554B68633D';

      $url = "https://api.kavenegar.com/v1/$apiKey/verify/lookup.json";
      
      $curl = curl_init();
      
      $fields = array(
          'receptor' => $mobile,
          'token' => $token,
          'template' => 'study2020'
      );
      
      
      
      $json_string = json_encode($fields);
      
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_POST, TRUE);
      curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );
      
      $data = curl_exec($curl);

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
    
    

               if(validate_number($mobile) == false) 
                {

                    $data['message'] = 'لطفا شماره همراه معتبر وارد کنید.';

                    $data['success'] = false;

                }else{

                  try {

                    $sql_select = "SELECT count FROM otp WHERE mobile = $mobile";
                
                    $records = $pdo->query($sql_select)->fetchColumn();
                    
                    if($records > -1) {
                        $data['success'] = true;

                        $code = generateNumericOTP(4);
                        $count = 1 ;
                        // verifySMS($mobile,$code);
                  
                      if  ($records > 0) {
                        $count = $count + $records;
                        $sql_update = "UPDATE  otp  SET count = '$count' , code = '$code' WHERE mobile = $mobile";
                        // use exec() because no results are returned
                        $pdo->exec($sql_update);
                        $data['message'] =  "Success Update";

                      }else{

                        $sql_insert = "INSERT INTO otp (mobile, code, count)

                        VALUES ('$mobile', '$code', '$count')";

                        // use exec() because no results are returned

                        $pdo->exec($sql_insert);
                      }

                      } else{
                        $data['success'] = false;
                        $data['message'] =  "حداکثر مجاز ارسال پیامک برای هر شماره 5 بار می باشد";
                      }
                    } 

                    catch(PDOException $e) {
                      $data['success'] = false;
                      $data['message'] =  $sql . "<br>" . $e->getMessage();

                    }


                }

 }     

echo json_encode($data);