<?php 


$servername = "localhost";
$username = "pharmaseri_seradmin";
$password = "gFQ6r77e0";
$dbname="pharmaseri_ser1";
$LandingName="pharmaceris";


try {

    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4'));
  // set the PDO error mode to exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connected successfully";
  return $pdo;
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}