<?php 
header('Access-Control-Allow-Origin: *');
include "dbconnect.php";

if ($_POST['type'] == patientInfo) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT * FROM patient where id = " . $patientID . "");
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

if ($_POST['type'] == patientlejring) {
	$patientID = $_POST['id'];

	$result = $mysqli->query("SELECT patientimages.image, patientimages.imagedate, patientnotes.note, patientnotes.notedate, patientvideos.video, patientvideos.videodate FROM patientimages, patientnotes, patientvideos where patientimages.patientid = '".$patientID."' and patientimages.type = 'lejring' and patientnotes.type = 'lejring' and patientvideos.type = 'lejring'");
	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

if ($_POST['type'] == roomdata) {
	$teamnr = $_POST['teamnr'];
	$result = $mysqli->query("SELECT stuenr FROM rooms where teamid = " . $teamnr . "");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

if ($_POST['type'] == patientListData) {
	$roomnr = $_POST['roomnr'];
	$result = $mysqli->query("SELECT id, fullname FROM patient where patient.stuenr = " . $roomnr . "");

	$arr = array();
	while ($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
	echo json_encode($arr);
}

?>
