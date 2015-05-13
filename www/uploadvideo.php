<?php 
header('Access-Control-Allow-Origin: *');
include "dbconnect.php";

// function getEncodedVideoString($file) { 
// 	return 'data:video/mp4;base64,' . base64_encode(file_get_contents($file)); 
// }
// $videofile = $_FILES["file"]['tmp_name'];
$arr = array();
if(isset($_FILES["file"]['tmp_name'])){
	$path = $_FILES["file"]['tmp_name'];
	$realfile = file_get_contents($path);
	$video = 'data:video/mp4;base64,' . base64_encode($realfile);
	array_push($arr, $video);
	// echo $video;
}
	if(isset($_POST['videotitle'])){
		$videotitle = $_POST['videotitle'];
    array_push($arr, $videotitle);
	}

		echo json_encode($arr);

// $video = getEncodedVideoString('mp4', $videofile );

if(isset($_POST['id'])){
	$id = $_POST['id'];
}

if(isset($_POST['transfer'])){
	$result = $mysqli->query("INSERT INTO transfervideo(patientid,transfervideo,transfervideotitle) VALUES('$id','$video','$videotitle')");
	if(!$result){
		echo json_encode('error');
	}	
}

if(isset($_POST['positioning'])){
	$result = $mysqli->query("INSERT INTO positioningvideo(patientid,positioningvideo,positioningvideotitle) VALUES('$id','$video','$videotitle')");
	if(!$result){
		echo json_encode('error');
	}	
}

if(isset($_POST['process'])){
	$result = $mysqli->query("INSERT INTO processvideo(patientid,processvideo,processvideotitle) VALUES('$id','$video','$videotitle')");
	if(!$result){
		echo json_encode('error');
	}	
}

?>