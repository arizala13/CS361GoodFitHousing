<?php
function OpenCon()
 {
 $dbhost = "classmysql.engr.oregonstate.edu";
 $dbuser = "cs361_hughesc3";
 $dbpass = "group8goodfit";
 $db = "cs361_hughesc3";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
   
?>