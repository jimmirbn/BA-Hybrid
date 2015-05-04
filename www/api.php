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

if ($_POST['type'] == patientlejring) {
	$result = $mysqli->query("SELECT patientimages.image, patientimages.imagedate, patientnotes.note, patientnotes.notedate, patientvideos.video, patientvideos.videodate FROM patientimages, patientnotes, patientvideos where patientimages.patientid = 1 and patientimages.type = 'lejring' and patientnotes.type = 'lejring' and patientvideos.type = 'lejring'");
	$arr = array();
	 while ($row = $result->fetch_assoc()) {
        $arr[] = $row;
    }
	echo json_encode($arr);
}


?>
