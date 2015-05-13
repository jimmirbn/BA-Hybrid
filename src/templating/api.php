<?php 
header('Access-Control-Allow-Origin: *');
include "dbconnect.php";



if (isset($_POST['patientInfo'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM patient where patient.id =".$patientID."");
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['roomdata'])) {
	$teamnr = $_POST['teamnr'];
	$result = $mysqli->query("SELECT roomnr FROM rooms where teamid = " . $teamnr . "");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['patientListData'])) {
	$roomnr = $_POST['roomnr'];
	$result = $mysqli->query("SELECT id, fullname FROM patient where patient.roomnr = " . $roomnr . "");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['addPatient'])) {
	if(isset($_POST['fullname'])){
		$fullname = $_POST['fullname'];
	}
	if(isset($_POST['born'])){
		$born = $_POST['born'];
	}
	if(isset($_POST['roomnr'])){
		$roomnr = $_POST['roomnr'];
	}
	if(isset($_POST['description'])){
		$description = $_POST['description'];
	}
	if(isset($_POST['inlaid'])){
		$inlaid = $_POST['inlaid'];
	}
	if(isset($_POST['imageSrc'])){
		$imageSrc = $_POST['imageSrc'];
	}
	else{
		$imageSrc = 'empty'; // browser test - no camera
	}

	$result = $mysqli->query("INSERT INTO patient(fullname,infotext,profileimage,born,inlaid,roomnr) VALUES('$fullname','$description','$imageSrc','$born','$inlaid','$roomnr')");
	if($result)
	{
		echo json_encode('success');
	}
	else
	{
		echo json_encode('error');
	}	
}

else if (isset($_POST['addImage'])) {
	if(isset($_POST['patientID'])){
		$id = $_POST['patientID'];
	}
	if(isset($_POST['imageData'])){
		$imageData = $_POST['imageData'];
	}
	if(isset($_POST['table'])){
		$table = $_POST['table'];
	}
	if(isset($_POST['imagerow'])){
		$imagerow = $_POST['imagerow'];
	}

	if($imagerow == 'transferimage' && $table == 'transferimages'){

		$result = $mysqli->query("INSERT INTO transferimages(transferimage,patientid) VALUES('$imageData','$id')");
		if($result)
		{
			echo json_encode('success');
		}
		else
		{
			echo json_encode($result);
		}	
	}	
	if($imagerow == 'positioningimage' && $table == 'positioningimages'){

		$result = $mysqli->query("INSERT INTO positioningimages(positioningimage,patientid) VALUES('$imageData','$id')");
		if($result)
		{
			echo json_encode('success');
		}
		else
		{
			echo json_encode($result);
		}	
	}	
	if($imagerow == 'processimage' && $table == 'processimages'){
			echo json_encode($id);

		$result = $mysqli->query("INSERT INTO processimages(processimage,patientid) VALUES('$imageData','$id')");
		if($result)
		{
			echo json_encode('success');
		}
		else
		{
			echo json_encode($result);
		}	
	}	
}

//PROCESS START

else if (isset($_POST['getprocessimages'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM processimages where processimages.patientid =".$patientID."");
	
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['getprocessnotes'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM processnotes where processnotes.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['getprocessvideos'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM processvideo where processvideo.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}
// PROCESS END
// 
//transfer START

else if (isset($_POST['gettransferimages'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM transferimages where transferimages.patientid =".$patientID."");
	
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['gettransfernotes'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM transfernotes where transfernotes.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['gettransfervideos'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM transfervideo where transfervideo.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}
// transfer END
//positioning START

else if (isset($_POST['getpositioningimages'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM positioningimages where positioningimages.patientid =".$patientID."");
	
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['getpositioningnotes'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM positioningnotes where positioningnotes.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if (isset($_POST['getpositioningvideos'])) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM positioningvideo where positioningvideo.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}
// positioning END

?>
