<?php 
include "dbconnect.php";

if ($_POST['type'] == patientInfo) {
	$result = $mysqli->query("select * from patient");
	$arr = array();
	 while ($row = $result->fetch_assoc()) {
        $arr[] = $row;
    }
	echo json_encode($arr);
}	
?>
