<?php 
header('Access-Control-Allow-Origin: *');
include "dbconnect.php";

function getEncodedVideoString($type, $file) { 
	return 'data:video/' . $type . ';base64,' . base64_encode(file_get_contents($file)); 
}
$video = getEncodedVideoString('mp4', $_FILES["file"]['tmp_name']);
echo $video;
$id = $_POST['id'];
$videotitle = $_POST['videotitle'];
echo $videotitle;
if($_POST['type'] == 'transfer'){

	$result = $mysqli->query("INSERT INTO transfervideo(patientid,transfervideo) VALUES('$id','$video')");
	if(!$result){
		echo json_encode('error');
	}	
}

if($_POST['type'] == 'positioning'){

	$result = $mysqli->query("INSERT INTO positioningvideo(patientid,positioningvideo) VALUES('$id','$video')");
	if(!$result){
		echo json_encode('error');
	}	
}

if($_POST['type'] == 'process'){

	$result = $mysqli->query("INSERT INTO processvideo(patientid,processvideo) VALUES('$id','$video')");
	if(!$result){
		echo json_encode('error');
	}
	
}

?>