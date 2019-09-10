<?php
include("conn.php");
// require "conn.php";

// $result=mysql_query("select * from xiaomi");
$result = $conn->query("select * from dajang");

$wronglist=array();
// for ($i=0; $i < mysql_num_rows($result); $i++) { 
//     $wronglist[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
// }

// var_dump($result);

// var_dump($result->fetch_assoc());

while($row = $result->fetch_assoc()){
    array_push($wronglist,$row);
}

echo json_encode($wronglist);


?>