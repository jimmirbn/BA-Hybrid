<?php 
header('Access-Control-Allow-Origin: *');
include "dbconnect.php";

if ($_POST['type'] == patientInfo) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM patient where patient.id =".$patientID."");
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == roomdata) {
	$teamnr = $_POST['teamnr'];
	$result = $mysqli->query("SELECT roomnr FROM rooms where teamid = " . $teamnr . "");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == patientListData) {
	$roomnr = $_POST['roomnr'];
	$result = $mysqli->query("SELECT id, fullname FROM patient where patient.roomnr = " . $roomnr . "");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == addPatient) {
	$fullname = $_POST['fullname'];
	$born = $_POST['born'];
	$roomnr = $_POST['roomnr'];
	$description = $_POST['description'];
	$inlaid = $_POST['inlaid'];
	$imageSrc = $_POST['imageSrc'];
	$result = $mysqli->query("INSERT INTO patient(fullname,infotext,image,born,inlaid,roomnr) VALUES('$fullname','$description','$imageSrc','$born','$inlaid','$roomnr')");
	if($result)
	{
		echo json_encode('success');
	}
	else
	{
		echo json_encode('error');
	}	
}

else if ($_POST['type'] == addImage) {
	$id = $_POST['patientID'];
	$image = $_POST['imageData'];
	$table = $_POST['table'];
	$imagerow = $_POST['imagerow'];
	if($imagerow == 'transferimage' && $table == 'transferimages'){

		$result = $mysqli->query("INSERT INTO transferimages(transferimage,patientid) VALUES('$image','$id')");
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

		$result = $mysqli->query("INSERT INTO positioningimages(positioningimage,patientid) VALUES('$image','$id')");
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

		$result = $mysqli->query("INSERT INTO processimages(processimage,patientid) VALUES('$image','$id')");
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

else if ($_POST['type'] == getprocessimages) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM processimages where processimages.patientid =".$patientID."");
	
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == getprocessnotes) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM processnotes where processnotes.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == getprocessvideos) {
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

else if ($_POST['type'] == gettransferimages) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM transferimages where transferimages.patientid =".$patientID."");
	
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == gettransfernotes) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM transfernotes where transfernotes.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == gettransfervideos) {
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

else if ($_POST['type'] == getpositioningimages) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM positioningimages where positioningimages.patientid =".$patientID."");
	
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == getpositioningnotes) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM positioningnotes where positioningnotes.patientid =".$patientID."");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

else if ($_POST['type'] == getpositioningvideos) {
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
