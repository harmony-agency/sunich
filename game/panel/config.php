<?php 


$servername = "localhost";
$username = "vmagzir_adsl01_vps";
$password = "r,x%33,?Ti*H";
$dbname="vmagzir_adsl01_vps";

try {

    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
  // set the PDO error mode to exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // echo "Connected successfully";
  return $pdo;
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}