<?php
$mysqli = new mysqli("localhost", "root", "", "digitaljimmi_com_db");
if ($mysqli->connect_errno) {
    echo "WARNING DATABASE FAILED: " . $mysqli->connect_error;
}
?>